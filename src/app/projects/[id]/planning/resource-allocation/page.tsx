
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, UsersRound } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

export default function ResourceAllocationPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId || '')); 

  return (
    <>
      <PageTitle
        title={`Resource Allocation: ${projectName || (projectId ? `Project ${projectId}`: 'Project')}`}
        description="Plan and manage resource allocation for project tasks and phases."
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
            <UsersRound className="mr-2 h-5 w-5 text-primary" />
            Resource Planning & Allocation
          </CardTitle>
          <CardDescription>
            This section is for managing the allocation of team members, equipment, and other resources across the project timeline.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="resource allocation chart">
            <UsersRound className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Resource Allocation Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Charts and tools for assigning resources to tasks and viewing workload will be here.</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include capacity planning, skill matching, and integration with task scheduling.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
