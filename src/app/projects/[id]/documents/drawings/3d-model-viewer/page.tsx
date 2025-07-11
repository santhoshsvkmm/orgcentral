
'use client';

import { useState, useEffect, use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Box as BoxIcon } from 'lucide-react';
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
  const projectId = params.id; // The project ID from the route params
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
            <p className="font-semibold text-purple-700">About Drawing & Model Viewing Capabilities:</p>
            <p className="text-sm text-purple-600 mt-1">
              This area is designed for viewing both 2D drawings (like DXF/DWG) and 3D models (like IFC, BIM).
            </p>
             <p className="text-sm text-purple-600 mt-1">
              Integrating specialized JavaScript libraries (e.g., Fabric.js, Konva.js for 2D, IFC.js, three.js with loaders for 3D) or connecting to dedicated CAD/BIM APIs/services is crucial for parsing, rendering, and interacting with these file formats.
            </p>
          </div>

          {/* Integrate the CadViewer component here */}
          {/* The CadViewer component will handle the rendering of both 2D and 3D data */}
          <CadViewer projectId={projectId} />
          
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include model navigation tools, section cuts, property inspection, detailed annotation features, and version history for model edits and markups.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
