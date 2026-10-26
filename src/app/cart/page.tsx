
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Handcrafted Everyday Tote",
    category: "Handcrafted accessories",
    price: 799,
    originalPrice: 999,
    quantity: 1,
    image: "/images/homepage/product-cotton-tote-bag.png",
  },
  {
    id: 2,
    name: "Handmade Ceramic Mug",
    category: "Home & living",
    price: 549,
    originalPrice: 699,
    quantity: 1,
    image: "/images/homepage/product-cotton-tote-bag.png",
  },
];

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const originalTotal = items.reduce(
    (total, item) => total + item.originalPrice * item.quantity,
    0
  );

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function updateQuantity(id: number, change: number) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
    );
  }

  function removeItem(id: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1817]">
      {/* Header */}
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B2625]">
            Thoughtful shopping
          </p>

          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Your Shopping Bag
          </h1>

          <p className="mt-2 text-sm text-[#1A1817]/60">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}{" "}
            chosen with purpose.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {items.length === 0 ? (
          <section className="rounded-2xl border border-black/[0.07] bg-white px-6 py-16 text-center sm:py-24">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EAE4] text-3xl text-[#8B2625]">
              ♡
            </div>

            <h2 className="mt-6 font-display text-2xl font-medium sm:text-3xl">
              Your bag is waiting for a story.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#1A1817]/60">
              Discover thoughtfully made products and support the
              people behind them.
            </p>

            <Link
              href="/marketplace"
              className="mt-7 inline-flex rounded-full bg-[#8B2625] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#701D1D]"
            >
              Explore the marketplace
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
            {/* Cart items */}
            <section className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
              <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4 sm:px-7">
                <h2 className="text-sm font-semibold">
                  Cart items
                </h2>
                <span className="text-xs text-[#1A1817]/50">
                  Prices in INR
                </span>
              </div>

              <div className="divide-y divide-black/[0.07]">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-4 p-4 sm:gap-6 sm:p-7"
                  >
                    <Link
                      href="/marketplace"
                      className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F5F1EB] sm:h-36 sm:w-32"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 96px, 128px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B2625] sm:text-xs">
                          {item.category}
                        </p>

                        <h3 className="mt-2 font-display text-lg font-medium leading-snug sm:text-xl">
                          {item.name}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-baseline gap-2">
                          <span className="text-base font-semibold">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-xs text-[#1A1817]/40 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-3 text-xs font-medium text-[#8B2625] transition hover:underline"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
                        <div className="flex items-center rounded-full border border-black/10">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            disabled={item.quantity === 1}
                            className="flex h-9 w-9 items-center justify-center text-lg disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            −
                          </button>

                          <span className="w-7 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center text-lg"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-sm font-semibold tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="border-t border-black/[0.07] px-5 py-5 sm:px-7">
                <Link
                  href="/marketplace"
                  className="text-sm font-semibold text-[#8B2625] transition hover:underline"
                >
                  ← Continue shopping
                </Link>
              </div>
            </section>

            {/* Order summary */}
            <aside className="rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-7 lg:sticky lg:top-8">
              <h2 className="font-display text-2xl font-medium">
                Order Summary
              </h2>

              <p className="mt-1 text-xs text-[#1A1817]/50">
                A little good in every purchase.
              </p>

              <div className="mt-7 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#1A1817]/60">
                    Subtotal ({totalQuantity} items)
                  </span>
                  <span className="font-medium tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#1A1817]/60">
                    Product savings
                  </span>
                  <span className="font-medium text-[#2E5A44] tabular-nums">
                    −{formatPrice(originalTotal - subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#1A1817]/60">
                    Delivery
                  </span>
                  <span className="text-xs text-[#1A1817]/50">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-black/15" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="mt-2 text-xs text-[#1A1817]/50">
                Inclusive of all applicable taxes.
              </p>

              <button
                type="button"
                onClick={() =>
                  alert("Checkout will be connected in a later step.")
                }
                className="mt-7 w-full rounded-full bg-[#8B2625] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#701D1D]"
              >
                Proceed to Checkout →
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#1A1817]/55">
                <span aria-hidden="true">♧</span>
                <span>Every purchase supports meaningful work.</span>
              </div>

              <div className="mt-6 border-t border-black/[0.07] pt-5">
                <div className="flex items-start gap-3">
                  <span className="text-lg" aria-hidden="true">◇</span>
                  <div>
                    <p className="text-sm font-medium">
                      Shop with confidence
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#1A1817]/55">
                      Delivery and return policies will be confirmed
                      before your order is placed.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
