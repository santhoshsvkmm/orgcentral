import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, CalendarDays, Users, Info } from "lucide-react";
import { TaskList } from "@/components/projects/task-list";
import { PageTitle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";

// This page is a server component, so params are passed directly.
export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const projectId = params.id;

  // Mock project data - in a real app, fetch this based on projectId
  const project = {
    name: `Project ${projectId}`,
    description: "This is a detailed description of the project, outlining its goals, scope, and expected outcomes. It involves multiple phases and stakeholders.",
    status: "In Progress",
    startDate: "2024-01-15",
    dueDate: "2024-12-31",
    teamMembers: ["Alice", "Bob", "Charlie", "Diana"],
  };

  return (
    <>
      <PageTitle 
        title={project.name}
        description="Detailed view of the project including tasks and progress."
        actions={
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Task
          </Button>
        }
      />

      <Card className="mb-8 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" /> Project Information
          </CardTitle>
          <CardDescription>Key details about this project.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-foreground">Description</h3>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground">Status</h3>
              <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1">
                <CalendarDays className="h-4 w-4 text-muted-foreground" /> Dates
              </h3>
              <p className="text-sm text-muted-foreground">Start: {project.startDate} &nbsp; | &nbsp; Due: {project.dueDate}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" /> Team Members
              </h3>
              <p className="text-sm text-muted-foreground">{project.teamMembers.join(", ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskList projectId={projectId} />
    </>
  );
}
