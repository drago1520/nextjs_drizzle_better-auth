import { z } from 'zod';

export const inputNames: { name: 'name'; imgUrl: 'imgUrl' } = {
  name: 'name',
  imgUrl: 'imgUrl',
};
export const contactSchema = z.object({
  [inputNames.name]: z.string().min(3, 'Title must be at leasr 3 characters.').max(50, 'Title must be less than 50 characters'),
  // [inputNames.imgUrl]: z.instanceof(File, {message: 'Input must be of type "File"'}).refine(file => file.size < 9.8 * 1024 * 1024, {message: 'File size must e less than 9.8MB'}).refine(file => !file.type.startsWith('image/'), {message: "Only .jpg, .jpeg, .png, .webp, .avif, .gif and .apng are supported"})
  [inputNames.imgUrl]: z.string().min(5, { message: 'You must include an image' }),
});
