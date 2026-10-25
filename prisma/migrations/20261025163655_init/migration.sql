-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'OUT_OF_STOCK', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "NGOStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CartType" AS ENUM ('ACTIVE', 'ABANDONED', 'CONVERTED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'WORK', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('UPI', 'CARD', 'NET_BANKING', 'WALLET');

-- CreateEnum
CREATE TYPE "PaymentAttemptStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "GiftingEnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'QUOTATION_SENT', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('REQUESTED', 'APPROVED', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NGOPayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PayoutEntryType" AS ENUM ('SALE', 'REFUND', 'COMMISSION', 'ADJUSTMENT');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "profileImage" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "authProvider" "AuthProvider" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "sku" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "attributes" JSONB,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "compareAtPrice" DECIMAL(10,2),
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "artisanId" UUID,
    "ngoId" UUID,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" UUID NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" UUID NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artisan" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "profileImage" TEXT,
    "experienceYears" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT,
    "bio" TEXT,
    "skills" TEXT[],
    "beneficiaryStatusTags" TEXT[],
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "ngoId" UUID,

    CONSTRAINT "Artisan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NGO" (
    "id" UUID NOT NULL,
    "legalName" TEXT NOT NULL,
    "brandName" TEXT,
    "logoUrl" TEXT,
    "complianceDocumentUrl" TEXT,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "headquartersAddress" TEXT,
    "description" TEXT,
    "establishedYear" INTEGER,
    "accountStatus" "NGOStatus" NOT NULL DEFAULT 'PENDING',
    "beneficiaryCountAnnual" INTEGER,
    "beneficiaryCountYear" INTEGER,
    "primaryCause" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "NGO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL,
    "cartType" "CartType" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "productId" UUID NOT NULL,
    "cartId" UUID NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discountAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "shippingAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "userId" UUID NOT NULL,
    "addressId" UUID NOT NULL,
    "shippingFullName" TEXT NOT NULL,
    "shippingPhone" TEXT NOT NULL,
    "shippingAddressLine1" TEXT NOT NULL,
    "shippingAddressLine2" TEXT,
    "shippingCity" TEXT NOT NULL,
    "shippingState" TEXT NOT NULL,
    "shippingPostalCode" TEXT NOT NULL,
    "shippingCountry" TEXT NOT NULL DEFAULT 'India',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "discountAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" UUID NOT NULL,
    "ngoId" UUID,
    "artisanId" UUID,
    "orderId" UUID NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "addressType" "AddressType" NOT NULL DEFAULT 'HOME',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "paymentGateway" TEXT NOT NULL,
    "gatewayOrderId" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMPTZ(3),
    "orderId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentAttempt" (
    "id" UUID NOT NULL,
    "gatewayTransactionId" TEXT,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "status" "PaymentAttemptStatus" NOT NULL DEFAULT 'PENDING',
    "failureCode" TEXT,
    "failureMessage" TEXT,
    "attemptedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMPTZ(3),
    "paymentId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PaymentAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorporateGiftingEnquiry" (
    "id" UUID NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "quantityRequired" INTEGER,
    "budget" DECIMAL(10,2),
    "occasion" TEXT,
    "requirements" TEXT,
    "preferredDeliveryDate" TIMESTAMPTZ(3),
    "status" "GiftingEnquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "CorporateGiftingEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "orderItemId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "RefundStatus" NOT NULL DEFAULT 'REQUESTED',
    "gatewayRefundId" TEXT,
    "requestedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMPTZ(3),
    "orderId" UUID NOT NULL,
    "paymentId" UUID NOT NULL,
    "orderItemId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NGOPayout" (
    "id" UUID NOT NULL,
    "payoutReference" TEXT NOT NULL,
    "periodStart" TIMESTAMPTZ(3) NOT NULL,
    "periodEnd" TIMESTAMPTZ(3) NOT NULL,
    "grossSalesAmount" DECIMAL(10,2) NOT NULL,
    "commissionAmount" DECIMAL(10,2) NOT NULL,
    "refundAdjustmentAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "otherAdjustmentAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "netPayoutAmount" DECIMAL(10,2) NOT NULL,
    "status" "NGOPayoutStatus" NOT NULL DEFAULT 'PENDING',
    "paymentReference" TEXT,
    "paidAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "ngoId" UUID NOT NULL,

    CONSTRAINT "NGOPayout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NGOPayoutItem" (
    "id" UUID NOT NULL,
    "entryType" "PayoutEntryType" NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ngoPayoutId" UUID NOT NULL,
    "orderItemId" UUID,
    "refundId" UUID,

    CONSTRAINT "NGOPayoutItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_status_idx" ON "Product"("status");

-- CreateIndex
CREATE INDEX "Product_artisanId_idx" ON "Product"("artisanId");

-- CreateIndex
CREATE INDEX "Product_isFeatured_status_idx" ON "Product"("isFeatured", "status");

-- CreateIndex
CREATE INDEX "Product_ngoId_idx" ON "Product"("ngoId");

-- CreateIndex
CREATE INDEX "ProductImage_productId_displayOrder_idx" ON "ProductImage"("productId", "displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_productId_key" ON "ProductImage"("productId") WHERE ("isPrimary" = true);

-- CreateIndex
CREATE INDEX "Artisan_ngoId_idx" ON "Artisan"("ngoId");

-- CreateIndex
CREATE INDEX "Cart_userId_cartType_idx" ON "Cart"("userId", "cartType");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "CartItem"("cartId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_userId_createdAt_idx" ON "Order"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "Order"("status", "createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "Address_userId_idx" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId") WHERE ("isDefault" = true);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_gatewayOrderId_key" ON "Payment"("gatewayOrderId");

-- CreateIndex
CREATE INDEX "Payment_orderId_idx" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAttempt_gatewayTransactionId_key" ON "PaymentAttempt"("gatewayTransactionId");

-- CreateIndex
CREATE INDEX "PaymentAttempt_paymentId_attemptedAt_idx" ON "PaymentAttempt"("paymentId", "attemptedAt");

-- CreateIndex
CREATE INDEX "Review_productId_createdAt_idx" ON "Review"("productId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_productId_key" ON "Review"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_gatewayRefundId_key" ON "Refund"("gatewayRefundId");

-- CreateIndex
CREATE INDEX "Refund_orderId_idx" ON "Refund"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "NGOPayout_payoutReference_key" ON "NGOPayout"("payoutReference");

-- CreateIndex
CREATE INDEX "NGOPayout_ngoId_createdAt_idx" ON "NGOPayout"("ngoId", "createdAt");

-- CreateIndex
CREATE INDEX "NGOPayoutItem_ngoPayoutId_idx" ON "NGOPayoutItem"("ngoPayoutId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "Artisan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "Artisan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentAttempt" ADD CONSTRAINT "PaymentAttempt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NGOPayout" ADD CONSTRAINT "NGOPayout_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NGOPayoutItem" ADD CONSTRAINT "NGOPayoutItem_ngoPayoutId_fkey" FOREIGN KEY ("ngoPayoutId") REFERENCES "NGOPayout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NGOPayoutItem" ADD CONSTRAINT "NGOPayoutItem_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NGOPayoutItem" ADD CONSTRAINT "NGOPayoutItem_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "Refund"("id") ON DELETE SET NULL ON UPDATE CASCADE;
