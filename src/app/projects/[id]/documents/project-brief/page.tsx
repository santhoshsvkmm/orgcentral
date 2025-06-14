
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}


export default function ProjectBriefPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  
  const projectName = use(getProjectNameById(projectId));


  return (
    <>
      <PageTitle
        title={`Project Brief: ${projectName}`}
        description="Overview of the project's objectives, scope, and key stakeholders."
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
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Project Brief Document
          </CardTitle>
          <CardDescription>
            This section is designated for the comprehensive project brief, outlining its core objectives, scope, deliverables, and key stakeholders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-md">
            <p className="font-semibold text-indigo-700">Note on Project Brief Management:</p>
            <p className="text-sm text-indigo-600 mt-1">
              A full project brief management system would allow for rich text editing, version control, and collaborative input.
            </p>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="project brief document">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Project Brief Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">The official project brief document will be displayed or managed here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include templates for project briefs, approval workflows, and integration with initial planning phases.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
