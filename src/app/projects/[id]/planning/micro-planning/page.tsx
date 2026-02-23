'use client';

import { use } from "react";
import { SprintPlanning } from "@/components/projects/micro-planning/sprint-planning";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";

export default function MicroPlanningPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Sprint Planning"
        description="Plan and manage your project sprints and backlog items."
      />

      
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <SprintPlanning />
        </CardContent>
      </Card>
    </div>
  );
}
