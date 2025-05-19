'use server';

import { db } from '@/models';
import contacts, { InsertContacts, SelectContacts } from '@/models/schema/contacts';
import { ErrorLogger, errorLogger } from '@/utils/error';

export async function addContact(contact: InsertContacts): Promise<({ contact: SelectContacts } & { success: true }) | ErrorLogger> {
  try {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return { success: true, contact: newContact };
  } catch (e) {
    return errorLogger(e);
  }
}
