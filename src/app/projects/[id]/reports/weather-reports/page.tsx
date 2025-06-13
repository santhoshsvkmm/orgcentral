
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CloudSun } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

export default function WeatherReportsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Daily Weather Reports: ${projectName}`}
        description="Log and review daily weather conditions impacting project activities."
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
            <CloudSun className="mr-2 h-5 w-5 text-primary" />
            Weather Condition Log
          </CardTitle>
          <CardDescription>
            This section is for logging and viewing daily weather reports. Track temperature, precipitation, wind, and other conditions relevant to construction and site work.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="weather chart placeholder">
            <CloudSun className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Weather Reports Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Daily weather logs, charts, and summaries will appear here.</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include automated weather data fetching, impact analysis on project schedule, and photo attachments.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
