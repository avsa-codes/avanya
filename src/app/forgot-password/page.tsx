'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setLoading(true);
  setError('');
  setSuccess('');

  try {
    const { error: resetError } = await authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password',
    });

    if (resetError) {
      setError(resetError.message || 'Could not request a password reset.');
      return;
    }

    setSuccess(
      'If an account exists with this email, you will receive a password reset link shortly.'
    );
  } catch {
    setError('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-3 text-2xl font-bold">Forgot your password?</h1>

      <p className="mb-6 text-sm text-gray-600">
        Enter the email address associated with your account. We'll send you a
        link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-md border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black p-2 text-white disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {success && <p className="text-sm text-green-700">{success}</p>}
      </form>
    </main>
  );
}
