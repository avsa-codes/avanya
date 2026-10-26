'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { House, Store, Users, UserRound } from 'lucide-react';



export default function MobileNavbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const navigationItems = [
    { label: 'Home', href: '/', icon: House },
    { label: 'Shop', href: '/marketplace', icon: Store },
    { label: 'Artisans', href: '/artisans', icon: Users },
    {
      label: 'Account',
      href: isPending ? '/login' : session?.user ? '/dashboard' : '/login',
      icon: UserRound,
    },
  ];  

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="mx-auto grid h-16 max-w-lg grid-cols-4">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(`${item.href}/`));

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                isActive
                  ? 'font-semibold text-primary'
                  : 'text-text/60 hover:text-primary'
              }`}
            >
              <Icon size={21} strokeWidth={isActive ? 2 : 1.7} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
