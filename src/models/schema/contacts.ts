import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

const contacts = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 60 }).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
});

export default contacts;

export type SelectContacts = typeof contacts.$inferSelect;
export type InsertContacts = typeof contacts.$inferInsert;
