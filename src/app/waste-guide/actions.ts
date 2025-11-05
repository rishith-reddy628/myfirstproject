'use server';

import { wasteManagementChat, WasteManagementChatInput } from '@/ai/flows/waste-management-chat';
import { z } from 'zod';

const schema = z.object({
  query: z.string().min(3, 'Please enter a question with at least 3 characters.'),
});

export type ChatFormState = {
  message: string;
  response?: string;
  issues?: string[];
};

export async function chatAction(
  prevState: ChatFormState,
  data: FormData
): Promise<ChatFormState> {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Failed to get a response.',
      issues,
    };
  }

  try {
    const { response } = await wasteManagementChat(parsed.data as WasteManagementChatInput);
    return {
      message: 'Response generated successfully!',
      response,
    };
  } catch (e) {
    return {
      message: 'An error occurred while getting a response. Please try again.',
    };
  }
}
