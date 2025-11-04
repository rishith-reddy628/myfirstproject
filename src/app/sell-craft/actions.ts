'use server';

import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  material: z.string().min(3, 'Material must be at least 3 characters.'),
  price: z.coerce.number().gt(0, 'Price must be greater than 0.'),
  photo: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

export type FormState = {
  message: string;
  issues?: Record<string, string>;
  fields?: Record<string, string>;
};

export async function sellCraftAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.flatten().fieldErrors;
    return {
      message: 'Failed to list craft. Please check the errors below.',
      issues: {
          ...issues,
          title: issues.title?.join(', '),
          description: issues.description?.join(', '),
          material: issues.material?.join(', '),
          price: issues.price?.join(', '),
          photo: issues.photo?.join(', '),
      }
    };
  }

  // Here you would typically handle the file upload and save the data to a database.
  // For this prototype, we'll just log the data and return a success message.
  console.log('New craft for sale:', parsed.data);
  console.log('Photo details:', {
    name: parsed.data.photo.name,
    type: parsed.data.photo.type,
    size: parsed.data.photo.size,
  });

  return {
    message: 'Craft listed successfully!',
  };
}
