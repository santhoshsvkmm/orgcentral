
'use client';

import { use, useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, UsersRound } from 'lucide-react';

import { ResourceAllocationComponent } from '@/components/projects/resource-allocation';

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

  const [projectName, setProjectName] = useState<string>('');
  const [isLoadingProject, setIsLoadingProject] = useState(true);

  useEffect(() => {
    if (projectId) {
      getProjectNameById(projectId).then(name => {
        setProjectName(name);
        setIsLoadingProject(false);
      });
    }
  }, [projectId]);

  return (
    <div className="space-y-6">
      
      <PageTitle
        title={`Resource Allocation: ${projectName || (projectId ? `Project ${projectId}` : 'Project')}`}
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

      <ResourceAllocationComponent projectId={projectId} />

      <Card className="shadow-sm border-dashed bg-muted/30">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-primary" />
            Planning Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Resource allocation helps you identify bottlenecks and ensure team members are not overallocated.
            Use the "By Resource" view to see individual workloads and the "By Task" view to see assignments per work item.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
