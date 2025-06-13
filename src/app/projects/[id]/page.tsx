
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, CalendarDays, Users, Info, MapPin, ToggleLeft, ToggleRight, Briefcase } from "lucide-react";
import { TaskList } from "@/components/projects/task-list";
import { PageTitle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { calculateWorkingDays, formatDate } from "@/lib/date-utils";
import { useState, useEffect } from "react";
import type { Project } from "@/components/projects/project-form"; // Assuming Project type is here

// Mock fetch function - replace with actual data fetching
async function getProjectById(id: string): Promise<Project | null> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, fetch from your projects data source
  // For now, using a hardcoded example similar to what might be in projects/page.tsx initialMockProjects
  const mockProjects: Project[] = [
    { id: "1", name: "Alpha Launch", description: "Initial launch of the Alpha platform.", status: "In Progress", startDate: "2024-06-01", dueDate: "2024-12-31", teamSize: 5, geoLocation: "New York, USA", activateMicroScheduling: true },
    { id: "2", name: "Beta Platform Development", description: "Development of the new Beta platform features.", status: "Completed", startDate: "2024-03-15", dueDate: "2024-08-15", teamSize: 8, geoLocation: "London, UK", activateMicroScheduling: false },
  ];
  return mockProjects.find(p => p.id === id) || null;
}


export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const projectId = params.id;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const fetchedProject = await getProjectById(projectId);
      setProject(fetchedProject);
      setLoading(false);
    };
    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <PageTitle title="Loading Project..." description="Please wait while we fetch the project details."/>
    );
  }

  if (!project) {
    return (
      <PageTitle title="Project Not Found" description={`Could not find project with ID: ${projectId}.`}/>
    );
  }
  
  // Example: Define some non-working days (e.g., public holidays)
  // In a real app, these would come from settings or a backend
  const companyNonWorkingDays = ["2024-07-04", "2024-12-25"];
  const workingDays = calculateWorkingDays(project.startDate, project.dueDate, companyNonWorkingDays);


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

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" /> Project Information
          </CardTitle>
          <CardDescription>Key details about this project.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{project.description || "No description provided."}</p>
          </div>
          <Separator />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Status</h3>
              <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                <CalendarDays className="h-4 w-4 text-muted-foreground" /> Dates
              </h3>
              <p className="text-sm text-muted-foreground">Start: {formatDate(project.startDate)}</p>
              <p className="text-sm text-muted-foreground">Due: {formatDate(project.dueDate)}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                <Briefcase className="h-4 w-4 text-muted-foreground" /> Working Days
              </h3>
              <p className="text-sm text-muted-foreground">
                {workingDays !== null ? `${workingDays} working day(s)` : 'Dates not set'}
              </p>
              <p className="text-xs text-muted-foreground">(Excludes weekends & company holidays)</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                <Users className="h-4 w-4 text-muted-foreground" /> Team
              </h3>
              <p className="text-sm text-muted-foreground">Members: {project.teamMembers ? project.teamMembers.join(", ") : (project.teamSize ? `${project.teamSize} member(s)` : 'N/A')}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                <MapPin className="h-4 w-4 text-muted-foreground" /> Location
              </h3>
              <p className="text-sm text-muted-foreground">{project.geoLocation || 'N/A'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                {project.activateMicroScheduling ? <ToggleRight className="h-4 w-4 text-green-500" /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                Micro Scheduling
              </h3>
              <p className="text-sm text-muted-foreground">{project.activateMicroScheduling ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskList projectId={projectId} />
    </>
  );
}
