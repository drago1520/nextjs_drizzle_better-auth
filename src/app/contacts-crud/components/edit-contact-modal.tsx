'use client';

import { Button } from '@/components/ui/button';
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectContacts } from '@/models/schema/contacts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { contactsSchema, InputNames } from '../types';
import { Pencil } from 'lucide-react';
import { editContact } from '../actions/edit-contact';
import { useForm } from 'react-hook-form';

export default function EditContactModal({ contact, onEdit, onError }: { contact: SelectContacts; onEdit: (contact: SelectContacts) => void; onError: (error: string) => void }) {
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof contactsSchema>>({
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      name: '',
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (editedContact: z.infer<typeof contactsSchema>) => {
              const result = await editContact(contact.id, editedContact);
              if (!result.success) {
                const { error } = result;
                toast.error(error);
                setError(error);
                onError(error);
                return;
              }
              toast.success('Contact modified');
              onEdit(result.contact);
              setIsOpen(false);
            })}
          >
            <DialogHeader>
              <DialogTitle>Edit Contact</DialogTitle>
              <DialogDescription>
                Edit a contact here. Click save when you're done.
                <span>{error}</span>
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name={InputNames.name}
              render={({ field }) => (
                <FormItem className="py-6">
                  <FormLabel htmlFor={InputNames.name}>Name</FormLabel>
                  <FormControl>
                    <Input id={InputNames.name} placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
