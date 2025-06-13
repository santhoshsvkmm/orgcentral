
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FilePlus2 } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

export default function GenerateQuotationPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Generate Quotation: ${projectName}`}
        description="Create or update the quotation for this project."
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
            <FilePlus2 className="mr-2 h-5 w-5 text-primary" />
            Quotation Builder
          </CardTitle>
          <CardDescription>
            Use this tool to build or modify the project quotation, including line items, pricing, and terms.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="quotation builder interface">
            <FilePlus2 className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Quotation Builder Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">An interactive form or tool for creating quotations will be here.</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include templates, product/service catalogs, and PDF generation.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
