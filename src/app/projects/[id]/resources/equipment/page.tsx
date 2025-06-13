
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

export default function EquipmentPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Equipment Management: ${projectName}`}
        description="Track and manage equipment assigned to or used by the project."
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
            <Construction className="mr-2 h-5 w-5 text-primary" />
            Equipment Log
          </CardTitle>
          <CardDescription>
            This section is for managing all equipment related to the project, including inventory, maintenance schedules, and allocation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="equipment list">
            <Construction className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Equipment Management Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">A list of project equipment, their status, and schedules will be here.</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include QR code tracking, maintenance logs, and cost analysis.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
