'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Card from '@/components/ui/Card';

type ProductCardProps = {
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  impactLabel: string;
  seller: string;
  location: string;
  rating: number;
  reviewCount: number;
  href: string;
};

export default function ProductCard({
  name,
  price,
  originalPrice,
  image,
  impactLabel,
  seller,
  location,
  rating,
  reviewCount,
  href,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <Card className="flex h-full flex-col rounded-lg transition-shadow duration-200 hover:shadow-md">
      <div className="relative">
        <Link
          href={href}
          aria-label={`View ${name}`}
          className="group block overflow-hidden rounded-t-lg focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-surface">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <span className="absolute left-2 top-2 max-w-[calc(100%-3.5rem)] truncate rounded-md bg-primary px-2 py-1 text-[10px] font-semibold leading-tight text-white sm:text-xs">
          {impactLabel}
        </span>

        <button
          type="button"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((current) => !current)}
          className={`absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            isWishlisted ? 'text-primary' : 'text-text/70'
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-2 sm:p-3">
        <Link
          href={href}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <h3 className="line-clamp-2 min-h-[2.5em] text-xs font-semibold leading-snug text-text transition-colors hover:text-primary sm:text-sm">
            {name}
          </h3>
        </Link>

        <p className="mt-1 truncate text-[10px] leading-4 text-text/60 sm:text-xs">
          By {seller} · {location}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          <span className="text-sm font-bold text-text sm:text-base">
            ₹{price.toLocaleString('en-IN')}
          </span>

          <span className="text-[10px] text-text/45 line-through sm:text-xs">
            ₹{originalPrice.toLocaleString('en-IN')}
          </span>

          <span className="rounded bg-[#e4eee5] px-1 py-0.5 text-[9px] font-semibold text-[#356447] sm:text-[10px]">
            {discount}% OFF
          </span>
        </div>

        <div
          className="mt-1 flex items-center gap-1 text-xs"
          aria-label={`Rated ${rating} out of 5 from ${reviewCount} reviews`}
        >
          <span aria-hidden="true" className="text-amber-500">
            ★
          </span>
          <span className="font-medium text-text">{rating.toFixed(1)}</span>
          <span className="text-text/55">({reviewCount})</span>
        </div>

        <button
          type="button"
          onClick={() => setIsAdded((current) => !current)}
          aria-pressed={isAdded}
          className={`mt-3 flex min-h-9 w-full items-center justify-center gap-2 rounded-md border px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm ${
            isAdded
              ? 'border-primary bg-primary text-white'
              : 'border-primary/50 text-primary hover:bg-primary hover:text-white'
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-4 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6M10 20h.01M18 20h.01"
            />
          </svg>
          {isAdded ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </Card>
  );
}
