import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/layout/Container';

export default function SwipeModeBanner() {
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <div className="relative isolate overflow-hidden rounded-xl bg-gradient-to-r from-[#F8E9E0] via-[#F7E4D9] to-[#FBEDE5]">
          {/* Decorative background shape */}
          <div
            aria-hidden="true"
            className="absolute right-[14%] top-1/2 -z-10 size-56 -translate-y-1/2 rounded-full bg-[#EFB7A6]/45 blur-2xl sm:size-72"
          />

          <div className="grid min-h-[210px] items-center sm:min-h-[230px] lg:grid-cols-[1fr_1.05fr]">
            {/* Copy */}
            <div className="relative z-10 px-5 py-7 sm:px-8 sm:py-8 lg:pl-14 lg:pr-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text sm:text-xs">
                A new way to shop
              </p>

              <h2 className="mt-2 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-text sm:text-4xl lg:text-[2.65rem]">
                Bored of Normal Shopping?
                <span className="block text-primary">Try Swipe Mode.</span>
              </h2>

              <p className="mt-3 max-w-md text-xs leading-5 text-text/75 sm:text-sm sm:leading-6">
                Swipe through products, learn short stories of impact, and
                discover your next favorite product in seconds.
              </p>

              <Link
                href="/swipe"
                className="mt-4 inline-flex min-h-9 items-center justify-center gap-3 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
              >
                Start Swiping Now
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Phone mockup */}
            <div className="relative min-h-[230px] overflow-hidden sm:min-h-[280px] lg:h-full">
              <Image
                src="/images/homepage/swipe-mode-phone-mockup.png"
                alt="Avanya Swipe Mode showing an artisan product on a phone"
                fill
                priority={false}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-contain object-center lg:object-right"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
