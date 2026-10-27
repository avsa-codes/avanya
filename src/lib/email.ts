import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  verificationUrl: string
) {
  const { data, error } = await resend.emails.send({
    from: `Avanya <info@${process.env.RESEND_EMAIL_DOMAIN}>`,
    to: email,
    subject: 'Verify your email address — Avanya',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 20px; color: #222;">
        <h1 style="font-size: 26px;">Welcome to Avanya!</h1>
        <p>Please verify your email address to finish setting up your account.</p>
        <p style="margin: 28px 0;">
          <a
            href="${verificationUrl}"
            style="background: #292524; color: #fff; padding: 13px 22px; border-radius: 8px; text-decoration: none; display: inline-block;"
          >
            Verify email address
          </a>
        </p>
        <p>If you didn't create an Avanya account, you can ignore this email.</p>
        <p style="font-size: 12px; color: #777;">If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="font-size: 12px; overflow-wrap: anywhere;">${verificationUrl}</p>
      </div>
    `,
  });

  if (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Could not send verification email.');
  }

  return data;
}


//Reset- password


export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const { data, error } = await resend.emails.send({
    from: `Avanya <info@${process.env.RESEND_EMAIL_DOMAIN}>`,
    to: email,
    subject: 'Reset your Avanya password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 20px; color: #222;">
        <h1>Reset your password</h1>
        <p>We received a request to reset your Avanya account password.</p>
        <p style="margin: 28px 0;">
          <a href="${resetUrl}" style="background: #292524; color: #fff; padding: 13px 22px; border-radius: 8px; text-decoration: none; display: inline-block;">
            Reset password
          </a>
        </p>
        <p>If you didn't request a password reset, you can ignore this email.</p>
        <p style="font-size: 12px; color: #777;">If the button doesn't work, copy this link into your browser:</p>
        <p style="font-size: 12px; overflow-wrap: anywhere;">${resetUrl}</p>
      </div>
    `,
  });

  if (error) {
    console.error('Failed to send password reset email:', error);
    throw new Error('Could not send password reset email.');
  }

  return data;
}

