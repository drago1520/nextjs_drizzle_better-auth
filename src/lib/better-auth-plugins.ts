import { BetterAuthPlugin } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { anonymous, magicLink as m, openAPI } from 'better-auth/plugins';
import { anonymousConfig } from './anonymous.config';
import { sendMagicLink } from './magic-link.config';

const magicLink =
  process.env.WITH_MAGIC_LINK === 'true'
    ? m({
        //? Works only if WITH_MAGIC_LINK == true
        sendMagicLink,
      })
    : undefined;

export const plugins: BetterAuthPlugin[] = [nextCookies(), magicLink, openAPI(), anonymous(anonymousConfig)].filter(p => p !== undefined);
