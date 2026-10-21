'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

type SwipeProduct = {
  id: number;
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

type SwipeDeckProps = {
  products: SwipeProduct[];
  currentIndex: number;
  onSwipe: (direction: 'like' | 'pass', product: SwipeProduct) => void;
};

const SWIPE_THRESHOLD = 100;

export default function SwipeDeck({
  products,
  currentIndex,
  onSwipe,
}: SwipeDeckProps) {
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState<'like' | 'pass' | null>(
    null
  );

  const startPoint = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const suppressClick = useRef(false);

  const visibleProducts = products.slice(currentIndex, currentIndex + 3);
  const frontProduct = visibleProducts[0];

  function finishSwipe(direction: 'like' | 'pass') {
    if (!frontProduct || isExiting) return;

    setIsExiting(true);
    setExitDirection(direction);
    isDragging.current = false;
    suppressClick.current = true;

    setDragX(direction === 'like' ? 600 : -600);
    setDragY((previous) => previous - 30);

    window.setTimeout(() => {
      onSwipe(direction, frontProduct);
      setDragX(0);
      setDragY(0);
      setIsExiting(false);
      setExitDirection(null);
    }, 250);

    window.setTimeout(() => {
      suppressClick.current = false;
    }, 350);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if (isExiting) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    isDragging.current = true;
    startPoint.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!isDragging.current || isExiting) return;

    setDragX(event.clientX - startPoint.current.x);
    setDragY(event.clientY - startPoint.current.y);
  }

  function handlePointerUp() {
    if (!isDragging.current) return;

    isDragging.current = false;

    if (dragX >= SWIPE_THRESHOLD) {
      finishSwipe('like');
    } else if (dragX <= -SWIPE_THRESHOLD) {
      finishSwipe('pass');
    } else {
      setDragX(0);
      setDragY(0);
    }
  }

  if (!frontProduct) {
    return (
      <section className="mx-auto flex min-h-72 w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-text/10 bg-white px-6 py-10 text-center">
        <span className="mb-3 text-3xl" aria-hidden="true">
          ✦
        </span>
        <h3 className="font-display text-2xl font-semibold text-text">
          You've discovered everything
        </h3>
        <p className="mt-2 text-sm leading-6 text-text/60">
          You've reached the end of this collection. Come back for more
          meaningful finds.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
        >
          Explore again
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[340px] px-2">
      <div className="relative pb-3">
        {/* Cards waiting underneath */}
        {visibleProducts.slice(1, 3).map((product, index) => {
          const depth = index + 1;

          return (
            <div
              key={product.id}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 bottom-0 top-2 rounded-2xl border border-text/10 bg-white shadow-sm"
              style={{
                zIndex: 3 - depth,
                transform: `translateY(${depth * 9}px) scale(${
                  1 - depth * 0.035
                })`,
              }}
            />
          );
        })}

        {/* Active, draggable product */}
        <article
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          className={`relative z-10 overflow-hidden rounded-2xl border border-text/10 bg-white shadow-md ${
            isExiting ? 'transition-transform duration-250 ease-out' : ''
          }`}
          style={{
            transform: `translate3d(${dragX}px, ${dragY * 0.35}px, 0) rotate(${
              dragX * 0.055
            }deg)`,
            touchAction: 'pan-y',
            cursor: isDragging.current ? 'grabbing' : 'grab',
          }}
        >
          {/* Like / Pass feedback */}
          {Math.abs(dragX) > 25 && (
            <div
              className={`pointer-events-none absolute left-4 top-5 z-20 rotate-[-12deg] rounded-lg border-2 px-3 py-1.5 text-sm font-extrabold tracking-widest ${
                dragX > 0
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-primary text-primary'
              }`}
              style={{ opacity: Math.min(Math.abs(dragX) / 100, 1) }}
            >
              {dragX > 0 ? 'LIKE ♥' : 'PASS ✕'}
            </div>
          )}

          <a href={frontProduct.href} draggable={false} className="block">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F1EAE0]">
              <Image
                src={frontProduct.image}
                alt={frontProduct.name}
                fill
                priority
                draggable={false}
                sizes="(max-width: 640px) 340px, 340px"
                className="pointer-events-none object-cover"
              />

              <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                {frontProduct.impactLabel}
              </span>
            </div>

            <div className="space-y-2.5 p-3.5 sm:p-4">
              <h3 className="text-sm font-semibold text-text">
                {frontProduct.name}
              </h3>

              <p className="text-xs text-text/60">
                By {frontProduct.seller} · {frontProduct.location}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-text">
                  ₹{frontProduct.price.toLocaleString('en-IN')}
                </span>

                {frontProduct.originalPrice > frontProduct.price && (
                  <>
                    <span className="text-xs text-text/45 line-through">
                      ₹{frontProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="rounded bg-[#E6F0E8] px-1.5 py-0.5 text-[10px] font-semibold text-[#2E5A44]">
                      {Math.round(
                        ((frontProduct.originalPrice - frontProduct.price) /
                          frontProduct.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-text/65">
                <span className="text-[#C48B49]">★</span>{' '}
                <span className="font-medium text-text">
                  {frontProduct.rating.toFixed(1)}
                </span>{' '}
                ({frontProduct.reviewCount} reviews)
              </p>
            </div>
          </a>
        </article>
      </div>

      {/* Swipe controls */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Pass on product"
          onClick={() => finishSwipe('pass')}
          disabled={isExiting}
          className="flex size-11 items-center justify-center rounded-full border border-primary/20 bg-white text-primary transition hover:bg-primary/5 disabled:opacity-50"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        <button
          type="button"
          onClick={() => finishSwipe('pass')}
          disabled={isExiting}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
        >
          Next product →
        </button>

        <button
          type="button"
          aria-label="Like product"
          onClick={() => finishSwipe('like')}
          disabled={isExiting}
          className="flex size-11 items-center justify-center rounded-full border border-primary/20 bg-white text-primary transition hover:bg-primary/5 disabled:opacity-50"
        >
          <span className="text-lg leading-none">♡</span>
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-text/55">
        Product {currentIndex + 1} of {products.length}
      </p>
    </section>
  );
}
