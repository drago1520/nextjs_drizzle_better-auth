import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { anonymous, magicLink, openAPI } from 'better-auth/plugins';
import { db, schema } from '@/models';
import { anonymousConfig } from './anonymous.config';
import { sendMagicLink } from './magic-link.config';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      prompt: 'select_account',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema: schema,
  }),
  plugins: [
    nextCookies(),
    magicLink({
      //? Works only if WITH_MAGIC_LINK == true
      sendMagicLink,
    }),
    openAPI(),
    anonymous(anonymousConfig),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 365, // 1 year
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, //? Instead of always hitting the db for session check.
    },
  },
});
