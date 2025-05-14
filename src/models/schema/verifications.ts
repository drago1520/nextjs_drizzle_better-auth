import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type SelectVerifications = typeof verifications.$inferSelect;
export type InsertVerifications = typeof verifications.$inferInsert;
