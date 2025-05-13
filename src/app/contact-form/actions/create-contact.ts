'use server';

import { db } from '@/models';
import { contactSchema } from '../types';
import { z } from 'zod';

export async function createContact({ name, imgUrl }: z.infer<typeof contactSchema>): Promise<{ isSuccess: boolean; error?: string }> {
  //? compare values to Zod schema
  const { success, error } = contactSchema.safeParse({ name });
  console.error(error);
  if (!success) return { isSuccess: false, error: `Schema validation did not pass. ${error.message}}` };

  try {
    /**
     * Your db call
     */
    return { isSuccess: false, error: 'No db call.' };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return { isSuccess: false, error: error.message };
    return { isSuccess: false, error: error as string };
  }
}
