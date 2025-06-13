
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as PieChartIcon } from "lucide-react";

export default function ReportsOverviewPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
          Reports Overview
        </h2>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Reporting Dashboard</CardTitle>
          <CardDescription>
            Access a variety of reports to analyze project progress, financial health, resource allocation, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="reports overview placeholder">
            <PieChartIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Reports Overview Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">
              A summary of key reports or a dashboard of reporting widgets will be displayed here.
            </p>
          </div>
           <p className="text-sm text-muted-foreground">
            Navigate to specific report types using the tabs above.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
