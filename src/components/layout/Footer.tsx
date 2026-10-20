import Image from 'next/image';
import Link from 'next/link';

const footerSections = [
  {
    title: 'Explore',
    links: [
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Artisans', href: '/artisans' },
      { label: 'Stories', href: '/stories' },
      { label: 'Swipe Mode', href: '/swipe' },
    ],
  },
  {
    title: 'For Businesses',
    links: [
      { label: 'Corporate Gifting', href: '/gifting' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" aria-label="Avanya home" className="inline-block">
              <Image
                src="/images/avanya-logo.png"
                alt="Avanya"
                width={180}
                height={66}
                className="h-auto w-[160px]"
              />
            </Link>

            <p className="max-w-xs font-display text-xl text-primary">
              Every product has a story.
            </p>

            <p className="max-w-xs text-sm leading-6 text-text/70">
              Discover meaningful products and the people and organizations
              behind them.
            </p>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 text-sm font-semibold text-text">
                {section.title}
              </h2>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-black/10 pt-6">
          <p className="text-sm text-text/60">
            © 2026 Avanya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
