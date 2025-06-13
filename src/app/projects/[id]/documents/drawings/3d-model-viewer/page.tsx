
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Box as BoxIcon } from 'lucide-react'; // Using Box for 3D model icon

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
  
  const projectName = use(getProjectNameById(projectId));


  return (
    <>
      <PageTitle
        title={`3D Model Viewer: ${projectName}`}
        description="View and interact with 3D models associated with this project."
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
            3D Model Interaction
          </CardTitle>
          <CardDescription>
            This area is designated for viewing and interacting with 3D models (e.g., IFC, BIM).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-md">
            <p className="font-semibold text-purple-700">About 3D Model Viewing:</p>
            <p className="text-sm text-purple-600 mt-1">
              For viewing complex 3D models, especially Industry Foundation Classes (IFC) files common in BIM, a specialized JavaScript library like <strong>IFC.js</strong> would typically be integrated here.
            </p>
             <p className="text-sm text-purple-600 mt-1">
              IFC.js allows for loading, rendering, and interacting with 3D building models directly in the browser.
            </p>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="3d model viewer placeholder">
            <BoxIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">3D Model Viewer Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">An interactive 3D model viewer canvas would appear here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include model navigation tools, section cuts, property inspection, and annotation features.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
