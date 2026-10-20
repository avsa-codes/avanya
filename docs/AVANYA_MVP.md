# Avanya --- MVP Product & Technical Specification

**Project:** Avanya\
**Document:** MVP source of truth\
**Version:** 1.0\
**Date:** 7 October 2026\
**Status:** Working specification

------------------------------------------------------------------------

# 1. Product Overview

## 1.1 What is Avanya?

Avanya is a **story-driven e-commerce marketplace** where customers can
discover and purchase products associated with NGOs, artisans, and
meaningful social impact.

The central idea is:

> **Every product has a story.**

Avanya combines a normal, trustworthy shopping experience with
storytelling around the people, organizations, craft, process, origin,
and impact behind products.

The product must feel like a **real premium e-commerce business**, not a
cultural-learning website, NFT marketplace, game, or generic NGO
directory.

## 1.2 Core value proposition

Customers can:

-   Discover products through a conventional marketplace.
-   Discover products through a unique Tinder-style **Swipe Mode**.
-   Learn the story behind products.
-   Discover NGOs and artisans.
-   Save products to a wishlist.
-   Add products to a cart.
-   Purchase products online.
-   Use COD where eligible.
-   View order history and status.
-   View shipment/tracking information when available.
-   Read stories about products, artisans, NGOs, and impact.
-   Request curated corporate gifting solutions.

## 1.3 Brand and visual direction

The previous prototype provides the visual starting point for Avanya.

Carry forward the visual language:

-   Warm cream/off-white backgrounds.
-   Deep earthy red as primary accent.
-   Dark serif display typography.
-   Clean sans-serif UI/body typography.
-   Thin neutral borders.
-   Subtle shadows.
-   Restrained rounded corners.
-   Premium editorial/product-photography feel.
-   Human and warm rather than overly corporate.

The new application is a **fresh codebase**. The old project is a
UI/design reference, not a technical foundation to copy wholesale.

------------------------------------------------------------------------

# 2. Product Strategy

## 2.1 Primary business

Avanya is primarily an **e-commerce marketplace/storefront**.

Shopping must remain straightforward:

1.  Discover a product.
2.  Understand the product.
3.  Understand its story.
4.  Add it to cart.
5.  Checkout.
6.  Pay online or use COD where eligible.
7.  Receive the order.
8.  Track the order where tracking is available.

Storytelling differentiates Avanya; it should not make normal shopping
complicated.

## 2.2 Three product pillars

### Marketplace

A conventional shopping experience with:

-   Search.
-   Categories.
-   Filters.
-   Sorting.
-   Product cards.
-   Wishlist.
-   Cart.
-   Checkout.

### Stories

Every suitable product can carry context about:

-   The product.
-   Its maker.
-   Its NGO/organization.
-   Its craft/process.
-   Its origin.
-   Its impact.

Short videos can be included when available.

### Discovery

Swipe Mode gives Avanya a memorable discovery experience:

-   Swipe right = interested/save.
-   Swipe left = pass.
-   Tap = product details/story.
-   Add to cart from discovery.

## 2.3 Corporate gifting

Corporate gifting is an important potential early B2B revenue channel.

Avanya can offer:

-   Curated gift collections.
-   Bulk orders.
-   Budget-based options.
-   Customization where possible.
-   Social-impact-oriented gifting.
-   Delivery coordination.

The MVP should use an inquiry/quotation workflow rather than attempting
to automate complex corporate purchasing.

------------------------------------------------------------------------

# 3. MVP Goals

The MVP must prove that Avanya can:

1.  Present products professionally.
2.  Let customers discover products normally.
3.  Let customers discover products through Swipe Mode.
4.  Tell meaningful product stories.
5.  Connect products to NGOs/artisans where applicable.
6.  Allow online purchases.
7.  Support COD where applicable.
8.  Give customers a useful account/order experience.
9.  Let admins operate the catalogue and orders.
10. Generate and manage corporate gifting leads.

------------------------------------------------------------------------

# 4. MVP Scope

## 4.1 Included

-   Homepage.
-   Marketplace.
-   Product details.
-   Product stories.
-   Swipe Mode.
-   NGO directory.
-   NGO profiles.
-   Artisan directory/profile system where applicable.
-   Stories/content.
-   Cart.
-   Checkout.
-   Online payments.
-   COD.
-   Order confirmation.
-   Customer account.
-   Order history.
-   Order details/tracking.
-   Wishlist.
-   Addresses.
-   Profile/settings.
-   Corporate gifting page.
-   Corporate gifting inquiry flow.
-   Admin dashboard.
-   Product management.
-   Category management.
-   NGO management.
-   Artisan management.
-   Customer management.
-   Inventory management.
-   Order management.
-   Payment/refund operations.
-   Shipment/tracking management.
-   Essential trust/policy pages.

## 4.2 Explicitly excluded from MVP

These are future features and must not unnecessarily influence the
initial architecture:

-   Cultural Zone.
-   Treasure hunts.
-   XP.
-   Cultural points.
-   Badges.
-   Streaks.
-   Leaderboards.
-   NFT gallery.
-   NFT marketplace.
-   NFT bidding.
-   Interactive maps.
-   Gamified cultural progression.
-   Advanced personalization/recommendation engine.
-   Native mobile application.
-   Complex loyalty programs.
-   Self-service NGO seller dashboards.
-   Automated NGO commission/payout systems.
-   Complex multi-vendor fulfillment infrastructure.

Swipe Mode is **not** excluded. It is explicitly part of the MVP.

------------------------------------------------------------------------

# 5. User Roles

## 5.1 Customer

Customers can:

-   Browse/search/filter products.
-   Use Swipe Mode.
-   View product stories.
-   View NGO and artisan profiles.
-   Save products.
-   Add products to cart.
-   Checkout.
-   Pay online.
-   Use COD where eligible.
-   View orders.
-   View order status.
-   View tracking information where available.
-   Manage profile.
-   Manage addresses.
-   Submit corporate gifting inquiries.

Customers may access only their own account data.

## 5.2 Admin

Admins manage the Avanya operation:

-   Products.
-   Categories.
-   NGOs.
-   Artisans.
-   Customers.
-   Inventory.
-   Orders.
-   Payments/refunds.
-   Shipments/tracking.
-   Product media.
-   Stories.
-   Corporate inquiries.
-   Featured/curated content.

Admin authorization must be enforced server-side.

## 5.3 NGO / organization

For MVP, NGOs have public profiles and associated products but do
**not** receive self-service seller dashboards.

Avanya/admin manages their catalogue and operational information.

This intentionally avoids premature complexity around:

-   Seller permissions.
-   Seller onboarding.
-   Commissions.
-   Payouts.
-   Seller dashboards.
-   Complex multi-vendor fulfillment.

A fuller multi-vendor model can be added later.

------------------------------------------------------------------------

# 6. Sitemap

## 6.1 Public/storefront

``` text
/
├── /marketplace
├── /discover
├── /products/[slug]
│
├── /ngos
├── /ngos/[slug]
├── /artisans
├── /artisans/[slug]
│
├── /stories
├── /stories/[slug]
│
├── /corporate-gifting
│
├── /cart
├── /checkout
├── /order/success
│
├── /about
├── /contact
├── /faq
├── /shipping
├── /returns
├── /privacy
└── /terms
```

## 6.2 Authentication

``` text
/login
/register
/forgot-password
```

## 6.3 Customer account

``` text
/account
/account/orders
/account/orders/[id]
/account/wishlist
/account/addresses
/account/settings
```

## 6.4 Admin

``` text
/admin
/admin/products
/admin/orders
/admin/ngos
/admin/artisans
/admin/customers
/admin/corporate-inquiries
```

The exact route names may be adjusted during implementation without
changing product scope.

------------------------------------------------------------------------

# 7. Navigation

The main navigation should remain clean.

Proposed direction:

``` text
Avanya | Shop | Discover | Stories | NGOs | Corporate Gifting
```

Right-side actions:

-   Search.
-   Wishlist.
-   Cart.
-   Account.

Artisans, account routes, policies, and admin routes do not need to
compete for primary navigation space.

------------------------------------------------------------------------

# 8. Page Specifications

## 8.1 Homepage

**Route:** `/`

### Purpose

Introduce Avanya, explain its value, create trust, surface
products/stories, and drive shopping.

### Proposed structure

1.  Hero.
2.  Featured products/collections.
3.  Shop by category.
4.  "Every product has a story" section.
5.  Featured NGOs/organizations.
6.  Impact section.
7.  Corporate gifting teaser.
8.  Featured stories.
9.  Final CTA.
10. Footer.

### Requirements

-   Strong primary shopping CTA.
-   Secondary discovery/story CTA.
-   Product discovery should appear early enough.
-   Premium visual hierarchy.
-   Strong photography.
-   Avoid excessive empty space.
-   Do not make the homepage feel like a cultural-learning application.

------------------------------------------------------------------------

## 8.2 Marketplace

**Route:** `/marketplace`

### Purpose

Primary conventional shopping experience.

### Features

-   Product grid.
-   Search.
-   Category filtering.
-   Price filtering.
-   NGO/organization filtering.
-   Availability.
-   Sorting.
-   Wishlist.
-   Add to cart.
-   Optional quick view if useful.

### Product card

Potential information hierarchy:

-   Product image.
-   Product name.
-   Category/tags.
-   NGO/artisan attribution where relevant.
-   Price.
-   Rating.
-   Availability/sale state.
-   Wishlist.
-   Add to cart.

Do not overload cards with long story text.

------------------------------------------------------------------------

## 8.3 Swipe Mode

**Route:** `/discover` (working route; can change)

### Purpose

A distinctive Tinder-style product discovery experience.

### Interaction

``` text
Swipe right → interested/save
Swipe left  → pass
Tap          → product details/story
Add to cart  → cart
```

### Card content

-   Product image.
-   Product name.
-   Price.
-   NGO/artisan attribution.
-   Short story preview.
-   Save/wishlist.
-   Add to cart.
-   View story.

### UX principles

-   Keep the interaction fast.
-   Give visible feedback for right/left actions.
-   Do not make it a literal dating-app clone.
-   Keep Avanya's premium editorial identity.
-   Make it usable on mobile and desktop.

### MVP recommendation engine

No sophisticated ML/personalization is required initially.

Products can be served using catalogue ordering, categories,
availability, and basic rules.

Future personalization can use:

-   Likes.
-   Passes.
-   Wishlist.
-   Purchases.
-   Categories.
-   Browsing history.

------------------------------------------------------------------------

## 8.4 Product Details

**Route:** `/products/[slug]`

### Product section

-   Product gallery.
-   Product name.
-   Price.
-   Sale price where applicable.
-   Availability.
-   Rating/reviews if enabled.
-   Quantity.
-   Add to cart.
-   Buy now.
-   Wishlist.
-   Product attributes.
-   Shipping information.
-   Returns information.

### Story section

-   Product story.
-   How/where it was made.
-   Craft/process.
-   Supporting photos.
-   Short video when available.

### People/organization

-   NGO/organization.
-   Artisan where applicable.
-   Location.
-   Short profile.
-   Link to profile.

### Related products

-   Similar products.
-   Products from same NGO/artisan/category.
-   Curated products.

------------------------------------------------------------------------

## 8.5 NGOs

**Route:** `/ngos`

### Features

-   Search.
-   Categories.
-   Location.
-   Featured NGOs.
-   NGO cards.
-   Relevant impact metric.
-   View profile.

No interactive map in MVP.

------------------------------------------------------------------------

## 8.6 NGO Profile

**Route:** `/ngos/[slug]`

### Structure

``` text
Identity
About
Mission
Story
What they do
People / artisans
Products
Impact
Basic contact information
```

The profile should connect:

**NGO → Story → People → Products → Impact**

------------------------------------------------------------------------

## 8.7 Artisans

**Route:** `/artisans`

### Information

-   Name.
-   Craft/specialization.
-   Location.
-   Experience.
-   Profile image.
-   Rating where applicable.
-   Products.
-   Associated NGO.

This is a storytelling/discovery surface, not necessarily a seller
portal.

------------------------------------------------------------------------

## 8.8 Artisan Profile

**Route:** `/artisans/[slug]`

### Content

-   Artisan identity.
-   Craft.
-   Location.
-   Story.
-   Experience.
-   Photos.
-   Process/making video where available.
-   Products.
-   Associated NGO.

------------------------------------------------------------------------

## 8.9 Stories

**Route:** `/stories`

### Purpose

Dedicated editorial/storytelling surface.

### Story types

-   Artisan stories.
-   NGO stories.
-   Craft stories.
-   Product origins.
-   Impact stories.
-   Cultural stories.

Stories also support long-term brand and SEO growth.

------------------------------------------------------------------------

## 8.10 Story Details

**Route:** `/stories/[slug]`

### Content

-   Hero media.
-   Editorial story.
-   Supporting images/video.
-   NGO/artisan relationship.
-   Related products.
-   Related stories.

------------------------------------------------------------------------

# 9. Shopping Flow

## 9.1 Cart

**Route:** `/cart`

Features:

-   Items.
-   Quantity controls.
-   Remove.
-   Save for later/wishlist if used.
-   Subtotal.
-   Shipping estimate where possible.
-   Total.
-   Checkout CTA.

The server must recalculate prices, stock, discounts, and totals.

## 9.2 Checkout

**Route:** `/checkout`

Sections:

1.  Delivery address.
2.  Order items.
3.  Shipping.
4.  Payment method.
5.  Price summary.
6.  Place order.

Payment methods:

-   Online payment.
-   COD where eligible.

Do not store raw card details.

## 9.3 Order confirmation

**Route:** `/order/success`

Display:

-   Order number.
-   Order summary.
-   Delivery information.
-   Payment status.
-   Expected delivery information where available.
-   View order.
-   Continue shopping.

------------------------------------------------------------------------

# 10. Customer Account

## 10.1 Account overview

**Route:** `/account`

Replace the old gamification-heavy dashboard with a practical shopping
account.

Show:

-   Recent orders.
-   Current order status.
-   Wishlist count.
-   Recently viewed if implemented.
-   Useful recommendations later.

## 10.2 Orders

**Route:** `/account/orders`

Show:

-   Order number.
-   Date.
-   Items.
-   Amount.
-   Status.
-   View order.

## 10.3 Order Details

**Route:** `/account/orders/[id]`

Show:

-   Items.
-   Price.
-   Payment status.
-   Order status.
-   Shipment/tracking.
-   Delivery address.
-   Timeline.
-   Support/contact.

Keep order status, payment status, and shipment status as separate
concepts.

## 10.4 Wishlist

**Route:** `/account/wishlist`

Products may enter wishlist from:

-   Marketplace.
-   Product page.
-   Swipe Mode.

## 10.5 Addresses

**Route:** `/account/addresses`

Features:

-   Add.
-   Edit.
-   Delete.
-   Default address.

## 10.6 Settings

**Route:** `/account/settings`

Potential:

-   Name.
-   Email.
-   Phone.
-   Profile image.
-   Authentication/security settings.
-   Account preferences.

------------------------------------------------------------------------

# 11. Corporate Gifting

**Route:** `/corporate-gifting`

### Purpose

Present Avanya as a meaningful corporate gifting solution.

### Sections

1.  Hero.
2.  Why Avanya.
3.  Curated collections.
4.  Example gift boxes.
5.  Customization possibilities.
6.  Bulk orders.
7.  Social impact.
8.  How it works.
9.  Inquiry CTA.

### Inquiry fields

-   Company.
-   Contact person.
-   Email.
-   Phone.
-   Quantity.
-   Budget per gift.
-   Delivery date.
-   Preferred products/theme.
-   Customization.
-   Notes.

An inquiry is not automatically an order.

## 11.1 Admin corporate inquiry workflow

``` text
New
→ Contacted
→ Quotation Sent
→ Negotiation
→ Confirmed
→ Completed
```

Alternative terminal state:

``` text
Lost
```

------------------------------------------------------------------------

# 12. Authentication

MVP authentication needs:

-   Sign in.
-   Sign up.
-   Forgot/reset password where applicable.
-   Customer session management.
-   Admin authorization.

Recommended direction:

-   Auth.js or another suitable Next.js authentication solution.

The final provider/auth strategy is an implementation decision.

------------------------------------------------------------------------

# 13. Admin

## 13.1 Admin Dashboard

**Route:** `/admin`

Overview may include:

-   Orders.
-   Revenue.
-   Products.
-   Customers.
-   NGOs.
-   Inventory.
-   Corporate inquiries.

## 13.2 Products

**Route:** `/admin/products`

Admin can:

-   Create.
-   Edit.
-   Archive/delete according to business rules.
-   Set price.
-   Set inventory.
-   Manage categories.
-   Manage media.
-   Manage story.
-   Associate NGO.
-   Associate artisan.
-   Publish/unpublish.

## 13.3 Orders

**Route:** `/admin/orders`

Admin can:

-   View orders.
-   View items.
-   Check payment status.
-   Manage operational status.
-   Manage shipment information.
-   Add tracking.
-   Process refunds according to actual business/payment workflow.

## 13.4 NGOs

**Route:** `/admin/ngos`

Admin can:

-   Create/edit NGO.
-   Manage profile.
-   Manage status.
-   Associate products.
-   Manage story/media.

## 13.5 Artisans

**Route:** `/admin/artisans`

Admin can:

-   Create/edit artisan.
-   Manage media.
-   Associate NGO.
-   Associate products.

## 13.6 Customers

**Route:** `/admin/customers`

Admin can view operational customer information and order history
according to privacy/access rules.

------------------------------------------------------------------------

# 14. Trust and Utility Pages

MVP should include:

-   `/about`
-   `/contact`
-   `/faq`
-   `/shipping`
-   `/returns`
-   `/privacy`
-   `/terms`
-   `/cancellation` if required

Legal wording must be finalized appropriately before production launch.

------------------------------------------------------------------------

# 15. Operating Model

## 15.1 Central catalogue

For MVP, Avanya uses a **centrally managed catalogue/storefront**.

NGOs have public profiles and associated products but no self-service
seller dashboard.

Avanya/admin controls:

-   Product creation.
-   Product content.
-   Pricing.
-   Catalogue visibility.
-   Media.
-   NGO/artisan relationships.

## 15.2 Fulfillment

Use a hybrid operational model.

### Avanya-managed products

Where Avanya sources/resells inventory:

-   Avanya manages stock.
-   Avanya manages packing/shipping according to the actual arrangement.
-   Avanya manages customer-facing shipment information.

### NGO-shipped products

Where the NGO handles fulfillment:

-   NGO confirms stock.
-   NGO packs/dispatches under agreed service levels.
-   NGO provides tracking information.
-   Avanya maintains the customer-facing order record.
-   Avanya manages communication/escalations according to the agreed
    operating model.

### Corporate gifting

Avanya coordinates:

-   Sourcing.
-   Curation.
-   Packaging/customization.
-   Delivery deadline.
-   Consolidation.
-   Final dispatch.

Do not assume one customer order always equals one supplier or one
shipment.

------------------------------------------------------------------------

# 16. Order and Fulfillment Model

## 16.1 Core principle

**Order != Shipment**

Keep these states separate:

-   Order status.
-   Payment status.
-   Shipment status.

Potential order states:

``` text
Pending
Confirmed
Processing
Partially Fulfilled
Fulfilled
Delivered
Cancelled
Refunded
Failed
```

Exact state transitions will be finalized in database design.

## 16.2 Shipping

Do not build proprietary logistics infrastructure.

Potential approach:

-   Shipping aggregator/courier integration for Avanya-managed
    shipments.
-   Manual tracking entry for NGO-shipped products where necessary.

Business decisions still required:

-   Shipping rates.
-   Delivery estimates.
-   COD eligibility.
-   Return shipping responsibility.
-   Supplier SLA.
-   Dispatch deadlines.
-   Tracking requirements.

------------------------------------------------------------------------

# 17. Payments

Potential provider:

-   Razorpay or another suitable Indian payment gateway.

Final provider is not yet locked.

## 17.1 Online payment

Expected flow:

``` text
Checkout
→ Server validates cart
→ Server validates current prices/stock
→ Create order/payment request
→ Customer pays
→ Provider callback/webhook
→ Server verifies webhook
→ Payment status updated
→ Order confirmed
```

A client-side success page is not sufficient proof of payment.

## 17.2 COD

COD is a distinct payment workflow.

COD eligibility rules must be defined before launch.

## 17.3 Security

-   Never store raw card details.
-   Verify payment webhooks.
-   Use idempotent payment/order processing.
-   Do not trust client totals/payment state.

------------------------------------------------------------------------

# 18. Product Media

Product media may include:

-   Images.
-   Short videos.

Potential storage:

-   Cloudinary, or
-   AWS S3.

The final provider is an implementation decision.

Database stores references/metadata, not large media binaries.

------------------------------------------------------------------------

# 19. Recommended Technology Stack

## Application

-   Next.js 16.x.
-   React.
-   TypeScript.
-   App Router.
-   React Compiler.
-   Cache Components where appropriate.
-   Tailwind CSS.
-   ESLint.

## Database

-   PostgreSQL.
-   Prisma ORM.

PostgreSQL is preferred because Avanya has highly relational data:

-   Users.
-   Addresses.
-   Products.
-   NGOs.
-   Artisans.
-   Carts.
-   Orders.
-   Payments.
-   Shipments.

Frequently changing product content does not require MongoDB. Flexible
product attributes can use JSON/JSONB or relational structures when
appropriate.

## Authentication

-   Auth.js or suitable Next.js authentication solution.

## Media

-   Cloudinary or S3.

## Hosting

Potential:

-   Vercel for Next.js.
-   Managed PostgreSQL.

Exact infrastructure choices are not finalized yet.

------------------------------------------------------------------------

# 20. Project Structure

The new project uses a clean `src/` architecture.

Initial direction:

``` text
avanya/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── products/
│   │   ├── marketplace/
│   │   ├── discover/
│   │   ├── ngos/
│   │   ├── artisans/
│   │   ├── stories/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── account/
│   │   ├── admin/
│   │   └── corporate/
│   ├── lib/
│   ├── hooks/
│   └── types/
├── public/
├── prisma/
├── docs/
├── AGENTS.md
├── package.json
└── ...
```

This is an initial organization, not a rigid rule. Avoid creating
abstractions without actual reuse.

------------------------------------------------------------------------

# 21. Initial Database Requirements

This is a requirements inventory, **not the final Prisma schema**.

Likely entities:

``` text
User
Address
NGO / Organization
Artisan
Category
Product
ProductMedia
Story
Cart
CartItem
Wishlist
WishlistItem
Order
OrderItem
Payment
Shipment
OrderStatusHistory
CorporateInquiry
```

Potential later entities:

``` text
ProductVariant
Coupon
Review
Notification
ContentCollection
```

The final schema will be designed after the MVP/UI requirements are
locked.

## 21.1 Database principles

### Order snapshots

Order items should preserve historical:

-   Product name.
-   Unit price.
-   Quantity.
-   Variant information where applicable.

Editing a product later must not rewrite historical orders.

### Inventory

Inventory changes must be server-side and safe against concurrent
purchases.

### User data

Customers can have:

-   Multiple addresses.
-   Multiple orders.
-   Wishlist items.
-   Cart items.

### Product relationships

Products can be associated with:

-   Categories.
-   NGO/organization.
-   Artisan where applicable.
-   Media.
-   Story.

Exact cardinalities are to be finalized during database design.

------------------------------------------------------------------------

# 22. Security Requirements

The application must:

-   Validate input on the server.
-   Enforce authorization server-side.
-   Protect admin routes.
-   Never trust client prices.
-   Never trust client stock.
-   Never trust client totals.
-   Never trust client payment state.
-   Verify payment webhooks.
-   Protect environment secrets.
-   Never expose server secrets through `NEXT_PUBLIC_*`.
-   Never store raw payment-card data.
-   Validate uploaded files.
-   Apply appropriate protection against XSS/injection/CSRF-related
    risks.
-   Rate-limit sensitive operations where appropriate.
-   Log important operational/security events.

Client-side hiding is not a security mechanism.

------------------------------------------------------------------------

# 23. UX Requirements

Avanya should feel:

-   Premium.
-   Warm.
-   Human.
-   Trustworthy.
-   Editorial.
-   Modern.
-   Easy to shop.

It should not feel:

-   Overly gamified.
-   Like an NFT marketplace.
-   Like a cultural-learning portal.
-   Like a generic NGO directory.
-   Like a student prototype.

## 23.1 Responsive design

Support:

-   Desktop.
-   Tablet.
-   Mobile.

Swipe Mode requires especially careful mobile interaction design.

## 23.2 States

Dynamic interfaces should have:

-   Loading state.
-   Empty state.
-   Error state.
-   Success/confirmation state where appropriate.

## 23.3 Accessibility

Use:

-   Semantic HTML.
-   Keyboard navigation.
-   Accessible labels.
-   Focus states.
-   Sufficient contrast.
-   Meaningful alt text.
-   Accessible forms and controls.

------------------------------------------------------------------------

# 24. SEO

Public pages should support:

-   Metadata.
-   Page titles.
-   Descriptions.
-   Open Graph metadata.
-   Product metadata where appropriate.
-   Clean URLs/slugs.
-   Structured data where appropriate.
-   Crawlable product/story/NGO pages.

Stories are an important long-term organic acquisition channel.

------------------------------------------------------------------------

# 25. Performance

Requirements:

-   Optimized images.
-   Lazy loading where appropriate.
-   Server rendering where beneficial.
-   Minimize unnecessary client components.
-   Isolate interactive components.
-   Avoid shipping unnecessary JavaScript.
-   Use Next.js caching intentionally.
-   Monitor Core Web Vitals.

React Compiler and Cache Components are tools, not automatic performance
guarantees.

------------------------------------------------------------------------

# 26. UI Extraction from Existing Prototype

The previous prototype is the reference source for design extraction.

## 26.1 Strong components/concepts to carry forward

-   Global navigation.
-   Footer.
-   Product cards.
-   Marketplace grid.
-   Search.
-   Filters.
-   Tags/badges.
-   Rating display.
-   NGO cards.
-   Artisan cards.
-   Story sections.
-   Impact/stat blocks.
-   Dashboard card patterns.
-   Tabs.
-   Warm editorial visual language.
-   Swipe Mode.

## 26.2 Do not carry into MVP

-   Cultural Zone.
-   Treasure hunts.
-   XP.
-   Badges.
-   Streaks.
-   Leaderboards.
-   NFT gallery.
-   NFT marketplace.
-   Interactive map.

## 26.3 Implementation rule

Prefer to **recreate clean Avanya components** based on the useful old
UI rather than blindly copying old code.

The old project is a design/reference source, not the foundation of the
new architecture.

------------------------------------------------------------------------

# 27. UI Design Direction

## 27.1 Typography

Serif/display type for:

-   Hero.
-   Page titles.
-   Editorial headings.

Sans-serif for:

-   Navigation.
-   Forms.
-   Product information.
-   Buttons.
-   Supporting text.

## 27.2 Color direction

Primary direction:

-   Warm cream/off-white.
-   Deep earthy red.
-   Dark charcoal/brown.
-   Restrained neutrals.

Exact tokens will be finalized during UI implementation.

------------------------------------------------------------------------

# 28. Core User Flows

## 28.1 Normal shopping

``` text
Homepage
→ Marketplace
→ Product
→ Add to Cart
→ Cart
→ Checkout
→ Payment/COD
→ Order Confirmation
→ Account/Tracking
```

## 28.2 Swipe discovery

``` text
Discover
→ Swipe products
→ Right / Save
→ Product Story
→ Add to Cart
→ Checkout
```

or:

``` text
Discover
→ Swipe
→ Right / Save
→ Continue
→ Wishlist
→ Purchase later
```

## 28.3 NGO discovery

``` text
Homepage / NGOs
→ NGO Directory
→ NGO Profile
→ Products
→ Product
→ Purchase
```

## 28.4 Story discovery

``` text
Homepage / Stories
→ Story
→ NGO/Artisan
→ Related Products
→ Product
→ Purchase
```

## 28.5 Corporate gifting

``` text
Corporate Gifting
→ Collections
→ Inquiry
→ Admin
→ Contacted
→ Quotation
→ Negotiation
→ Confirmed
→ Fulfilled
```

------------------------------------------------------------------------

# 29. Admin Flows

## Product

``` text
Create
→ Media
→ Story
→ Category
→ NGO/artisan
→ Price
→ Inventory
→ Publish
```

## Order

``` text
Received
→ Payment/COD verification
→ Confirm
→ Processing
→ Fulfillment
→ Shipment
→ Tracking
→ Delivered
```

## NGO product

``` text
NGO provides/approves information
→ Avanya admin creates listing
→ Publish
→ Customer purchase
→ Stock/dispatch coordination
→ Tracking
→ Delivery
```

------------------------------------------------------------------------

# 30. Business Decisions Still Requiring Confirmation

These must be decided before production and, where relevant, before
final database implementation.

## Legal/commercial

-   Who is the legal seller of record?
-   Who issues customer invoices?
-   How are taxes/GST handled?
-   Who handles consumer-law obligations?
-   Who funds/executes refunds?
-   Who owns stock?
-   Who bears losses from damaged/lost shipments?

## Fulfillment

-   Which products are Avanya-managed?
-   Which are NGO-dispatched?
-   Supplier dispatch SLA.
-   Return rules.
-   Cancellation rules.
-   COD eligibility.
-   Shipping rates.
-   Delivery estimates.

## Commercial model

-   NGO commercial arrangement.
-   Margin/commission model.
-   Corporate gifting margins.
-   Customization pricing.
-   Minimum corporate quantities.

Do not silently encode assumptions about these into the application.

------------------------------------------------------------------------

# 31. Success Criteria

## Customer success

A real customer should be able to:

1.  Land on Avanya.
2.  Understand the proposition.
3.  Browse products.
4.  Search/filter.
5.  Discover products through Swipe Mode.
6.  Open a product.
7.  Understand its story.
8.  Add it to cart.
9.  Checkout.
10. Pay online or select COD where eligible.
11. Receive confirmation.
12. View the order.
13. Track shipment where available.

## Admin success

An admin should be able to:

1.  Manage products.
2.  Manage inventory.
3.  Manage categories.
4.  Manage NGOs.
5.  Manage artisans.
6.  Manage customers.
7.  Manage orders.
8.  Manage payment/refund operations.
9.  Manage shipment/tracking.
10. Manage corporate inquiries.

------------------------------------------------------------------------

# 32. Development Sequence

## Phase 1 --- Foundation

-   Fresh Next.js project.
-   Project structure.
-   Design tokens.
-   Global styles.
-   Navigation.
-   Footer.
-   UI primitives.
-   Loading/error/not-found foundations.

## Phase 2 --- UI

-   Homepage.
-   Marketplace.
-   Product details.
-   NGO pages.
-   Artisan pages.
-   Stories.
-   Corporate gifting.
-   Swipe Mode.
-   Cart/checkout UI.
-   Account UI.
-   Admin UI.

## Phase 3 --- Database

-   Final entity design.
-   Prisma schema.
-   PostgreSQL.
-   Migrations.
-   Seed data.

## Phase 4 --- Authentication

-   Customer authentication.
-   Admin authorization.
-   Protected routes.

## Phase 5 --- Catalogue

-   Products.
-   Categories.
-   NGOs.
-   Artisans.
-   Media.
-   Stories.
-   Admin management.

## Phase 6 --- Shopping

-   Cart.
-   Wishlist.
-   Checkout.
-   Addresses.
-   Orders.

## Phase 7 --- Payments

-   Online payment.
-   Webhook verification.
-   COD.
-   Payment state handling.

## Phase 8 --- Fulfillment

-   Shipment records.
-   Tracking.
-   Admin operations.
-   Customer tracking.

## Phase 9 --- Corporate

-   Corporate gifting.
-   Inquiry form.
-   Admin inquiry management.

## Phase 10 --- Production readiness

-   Validation.
-   Security review.
-   Accessibility.
-   SEO.
-   Performance.
-   Error handling.
-   Testing.
-   Deployment.

------------------------------------------------------------------------

# 33. Scope Guardrail

When considering a new feature, ask:

> **Does this help Avanya sell products, tell product stories, operate
> orders, support customers, or generate qualified corporate business?**

If not, it should probably be deferred.

This keeps Avanya from becoming:

-   A social network.
-   A learning platform.
-   A game.
-   An NFT marketplace.
-   A logistics platform.

Avanya's first job is to be a **great marketplace with a strong story
layer and a distinctive discovery experience**.

------------------------------------------------------------------------

# 34. Future Roadmap

After the MVP has real customers and operational data, possible future
features include:

## Cultural discovery

-   Cultural Zone.
-   Quizzes.
-   Treasure hunts.
-   XP.
-   Badges.
-   Streaks.
-   Leaderboards.

## Advanced discovery

-   Personalized recommendations.
-   Learning-based Swipe Mode.
-   Smarter collections.

## Marketplace expansion

-   NGO self-service dashboards.
-   Seller onboarding.
-   Automated commissions.
-   Payouts.
-   More advanced multi-vendor fulfillment.

## Content

-   Video-first stories.
-   Rich cultural profiles.
-   More editorial content.

## Other

-   Interactive maps.
-   Loyalty.
-   Native mobile apps.
-   NFT/digital cultural collectibles if there is a validated business
    case.

These are not MVP commitments.

------------------------------------------------------------------------

# 35. Current Project Foundation

The fresh Avanya application has been created with the current Next.js
CLI.

Selected setup:

``` text
Next.js          → Latest installed through create-next-app
TypeScript       → Yes
ESLint            → Yes
React Compiler    → Yes
Tailwind CSS      → Yes
src/ directory    → Yes
App Router        → Yes
Cache Components  → Yes
Import alias      → @/*
AGENTS.md         → Yes
```

Git initialization/commit strategy is intentionally separate and will be
done before the first project commit.

------------------------------------------------------------------------

# 36. Definition of Done

The MVP is not complete merely because routes/pages exist.

A feature is complete when:

-   UI is responsive.
-   Real data is connected.
-   Server-side validation exists.
-   Authorization is correct.
-   Loading/error/empty states exist.
-   Core interactions work.
-   Security requirements are satisfied.
-   Relevant SEO metadata exists.
-   Realistic data has been tested.
-   Operational edge cases have been considered.

------------------------------------------------------------------------

# 37. Final Product Definition

> **Avanya is a premium, story-driven e-commerce marketplace where
> customers can shop meaningful products, discover the people and
> organizations behind them, and explore products through a unique
> Tinder-style Swipe Mode.**

The MVP focuses on:

**Marketplace + Stories + NGO/Artisan discovery + Swipe Mode +
E-commerce + Corporate Gifting**

Everything else is secondary until the core business is validated.

------------------------------------------------------------------------

# 38. Source-of-Truth Rule

This document is the working MVP specification for Avanya.

When implementation questions arise, use this document as the first
reference.

If a proposed feature conflicts with this MVP scope, explicitly decide
whether the scope should change **before implementing it**.

The MVP should remain intentionally small enough to build, operate, test
with real customers, and improve using real evidence.
