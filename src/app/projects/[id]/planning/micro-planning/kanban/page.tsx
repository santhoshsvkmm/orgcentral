
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, SquareKanban } from 'lucide-react';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}


export default function MicroPlanningKanbanPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Micro Planning: Kanban Board - ${projectName}`}
        description="Manage tasks for the current sprint or iteration using a Kanban board."
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project Details
            </Link>
          </Button>
        }
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <SquareKanban className="mr-2 h-5 w-5 text-primary" />
            Sprint Kanban Board
          </CardTitle>
          <CardDescription>
            Visualize task progression through different stages (e.g., To Do, In Progress, Done) for the micro-planning cycle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-md">
            <p className="font-semibold text-purple-700">Note on Kanban Implementation:</p>
            <p className="text-sm text-purple-600 mt-1">
              A fully interactive Kanban board with drag-and-drop functionality, column creation, and task details typically requires a dedicated library or significant custom development.
            </p>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="kanban board placeholder">
            <SquareKanban className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Kanban Board Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Columns for 'To Do', 'In Progress', 'Done', etc., will appear here with draggable task cards.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include swimlanes, WIP limits, and real-time collaboration features.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
