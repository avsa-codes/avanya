import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [
    { slug: 'cotton-tote-bag' },
    { slug: 'handmade-ceramic-mug' },
    { slug: 'terracotta-vase' },
  ];
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="min-h-screen bg-white text-text">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-6 py-12">Loading product...</div>
        }
      >
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;

  //If the slug matches this product, use its name; otherwise, check the next product.
  const productName =
    slug === 'cotton-tote-bag'
      ? 'Handcrafted Everyday Tote'
      : slug === 'handmade-ceramic-mug'
      ? 'Handmade Ceramic Mug'
      : slug === 'terracotta-vase'
      ? 'Artisan Terracotta Vase'
      : 'Handcrafted Everyday Tote';

  const image = '/images/homepage/product-cotton-tote-bag.png';

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-text/50 sm:text-sm">
            <Link href="/" className="transition hover:text-text">
              Home
            </Link>
            <span>/</span>
            <Link href="/marketplace" className="transition hover:text-text">
              Marketplace
            </Link>
            <span>/</span>
            <span className="capitalize text-text/80">
              {slug.replaceAll('-', ' ')}
            </span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-14">
          {/* Gallery */}
          <section>
            <div className="relative overflow-hidden rounded-2xl bg-[#F5F1EB]">
              <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8B2625] shadow-sm">
                Artisan collection
              </div>

              <div className="relative aspect-[4/4.2] w-full">
                <Image
                  src={image}
                  alt={productName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-500 hover:scale-[1.025]"
                />
              </div>

              <button
                type="button"
                aria-label="Add product to wishlist"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-text shadow-sm transition hover:bg-[#8B2625] hover:text-white"
              >
                ♡
              </button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-label={`View product image ${item}`}
                  className={`relative aspect-square overflow-hidden rounded-xl bg-[#F5F1EB] ${
                    item === 1
                      ? 'ring-2 ring-[#8B2625] ring-offset-2'
                      : 'opacity-70 transition hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Trust details */}
            <div className="mt-8 hidden grid-cols-3 divide-x divide-black/10 rounded-xl border border-black/[0.07] py-5 sm:grid">
              <div className="px-4 text-center">
                <p className="text-sm font-medium">Made by artisans</p>
                <p className="mt-1 text-xs text-text/55">Craft with a story</p>
              </div>
              <div className="px-4 text-center">
                <p className="text-sm font-medium">Thoughtful buying</p>
                <p className="mt-1 text-xs text-text/55">Buy with purpose</p>
              </div>
              <div className="px-4 text-center">
                <p className="text-sm font-medium">Secure checkout</p>
                <p className="mt-1 text-xs text-text/55">
                  Shop with confidence
                </p>
              </div>
            </div>
          </section>

          {/* Product details */}
          <section className="lg:pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B2625]">
              Crafted with purpose
            </p>

            <h1 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl xl:text-[42px]">
              {productName}
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-text/65">
              Everyday essentials, thoughtfully made by skilled artisans.
              Discover the beauty of considered design and traditional
              craftsmanship.
            </p>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold">4.8</span>
              <span className="tracking-[0.12em] text-[#C48B49]">★★★★★</span>
              <span className="text-text/45">|</span>
              <span className="text-text/60">Customer reviews</span>
            </div>

            <div className="mt-6 border-t border-black/10 pt-6">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-semibold tracking-tight">
                  ₹799
                </span>
                <span className="text-base text-text/40 line-through">
                  ₹999
                </span>
                <span className="rounded-md bg-[#E8F0E9] px-2 py-1 text-xs font-semibold text-[#2E5A44]">
                  20% off
                </span>
              </div>
              <p className="mt-2 text-xs text-text/55">
                Inclusive of all taxes
              </p>
            </div>

            {/* Delivery */}
            <div className="mt-6 rounded-xl border border-black/10 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 text-lg">
                  ↗
                </span>
                <div>
                  <p className="text-sm font-semibold">Delivery information</p>
                  <p className="mt-1 text-sm leading-6 text-text/60">
                    Delivery estimates and shipping charges will be shown once
                    you enter your delivery PIN code.
                  </p>
                  <div className="mt-3 flex max-w-sm gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter PIN code"
                      aria-label="Delivery PIN code"
                      className="min-w-0 flex-1 border-b border-black/20 bg-transparent px-1 py-2 text-sm outline-none transition placeholder:text-text/35 focus:border-[#8B2625]"
                    />
                    <button
                      type="button"
                      className="px-3 text-sm font-semibold text-[#8B2625] hover:underline"
                    >
                      Check
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase actions */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="rounded-full bg-[#8B2625] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#701D1D]"
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="rounded-full border border-[#8B2625] px-6 py-4 text-sm font-semibold text-[#8B2625] transition hover:bg-[#8B2625]/5"
              >
                Buy Now
              </button>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-text/50">
              A considered purchase. A story worth supporting.
            </p>

            {/* Artisan impact */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5EAE4] text-xl">
                  ♧
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium">
                    More than a product
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-text/65">
                    Your purchase helps independent artisans sustain their
                    craft, celebrate their heritage, and bring meaningful
                    products into everyday life.
                  </p>
                  <Link
                    href="/artisans"
                    className="mt-3 inline-flex text-sm font-semibold text-[#8B2625] hover:underline"
                  >
                    Discover our artisans →
                  </Link>
                </div>
              </div>
            </div>

            {/* Product details accordion-style rows */}
            <div className="mt-8 border-t border-black/10">
              {[
                'Product details',
                'Care instructions',
                'Shipping and returns',
              ].map((label) => (
                <details key={label} className="group border-b border-black/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium">
                    {label}
                    <span className="text-lg text-text/50 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-4 text-sm leading-6 text-text/60">
                    Product information will be provided here once verified
                    details are available.
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
