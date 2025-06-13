
'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProjectList } from "@/components/projects/project-list";
import { PageTitle } from "@/components/page-title";
import { useState, useEffect } from "react";
import type { Project } from "@/components/projects/project-form"; 
import { ProjectForm } from "@/components/projects/project-form"; 

// Keep initialMockProjects if you plan to use it for other examples or testing.
// For the ProjectList itself, it will receive projects as a prop.
const initialMockProjects: Project[] = [
  { id: "1", name: "Alpha Launch", description: "Initial launch of the Alpha platform.", status: "In Progress", startDate: "2024-06-01", dueDate: "2024-12-31", teamSize: 5, geoLocation: "New York, USA", activateMicroScheduling: true },
  { id: "2", name: "Beta Platform Development", description: "Development of the new Beta platform features.", status: "Completed", startDate: "2024-03-15", dueDate: "2024-08-15", teamSize: 8, geoLocation: "London, UK", activateMicroScheduling: false },
  { id: "3", name: "Gamma Initiative Research", description: "Research phase for the Gamma Initiative.", status: "On Hold", startDate: "2025-01-10", dueDate: "2025-03-01", teamSize: 3, geoLocation: "Tokyo, Japan", activateMicroScheduling: false },
  { id: "4", name: "Delta System Overhaul", description: "Complete overhaul of the legacy Delta system.", status: "Planning", startDate: "2025-02-01", dueDate: "2025-06-30", teamSize: 12, geoLocation: "Berlin, Germany", activateMicroScheduling: true },
  { id: "5", name: "Epsilon Mobile App", description: "Native mobile application development.", status: "In Progress", startDate: "2024-07-15", dueDate: "2025-01-31", teamSize: 7, geoLocation: "San Francisco, USA", activateMicroScheduling: true },
  { id: "6", name: "Zeta Data Migration", description: "Migrate old database to new cloud infrastructure.", status: "Planning", startDate: "2024-09-01", dueDate: "2024-11-30", teamSize: 4, geoLocation: "Remote", activateMicroScheduling: false },
  { id: "7", name: "Omega Security Update", description: "Implement new security protocols across all systems.", status: "In Progress", startDate: "2024-08-01", dueDate: "2024-10-31", teamSize: 6, geoLocation: "New York, USA", activateMicroScheduling: true },
  { id: "8", name: "Kappa UI Refresh", description: "Modernize the user interface of the main product.", status: "Completed", startDate: "2024-01-20", dueDate: "2024-05-20", teamSize: 5, geoLocation: "London, UK", activateMicroScheduling: false },
  { id: "9", name: "Lambda Feature Expansion", description: "Add three major new features to the platform.", status: "On Hold", startDate: "2025-03-01", dueDate: "2025-07-01", teamSize: 9, geoLocation: "Berlin, Germany", activateMicroScheduling: false },
  { id: "10", name: "Mu Performance Tuning", description: "Optimize application performance and reduce load times.", status: "Planning", startDate: "2024-10-01", dueDate: "2024-12-15", teamSize: 3, geoLocation: "Remote", activateMicroScheduling: true },
  { id: "11", name: "Nu Integration Project", description: "Integrate with third-party CRM.", status: "In Progress", startDate: "2024-07-01", dueDate: "2024-09-30", teamSize: 4, geoLocation: "San Francisco, USA", activateMicroScheduling: false },
  { id: "12", name: "Xi Marketing Website", description: "New marketing website launch.", status: "Completed", startDate: "2024-02-10", dueDate: "2024-04-30", teamSize: 2, geoLocation: "Remote", activateMicroScheduling: true },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch projects here.
    // For now, we're using mock data.
    setProjects(initialMockProjects);
  }, []);

  const handleAddProject = (newProjectData: Omit<Project, 'id'>) => {
    const newProjectWithId: Project = {
      ...newProjectData,
      id: `project-${Date.now()}-${Math.random().toString(16).slice(2,8)}`, // Simple ID generation
    };
    setProjects(prevProjects => [newProjectWithId, ...prevProjects]);
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
