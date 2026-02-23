'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FileCheck2 } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

export default function ClientAgreementPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Client Agreement: ${projectName}`}
        description="Manage the client agreement and related contractual documents for this project."
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
            <FileCheck2 className="mr-2 h-5 w-5 text-primary" />
            Client Contract & Agreement
          </CardTitle>
          <CardDescription>
            Store, view, and manage versions of the client agreement and any amendments for this project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="document viewer client contract">
            <FileCheck2 className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Client Agreement Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">The main client contract document and related files will be accessible here.</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include version control, e-signature integration, and key clause tracking.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
