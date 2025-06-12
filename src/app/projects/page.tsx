
'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProjectList } from "@/components/projects/project-list";
import { PageTitle } from "@/components/page-title";
import { useState, useEffect } from "react";
import type { Project, ProjectStatus } from "@/components/projects/project-form"; // Import Project type
import { ProjectForm } from "@/components/projects/project-form"; // Import ProjectForm

// Mock data - this will now be the initial state managed in this component
const initialMockProjects: Project[] = [
  { id: "1", name: "Alpha Launch", description: "Initial launch of the Alpha platform.", status: "In Progress", dueDate: "2024-12-31", teamSize: 5 },
  { id: "2", name: "Beta Platform Development", description: "Development of the new Beta platform features.", status: "Completed", dueDate: "2024-08-15", teamSize: 8 },
  { id: "3", name: "Gamma Initiative Research", description: "Research phase for the Gamma Initiative.", status: "On Hold", dueDate: "2025-03-01", teamSize: 3 },
  { id: "4", name: "Delta System Overhaul", description: "Complete overhaul of the legacy Delta system.", status: "Planning", dueDate: "2025-06-30", teamSize: 12 },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Simulate fetching initial projects or load from local storage etc.
    // For now, we just use the mock data.
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
    // Add toast notification for deletion
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
