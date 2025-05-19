'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { addContact } from '../actions/add-contact';
import { toast } from 'sonner';
import { contactsSchema, InputNames } from '../types';
import { useState } from 'react';
import { SelectContacts } from '@/models/schema/contacts';

export function AddContacts({ onAdd, onError }: { onError: (e: string) => void; onAdd: (contact: SelectContacts) => void }) {
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
        <Button>Add Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (contact: z.infer<typeof contactsSchema>) => {
              const result = await addContact(contact);
              if (!result.success) {
                const { error } = result;
                toast.error(error);
                setError(error);
                onError(error);
                return;
              }
              toast.success('Contact added');
              onAdd(result.contact);
              setIsOpen(false);
            })}
          >
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
              <DialogDescription>
                Add a contact here. Click save when you're done.
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
