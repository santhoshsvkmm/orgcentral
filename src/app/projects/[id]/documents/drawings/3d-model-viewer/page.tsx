
'use client';

import { useState, useEffect, use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Box as BoxIcon, Edit3, MessageSquarePlus } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}

export default function ModelViewerPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
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
    }
  }, [projectId]);

  if (isLoading) {
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
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageTitle
        title={`3D Model Space: ${projectName || 'Project'}`}
        description="View, interact with, annotate, and manage 3D models associated with this project."
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project Dashboard
            </Link>
          </Button>
        }
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BoxIcon className="mr-2 h-5 w-5 text-primary" />
            3D Model Interaction, Annotation & Management
          </CardTitle>
          <CardDescription>
            This area is designated for viewing, interacting with, annotating, and potentially editing 3D models (e.g., IFC, BIM).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-md">
            <p className="font-semibold text-purple-700">About 3D Model Capabilities:</p>
            <p className="text-sm text-purple-600 mt-1">
              For viewing, editing, annotating, and managing complex 3D models, especially Industry Foundation Classes (IFC) files common in BIM, a specialized JavaScript library like <strong>IFC.js</strong> or similar WebGL-based toolkits would typically be integrated here.
            </p>
             <p className="text-sm text-purple-600 mt-1">
              These libraries allow for loading, rendering, and interacting with 3D building models directly in the browser. Advanced features could include model editing, collaborative annotation, and version control.
            </p>
          </div>
          
          <div className="mt-6 p-0 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed overflow-hidden" >
            <Image 
              src="https://images.unsplash.com/photo-1633010443869-b80087736112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="3D architectural model placeholder" 
              width={1200} 
              height={800} 
              className="w-full h-full object-cover"
              data-ai-hint="3d model architecture"
            />
            <div className="absolute flex flex-col items-center justify-center text-center p-4 bg-black/30 rounded-md">
                <MessageSquarePlus className="h-12 w-12 text-white/70 mb-2" />
                <p className="text-lg font-semibold text-white">3D Viewer & Annotator Area</p>
                <p className="text-xs text-white/80">Interactive model viewing and annotation tools will be available here.</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include model navigation tools, section cuts, property inspection, detailed annotation features, and version history for model edits and markups.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
