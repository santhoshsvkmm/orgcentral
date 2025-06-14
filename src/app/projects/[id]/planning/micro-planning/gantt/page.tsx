
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, GanttChartSquare } from 'lucide-react';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}


export default function MicroPlanningGanttPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  
  const projectName = use(getProjectNameById(projectId || '')); 

  return (
    <>
      <PageTitle
        title={`Micro Planning: Gantt Chart - ${projectName || (projectId ? `Project ${projectId}`: 'Project')}`}
        description="Visual timeline for tasks within the current sprint or iteration."
        actions={
          <Button variant="outline" asChild disabled={!projectId}>
            <Link href={projectId ? `/projects/${projectId}` : '/projects'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {projectId ? 'Project Details' : 'Projects'}
            </Link>
          </Button>
        }
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <GanttChartSquare className="mr-2 h-5 w-5 text-primary" />
            Sprint Gantt Chart
          </CardTitle>
          <CardDescription>
            This Gantt chart focuses on the tasks, durations, and dependencies specific to the current micro-planning cycle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="p-4 border-l-4 border-teal-500 bg-teal-50 rounded-md">
            <p className="font-semibold text-teal-700">Note on Sprint Gantt Chart:</p>
            <p className="text-sm text-teal-600 mt-1">
              This view is tailored for short-term planning within a sprint or iteration, highlighting immediate task schedules and dependencies.
            </p>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="sprint gantt chart placeholder">
            <GanttChartSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Sprint Gantt Chart Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Task timeline visualization for the current micro-cycle will appear here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            This chart would typically show tasks planned for a 1-4 week period, allowing for focused tracking and adjustments.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
