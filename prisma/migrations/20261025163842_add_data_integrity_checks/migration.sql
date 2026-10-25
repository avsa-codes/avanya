-- ============================================================
-- AVANYA: ADDITIONAL DATA INTEGRITY CHECKS
-- ============================================================

-- 1. USER
ALTER TABLE "User"
ADD CONSTRAINT "User_fullName_not_empty"
CHECK (length(trim("fullName")) > 0);


-- 2. PRODUCT
ALTER TABLE "Product"
ADD CONSTRAINT "Product_price_non_negative"
CHECK ("price" >= 0);

ALTER TABLE "Product"
ADD CONSTRAINT "Product_compareAtPrice_non_negative"
CHECK ("compareAtPrice" IS NULL OR "compareAtPrice" >= 0);

ALTER TABLE "Product"
ADD CONSTRAINT "Product_stockQuantity_non_negative"
CHECK ("stockQuantity" >= 0);

ALTER TABLE "Product"
ADD CONSTRAINT "Product_name_not_empty"
CHECK (length(trim("name")) > 0);

ALTER TABLE "Product"
ADD CONSTRAINT "Product_sku_not_empty"
CHECK (length(trim("sku")) > 0);

ALTER TABLE "Product"
ADD CONSTRAINT "Product_slug_not_empty"
CHECK (length(trim("slug")) > 0);


-- 3. PRODUCT IMAGE
ALTER TABLE "ProductImage"
ADD CONSTRAINT "ProductImage_displayOrder_non_negative"
CHECK ("displayOrder" >= 0);

ALTER TABLE "ProductImage"
ADD CONSTRAINT "ProductImage_imageUrl_not_empty"
CHECK (length(trim("imageUrl")) > 0);


-- 4. ARTISAN
ALTER TABLE "Artisan"
ADD CONSTRAINT "Artisan_fullName_not_empty"
CHECK (length(trim("fullName")) > 0);

ALTER TABLE "Artisan"
ADD CONSTRAINT "Artisan_experienceYears_non_negative"
CHECK ("experienceYears" >= 0);


-- 5. NGO
ALTER TABLE "NGO"
ADD CONSTRAINT "NGO_legalName_not_empty"
CHECK (length(trim("legalName")) > 0);

ALTER TABLE "NGO"
ADD CONSTRAINT "NGO_contactEmail_not_empty"
CHECK (length(trim("contactEmail")) > 0);

ALTER TABLE "NGO"
ADD CONSTRAINT "NGO_establishedYear_positive"
CHECK ("establishedYear" IS NULL OR "establishedYear" > 0);

ALTER TABLE "NGO"
ADD CONSTRAINT "NGO_beneficiaryCountAnnual_non_negative"
CHECK (
    "beneficiaryCountAnnual" IS NULL
    OR "beneficiaryCountAnnual" >= 0
);

ALTER TABLE "NGO"
ADD CONSTRAINT "NGO_beneficiaryCountYear_positive"
CHECK (
    "beneficiaryCountYear" IS NULL
    OR "beneficiaryCountYear" > 0
);


-- 6. CART
-- Enforce at most one active cart per user.
CREATE UNIQUE INDEX "Cart_one_active_per_user"
ON "Cart" ("userId")
WHERE "cartType" = 'ACTIVE';


-- 7. CART ITEM
ALTER TABLE "CartItem"
ADD CONSTRAINT "CartItem_quantity_positive"
CHECK ("quantity" > 0);


-- 8. ORDER
ALTER TABLE "Order"
ADD CONSTRAINT "Order_amounts_non_negative"
CHECK (
    "subtotal" >= 0
    AND "discountAmount" >= 0
    AND "shippingAmount" >= 0
    AND "taxAmount" >= 0
    AND "totalAmount" >= 0
);

ALTER TABLE "Order"
ADD CONSTRAINT "Order_shipping_snapshot_not_empty"
CHECK (
    length(trim("shippingFullName")) > 0
    AND length(trim("shippingPhone")) > 0
    AND length(trim("shippingAddressLine1")) > 0
    AND length(trim("shippingCity")) > 0
    AND length(trim("shippingState")) > 0
    AND length(trim("shippingPostalCode")) > 0
    AND length(trim("shippingCountry")) > 0
);


-- 9. ORDER ITEM
ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_quantity_positive"
CHECK ("quantity" > 0);

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_amounts_non_negative"
CHECK (
    "unitPrice" >= 0
    AND "discountAmount" >= 0
    AND "taxAmount" >= 0
    AND "subtotal" >= 0
);

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_discount_within_gross_value"
CHECK ("discountAmount" <= "unitPrice" * "quantity");


-- 10. ADDRESS
ALTER TABLE "Address"
ADD CONSTRAINT "Address_required_text_not_empty"
CHECK (
    length(trim("fullName")) > 0
    AND length(trim("phone")) > 0
    AND length(trim("addressLine1")) > 0
    AND length(trim("city")) > 0
    AND length(trim("state")) > 0
    AND length(trim("postalCode")) > 0
    AND length(trim("country")) > 0
);


-- 11. PAYMENT
ALTER TABLE "Payment"
ADD CONSTRAINT "Payment_amount_positive"
CHECK ("amount" > 0);

ALTER TABLE "Payment"
ADD CONSTRAINT "Payment_currency_not_empty"
CHECK (length(trim("currency")) > 0);

ALTER TABLE "Payment"
ADD CONSTRAINT "Payment_paymentGateway_not_empty"
CHECK (length(trim("paymentGateway")) > 0);


-- 12. PAYMENT ATTEMPT
ALTER TABLE "PaymentAttempt"
ADD CONSTRAINT "PaymentAttempt_failure_fields_not_empty"
CHECK (
    ("failureCode" IS NULL OR length(trim("failureCode")) > 0)
    AND
    ("failureMessage" IS NULL OR length(trim("failureMessage")) > 0)
);

ALTER TABLE "PaymentAttempt"
ADD CONSTRAINT "PaymentAttempt_completedAt_after_attemptedAt"
CHECK (
    "completedAt" IS NULL
    OR "completedAt" >= "attemptedAt"
);


-- 13. CORPORATE GIFTING ENQUIRY
ALTER TABLE "CorporateGiftingEnquiry"
ADD CONSTRAINT "CorporateGiftingEnquiry_required_text_not_empty"
CHECK (
    length(trim("companyName")) > 0
    AND length(trim("contactName")) > 0
    AND length(trim("contactEmail")) > 0
);

ALTER TABLE "CorporateGiftingEnquiry"
ADD CONSTRAINT "CorporateGiftingEnquiry_quantity_positive"
CHECK (
    "quantityRequired" IS NULL
    OR "quantityRequired" > 0
);

ALTER TABLE "CorporateGiftingEnquiry"
ADD CONSTRAINT "CorporateGiftingEnquiry_budget_non_negative"
CHECK ("budget" IS NULL OR "budget" >= 0);


-- 14. REVIEW
ALTER TABLE "Review"
ADD CONSTRAINT "Review_rating_range"
CHECK ("rating" BETWEEN 1 AND 5);

ALTER TABLE "Review"
ADD CONSTRAINT "Review_title_not_empty"
CHECK ("title" IS NULL OR length(trim("title")) > 0);


-- 15. REFUND
ALTER TABLE "Refund"
ADD CONSTRAINT "Refund_amount_positive"
CHECK ("amount" > 0);

ALTER TABLE "Refund"
ADD CONSTRAINT "Refund_reason_not_empty"
CHECK (length(trim("reason")) > 0);

ALTER TABLE "Refund"
ADD CONSTRAINT "Refund_processedAt_after_requestedAt"
CHECK (
    "processedAt" IS NULL
    OR "processedAt" >= "requestedAt"
);


-- 16. NGO PAYOUT
ALTER TABLE "NGOPayout"
ADD CONSTRAINT "NGOPayout_period_valid"
CHECK ("periodEnd" >= "periodStart");

ALTER TABLE "NGOPayout"
ADD CONSTRAINT "NGOPayout_amounts_non_negative"
CHECK (
    "grossSalesAmount" >= 0
    AND "commissionAmount" >= 0
    AND "refundAdjustmentAmount" >= 0
    AND "otherAdjustmentAmount" >= 0
    AND "netPayoutAmount" >= 0
);


-- 17. NGO PAYOUT ITEM
ALTER TABLE "NGOPayoutItem"
ADD CONSTRAINT "NGOPayoutItem_amount_non_negative"
CHECK ("amount" >= 0);

ALTER TABLE "NGOPayoutItem"
ADD CONSTRAINT "NGOPayoutItem_description_not_empty"
CHECK (
    "description" IS NULL
    OR length(trim("description")) > 0
);

ALTER TABLE "NGOPayoutItem"
ADD CONSTRAINT "NGOPayoutItem_entry_references_valid"
CHECK (
    (
        "entryType" = 'SALE'
        AND "orderItemId" IS NOT NULL
        AND "refundId" IS NULL
    )
    OR
    (
        "entryType" = 'REFUND'
        AND "refundId" IS NOT NULL
        AND "orderItemId" IS NULL
    )
    OR
    (
        "entryType" = 'COMMISSION'
        AND "refundId" IS NULL
    )
    OR
    (
        "entryType" = 'ADJUSTMENT'
    )
);