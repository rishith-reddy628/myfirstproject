'use server';

import { generateEcoCraftIdeas, GenerateEcoCraftIdeasInput } from '@/ai/flows/generate-eco-craft-ideas';
import { z } from 'zod';

const schema = z.object({
  wasteMaterial: z.string().min(3, 'Please enter a material with at least 3 characters.'),
});

export type FormState = {
  message: string;
  craftIdeas?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function generateIdeasAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Failed to generate ideas.',
      issues,
    };
  }

  try {
    const { craftIdeas } = await generateEcoCraftIdeas(parsed.data as GenerateEcoCraftIdeasInput);
    return {
      message: 'Ideas generated successfully!',
      craftIdeas: craftIdeas,
    };
  } catch (e) {
    return {
      message: 'An error occurred while generating ideas. Please try again.',
    };
  }
}
