import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/layout/Container';

export default function CorporateGiftingBanner() {
  return (
    <section className="py-3 sm:py-4">
      <Container>
        <div className="grid overflow-hidden rounded-xl bg-[#F7EAE1] lg:h-[300px] lg:grid-cols-[0.95fr_1.05fr]">
          {/* Text content */}
          <div className="flex items-center px-5 py-6 sm:px-8 lg:py-4 lg:pl-11 lg:pr-3">
            <div className="w-full">
              <h2 className="font-display text-3xl font-semibold leading-[1.02] tracking-tight text-primary sm:text-4xl lg:text-[2.65rem]">
                Corporate &amp; Bulk Gifting
                <span className="block text-text">with Impact.</span>
              </h2>

              <p className="mt-2 max-w-[390px] text-[11px] leading-[17px] text-text/70 sm:text-xs">
                Curated, eco-friendly hampers for events, employee rewards, and
                client appreciation. Customizable for all team sizes and
                budgets.
              </p>

              <Link
                href="/corporate-gifting"
                className="mt-3 inline-flex min-h-8 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get Custom Quote
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Hamper image */}
          <div className="relative min-h-[180px] overflow-hidden lg:h-full lg:min-h-0">
            <Image
              src="/images/homepage/corporate-gifting-hamper.png"
              alt="Avanya's curated corporate gifting hamper featuring artisan-made products"
              fill
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="object-cover object-center"
            />

            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[#F7EAE1] to-transparent lg:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
