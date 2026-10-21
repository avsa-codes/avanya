'use client';

import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import SwipeDeck from './SwipeDeck';

type MarketplaceMode = 'grid' | 'swipe';

const products = [
  {
    id: 1,
    name: 'Everyday Cotton Tote Bag',
    price: 499,
    originalPrice: 699,
    image: '/images/homepage/product-cotton-tote-bag.png',
    impactLabel: 'Handcrafted',
    seller: 'Avanya Artisan Collective',
    location: 'India',
    rating: 4.8,
    reviewCount: 24,
    href: '/products/everyday-cotton-tote-bag',
  },
  {
    id: 2,
    name: 'Handcrafted Everyday Tote',
    price: 599,
    originalPrice: 799,
    image: '/images/homepage/product-cotton-tote-bag.png',
    impactLabel: 'Made with Care',
    seller: 'Avanya Artisan Collective',
    location: 'India',
    rating: 4.7,
    reviewCount: 18,
    href: '/products/handcrafted-everyday-tote',
  },
  {
    id: 3,
    name: 'Floral Cotton Carry Bag',
    price: 449,
    originalPrice: 599,
    image: '/images/homepage/product-cotton-tote-bag.png',
    impactLabel: 'Artisan Made',
    seller: 'Avanya Artisan Collective',
    location: 'India',
    rating: 4.9,
    reviewCount: 12,
    href: '/products/floral-cotton-carry-bag',
  },
  {
    id: 4,
    name: 'Reusable Market Tote',
    price: 399,
    originalPrice: 549,
    image: '/images/homepage/product-cotton-tote-bag.png',
    impactLabel: 'Everyday Essential',
    seller: 'Avanya Artisan Collective',
    location: 'India',
    rating: 4.6,
    reviewCount: 31,
    href: '/products/reusable-market-tote',
  },
];

const categories = [
  'All Products',
  'Textiles',
  'Jewellery',
  'Home Décor',
  'Art & Paintings',
  'Pottery & Ceramics',
  'Accessories',
  'Personal Care',
];

export default function MarketplaceView() {
  const [mode, setMode] = useState<MarketplaceMode>('grid');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const currentProduct = products[currentIndex];

  function handleProductSwipe(
    direction: 'like' | 'pass',
    product: (typeof products)[number]
  ) {
    if (direction === 'like') {
      setLikedProducts((current) =>
        current.includes(product.id) ? current : [...current, product.id]
      );
    }

    setCurrentIndex((index) => index + 1);
  }

  function changeMode(nextMode: MarketplaceMode) {
    setMode(nextMode);
  }

  function moveToNextProduct() {
    setCurrentIndex((index) => (index + 1) % products.length);
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      {/* Marketplace heading */}
      <section className="mb-6 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
            Handcrafted. Meaningful. Global.
          </p>

          <h1 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-[42px]">
            Cultural Marketplace
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-text/65 sm:text-base">
            Discover meaningful handcrafted products and the people behind them.
          </p>
        </div>

        <p className="hidden pb-1 text-sm text-text/55 lg:block">
          Discover something meaningful
        </p>
      </section>

      {/* Search and controls */}
      <section className="mb-4 space-y-2.5 sm:mb-5 sm:space-y-0 sm:flex sm:items-center sm:gap-2.5">
        <label className="flex h-10 min-w-0 items-center gap-2.5 rounded-lg border border-text/10 bg-white px-3.5 transition-colors focus-within:border-primary sm:h-11 sm:flex-1 lg:max-w-none">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-[18px] shrink-0 text-text/45"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            type="search"
            placeholder="Search crafts, artisans, regions..."
            className="w-full min-w-0 bg-transparent text-sm text-text outline-none placeholder:text-text/45"
          />
        </label>

        {/* Mobile: two equal view buttons plus compact filters */}
        <div className="grid grid-cols-[1fr_1fr_auto] gap-2 sm:flex sm:shrink-0 sm:items-center">
          <button
            type="button"
            aria-pressed={mode === 'grid'}
            onClick={() => changeMode('grid')}
            className={`h-10 whitespace-nowrap rounded-lg border px-2.5 text-xs font-semibold transition-colors sm:h-11 sm:px-4 sm:text-sm ${
              mode === 'grid'
                ? 'border-primary bg-primary text-white'
                : 'border-text/15 bg-white text-text hover:border-primary/50'
            }`}
          >
            Grid View
          </button>

          <button
            type="button"
            aria-pressed={mode === 'swipe'}
            onClick={() => changeMode('swipe')}
            className={`flex h-10 items-center justify-center whitespace-nowrap rounded-lg border px-2.5 text-xs font-semibold transition-colors sm:hidden ${
              mode === 'swipe'
                ? 'border-primary bg-primary text-white'
                : 'border-text/15 bg-white text-text hover:border-primary/50'
            }`}
          >
            Swipe Mode
          </button>

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-text/15 bg-white px-3 text-xs font-medium text-text transition-colors hover:border-primary/50 sm:h-11 sm:px-3.5 sm:text-sm"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="size-4"
            >
              <path d="M4 7h16M7 12h10m-7 5h4" strokeLinecap="round" />
              <circle cx="8" cy="7" r="1.5" fill="currentColor" stroke="none" />
              <circle
                cx="15"
                cy="12"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="12"
                cy="17"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span>Filters</span>
          </button>
        </div>
      </section>

      {/* Category navigation */}
      <nav
        aria-label="Product categories"
        className="marketplace-category-scroll mb-6 flex gap-2 overflow-x-auto sm:mb-7 sm:gap-2.5"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
              activeCategory === category
                ? 'border-primary bg-primary text-white'
                : 'border-text/10 bg-white text-text/70 hover:border-primary/40 hover:text-text'
            }`}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Results toolbar */}
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-text/10 pb-3 sm:mb-5 sm:pb-4">
        <div>
          <h2 className="text-sm font-semibold text-text sm:text-base">
            Discover meaningful finds
          </h2>
          <p className="mt-0.5 text-xs text-text/50">
            {products.length} sample products
          </p>
        </div>

        <button
          type="button"
          className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-text/10 bg-white px-3 text-xs text-text transition-colors hover:border-primary/40 sm:h-10 sm:text-sm"
        >
          Featured
          <span aria-hidden="true" className="text-text/50">
            ⌄
          </span>
        </button>
      </div>

      {/* Grid mode */}
      {mode === 'grid' && (
        <section
          aria-label="Marketplace products"
          className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              impactLabel={product.impactLabel}
              seller={product.seller}
              location={product.location}
              rating={product.rating}
              reviewCount={product.reviewCount}
              href={product.href}
            />
          ))}
        </section>
      )}

      {/* Swipe mode */}

      {mode === 'swipe' && (
        <section className="mx-auto flex w-full flex-col items-center py-3">
          <div className="mb-5 text-center">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Discover something meaningful
            </p>
            <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
              Find your next favourite.
            </h2>
            <p className="mt-2 text-sm leading-6 text-text/60">
              Swipe right to like, left to pass.
            </p>
          </div>

          <div className="w-full">
            <SwipeDeck
              products={products}
              currentIndex={currentIndex}
              onSwipe={handleProductSwipe}
            />
          </div>

          <p className="mt-5 text-center text-xs text-text/55">
            {likedProducts.length}{' '}
            {likedProducts.length === 1 ? 'product' : 'products'} liked
          </p>

          <button
            type="button"
            onClick={() => changeMode('grid')}
            className="mt-3 text-sm font-medium text-primary underline underline-offset-4 transition hover:text-primary/75"
          >
            Return to Grid View
          </button>
        </section>
      )}
    </main>
  );
}
