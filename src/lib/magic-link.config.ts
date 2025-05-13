import { Resend } from 'resend';
//? Works only if WITH_MAGIC_LINK is set == true

export const sendMagicLink = async ({ email, url }: { email: string; url: string; token: string }, request?: Request): Promise<void> => {
  let resend: Resend | null;
  if (process.env.WITH_MAGIC_LINK) resend = new Resend(process.env.RESEND_API_KEY);
  else return;
  try {
    const { data, error } = await resend.emails.send({
      from: `Magic Link <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Your Magic Link',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Your Magic Link</h1>
          <p>Click the button below to sign in to your account:</p>
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Sign In
          </a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all;">${url}</p>
          <p style="color: #6B7280; font-size: 14px; margin-top: 24px;">
            This link will expire in 5 minutes. If you didn't request this email, you can safely ignore it.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending magic link email:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error sending magic link email:', error);
  }
};
