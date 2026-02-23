'use client';

import { use } from "react";
import { EnhancedGanttChart } from "@/components/projects/enhanced-gantt-chart";
import { PageTitle } from "@/components/page-title";

export default function GanttPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Sprint Gantt Chart"
        description="Visual timeline for sprint tasks and dependencies."
      />

      
      <EnhancedGanttChart projectId={projectId} projectName="Sprint Timeline" />
    </div>
  );
}
