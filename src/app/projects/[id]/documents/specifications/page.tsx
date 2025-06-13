
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ListOrdered } from 'lucide-react';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}


export default function SpecificationsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  
  const projectName = use(getProjectNameById(projectId));


  return (
    <>
      <PageTitle
        title={`Specifications: ${projectName}`}
        description="Detailed technical requirements, standards, and specifications for the project."
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
            <ListOrdered className="mr-2 h-5 w-5 text-primary" />
            Technical Specifications
          </CardTitle>
          <CardDescription>
            This section is for managing all detailed technical specifications, material requirements, and quality standards associated with the project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="p-4 border-l-4 border-cyan-500 bg-cyan-50 rounded-md">
            <p className="font-semibold text-cyan-700">Note on Specifications Management:</p>
            <p className="text-sm text-cyan-600 mt-1">
              A robust specifications system would support categorisation, versioning, cross-referencing with drawings and tasks, and compliance tracking.
            </p>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="technical specifications list">
            <ListOrdered className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Specifications Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Project specifications documents and details will be accessible here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Future improvements could include a searchable database of specifications, links to relevant industry standards, and tools for managing revisions and amendments.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

