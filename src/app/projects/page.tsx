
'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProjectList } from "@/components/projects/project-list";
import { PageTitle } from "@/components/page-title";
import { useState, useEffect } from "react";
import type { Project, ProjectStatus } from "@/components/projects/project-form"; 
import { ProjectForm } from "@/components/projects/project-form"; 

const initialMockProjects: Project[] = [
  { id: "1", name: "Alpha Launch", description: "Initial launch of the Alpha platform.", status: "In Progress", startDate: "2024-06-01", dueDate: "2024-12-31", teamSize: 5, geoLocation: "New York, USA", activateMicroScheduling: true },
  { id: "2", name: "Beta Platform Development", description: "Development of the new Beta platform features.", status: "Completed", startDate: "2024-03-15", dueDate: "2024-08-15", teamSize: 8, geoLocation: "London, UK", activateMicroScheduling: false },
  { id: "3", name: "Gamma Initiative Research", description: "Research phase for the Gamma Initiative.", status: "On Hold", startDate: "2025-01-10", dueDate: "2025-03-01", teamSize: 3, geoLocation: "Tokyo, Japan", activateMicroScheduling: false },
  { id: "4", name: "Delta System Overhaul", description: "Complete overhaul of the legacy Delta system.", status: "Planning", startDate: "2025-02-01", dueDate: "2025-06-30", teamSize: 12, geoLocation: "Berlin, Germany", activateMicroScheduling: true },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(initialMockProjects);
  }, []);

  const handleAddProject = (newProject: Project) => {
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
  };

  return (
    <>
      <PageTitle 
        title="Projects" 
        description="Overview of all your ongoing and completed projects."
        actions={
          <ProjectForm
            mode="create"
            onSave={handleAddProject}
            triggerButton={
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Project
              </Button>
            }
          />
        }
      />
      <ProjectList 
        projects={projects} 
        onUpdateProject={handleUpdateProject} 
        onDeleteProject={handleDeleteProject} 
      />
    </>
  );
}
