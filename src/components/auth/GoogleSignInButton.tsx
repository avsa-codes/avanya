'use client';

import { authClient } from '@/lib/auth-client';

export default function GoogleSignInButton() {
  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/marketplace',
    });
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="group flex w-full items-center justify-center gap-3
        rounded-xl border border-gray-200 bg-white px-5 py-3
        text-sm font-semibold text-gray-700 shadow-sm
        transition-all duration-200
        hover:border-gray-300 hover:bg-gray-50 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-500 focus-visible:ring-offset-2
        active:scale-[0.99]"
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
          transform="translate(0 4)"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.13 7.13-10.2 7.13-17.58Z"
          transform="translate(0 -2)"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
          transform="translate(0 0)"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.91-5.78l-7.64-5.93c-2.13 1.43-4.85 2.28-8.27 2.28-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
          transform="translate(0 -4)"
        />
      </svg>

      <span>Continue with Google</span>
    </button>
  );
}
