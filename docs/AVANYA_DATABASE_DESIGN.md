# Avanya — Database Design

## 1. Logical Design

### Entities

#### User

Represents a registered customer on the Avanya platform.

Stores:

- Account information
- Personal and profile information
- Authentication details
- Email verification status
- Account status
- Account creation and update timestamps

#### Product

Represents a product available for purchase on the Avanya marketplace.

Stores:

- Product name and description
- Pricing information
- Inventory quantity
- Product identification and URL information
- Product-specific attributes
- Publication and availability status
- Featured product status
- SEO metadata
- Association with an artisan, an NGO, both, or neither

Products may be associated with an artisan, an NGO, both, or neither. Products without either association represent products sourced and sold directly by Avanya.

#### ProductImage

Represents an image associated with a product.

Stores:

- Image URL or storage path
- Alternative text
- Image display order
- Primary image status
- Image record creation timestamp

Image files are stored in an external storage service. The database stores their URLs or storage paths rather than the image files themselves.

#### Artisan

Represents an artisan whose products are featured on the Avanya marketplace.

Stores:

- Artisan identity and profile information
- Personal or professional background
- Craft and specialization information
- Profile image
- Location and contact information, where applicable
- Profile status
- Profile creation and update timestamps

An artisan may be associated with multiple products. An artisan's displayed rating is derived from reviews of associated products rather than stored as an independent rating.

#### NGO

Represents a non-governmental organization associated with products or social-impact initiatives on Avanya.

Stores:

- Organization name and profile information
- Mission and social-impact information
- Logo or profile image
- Location and contact information, where applicable
- Organization status
- Profile creation and update timestamps

An NGO may be associated with multiple products. An NGO's displayed rating is derived from reviews of associated products rather than stored as an independent rating.

#### Cart

Represents a customer's shopping cart.

Stores:

- Cart identification
- Cart ownership
- Cart creation and update timestamps

A cart groups the products a customer intends to purchase. The individual products and their quantities are stored in CartItem records.

#### CartItem

Represents an individual product entry in a shopping cart.

Stores:

- Cart reference
- Product reference
- Quantity selected
- Record creation and update timestamps

Each CartItem identifies a product and the quantity the customer intends to purchase.

#### Order

Represents a customer's order placed on Avanya.

Stores:

- Order identification
- Customer reference
- Order status
- Order total and pricing summary
- Delivery address or delivery-address snapshot
- Order placement timestamp
- Order update timestamp

An order groups the products purchased in a single checkout. OrderItem records store the individual products and their purchase details.

#### OrderItem

Represents an individual product included in an order.

Stores:

- Order reference
- Product reference
- Quantity purchased
- Price at the time of purchase
- Purchase subtotal

OrderItem preserves the product's purchase-time details so that later product price changes do not alter historical order records.

#### Address

Represents a customer's saved delivery address.

Stores:

- Address ownership
- Recipient name and contact information
- Address lines
- City, state, postal code, and country
- Default-address status
- Address creation and update timestamps

A customer may save multiple addresses and select one for delivery during checkout.

#### Payment

Represents a payment attempt or payment record associated with an order.

Stores:

- Order reference
- Payment amount and currency
- Payment method
- Payment status
- Payment gateway reference
- Transaction identifiers
- Payment creation and update timestamps

Payment records track the outcome of payment processing. Payment status and transaction details may be updated as the payment gateway reports changes.

#### CorporateGiftingEnquiry

Represents an enquiry submitted by a business or organization interested in corporate gifting through Avanya.

Stores:

- Contact person information
- Company or organization information
- Contact details
- Estimated quantity and budget
- Gifting requirements
- Enquiry status
- Enquiry creation and update timestamps

Corporate gifting enquiries allow Avanya to manage business requests separately from ordinary customer orders.

#### Review

Represents a product review submitted by a customer.

Stores:

- Customer reference
- Product reference
- Rating value
- Optional review title and written feedback
- Review creation and update timestamps

Reviews are associated directly with products. Product ratings are calculated from their reviews, while artisan and NGO ratings are derived from reviews of products associated with them. No independent artisan or NGO reviews are planned in the initial design.

---

## 2. Physical Design

### User

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique user identifier | PK |
| `fullName` | User's full name | |
| `email` | User's email address | Unique |
| `phone` | User's phone number | |
| `passwordHash` | Securely hashed password | |
| `gender` | User's gender, if collected | Nullable |
| `profileImage` | Profile image URL or storage path | Nullable |
| `isEmailVerified` | Email verification status | |
| `isDeleted` | Soft-delete status | |
| `authProvider` | Authentication provider or method | |
| `createdAt` | Account creation timestamp | |
| `updatedAt` | Last account update timestamp | |

### Product

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique product identifier | PK |
| `name` | Product name | |
| `description` | Detailed product description | |
| `price` | Current selling price | |
| `sku` | Stock Keeping Unit for inventory identification | Unique |
| `slug` | URL-friendly product identifier | Unique |
| `stock_quantity` | Available inventory quantity | |
| `status` | Product publication or availability status | |
| `attributes` | Flexible product-specific information stored as JSONB | Nullable |
| `createdAt` | Product creation timestamp | |
| `updatedAt` | Last product update timestamp | |
| `compareAtPrice` | Reference price used to display a discount | Nullable |
| `isFeatured` | Whether the product is featured | |
| `metaTitle` | SEO title for the product page | Nullable |
| `metaDescription` | SEO description for search engines | Nullable |
| `artisan_id` | Optional artisan associated with the product | FK → Artisan.id; Nullable |
| `ngo_id` | Optional NGO associated with the product | FK → NGO.id; Nullable |

### ProductImage

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique product image record identifier | PK |
| `imageUrl` | Image URL or storage path | |
| `altText` | Alternative text for accessibility and SEO | Nullable |
| `displayOrder` | Position of the image in the product gallery | |
| `isPrimary` | Whether the image is the product's primary image | |
| `createdAt` | Image record creation timestamp | |
| `product_id` | Product to which the image belongs | FK → Product.id |

---

### Artisan

Represents an artisan whose products are featured on the Avanya marketplace.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique artisan identifier | PK |
| `fullName` | Artisan's full name | |
| `email` | Artisan's email address | Nullable |
| `phone` | Artisan's phone number | Nullable |
| `profileImage` | Artisan's profile image URL or storage path | Nullable |
| `experienceYears` | Number of years of experience in the artisan's craft | |
| `location` | Artisan's location | |
| `bio` | Artisan's background, story, and craft description | Nullable |
| `skills` | Artisan's craft skills and specializations | |
| `ngoId` | Optional NGO associated with the artisan | FK → NGO.id; Nullable |
| `beneficiaryStatusTags` | Tags describing relevant beneficiary categories or statuses | |
| `createdAt` | Record creation timestamp | |
| `updatedAt` | Last record update timestamp | |

**Design Notes**

- `ngoId` is nullable because an artisan may work independently without being associated with an NGO.
- `skills` stores the artisan's craft skills and specializations. Its final data type will be determined during physical schema implementation.
- `beneficiaryStatusTags` stores relevant beneficiary categories or statuses associated with the artisan.
- The artisan's average rating will be derived from reviews of products associated with that artisan. No separate rating field is stored in this table.
- Earnings and payouts will be handled through appropriate financial records rather than storing a manually maintained total in the artisan profile.
- `createdAt` and `updatedAt` appear only once each in this table.


### NGO

Represents a non-governmental organization that partners with Avanya to offer products, support artisans, and communicate its social mission.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique NGO identifier | PK |
| `legalName` | Official registered name of the NGO | |
| `brandName` | Public-facing name displayed on Avanya | |
| `logoUrl` | NGO logo URL or storage path | Nullable |
| `complianceDocumentUrl` | URL or storage path for relevant compliance documents | Nullable |
| `contactEmail` | NGO's primary contact email address | |
| `contactPhone` | NGO's contact phone number | Nullable |
| `headquartersAddress` | NGO's headquarters address | |
| `description` | NGO's mission, background, activities, and social impact | |
| `establishedYear` | Year the NGO was established | |
| `accountStatus` | Current status of the NGO's account on Avanya | |
| `beneficiaryCountAnnual` | Number of beneficiaries reported for a particular year | |
| `beneficiaryCountYear` | Year to which the annual beneficiary count applies | |
| `primaryCause` | Main social or environmental cause supported by the NGO | |
| `createdAt` | Record creation timestamp | |
| `updatedAt` | Last record update timestamp | |

**Design Notes**
- `logoUrl` allows Avanya to display the NGO's branding on its profile and product pages.
- `complianceDocumentUrl` stores a reference to a relevant document; the actual file should be stored in secure file storage with appropriate access controls.
- `beneficiaryCountAnnual` and `beneficiaryCountYear` work together so that the reported beneficiary count has a clear reporting period.
- `primaryCause` represents the NGO's main cause. Its final data type and permitted values will be decided during schema implementation.
- `accountStatus` can represent states such as pending verification, active, suspended, or inactive. The final allowed values will be defined during schema implementation.
- The total number of artisans associated with an NGO will be derived by counting matching Artisan records rather than stored as a separate field.
- NGO ratings, if displayed, will be calculated from reviews of products associated with that NGO rather than stored as a manually maintained rating.
- The table does not yet include payout gateway identifiers or commission rates. Those decisions depend on Avanya's payment provider and commercial agreements.
- `createdAt` and `updatedAt` appear only once each.


### Cart

Represents a user's shopping cart, which stores products they intend to purchase.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique cart identifier | PK |
| `userId` | User who owns the cart | FK → User.id |
| `cart_type` | Type or category of cart | |
| `createdAt` | Cart creation timestamp | |
| `updatedAt` | Last cart update timestamp | |

**Design Notes**
- A cart belongs to a user and can contain multiple CartItems.
- `cart_type` allows different types of carts to be distinguished if required. Its final permitted values and data type will be decided during schema implementation.
- The cart total will be calculated from the prices and quantities of its items rather than stored as a separate field.
- `createdAt` and `updatedAt` appear only once each.

### CartItem

Represents an individual product added to a shopping cart, including the quantity the user intends to purchase.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique cart item identifier | PK |
| `cartId` | Cart to which the item belongs | FK → Cart.id |
| `productId` | Product added to the cart | FK → Product.id |
| `quantity` | Number of units of the product in the cart | |
| `createdAt` | Timestamp when the item was added to the cart | |
| `updatedAt` | Timestamp when the cart item was last updated | |

**Design Notes**
- Each CartItem belongs to one Cart and references one Product.
- A cart can contain multiple CartItems, including products associated with different NGOs or artisans.
- Adding the same product to the same cart should normally increase its quantity rather than create a duplicate item.
- The product's current price can be retrieved from the Product table for cart display. The final price charged for each item must be recorded in OrderItem when the order is placed.
- The cart total will be calculated from the current prices and quantities of its items.
- `createdAt` and `updatedAt` appear only once each.



### Order

Represents a customer's checkout and records the overall order details, delivery address reference, financial totals, and order status.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique internal order identifier | PK |
| `orderNumber` | Customer-facing order reference | Unique |
| `userId` | User who placed the order | FK → User.id |
| `addressId` | Delivery address associated with the order | FK → Address.id |
| `status` | Overall order status, such as pending, confirmed, processing, shipped, delivered, or cancelled | Controlled values |
| `subtotal` | Total price of items before order-level charges and discounts | |
| `discountAmount` | Total discount applied to the order | |
| `shippingAmount` | Shipping charge collected from the customer | |
| `taxAmount` | Tax amount recorded for the order according to the applicable invoicing model | |
| `totalAmount` | Final amount payable by the customer | |
| `createdAt` | Timestamp when the order was created | |
| `updatedAt` | Timestamp when the order was last updated | |

**Design Notes**
- `id` is the internal database identifier, while `orderNumber` is the customer-facing reference used in order history and customer support.
- A single order may contain products from multiple NGOs or artisans. Partner attribution will be recorded at the OrderItem level rather than directly on the Order table.
- Order financial amounts preserve the values applicable at checkout, so historical orders are not recalculated using current product prices.
- `addressId` references the delivery address associated with the order. The final schema must preserve the delivery address as it was at checkout, even if the user later updates their saved address.
- Order status and payment status are separate concepts. Payment transactions and their statuses will be tracked in the Payment table.
- Refunds and NGO payouts will be recorded through their respective tables and associated financial records.
- If an order contains products shipped separately by different NGOs, shipment-level tracking may be handled through a separate Shipment table if required.
- `createdAt` and `updatedAt` appear only once each.


### OrderItem

Represents an individual product purchased within an order, recording the product details, quantity, price, and associated NGO or artisan for sales tracking and payout calculations.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique order item identifier | PK |
| `orderId` | Order to which the item belongs | FK → Order.id |
| `productId` | Product purchased | FK → Product.id |
| `ngoId` | NGO associated with the product at the time of purchase, if applicable | FK → NGO.id; Nullable |
| `artisanId` | Artisan associated with the product at the time of purchase, if applicable | FK → Artisan.id; Nullable |
| `productName` | Product name recorded at the time of purchase | |
| `quantity` | Number of units purchased | |
| `unitPrice` | Price per unit at the time of purchase | |
| `discountAmount` | Discount allocated to this order item | |
| `taxAmount` | Tax amount applicable to this order item | |
| `subtotal` | Total price for the item's quantity before item-level discounts and taxes | |
| `createdAt` | Timestamp when the order item was created | |

**Design Notes**
- Each OrderItem belongs to one Order and references one Product.
- An order can contain multiple OrderItems, including products associated with different NGOs or artisans.
- `productName` and `unitPrice` preserve key product details at the time of purchase, even if the product listing or price changes later.
- `ngoId` and `artisanId` preserve the relevant partner attribution at the time of purchase. They are nullable because some products may be sourced directly by Avanya or may not have a particular partner association.
- These partner references support sales reporting and help calculate the amounts owed to each NGO or artisan. The final payout calculation will also account for commissions, refunds, and applicable adjustments.
- `discountAmount`, `taxAmount`, and `subtotal` allow item-level financial calculations to be recorded consistently. Their exact calculation rules will be defined during schema implementation.
- The final order total is calculated using the order's item amounts and applicable order-level charges or adjustments.
- `createdAt` records when the order item was created. An `updatedAt` field is not necessary if order items are treated as immutable purchase records after checkout.


### Address

Represents a user's saved delivery address, which can be selected when placing an order.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique address identifier | PK |
| `userId` | User who owns the address | FK → User.id |
| `fullName` | Name of the recipient | |
| `phone` | Recipient's contact number | |
| `addressLine1` | Primary street address, building, or house details | |
| `addressLine2` | Additional address details | Nullable |
| `city` | City of the delivery address | |
| `state` | State or union territory | |
| `postalCode` | Postal PIN code | |
| `country` | Country of the delivery address | |
| `addressType` | Address category, such as home or work | |
| `isDefault` | Whether this is the user's default delivery address | |
| `createdAt` | Address creation timestamp | |
| `updatedAt` | Last address update timestamp | |

**Design Notes**
- Each Address belongs to one User, and a user can save multiple addresses.
- `addressLine2` is nullable because additional address details may not be required.
- `isDefault` identifies the user's preferred delivery address. The application should ensure that a user has at most one default address at a time.
- Orders must preserve the delivery address as it was at checkout, even if the user later edits or deletes the saved address. The final schema will determine how this snapshot is stored.
- `createdAt` and `updatedAt` appear only once each.

### Payment

Represents a payment transaction associated with an order, including its amount, payment method, gateway reference, and status.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique payment record identifier | PK |
| `orderId` | Order associated with the payment | FK → Order.id |
| `amount` | Amount associated with the payment transaction | |
| `currency` | Currency used for the transaction, such as INR | |
| `paymentMethod` | Payment method, such as UPI, card, or net banking | |
| `paymentGateway` | Payment provider that processes the transaction | |
| `gatewayTransactionId` | Transaction reference returned by the payment provider | Nullable; uniqueness to be finalised |
| `status` | Payment status, such as pending, successful, failed, or refunded | Controlled values |
| `paidAt` | Timestamp when payment was confirmed successful | Nullable |
| `createdAt` | Payment record creation timestamp | |
| `updatedAt` | Last payment record update timestamp | |

**Design Notes**
- A Payment belongs to an Order. The design should support payment attempts and retries without overwriting historical transactions.
- `gatewayTransactionId` stores the provider's reference for reconciliation and support.
- Payment status and order status are separate. A successful payment does not necessarily mean that an order has been delivered.
- Refunds will be recorded in the separate Refund table rather than relying only on a payment status.
- The payment record does not itself represent the amount owed to an NGO. Partner settlements will be tracked through NGOPayout and NGOPayoutItem.
- The payment gateway and settlement arrangement must support Avanya's actual marketplace model and applicable requirements.
- `createdAt` and `updatedAt` appear only once each.

### CorporateGiftingEnquiry

Represents an enquiry from a business or organization interested in purchasing products in bulk or arranging customised corporate gifts through Avanya.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique corporate gifting enquiry identifier | PK |
| `companyName` | Name of the enquiring company or organization | |
| `contactName` | Name of the primary contact person | |
| `contactEmail` | Email address for communication | |
| `contactPhone` | Contact phone number | |
| `quantityRequired` | Approximate number of gifts or product units requested | Nullable |
| `budget` | Estimated budget for the gifting requirement | Nullable |
| `occasion` | Occasion or purpose of the corporate gifting request | Nullable |
| `requirements` | Description of product preferences, customisation, packaging, or other needs | Nullable |
| `preferredDeliveryDate` | Requested delivery date, if specified | Nullable |
| `status` | Current enquiry status, such as new, contacted, quoted, confirmed, or closed | Controlled values |
| `createdAt` | Enquiry submission timestamp | |
| `updatedAt` | Last enquiry update timestamp | |

**Design Notes**
- This table records enquiries rather than confirmed sales orders.
- `quantityRequired`, `budget`, `occasion`, `requirements`, and `preferredDeliveryDate` are nullable because an enquiry may not include all details initially.
- The status field helps Avanya manage enquiries from initial contact through quotation and confirmation.
- If an enquiry becomes a confirmed purchase, the resulting transaction should be represented through the order workflow rather than treating the enquiry itself as an order.
- `createdAt` and `updatedAt` appear only once each.

### Review

Represents a customer's review of a product purchased or experienced through Avanya, including a rating and optional written feedback.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique review identifier | PK |
| `userId` | User who submitted the review | FK → User.id |
| `productId` | Product being reviewed | FK → Product.id |
| `orderItemId` | Related order item, when verifying a purchase | FK → OrderItem.id; Nullable |
| `rating` | Numerical product rating, typically from 1 to 5 | Range constraint to be defined |
| `title` | Short review heading | Nullable |
| `comment` | Written review or feedback | Nullable |
| `createdAt` | Review creation timestamp | |
| `updatedAt` | Last review update timestamp | |

**Design Notes**
- Each Review belongs to one User and one Product.
- A product can have multiple reviews from different users.
- `orderItemId` can help establish whether the reviewer purchased the product through Avanya. The verified-purchase policy will be decided later.
- A uniqueness constraint may be added to prevent a user from submitting multiple reviews for the same product, depending on the review policy.
- Product ratings can be calculated from review ratings rather than stored separately in the Product table.
- Artisan and NGO ratings, if displayed, will be derived from reviews of products associated with those partners. They will not be stored as manually maintained rating fields.
- `createdAt` and `updatedAt` appear only once each.

### Refund

Represents a refund request or refund transaction associated with an order and, where applicable, a particular order item.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique refund record identifier | PK |
| `orderId` | Order associated with the refund | FK → Order.id |
| `orderItemId` | Specific order item being refunded, when applicable | FK → OrderItem.id; Nullable |
| `paymentId` | Payment transaction associated with the refund | FK → Payment.id |
| `amount` | Amount requested or processed for the refund | |
| `reason` | Reason for the refund, such as damaged product, incorrect item, or cancellation | |
| `status` | Refund status, such as requested, approved, processing, successful, or failed | Controlled values |
| `gatewayRefundId` | Refund reference returned by the payment provider | Nullable |
| `requestedAt` | Timestamp when the refund was requested | |
| `processedAt` | Timestamp when the refund was completed or failed | Nullable |
| `createdAt` | Refund record creation timestamp | |
| `updatedAt` | Last refund record update timestamp | |

**Design Notes**
- A Refund belongs to an Order and is associated with the relevant Payment transaction.
- `orderItemId` supports item-level refunds when only part of an order is being refunded. A whole-order refund may not need a specific order item.
- Multiple refund records may be required for an order if separate items or partial amounts are refunded.
- `gatewayRefundId` stores the payment provider's refund reference when available.
- Refund amounts must be reconciled against the original payment and any earlier refunds to prevent over-refunding.
- If an NGO has already been paid for the refunded sale, the resulting financial adjustment must be reflected in the payout records.
- `createdAt` and `updatedAt` appear only once each.

### NGOPayout

Represents a settlement or payout record for money payable to an NGO for eligible sales, after commissions, refunds, and applicable adjustments.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique NGO payout identifier | PK |
| `ngoId` | NGO receiving the payout | FK → NGO.id |
| `payoutReference` | Unique internal payout reference | Unique |
| `periodStart` | Start date of the sales or settlement period covered | |
| `periodEnd` | End date of the sales or settlement period covered | |
| `grossSalesAmount` | Total eligible sales included before deductions | |
| `commissionAmount` | Avanya commission deducted from eligible sales | |
| `refundAdjustmentAmount` | Refund-related deductions or adjustments included in the payout calculation | |
| `otherAdjustmentAmount` | Other agreed deductions or credits | |
| `netPayoutAmount` | Final amount payable to the NGO | |
| `status` | Payout status, such as pending, processing, paid, or failed | Controlled values |
| `paymentReference` | Bank transfer or payment provider reference for the payout | Nullable |
| `paidAt` | Timestamp when the payout was confirmed completed | Nullable |
| `createdAt` | Payout record creation timestamp | |
| `updatedAt` | Last payout record update timestamp | |

**Design Notes**
- Each NGOPayout belongs to one NGO. An NGO may receive multiple payouts over time.
- The payout period defines the settlement window covered by the record.
- `grossSalesAmount`, `commissionAmount`, refund adjustments, other adjustments, and `netPayoutAmount` provide a summary of the settlement calculation.
- The detailed entries supporting these amounts will be recorded through NGOPayoutItem.
- The net payout should be calculated consistently from the included sales and adjustments, rather than manually entered without supporting records.
- `paymentReference` and `paidAt` are nullable until a payout is completed.
- The payout schedule and eligibility rules must be agreed with partners and supported by the selected payment arrangement.
- `createdAt` and `updatedAt` appear only once each.

### NGOPayoutItem

Represents an individual financial entry included in an NGO payout, linking the settlement calculation to its underlying sale, refund, or adjustment.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique payout item identifier | PK |
| `payoutId` | Payout to which this entry belongs | FK → NGOPayout.id |
| `orderItemId` | Order item associated with a sale or sale-related adjustment, when applicable | FK → OrderItem.id; Nullable |
| `refundId` | Refund associated with a refund-related adjustment, when applicable | FK → Refund.id; Nullable |
| `entryType` | Type of financial entry, such as sale, commission, refund adjustment, or other adjustment | Controlled values |
| `description` | Explanation of the financial entry | Nullable |
| `amount` | Amount contributed by this entry to the payout calculation, using an agreed sign convention | |
| `createdAt` | Payout item creation timestamp | |

**Design Notes**
- Each NGOPayoutItem belongs to one NGOPayout.
- A payout can contain multiple entries, allowing Avanya to trace the settlement back to individual sales and adjustments.
- `orderItemId` links sale-related entries to the relevant product purchase. `refundId` links refund-related entries to their corresponding refund record.
- These references are nullable because not every entry will relate to both an order item and a refund.
- `entryType` identifies how an entry affects the settlement. Its permitted values and sign convention will be defined during schema implementation.
- Other adjustments, such as an agreed credit or debit, can be recorded without creating a new field for every adjustment category.
- The application should prevent the same financial entry from being included in multiple payouts unintentionally.
- `createdAt` records when the payout item was created. The item should generally be treated as an immutable settlement record once its payout is finalised.



### PaymentAttempt

**Purpose:** Stores individual attempts to complete a payment operation, including successful, failed, and pending attempts. This preserves the payment-attempt history without mixing it with the overall status of the payment.

| Field | Purpose | Key / Constraint |
|---|---|---|
| `id` | Unique identifier for the payment attempt | Primary Key (PK) |
| `paymentId` | Identifies the parent payment operation | Foreign Key (FK) → `Payment.id`, NOT NULL |
| `gatewayTransactionId` | Stores the payment gateway's transaction or attempt reference, when available | Nullable; unique within the relevant gateway scope where applicable |
| `paymentMethod` | Records the payment method used for the attempt, such as UPI, card, or net banking | NOT NULL; controlled values |
| `status` | Records the outcome of the attempt, such as pending, failed, or successful | NOT NULL; controlled values |
| `failureCode` | Stores the gateway's machine-readable failure code, when available | Nullable |
| `failureMessage` | Stores a sanitized explanation of the failure, when available | Nullable |
| `attemptedAt` | Records when the payment attempt began | NOT NULL |
| `completedAt` | Records when the attempt reached a final outcome, when applicable | Nullable |
| `createdAt` | Records when the attempt record was created | NOT NULL |
| `updatedAt` | Records when the attempt record was last updated | NOT NULL |

**Relationship:** `Payment` → `PaymentAttempt` is one-to-many (1:N). One payment operation can have multiple attempts, while each attempt belongs to exactly one payment operation.

**Design note:** Gateway references and failure details must reflect the provider's actual response structure. A missing gateway reference may be valid when an attempt fails before the gateway creates one. Payment outcomes must be verified server-side, and duplicate gateway events must be handled idempotently.


*Note: The field lists above document our current design decisions, not the final Prisma schema. We will finalize data types, defaults, nullability, constraints, and relationship details during the subsequent design and implementation stages.*