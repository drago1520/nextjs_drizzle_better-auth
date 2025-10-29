import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, schema } from '@/models';
import { plugins } from './better-auth-plugins';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET && {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          prompt: 'select_account',
        },
      }),
    ...(process.env.GITHUB_CLIENT_ID &&
      process.env.GITHUB_CLIENT_SECRET && {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }),
  },

  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema: schema,
  }),
  plugins,
  session: {
    expiresIn: 60 * 60 * 24 * 365, // 1 year
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, //? Instead of always hitting the db for session check.
    },
  },
});
