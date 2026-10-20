import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/layout/Container';

export default function HeroSection() {
  const buttonStyles =
    'inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  return (
    <section className="overflow-hidden bg-surface">
      <Container>
        <div className="grid items-center gap-8 py-8 sm:py-10 lg:grid-cols-2 lg:gap-10 lg:py-10">
          {/* Hero content */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Meaningful products. Brighter tomorrows.
            </p>

            <h1 className="font-display text-4xl leading-[1.1] text-text sm:text-5xl lg:text-6xl">
              Shop with Purpose.
              <span className="mt-1 block text-primary">
                Empower Real Lives.
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-text/75 sm:text-lg sm:leading-8">
              Discover everyday essentials, unique gifts, and handcrafted goods
              made by certified NGOs and social enterprise communities across
              India and beyond.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/marketplace"
                className={`${buttonStyles} bg-primary text-white hover:bg-primary-hover`}
              >
                Browse Marketplace
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>

              <Link
                href="/marketplace?view=causes"
                className={`${buttonStyles} border border-primary text-primary hover:bg-primary/5`}
              >
                Explore by Cause
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl sm:min-h-[380px] lg:min-h-[440px]">
            <Image
              src="/images/homepage/hero-artisan-pottery.png"
              alt="An artisan creating handcrafted pottery in her workshop"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
