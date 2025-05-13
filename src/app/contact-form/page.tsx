'use client';

import { Button } from '@/components/ui/button';
import { createContact } from './actions/create-contact';
import { toast } from 'sonner';
import { contactSchema, inputNames } from './types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/image-upload';

export default function Page() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      imgUrl: '',
    },
  });
  return (
    <main className="flex h-screen items-center justify-center">
      <Form {...form}>
        <form
          className="w-96 space-y-6 rounded p-4 shadow"
          onSubmit={form.handleSubmit(async ({ name, imgUrl }: z.infer<typeof contactSchema>) => {
            const { isSuccess } = await createContact({ name, imgUrl });
            if (isSuccess) toast.success('Contact added.');
          })}
        >
          {/* <div>
            <Label htmlFor={inputNames.name} className="mb-2">
              Name
            </Label>
            <Input id={inputNames.name} name={inputNames.name} placeholder="John" />
            </div> */}
          <FormField
            control={form.control}
            name={inputNames.imgUrl}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload imgUrl={form.getValues('imgUrl')} setImgUrl={field.onChange} imgUrlInputProps={{ ...field }} />
                </FormControl>
                <div className="flex justify-center">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={inputNames.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={inputNames.name}>Name</FormLabel>
                <FormControl>
                  {/* Or onValueChange={field.onChange} defaultValue={field.value} */}
                  <Input id={inputNames.name} placeholder="John" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}

// https://www.youtube.com/watch?v=0VqijABRq5Y
