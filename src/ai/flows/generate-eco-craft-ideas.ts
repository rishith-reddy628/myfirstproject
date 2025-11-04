'use server';

/**
 * @fileOverview Generates eco-friendly craft ideas based on the specified waste material.
 *
 * - generateEcoCraftIdeas - A function that generates eco-friendly craft ideas.
 * - GenerateEcoCraftIdeasInput - The input type for the generateEcoCraftIdeas function.
 * - GenerateEcoCraftIdeasOutput - The return type for the generateEcoCraftIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEcoCraftIdeasInputSchema = z.object({
  wasteMaterial: z
    .string()
    .describe('The type of waste material available (e.g., plastic bottles, cardboard, fabric scraps).'),
});
export type GenerateEcoCraftIdeasInput = z.infer<typeof GenerateEcoCraftIdeasInputSchema>;

const GenerateEcoCraftIdeasOutputSchema = z.object({
  craftIdeas: z
    .string()
    .describe('A list of unique and creative eco-friendly craft ideas using the specified waste material.'),
});
export type GenerateEcoCraftIdeasOutput = z.infer<typeof GenerateEcoCraftIdeasOutputSchema>;

export async function generateEcoCraftIdeas(
  input: GenerateEcoCraftIdeasInput
): Promise<GenerateEcoCraftIdeasOutput> {
  return generateEcoCraftIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEcoCraftIdeasPrompt',
  input: {schema: GenerateEcoCraftIdeasInputSchema},
  output: {schema: GenerateEcoCraftIdeasOutputSchema},
  prompt: `You are an AI assistant designed to inspire creativity and sustainability.

  Generate a list of unique eco-friendly craft ideas using the following waste material:

  Material: {{{wasteMaterial}}}

  Provide a variety of creative and practical ideas that encourage users to reuse materials and reduce waste.
  Focus on originality, feasibility, and environmental impact.
  Format the ideas as a numbered list.
  `,
});

const generateEcoCraftIdeasFlow = ai.defineFlow(
  {
    name: 'generateEcoCraftIdeasFlow',
    inputSchema: GenerateEcoCraftIdeasInputSchema,
    outputSchema: GenerateEcoCraftIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
