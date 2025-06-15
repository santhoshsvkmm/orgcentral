'use client';

import { PageTitle } from "@/components/page-title";
import { MicroPlanning } from "./micro-planning";
import { Button } from "@/components/ui/button";
import { Download, Upload, RefreshCw } from "lucide-react";

interface ProjectPlanningPageProps {
  projectId: string;
  projectName: string;
}

export function ProjectPlanningPage({ projectId, projectName }: ProjectPlanningPageProps) {
  return (
    <div className="container mx-auto py-6">
      <PageTitle
        title={`${projectName} - Planning`}
        description="Manage project planning, tasks, milestones, and resource allocation."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        }
      />

      <MicroPlanning projectId={projectId} projectName={projectName} />
    </div>
  );
}