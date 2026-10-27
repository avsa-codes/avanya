'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { authClient } from '@/lib/auth-client';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');
  const invalidToken = searchParams.get('error');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!token) {
      setError(
        'This reset link is invalid or has expired. Please request a new one.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (resetError) {
        setError(resetError.message || 'Could not reset your password.');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="mx-auto max-w-md p-6 text-center">
        <h1 className="mb-3 text-2xl font-bold">Password updated</h1>
        <p className="mb-6 text-gray-600">
          Your password has been reset. You can now log in with your new
          password.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="rounded-md bg-black px-5 py-3 text-white"
        >
          Go to login
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-3 text-2xl font-bold">Choose a new password</h1>

      {invalidToken ? (
        <p className="mb-4 text-sm text-red-600">
          This reset link is invalid or has expired. Please request a new one.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-1 block">
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
            className="w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={8}
            required
            className="w-full rounded-md border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading || Boolean(invalidToken)}
          className="w-full rounded-md bg-black p-2 text-white disabled:opacity-50"
        >
          {loading ? 'Updating password...' : 'Reset password'}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link href="/login" className="text-green-700 hover:underline">
          Back to login
        </Link>
      </p>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="p-6 text-center">Loading...</main>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
