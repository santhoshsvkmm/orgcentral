
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, MoreHorizontal, Trash2, Eye, CalendarCheck2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import type { Project, ProjectStatus } from "./project-form";
import { ProjectForm } from "./project-form";
import { formatDate } from "@/lib/date-utils";
import { DataTable, type ColumnDef } from "@/components/ui/data-table"; // Import DataTable and ColumnDef
import React from "react";

interface ProjectListProps {
  projects: Project[];
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectList({ projects, onUpdateProject, onDeleteProject }: ProjectListProps) {
  const { toast } = useToast();

  const getStatusVariant = (status?: ProjectStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status?.toLowerCase()) {
      case "in progress": return "default";
      case "completed": return "secondary";
      case "on hold": return "destructive";
      case "planning": return "outline";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const handleDelete = (project: Project) => {
    onDeleteProject(project.id);
    toast({
      title: "Project Deleted",
      description: `Project "${project.name}" has been deleted.`,
    });
  };

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
      cell: ({ row }) => (
        <Link href={`/projects/${row.id}`} className="hover:underline font-medium">
          {row.name}
        </Link>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ row }) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      enableSorting: true,
      cell: ({ row }) => formatDate(row.startDate, 'yyyy-MM-dd'),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      enableSorting: true,
      cell: ({ row }) => formatDate(row.dueDate, 'yyyy-MM-dd'),
    },
    {
      accessorKey: "teamSize",
      header: "Team Size",
      enableSorting: true,
      cell: ({ row }) => row.teamSize || 'N/A',
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <ProjectForm
            mode="edit"
            projectData={row}
            onSave={onUpdateProject}
            triggerButton={
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Project</span>
              </Button>
            }
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/projects/${row.id}`}><Eye className="mr-2 h-4 w-4" />View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // Prevent DropdownMenu from closing
                  // Manually trigger ProjectForm dialog if needed, or ensure ProjectForm handles its own open state
                  // This might require ProjectForm to be structured to open via a prop or internal state on trigger click
                  // For now, assuming ProjectForm's triggerButton handles opening its dialog.
                  // We simulate a click on the edit button that's now part of the ProjectForm trigger
                  // This is a bit of a workaround; ideally, ProjectForm would expose an `onOpen` or `open` prop.
                  const editButton = document.getElementById(`edit-project-${row.id}-trigger`);
                  if (editButton) editButton.click();
                }}
                // The Edit button is now part of the ProjectForm trigger, so this explicit one isn't as useful here
                // unless ProjectForm is refactored to be controlled.
                // For simplicity, the direct Edit button outside the dropdown is preferred if a modal is always used.
                // If keeping in dropdown, ProjectForm needs to be controlled or the DropdownMenuItem needs to stop propagation correctly
                // and manage the dialog opening.
              >
                {/* <Edit className="mr-2 h-4 w-4" />Edit (via Dropdown) */}
                {/* This is now handled by the direct Edit button above */}
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive focus:bg-destructive/10 w-full flex items-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the project "{row.name}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(row)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  if (!projects || projects.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Manage your organization's projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <p className="text-muted-foreground">No projects found.</p>
            <p className="text-sm text-muted-foreground">Get started by creating a new project.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const searchableProjectColumns: (keyof Project)[] = ['name', 'description', 'status'];


  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>All Projects</CardTitle>
        <CardDescription>Manage your organization's projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={projects}
          itemsPerPage={10}
          searchableColumns={searchableProjectColumns}
          globalFilterPlaceholder="Search projects (name, description, status)..."
          noResultsMessage="No projects match your search."
        />
      </CardContent>
    </Card>
  );
}
