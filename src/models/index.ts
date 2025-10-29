import { drizzle } from 'drizzle-orm/node-postgres';
import { accounts, accountsRelations } from './schema/accounts';
import { sessions, sessionsRelations } from './schema/sessions';
import { users, usersRelations } from './schema/users';
import { verifications } from './schema/verifications';
import contacts from './schema/contacts';

const tables = { users, sessions, accounts, verifications, contacts };
const relations = { usersRelations, sessionsRelations, accountsRelations };
export const schema = { ...tables, ...relations };

export const db = drizzle(process.env.DATABASE_URL!, { schema });

// Log connection (but not the full URL for security)
console.log(`Connected to database at ${new URL(process.env.DATABASE_URL!).host}`);
