'use server';

/**
 * @fileOverview An AI agent for suggesting user roles based on a job description.
 *
 * - suggestUserRole - A function that suggests user roles based on a job description.
 * - SuggestUserRoleInput - The input type for the suggestUserRole function.
 * - SuggestUserRoleOutput - The return type for the suggestUserRole function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return suggestUserRoleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestUserRolePrompt',
  input: {schema: SuggestUserRoleInputSchema},
  output: {schema: SuggestUserRoleOutputSchema},
  prompt: `You are an expert in organizational structure and role assignment. Based on the provided job description, suggest a list of suitable user roles.

Job Description: {{{jobDescription}}}

Suggested Roles:`,
});

const suggestUserRoleFlow = ai.defineFlow(
  {
    name: 'suggestUserRoleFlow',
    inputSchema: SuggestUserRoleInputSchema,
    outputSchema: SuggestUserRoleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
