'use client';

import { use } from "react";
import { EnhancedKanbanBoard } from "@/components/projects/enhanced-kanban-board";
import { PageTitle } from "@/components/page-title";

export default function KanbanPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Kanban Board"
        description="Track your project tasks and workflow progress visually."
      />

      
      <EnhancedKanbanBoard projectId={projectId} />
    </div>
  );
}
