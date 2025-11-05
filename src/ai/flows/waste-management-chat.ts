'use server';

/**
 * @fileOverview An AI chatbot that provides suggestions and answers related to waste management.
 *
 * - wasteManagementChat - A function that interacts with the AI model.
 * - WasteManagementChatInput - The input type for the chatbot.
 * - WasteManagementChatOutput - The return type for the chatbot.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WasteManagementChatInputSchema = z.object({
  query: z.string().describe('The user\'s question about waste management.'),
});
export type WasteManagementChatInput = z.infer<typeof WasteManagementChatInputSchema>;

const WasteManagementChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s answer to the user\'s question.'),
});
export type WasteManagementChatOutput = z.infer<typeof WasteManagementChatOutputSchema>;

export async function wasteManagementChat(
  input: WasteManagementChatInput
): Promise<WasteManagementChatOutput> {
  return wasteManagementChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wasteManagementChatPrompt',
  input: { schema: WasteManagementChatInputSchema },
  output: { schema: WasteManagementChatOutputSchema },
  prompt: `You are an expert AI assistant specializing in waste management and sustainability.

  Your role is to provide helpful, accurate, and concise answers to user questions about recycling, composting, reducing waste, and other related topics.

  User Question: {{{query}}}

  Provide a direct and informative answer.
  `,
});

const wasteManagementChatFlow = ai.defineFlow(
  {
    name: 'wasteManagementChatFlow',
    inputSchema: WasteManagementChatInputSchema,
    outputSchema: WasteManagementChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
