'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function AuthNavLinks() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (session?.user) {
    return (
      <Link
        href="/dashboard"
        className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
      >
        Account
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
    >
      Sign In
    </Link>
  );
}
