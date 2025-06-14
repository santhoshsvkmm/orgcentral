
'use client';

import { useState, useEffect, use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, GanttChartSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}

export default function GanttChartPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const [projectName, setProjectName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      getProjectNameById(projectId)
        .then(name => {
          setProjectName(name);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch project name:", error);
          setProjectName("Error"); // Or handle error appropriately
          setIsLoading(false);
        });
    } else {
        // Handle case where projectId is not available
        setIsLoading(false); 
        setProjectName(null); 
    }
  }, [projectId]);

  if (isLoading && !projectName) { 
    return (
      <>
        <div className="mb-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Card className="shadow-md">
          <CardHeader>
            <Skeleton className="h-6 w-1/3 mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-72 w-full" />
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageTitle
        title={`Gantt Chart: ${projectName || (projectId ? `Project ${projectId}` : 'Project')}`}
        description="Visual timeline for project tasks, durations, and dependencies."
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
            Gantt Chart Display
          </CardTitle>
          <CardDescription>
            This area is designated for the project&apos;s Gantt chart, visualizing task schedules and progress over time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md">
            <p className="font-semibold text-blue-700">Note on Gantt Chart Implementation:</p>
            <p className="text-sm text-blue-600 mt-1">
              Integrating a comprehensive, feature-rich Gantt chart library like **dhtmlx-gantt** involves specific setup and licensing considerations that fall outside the immediate capabilities of our current UI component set (ShadCN UI & Recharts).
            </p>
          </div>

          <p className="text-muted-foreground">
            While **ShadCN UI charts (based on Recharts)** can be used to create simplified Gantt-like visualizations (e.g., using horizontal bar charts to represent task durations against a timeline), developing a full-fledged Gantt chart with features such as interactive task dependencies, drag-and-drop scheduling, critical path highlighting, and resource management typically requires a dedicated Gantt component or library.
          </p>

          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="gantt chart placeholder">
            <GanttChartSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Gantt Chart Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Task timeline visualization will appear here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            For a rich Gantt experience as offered by specialized libraries like dhtmlx-gantt, further integration steps would be necessary. We can explore options for a simplified custom Gantt representation using available tools if that meets your needs.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
