'use server';

import { db } from '@/models';
import contacts, { SelectContacts } from '@/models/schema/contacts';
import { ErrorLogger, errorLogger } from '@/utils/error';

export async function editContact(contactId: SelectContacts['id'], contact: Partial<SelectContacts>): Promise<{ success: true; contact: SelectContacts } | ErrorLogger> {
  try {
    if (contact.id && contactId !== contact.id) throw new Error("Tried to modify contact's id. Not allowed");
    const [contactDB] = await db.update(contacts).set(contact).returning();
    return { success: true, contact: contactDB };
  } catch (e) {
    return errorLogger(e);
  }
}
