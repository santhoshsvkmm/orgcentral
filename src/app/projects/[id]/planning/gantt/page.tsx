'use client';

import { useState, useEffect, use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, GanttChartSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { GanttChart } from '@/components/ui/gantt-chart';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  try {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
    if (id === "1") return "Alpha Launch";
    if (id === "2") return "Beta Platform Development";
    if (id === "3") return "Gamma Initiative Research";
    return `Project (ID: ${id})`;
  } catch (error) {
    console.error('Error fetching project name:', error);
    throw new Error('Failed to fetch project name. Please try again.');
  }
}

export default function GanttChartPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const [projectName, setProjectName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dhtmlxLoaded, setDhtmlxLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          setProjectName("Unknown Project");
          setError(`Failed to load project details: ${error.message || 'Unknown error'}`);
          setIsLoading(false);
        });
    } else {
      // Handle case where projectId is not available
      setIsLoading(false); 
      setProjectName(null); 
    }
  }, [projectId]);

  // Load dhtmlxGantt CSS
  useEffect(() => {
    // Add dhtmlxGantt CSS
    try {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/vendor/dhtmlx/codebase/dhtmlxgantt.css';
      
      link.onload = () => {
        setDhtmlxLoaded(true);
      };
      
      link.onerror = () => {
        setError('Failed to load Gantt chart styles. Please refresh the page to try again.');
      };
      
      document.head.appendChild(link);
      
      return () => {
        // Clean up on unmount
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    } catch (err) {
      console.error('Error loading dhtmlxGantt CSS:', err);
      setError('An error occurred while setting up the Gantt chart. Please try again later.');
    }
  }, []);

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
            Interactive Gantt chart for project planning and scheduling. Visualize tasks, durations, dependencies, and progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="p-6 border border-red-300 bg-red-50 rounded-md">
              <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Gantt Chart</h3>
              <p className="text-red-600">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : dhtmlxLoaded && projectId && projectName ? (
            <GanttChart projectId={projectId} projectName={projectName || ''} />
          ) : (
            <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed">
              <GanttChartSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold text-foreground">Loading Gantt Chart...</p>
              <p className="text-sm text-muted-foreground mt-1">Please wait while the chart is being prepared.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}