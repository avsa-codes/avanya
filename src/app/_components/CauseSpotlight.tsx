import Image from 'next/image';
import Link from 'next/link';

import Card from '@/components/ui/Card';

export default function CauseSpotlight() {
  return (
    <Card className="grid overflow-hidden rounded-xl border-black/[0.06] bg-white shadow-none md:grid-cols-[1.2fr_1fr]">
      {/* Image */}
      <div className="relative min-h-[220px] bg-surface sm:min-h-[280px] md:min-h-[230px]">
        <Image
          src="/images/homepage/cause-story-women-empowerment.png"
          alt="Women learning and creating products in an artisan workshop"
          fill
          sizes="(max-width: 767px) 100vw, 55vw"
          className="object-cover"
        />
      </div>

      {/* Story */}
      <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
        {/* NGO identity */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E9E1D8] bg-[#FAF8F5] text-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-6"
              aria-hidden="true"
            >
              <path
                d="M12 3 4 7v5c0 4.5 3.4 7.5 8 9 4.6-1.5 8-4.5 8-9V7l-8-4Z"
                strokeLinejoin="round"
              />
              <path
                d="M8 12.5 10.5 15 16 9.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <p className="font-display text-xl font-semibold leading-tight text-primary">
              Aaroh
            </p>
            <p className="mt-0.5 text-xs text-text/60">
              Skills for a Brighter Future
            </p>
          </div>
        </div>

        {/* Impact statement */}
        <blockquote className="mt-5 font-display text-xl font-semibold italic leading-[1.2] text-text sm:text-2xl">
          “Every notebook purchased helps fund vocational training for 50+ young
          adults with special needs in Bengaluru.”
        </blockquote>

        <p className="mt-2 text-xs text-text/65 sm:text-sm">
          — Aaroh NGO, Bengaluru
        </p>

        {/* CTA */}
        <Link
          href="/ngos/aaroh"
          className="mt-4 inline-flex min-h-9 w-fit items-center justify-center gap-3 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
        >
          Read Full Story &amp; Shop Their Products
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Card>
  );
}
