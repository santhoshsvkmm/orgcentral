
'use client';

import { useState, useEffect, use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Target } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}

export default function MilestonesPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
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
          setProjectName("Error");
          setIsLoading(false);
        });
    } else {
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
        title={`Project Milestones: ${projectName || (projectId ? `Project ${projectId}` : 'Project')}`}
        description="Track key project milestones, their target dates, and completion status."
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
            <Target className="mr-2 h-5 w-5 text-primary" />
            Milestone Tracking
          </CardTitle>
          <CardDescription>
            This area is designated for displaying and managing project milestones.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md">
            <p className="font-semibold text-green-700">Note on Milestones Implementation:</p>
            <p className="text-sm text-green-600 mt-1">
              A full milestone tracking system would typically involve features like adding, editing, and deleting milestones, setting target dates, assigning owners, and marking completion status.
            </p>
          </div>

          <p className="text-muted-foreground">
            Future enhancements could include a visual timeline of milestones, progress indicators, and integration with task completion.
          </p>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="milestones list placeholder">
            <Target className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Milestones Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Key project milestones will be listed here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            For now, this page serves as a placeholder. We can build out the milestone management functionality as needed.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
