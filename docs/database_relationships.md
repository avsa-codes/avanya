# Database Design: Establishing Relationships

## 1. What is a relationship?

A relationship describes how records in two entities are associated according to the application's business rules.

A foreign key is used to reference a related record in another table and, when enforced by the database, prevents references to nonexistent records.

## 2. Types of relationships

**One-to-One (1:1)**
- One record in Entity A is associated with at most one record in Entity B, and vice versa.
- A foreign key normally needs a UNIQUE constraint to enforce one-to-one cardinality.

**One-to-Many (1:N)**
- One record in Entity A can be associated with multiple records in Entity B.
- Each record in Entity B references one record in Entity A.
- The foreign key is usually stored on the many side.

**Many-to-Many (M:N)**
- Multiple records in Entity A can be associated with multiple records in Entity B.
- A junction table generally implements this relationship using two foreign keys.
- The junction table converts the M:N relationship into two 1:N relationships.

## 3. Cardinality versus optionality

Cardinality describes how many records can participate in a relationship.

Optionality describes whether participation is required.

Common participation ranges:
- 0..1: zero or one
- 1: exactly one
- 0..*: zero or many
- 1..*: one or many

A nullable foreign key usually indicates that the referenced relationship is optional for that record. A non-null foreign key requires a reference, but other constraints may be needed to enforce the complete business rule.

## 4. Procedure for deriving a relationship

1. Identify the two entities that interact.
2. Write the business rule in plain English.
3. Ask how many records on each side can be associated.
4. Determine whether participation is optional or mandatory.
5. Choose the appropriate relationship type.
6. Identify the foreign key or junction table needed.
7. Check the rule against ordinary and exceptional scenarios.
8. Document the relationship and validate it before implementation.

## 5. Important rules

- Relationships should be derived from business requirements, not just from similarly named fields.
- A foreign key usually belongs on the many side of a one-to-many relationship.
- A foreign key alone does not enforce one-to-one cardinality.
- Many-to-many relationships generally require a junction table.
- Nullable foreign keys represent optional references.
- Historical transactions may need snapshots of names, prices, addresses, and partner attribution.
- Relationship definitions must consider deletion behaviour, uniqueness, and the possibility of records changing over time.
- Business rules that span multiple tables may require application logic, database constraints, or both.

## 6. Avanya-specific considerations

- An order can contain products associated with multiple NGOs or artisans.
- OrderItem should preserve the relevant partner attribution and purchase price at checkout.
- Customer payments, refunds, and NGO payouts represent different financial events.
- NGOPayoutItem provides the detailed entries supporting an NGO settlement.
- Reviews should be linked to the reviewed product and, where applicable, a qualifying purchase.
- Saved addresses should not replace the historical delivery address recorded for an order.
- The CorporateGiftingEnquiry table can remain independent unless a real workflow requires linking enquiries to registered users.

## 7. Validation checklist

For each proposed relationship, verify:
- The business rule is clearly stated.
- Cardinality is correct in both directions.
- Optionality is defined.
- The foreign key is placed appropriately.
- Duplicate or invalid references are prevented where necessary.
- Deletion and update behaviour is defined.
- Historical records remain accurate.


# Avanya — Database Relationships, Foreign Keys & Checks

**Status:** Working design  
**Database:** PostgreSQL  
**ORM:** Prisma  
**Tables:** 17  
**Direct FK relationships:** 26  
**Indirect conceptual relationships:** 3

> This document consolidates the current proposed relationship, foreign-key, and constraint design. Items marked provisional must be validated before implementation.

---

# 1. Relationship Design

## 1.1 Relationship fundamentals

- **One-to-many (1:N):** The foreign key is placed on the many side.
- **Many-to-many (M:N):** A junction table stores foreign keys referencing both entities.
- **One-to-one (1:1):** A foreign key is placed on one side and protected by a uniqueness constraint.
- **Optional relationship:** The foreign-key field may be `NULL`. If populated, it must reference an existing record.
- A foreign key ensures referential integrity, but it does not automatically enforce business rules such as ownership, successful payment, or refund limits.

## 1.2 Direct relationships

| # | Relationship | Cardinality | Foreign key | Optionality / Notes |
|---:|---|---|---|---|
| 1 | Product → ProductImage | 1:N | `ProductImage.product_id → Product.id` | Required |
| 2 | NGO → Artisan | 1:N | `Artisan.ngoId → NGO.id` | Optional NGO affiliation |
| 3 | Artisan → Product | 1:N | `Product.artisan_id → Artisan.id` | Optional artisan attribution |
| 4 | NGO → Product | 1:N | `Product.ngo_id → NGO.id` | Optional NGO attribution |
| 5 | User → Address | 1:N | `Address.userId → User.id` | Required |
| 6 | User → Cart | 1:N | `Cart.userId → User.id` | Required provisionally |
| 7 | Cart → CartItem | 1:N | `CartItem.cartId → Cart.id` | Required |
| 8 | Product → CartItem | 1:N | `CartItem.productId → Product.id` | Required |
| 9 | User → Order | 1:N | `Order.userId → User.id` | Required provisionally; reconsider for guest checkout |
| 10 | Address → Order | 1:N | `Order.addressId → Address.id` | Required provisionally |
| 11 | Order → OrderItem | 1:N | `OrderItem.orderId → Order.id` | Required |
| 12 | Product → OrderItem | 1:N | `OrderItem.productId → Product.id` | Required |
| 13 | NGO → OrderItem | 1:N | `OrderItem.ngoId → NGO.id` | Optional historical attribution |
| 14 | Artisan → OrderItem | 1:N | `OrderItem.artisanId → Artisan.id` | Optional historical attribution |
| 15 | User → Review | 1:N | `Review.userId → User.id` | Required |
| 16 | Product → Review | 1:N | `Review.productId → Product.id` | Required |
| 17 | OrderItem → Review | 1:N | `Review.orderItemId → OrderItem.id` | Nullable in current draft |
| 18 | Order → Payment | 1:N | `Payment.orderId → Order.id` | Required |
| 19 | Payment → PaymentAttempt | 1:N | `PaymentAttempt.paymentId → Payment.id` | Required |
| 20 | Order → Refund | 1:N | `Refund.orderId → Order.id` | Required |
| 21 | Payment → Refund | 1:N | `Refund.paymentId → Payment.id` | Required |
| 22 | OrderItem → Refund | 1:N | `Refund.orderItemId → OrderItem.id` | Optional for order-level refunds |
| 23 | NGO → NGOPayout | 1:N | `NGOPayout.ngoId → NGO.id` | Required |
| 24 | NGOPayout → NGOPayoutItem | 1:N | `NGOPayoutItem.payoutId → NGOPayout.id` | Required |
| 25 | OrderItem → NGOPayoutItem | 1:N | `NGOPayoutItem.orderItemId → OrderItem.id` | Optional, depending on entry type |
| 26 | Refund → NGOPayoutItem | 1:N | `NGOPayoutItem.refundId → Refund.id` | Optional, depending on entry type |

## 1.3 Indirect relationships

These relationships are established through existing foreign keys and do not require additional FK columns.

| Relationship | Join path |
|---|---|
| User ↔ Payment | `Payment.orderId → Order.id → Order.userId` |
| User ↔ Refund | `Refund.orderId → Order.id → Order.userId` |
| NGO ↔ NGOPayoutItem | `NGOPayoutItem.payoutId → NGOPayout.id → NGOPayout.ngoId` |

## 1.4 Foreign-key inventory

| Table | Foreign-key field | References | Nullable? |
|---|---|---|---|
| ProductImage | `product_id` | `Product.id` | No |
| Artisan | `ngoId` | `NGO.id` | Yes |
| Product | `artisan_id` | `Artisan.id` | Yes |
| Product | `ngo_id` | `NGO.id` | Yes |
| Address | `userId` | `User.id` | No, provisionally |
| Cart | `userId` | `User.id` | No, provisionally |
| CartItem | `cartId` | `Cart.id` | No |
| CartItem | `productId` | `Product.id` | No |
| Order | `userId` | `User.id` | No, provisionally |
| Order | `addressId` | `Address.id` | No, provisionally |
| OrderItem | `orderId` | `Order.id` | No |
| OrderItem | `productId` | `Product.id` | No |
| OrderItem | `ngoId` | `NGO.id` | Yes |
| OrderItem | `artisanId` | `Artisan.id` | Yes |
| Review | `userId` | `User.id` | No |
| Review | `productId` | `Product.id` | No |
| Review | `orderItemId` | `OrderItem.id` | Yes, provisionally |
| Payment | `orderId` | `Order.id` | No |
| PaymentAttempt | `paymentId` | `Payment.id` | No |
| Refund | `orderId` | `Order.id` | No |
| Refund | `paymentId` | `Payment.id` | No |
| Refund | `orderItemId` | `OrderItem.id` | Yes |
| NGOPayout | `ngoId` | `NGO.id` | No |
| NGOPayoutItem | `payoutId` | `NGOPayout.id` | No |
| NGOPayoutItem | `orderItemId` | `OrderItem.id` | Yes |
| NGOPayoutItem | `refundId` | `Refund.id` | Yes |

---

# 2. Junction and Associative Tables

## 2.1 CartItem

**Connects:** `Cart` and `Product`

Implements the many-to-many relationship between carts and products.

Foreign keys:

- `cartId → Cart.id`
- `productId → Product.id`

Additional rule:

- `UNIQUE(cartId, productId)` so the same product appears only once per cart. Adding the same product should increase its quantity.

## 2.2 OrderItem

**Connects:** `Order` and `Product`

Implements the many-to-many relationship between orders and products while preserving purchase-specific information.

Fields include:

- `orderId`
- `productId`
- `quantity`
- `productName`
- `unitPrice`
- `discountAmount`
- `taxAmount`
- `subtotal`
- `ngoId`
- `artisanId`

Historical product and partner information should be preserved so later product edits do not rewrite the purchase record.

## 2.3 NGOPayoutItem

This is a financial ledger/association table, not a conventional junction table like `CartItem`.

It stores individual entries contributing to an NGO payout. Its `entryType` determines whether `orderItemId`, `refundId`, both, or neither should be populated.

## 2.4 Product and Artisan

No junction table currently exists. `Product.artisan_id` allows at most one artisan per product.

If multiple artisans can collaboratively produce a product, introduce a `ProductArtisan` junction table with `productId` and `artisanId`.

---

# 3. CHECK Constraints

CHECK constraints validate conditions on individual rows. They complement primary keys, foreign keys, `UNIQUE`, and `NOT NULL`.

> The rules below are proposed. Finalize nullability, enum values, and business formulas before writing actual SQL or Prisma migrations.

## 3.1 User

| Field / condition | Proposed rule |
|---|---|
| `fullName` | Must not be blank after trimming whitespace |
| `email` | Must not be blank after trimming whitespace |
| `phone` | If provided, must not be blank after trimming whitespace |
| `gender` | If restricted, must belong to approved categories |
| `authProvider` | If restricted, must belong to approved provider values |

Email format and normalized uniqueness require additional validation and a UNIQUE constraint. Password hashes must never be stored as plaintext.

## 3.2 Product

| Field / condition | Proposed rule |
|---|---|
| `price` | Must be greater than zero; revisit if free products are allowed |
| `compareAtPrice` | If provided, must be greater than `price` |
| `stock_quantity` | Must be zero or greater |
| `name` | Must not be blank after trimming whitespace |
| `slug` | Must not be blank after trimming whitespace |
| `status` | Must belong to approved product-status values |
| `attributes` | If stored as JSONB, validate the agreed structure where practical |

Additionally:

- `sku` should generally be unique.
- `slug` should be unique.
- If only one primary image is allowed per product, use a partial UNIQUE index on `ProductImage.product_id` where `isPrimary = TRUE`.

## 3.3 ProductImage

| Field / condition | Proposed rule |
|---|---|
| `imageUrl` | Must not be blank after trimming whitespace |
| `displayOrder` | Must be zero or greater |
| `altText` | If provided, must not be blank after trimming whitespace |

## 3.4 Artisan

| Field / condition | Proposed rule |
|---|---|
| `fullName` | Must not be blank after trimming whitespace |
| `experienceYears` | Must be zero or greater |
| `email` | If provided, must not be blank after trimming whitespace |
| `phone` | If provided, must not be blank after trimming whitespace |
| `beneficiaryStatusTags` | If stored as an array, values must follow approved tag rules |

## 3.5 NGO

| Field / condition | Proposed rule |
|---|---|
| `legalName` | Must not be blank after trimming whitespace |
| `accountStatus` | Must belong to approved account-status values |
| `establishedYear` | If provided, must fall within an agreed plausible year range |
| `beneficiaryCountAnnual` | If provided, must be zero or greater |
| `beneficiaryCountYear` | If provided, must fall within an agreed valid year range |
| `contactEmail` | If provided, must not be blank after trimming whitespace |
| `contactPhone` | If provided, must not be blank after trimming whitespace |

## 3.6 Cart

| Field / condition | Proposed rule |
|---|---|
| `cart_type` | Must belong to approved cart-type values |

The allowed values for `cart_type` still need to be defined.

## 3.7 CartItem

| Field / condition | Proposed rule |
|---|---|
| `quantity` | Must be greater than zero |

Also enforce `UNIQUE(cartId, productId)`.

## 3.8 Order

| Field / condition | Proposed rule |
|---|---|
| `subtotal` | Must be zero or greater |
| `discountAmount` | Must be zero or greater and must not exceed `subtotal` |
| `shippingAmount` | Must be zero or greater |
| `taxAmount` | Must be zero or greater |
| `totalAmount` | Must equal `subtotal - discountAmount + shippingAmount + taxAmount`, if this is the finalized formula |
| `status` | Must belong to approved order-status values |
| `orderNumber` | Must not be blank after trimming whitespace |

Additionally, `orderNumber` should have a UNIQUE constraint.

## 3.9 OrderItem

| Field / condition | Proposed rule |
|---|---|
| `quantity` | Must be greater than zero |
| `unitPrice` | Must be greater than zero unless free items are supported |
| `discountAmount` | Must be zero or greater |
| `taxAmount` | Must be zero or greater |
| `subtotal` | Must follow the finalized item-level formula |

Before implementing subtotal checks, define whether the item subtotal is before or after discounts and taxes. Ensure discounts and taxes are not counted twice.

## 3.10 Address

| Field / condition | Proposed rule |
|---|---|
| `fullName` | Must not be blank after trimming whitespace |
| `phone` | Must not be blank after trimming whitespace |
| `addressLine1` | Must not be blank after trimming whitespace |
| `city` | Must not be blank after trimming whitespace |
| `state` | Must not be blank after trimming whitespace |
| `postalCode` | Must not be blank after trimming whitespace |
| `country` | Must not be blank after trimming whitespace |
| `addressType` | If restricted, must belong to approved address-type values |

If each user may have only one default address, use a partial UNIQUE index on `userId` where `isDefault = TRUE`.

## 3.11 Payment

| Field / condition | Proposed rule |
|---|---|
| `amount` | Must be greater than zero |
| `currency` | Must be a supported currency code |
| `status` | Must belong to approved payment-operation status values |
| `paymentGateway` | Must belong to approved gateway values |
| `paymentMethod` | If retained on Payment, must belong to approved method values |

Since payment attempts are modeled separately, `paymentMethod` may belong only to `PaymentAttempt`.

## 3.12 PaymentAttempt

| Field / condition | Proposed rule |
|---|---|
| `paymentMethod` | Must belong to approved payment-method values |
| `status` | Must belong to approved attempt-status values |
| `attemptedAt` and `completedAt` | If `completedAt` is provided, it must be at or after `attemptedAt` |

Gateway transaction identifiers should be unique within the provider-defined scope where applicable. Duplicate gateway events must be handled idempotently.

## 3.13 CorporateGiftingEnquiry

| Field / condition | Proposed rule |
|---|---|
| `quantityRequired` | If provided, must be greater than zero |
| `budget` | If provided, must be zero or greater |
| `status` | Must belong to approved enquiry-status values |
| `companyName` | Must not be blank after trimming whitespace |
| `contactName` | Must not be blank after trimming whitespace |
| `contactEmail` | Must not be blank after trimming whitespace |

Validate `preferredDeliveryDate` against business delivery lead times in the backend.

## 3.14 Review

| Field / condition | Proposed rule |
|---|---|
| `rating` | Must be between 1 and 5, inclusive |
| `title` | If provided, must not be blank after trimming whitespace |
| `comment` | If provided, must not be blank after trimming whitespace |

If only one review per user per product is permitted, enforce `UNIQUE(userId, productId)`.

Backend validation must verify that:

- The order item belongs to the reviewing user.
- The order item matches the reviewed product.
- The order has a verified successful payment.
- The item meets the review eligibility policy, such as delivery if required.

## 3.15 Refund

| Field / condition | Proposed rule |
|---|---|
| `amount` | Must be greater than zero |
| `status` | Must belong to approved refund-status values |
| `reason` | Must not be blank after trimming whitespace |
| `requestedAt` and `processedAt` | If `processedAt` is provided, it must be at or after `requestedAt` |

Cumulative refunds must not exceed the amount actually collected minus previous refunds. This requires transactional validation and reconciliation, not just a row-level CHECK.

## 3.16 NGOPayout

| Field / condition | Proposed rule |
|---|---|
| `periodStart` and `periodEnd` | `periodEnd` must be on or after `periodStart` |
| `grossSalesAmount` | Must be zero or greater |
| `commissionAmount` | Must be zero or greater |
| `status` | Must belong to approved payout-status values |
| `netPayoutAmount` | Must reconcile with gross sales, commission, and adjustments under the finalized formula |

Define the sign convention for refund and other adjustments before finalizing the net-payout formula. Negative balances may need to be carried forward.

## 3.17 NGOPayoutItem

| Field / condition | Proposed rule |
|---|---|
| `entryType` | Must belong to approved payout-entry values |
| `description` | If provided, must not be blank after trimming whitespace |
| `amount` | Must be nonzero if all entries represent actual financial movements |
| `orderItemId` and `refundId` | Their permitted combination must match the `entryType` |

Example entry semantics, subject to finalization:

- Sale entry: requires `orderItemId`.
- Refund adjustment: requires `refundId`.
- General adjustment: may require neither reference.

---

# 4. Additional UNIQUE Constraints and Indexes

These are not CHECK constraints, but they are important for data integrity.

| Table | Proposed rule |
|---|---|
| User | Normalized email should be unique; define case sensitivity and soft-deletion behavior |
| Product | `sku` and `slug` should generally be unique |
| CartItem | `UNIQUE(cartId, productId)` |
| Order | `orderNumber` should be unique |
| ProductImage | Partial UNIQUE index on `product_id` where `isPrimary = TRUE`, if only one primary image is allowed |
| Address | Partial UNIQUE index on `userId` where `isDefault = TRUE`, if only one default address is allowed |
| Review | `UNIQUE(userId, productId)` if only one review per user per product is allowed |
| PaymentAttempt | Gateway transaction/event identifiers should be unique within the provider-defined scope |
| NGOPayout | `payoutReference` should generally be unique |

---

# 5. Rules Requiring Backend Logic, Transactions, or Triggers

Some business rules cannot be reliably enforced with ordinary row-level CHECK constraints.

1. **Verified-purchase reviews:** Verify ownership of the order item, product match, successful payment, and review eligibility.
2. **Payment verification:** Only verified gateway evidence establishes a successful payment. Process duplicate or out-of-order webhooks idempotently.
3. **Refund limits:** Total refunds must not exceed the amount collected minus previous refunds. Use transactional safeguards and gateway reconciliation.
4. **Order totals:** Ensure item totals reconcile with order totals without double-counting discounts or taxes.
5. **NGO payout reconciliation:** Reconcile payout totals with sales, commissions, refunds, and adjustments. Finalized ledger entries should be immutable; corrections should be represented by additional adjustments.
6. **Cross-table consistency:** If `Refund.orderItemId` is populated, the referenced item should belong to the same order as `Refund.orderId`.
7. **Payout attribution:** Validate that the NGO associated with a payout matches the NGO attribution of the referenced sale or refund.
8. **Product partner attribution:** Decide whether a product may reference both an NGO and an artisan, and whether the artisan must belong to that NGO.

---

# 6. Open Decisions Before Finalizing the Schema

- Standardize column naming conventions.
- Decide whether guest checkout is supported and whether `Order.userId` or `Cart.userId` can be nullable.
- Decide whether `Review.orderItemId` is mandatory and whether review eligibility requires delivery as well as successful payment.
- Finalize status values for Product, NGO, Cart, Order, Payment, PaymentAttempt, Refund, CorporateGiftingEnquiry, NGOPayout, and NGOPayoutItem.
- Finalize monetary precision and financial formulas for order totals, item totals, refunds, commissions, and payouts.
- Define foreign-key deletion and update behavior. Avoid cascading deletes into orders, payments, refunds, and payout history.
- Decide whether a `ProductArtisan` junction table is needed for collaborative products.
- Define `cart_type` values and whether a user can have multiple carts or only one active cart.
- Confirm the payment gateway's data model before finalizing gateway references and uniqueness rules.

## Recommended next step

Validate all relationships, resolve the outstanding business rules and financial formulas, then finalize PostgreSQL types, enums, nullability, unique indexes, CHECK constraints, foreign-key actions, and Prisma models.

**This document is the working design baseline, not yet the production-ready schema.**