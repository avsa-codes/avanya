import Image from 'next/image';
import Link from 'next/link';
import { Bell, Heart, ShoppingCart } from 'lucide-react';
import AuthNavLinks from '@/components/layout/AuthNavLinks';

const navigationLinks = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Artisans', href: '/artisans' },
  { label: 'Gifting', href: '/gifting' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-surface">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand logo */}
        <Link href="/" aria-label="Avanya home" className="shrink-0">
          <Image
            src="/images/avanya-logo.png"
            alt="Avanya"
            width={190}
            height={70}
            priority
            className="h-auto w-[160px] sm:w-[180px]"
          />
        </Link>

        {/* Main navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="text-text transition-colors hover:text-primary"
          >
            <Heart size={21} strokeWidth={1.7} />
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="text-text transition-colors hover:text-primary"
          >
            <ShoppingCart size={21} strokeWidth={1.7} />
          </Link>

          <Link
            href="/notifications"
            aria-label="Notifications"
            className="text-text transition-colors hover:text-primary"
          >
            <Bell size={21} strokeWidth={1.7} />
          </Link>

          <AuthNavLinks />
        </div>
      </div>
    </header>
  );
}
