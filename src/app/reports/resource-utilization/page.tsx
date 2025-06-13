
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react"; // Renamed to avoid conflict

export default function ResourceUtilizationPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <UsersIcon className="mr-2 h-5 w-5 text-primary" />
          Resource Utilization
        </h2>
        {/* Add actions like "Filter by Department" or "Export Report" here */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Team & Resource Allocation Analysis</CardTitle>
          <CardDescription>Analyze how resources (team members, equipment) are being utilized across projects and tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="utilization charts">
            <UsersIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Resource Utilization Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">
              Charts and tables showing workload, capacity, and utilization rates for resources will be here.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Could be filtered by project, team, or individual resource.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
