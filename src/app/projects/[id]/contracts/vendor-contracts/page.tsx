
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FileSignature } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

export default function VendorContractsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Vendor Contracts: ${projectName}`}
        description="Manage contracts with vendors, suppliers, and subcontractors for this project."
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
            <FileSignature className="mr-2 h-5 w-5 text-primary" />
            Vendor & Subcontractor Agreements
          </CardTitle>
          <CardDescription>
            A repository for all contracts and agreements with third-party vendors and subcontractors involved in the project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="vendor contract list">
            <FileSignature className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Vendor Contracts Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">A list of vendor contracts, their status, and key terms will be managed here.</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include renewal tracking, compliance checks, and links to related purchase orders or invoices.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
