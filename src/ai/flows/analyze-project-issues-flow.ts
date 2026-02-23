
"use server";
/**
 * @fileOverview An AI agent for analyzing project and task data to find critical issues.
 *
 * - analyzeProjectIssues - A function that analyzes project and task data.
 * - AnalyzeProjectIssuesInput - The input type for the analyzeProjectIssues function.
 * - AnalyzeProjectIssuesOutput - The return type for the analyzeProjectIssues function.
 */

import { z } from 'zod';

// Define the structure for a single task
const TaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  assignee: z.string().optional(),
  status: z.string(),
  dueDate: z.string().optional(),
});
export type Task = z.infer<typeof TaskSchema>;


const AnalyzeProjectIssuesInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z.string().optional().describe('The description of the project.'),
  projectStatus: z.string().describe('The current status of the project (e.g., In Progress, Planning, On Hold).'),
  projectStartDate: z.string().optional().describe('The start date of the project (YYYY-MM-DD).'),
  projectDueDate: z.string().optional().describe('The due date of the project (YYYY-MM-DD).'),
  tasks: z.array(TaskSchema).describe('A list of tasks associated with the project.'),
});
export type AnalyzeProjectIssuesInput = z.infer<typeof AnalyzeProjectIssuesInputSchema>;

const CriticalIssueSchema = z.object({
  issue: z.string().describe('A concise description of the identified critical issue.'),
  recommendation: z.string().optional().describe('A suggested action to mitigate or resolve the issue.'),
  severity: z.enum(['High', 'Medium', 'Low']).describe('The severity level of the issue.'),
  relatedTaskIds: z.array(z.string()).optional().describe('IDs of tasks directly related to this issue, if applicable.'),
});
export type CriticalIssue = z.infer<typeof CriticalIssueSchema>;

const AnalyzeProjectIssuesOutputSchema = z.object({
  criticalIssues: z.array(CriticalIssueSchema).describe('An array of identified critical issues.'),
  summary: z.string().optional().describe('A brief overall summary of the project health based on the analysis.'),
});
export type AnalyzeProjectIssuesOutput = z.infer<typeof AnalyzeProjectIssuesOutputSchema>;


export async function analyzeProjectIssues(input: AnalyzeProjectIssuesInput): Promise<AnalyzeProjectIssuesOutput> {
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
    name: 'analyzeProjectIssuesPrompt',
    input: { schema: AnalyzeProjectIssuesInputSchema },
    output: { schema: AnalyzeProjectIssuesOutputSchema },
    prompt: `You are an expert project management analyst AI. Your task is to identify critical issues, risks, and bottlenecks in the provided project and its tasks.

Project Details:
- Name: {{{projectName}}}
{{#if projectDescription}}- Description: {{{projectDescription}}}{{/if}}
- Status: {{{projectStatus}}}
{{#if projectStartDate}}- Start Date: {{{projectStartDate}}}{{/if}}
{{#if projectDueDate}}- Due Date: {{{projectDueDate}}}{{/if}}

Tasks:
{{#if tasks}}
{{#each tasks}}
- Task Name: {{this.name}} (ID: {{this.id}})
  - Status: {{this.status}}
  {{#if this.assignee}}- Assignee: {{this.assignee}}{{/if}}
  {{#if this.dueDate}}- Due Date: {{this.dueDate}}{{/if}}
{{/each}}
{{else}}
- No tasks provided for analysis.
{{/if}}

Analyze the project and task data. Identify potential critical issues. For each issue:
1.  Describe the issue clearly and concisely.
2.  Suggest a recommendation if possible.
3.  Assign a severity level (High, Medium, Low). High severity issues are those that could derail the project or cause significant delays/cost overruns.
4.  If the issue is tied to specific tasks, list their IDs.

Consider factors like:
- Overdue tasks (Assume current date is {{currentDate}}).
- Tasks that are 'Blocked' or 'On Hold' for extended periods (if inferable).
- Misalignment between project status and task statuses.
- Potential resource bottlenecks (e.g., many critical tasks assigned to one person, if assignee data is present).
- Risks related to project deadlines if many tasks are pending or behind schedule.
- Ambiguity or lack of clarity in project/task descriptions that might lead to problems.
- Dependencies that might be at risk (if inferable from task statuses and descriptions).

Provide a brief overall summary of the project's health based on your analysis. If no critical issues are found, state that the project appears to be on track based on the provided information.
Focus on actionable insights.
`,
  });

  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const { output } = await prompt({ ...input, currentDate });
  return output!;
}

