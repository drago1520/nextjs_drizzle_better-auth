import { z } from 'zod';

export const InputNames: { name: 'name' } = {
  name: 'name',
};
export const contactsSchema = z.object({
  [InputNames.name]: z.string({ message: 'The name must be a string' }).min(3, { message: 'The name must be at least 3 charactes' }).max(50, { message: 'The name must be at most 50 characters' }),
});
