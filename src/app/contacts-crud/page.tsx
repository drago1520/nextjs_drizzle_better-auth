import { db } from '@/models';
import ContactPage from './contact-page';

export default async function ServerPage() {
  const contacts = await db.query.contacts.findMany();
  return <ContactPage contacts={contacts} />;
}
