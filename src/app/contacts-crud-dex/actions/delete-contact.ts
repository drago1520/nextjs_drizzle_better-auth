'use server';

import { db } from '@/models';
import contacts, { SelectContacts } from '@/models/schema/contacts';
import { errorLogger, ErrorLogger } from '@/utils/error';
import { eq } from 'drizzle-orm';

export async function deleteContact(contactId: SelectContacts['id']): Promise<{ success: true } | ErrorLogger> {
  try {
    const { rowCount } = await db.delete(contacts).where(eq(contacts.id, contactId));
    if (!rowCount) throw new Error('No record modified while deleting contact');
    return { success: true };
  } catch (e) {
    return errorLogger(e);
  }
}
