'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MilestoneList } from "./milestone-list";
import { KanbanBoard } from "./kanban-board";
import { ResourceAllocationComponent } from "./resource-allocation";
import { GanttChart } from "@/components/ui/gantt-chart";

interface MicroPlanningProps {
  projectId: string;
  projectName: string;
}

export function MicroPlanning({ projectId, projectName }: MicroPlanningProps) {
  const [activeTab, setActiveTab] = useState("milestones");

  return (
    <Card className="shadow-sm mt-8">
      <CardHeader>
        <CardTitle>Micro Planning</CardTitle>
        <CardDescription>
          Detailed planning and tracking for project tasks, milestones, and resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="milestones" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
            <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="milestones">
            <MilestoneList projectId={projectId} />
          </TabsContent>
          
          <TabsContent value="kanban">
            <KanbanBoard projectId={projectId} />
          </TabsContent>
          
          <TabsContent value="gantt">
            <div className="bg-card rounded-md border p-4">
              <GanttChart projectId={projectId} projectName={projectName} />
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <ResourceAllocationComponent projectId={projectId} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}