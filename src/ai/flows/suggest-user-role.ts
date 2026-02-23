"use server";

/**
 * @fileOverview An AI agent for suggesting user roles based on a job description.
 *
 * - suggestUserRole - A function that suggests user roles based on a job description.
 * - SuggestUserRoleInput - The input type for the suggestUserRole function.
 * - SuggestUserRoleOutput - The return type for the suggestUserRole function.
 */

import { z } from 'zod';

const SuggestUserRoleInputSchema = z.object({
  jobDescription: z.string().describe('The job description to analyze.'),
});
export type SuggestUserRoleInput = z.infer<typeof SuggestUserRoleInputSchema>;

const SuggestUserRoleOutputSchema = z.object({
  suggestedRoles: z
    .array(z.string())
    .describe('An array of suggested user roles based on the job description.'),
});
export type SuggestUserRoleOutput = z.infer<typeof SuggestUserRoleOutputSchema>;

export async function suggestUserRole(input: SuggestUserRoleInput): Promise<SuggestUserRoleOutput> {
  // Dynamically import genkit and define the prompt at runtime so the
  // build does not attempt to resolve heavy server-side-only dependencies
  // unless explicitly executed at runtime.
  const { genkit } = await import('genkit');
  const { googleAI } = await import('@genkit-ai/googleai');

  const ai = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.0-flash',
  });

  const prompt = ai.definePrompt({
    name: 'suggestUserRolePrompt',
    input: { schema: SuggestUserRoleInputSchema },
    output: { schema: SuggestUserRoleOutputSchema },
    prompt: `You are an expert in organizational structure and role assignment. Based on the provided job description, suggest a list of suitable user roles.

Job Description: {{{jobDescription}}}

Suggested Roles:`,
  });

  const { output } = await prompt(input);
  return output!;
}
