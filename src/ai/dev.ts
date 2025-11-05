'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-eco-craft-ideas.ts';
import '@/ai/flows/waste-management-chat.ts';
