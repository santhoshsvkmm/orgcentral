
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ClipboardList } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

export default function TaskReportsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Task Reports: ${projectName}`}
        description="Analyze task progress, completion rates, and timeline performance."
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
            <ClipboardList className="mr-2 h-5 w-5 text-primary" />
            Task Performance Analysis
          </CardTitle>
          <CardDescription>
            This section is for detailed reports on project tasks. Visualize progress, identify bottlenecks, and track team performance related to tasks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="task report chart placeholder">
            <ClipboardList className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Task Reports Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Charts and data on task timelines, statuses, and assignments will appear here.</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include customizable report generation, export options, and integration with timesheet data.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
