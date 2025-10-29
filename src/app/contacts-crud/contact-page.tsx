'use client';
import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, Trash } from 'lucide-react';
import { AddContacts } from './components/add-contact-modal';
import { useState } from 'react';
import { SelectContacts } from '@/models/schema/contacts';
import { deleteContact } from './actions/delete-contact';
import { toast } from 'sonner';
import EditContactModal from './components/edit-contact-modal';
import { ErrorBoundary } from 'react-error-boundary';

export default function ContactPage({ contacts: dbContacts = [] }: { contacts: SelectContacts[] }) {
  const [contacts, setContacts] = useState<SelectContacts[]>(dbContacts);
  const [error, setError] = useState('');
  return (
    <div className="flex h-screen items-center justify-center">
      <main className="w-[600px] rounded shadow">
        <header className="mx-4 flex items-center justify-between border-b-1 py-6">
          <h1 className="text-xl">Contacts</h1>
          <div className="space-x-4">
            {/* DO NOT crash the whole page. Crash only an island */}
            <ErrorBoundary fallback={<p className="text-destructive font-semibold">Add Contacts broke</p>}>
              <AddContacts
                onAdd={contact =>
                  setContacts(prev => {
                    setError('');
                    return [contact, ...prev];
                  })
                }
                onError={setError}
              />
            </ErrorBoundary>
            <ModeToggle />
          </div>
        </header>
        <section className="pt-4">
          <span>{error}</span>
          {contacts.map(contact => (
            <article key={contact.id} className="group hover:bg-primary/1 relative flex items-center justify-between p-4 transition-all duration-300">
              <div className="group-hover:bg-primary absolute top-0 left-0 h-full w-0.5"></div>
              <div className="flex items-center gap-4">
                <Avatar className="size-10">
                  <AvatarFallback>{contact.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="bg-muted rounded px-2 text-sm">{contact.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Eye />
                </Button>
                <EditContactModal
                  onEdit={editedContact =>
                    setContacts(prev => {
                      const filtered = prev.filter(c => c.id !== contact.id);
                      setError('');
                      return [editedContact, ...filtered];
                    })
                  }
                  contact={contact}
                  onError={setError}
                />
                <Button
                  onClick={async () => {
                    const result = await deleteContact(contact.id);
                    if (!result.success) {
                      toast.error(result.error);
                      setError(result.error);
                      return;
                    }
                    setError('');
                    setContacts(prev => prev.filter(c => c.id !== contact.id));
                    toast.success(`${contact.name} deleted`);
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <Trash />
                </Button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
