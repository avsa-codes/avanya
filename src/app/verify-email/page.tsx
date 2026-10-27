'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error) {
    return (
      <main className="mx-auto max-w-md p-6 text-center">
        <h1 className="mb-3 text-2xl font-bold">Verification link issue</h1>
        <p className="mb-6 text-gray-600">
          This verification link may be invalid or expired. Please request a new
          one.
        </p>
        <Link href="/register" className="underline">
          Back to registration
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md p-6 text-center">
      <div className="mb-4 text-4xl" aria-hidden="true">
        ✓
      </div>
      <h1 className="mb-3 text-2xl font-bold">Email verified</h1>
      <p className="mb-6 text-gray-600">
        Your email address has been verified. Welcome to Avanya!
      </p>
      <Link
        href="/marketplace"
        className="inline-block rounded-md bg-black px-5 py-3 text-white"
      >
        Explore the marketplace
      </Link>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<main className="p-6 text-center">Loading...</main>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
