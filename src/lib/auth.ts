import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail as sendEmail } from '@/lib/email';
import { sendPasswordResetEmail } from '@/lib/email';

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail(user.email, url);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,

    callbackURL: '/verify-email',

    sendVerificationEmail: async ({ user, url }) => {
      const verificationUrl = new URL(url);
      verificationUrl.searchParams.set(
        'callbackURL',
        `${process.env.BETTER_AUTH_URL}/verify-email`
      );

      await sendEmail(user.email, verificationUrl.toString());
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google'],
      disableImplicitLinking: false,
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
});
