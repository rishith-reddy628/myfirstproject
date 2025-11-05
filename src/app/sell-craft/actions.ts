'use server';

import { addDoc, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';
import { initializeFirebase } from '@/firebase';
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
    .refine((file) => file.size > 0, 'Please upload an image.')
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
  
  // This is a simplified example. In a real app, you'd upload to Firebase Storage
  // and get a download URL. For now, we'll use a placeholder.
  const imageURL = 'https://picsum.photos/seed/placeholder/600/400';

  const { firestore } = initializeFirebase();
  if (!firestore) {
    return { message: 'Firestore is not initialized.' };
  }

  try {
    const marketplaceListingsRef = collection(firestore, 'marketplace_listings');
    await addDoc(marketplaceListingsRef, {
      name: parsed.data.title,
      description: parsed.data.description,
      material: parsed.data.material,
      price: parsed.data.price,
      imageURL: imageURL,
      // In a real app, you would get the sellerId from the authenticated user
      sellerId: 'temp-user',
    });
    
    return {
      message: 'Craft listed successfully!',
    };

  } catch (e: any) {
    console.error(e);
    return {
      message: 'An error occurred while listing the craft. Please try again.',
    };
  }
}
