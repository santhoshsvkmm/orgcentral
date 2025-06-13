
'use client';

import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <>
      <PageTitle
        title="Reports & Analytics"
        description="Generate and view various reports for insights into your organization's performance."
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-primary" />
            Reporting Dashboard
          </CardTitle>
          <CardDescription>
            Access a variety of reports to analyze project progress, financial health, resource allocation, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="reports dashboard placeholder">
            <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Reports Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">
              A list of available reports or a custom report builder will be available here.
            </p>
          </div>
           <p className="text-sm text-muted-foreground">
            Examples: Project Status Reports, Task Completion Rates, Budget vs. Actual, Resource Utilization.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
