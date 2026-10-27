'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      const { error: signUpError } = await authClient.signUp.email(
        {
          name,
          email,
          password,
        },
        {
          onSuccess: () => {
            setEmailSent(true);
            setPassword('');
          },
        }
      );

      if (signUpError) {
        setError(signUpError.message || 'Registration failed.');
        return;
      }

      // Show email confirmation instructions instead of redirecting.
      setEmailSent(true);
      setPassword('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <main className="mx-auto max-w-md p-6 text-center">
        <div className="mb-4 text-4xl" aria-hidden="true">
          ✉️
        </div>

        <h1 className="mb-3 text-2xl font-bold">Check your email</h1>

        <p className="mb-4 text-gray-600">We've sent a verification link to:</p>

        <p className="mb-4 break-all font-medium">{email}</p>

        <p className="mb-6 text-sm text-gray-600">
          Click the link in the email to verify your address and finish setting
          up your Avanya account. Check your spam folder too.
        </p>

        <button
          type="button"
          onClick={() => setEmailSent(false)}
          className="text-sm underline"
        >
          Back to registration
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Create your Avanya account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block">
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-md border p-2"
          />
        </div>

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

        <div>
          <label htmlFor="password" className="mb-1 block">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            className="w-full rounded-md border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black p-2 text-white disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </form>

      <div className="mt-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <GoogleSignInButton />
      </div>
    </main>
  );
}
