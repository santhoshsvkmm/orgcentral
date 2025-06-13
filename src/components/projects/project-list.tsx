
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, MoreHorizontal, Trash2, Eye, CalendarCheck2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import type { Project, ProjectStatus } from "./project-form";
import { ProjectForm } from "./project-form";
import { formatDate } from "@/lib/date-utils";


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
  }

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
            {/* The "Create Project" button is in the PageTitle actions on projects/page.tsx */}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>All Projects</CardTitle>
        <CardDescription>Manage your organization's projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">
                <div className="flex items-center gap-1">
                   <CalendarCheck2 className="h-4 w-4" /> Start Date
                </div>
              </TableHead>
              <TableHead>
                 <div className="flex items-center gap-1">
                   <CalendarCheck2 className="h-4 w-4" /> Due Date
                </div>
              </TableHead>
              <TableHead className="hidden lg:table-cell">Team Size</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <Link href={`/projects/${project.id}`} className="hover:underline">
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(project.startDate, 'yyyy-MM-dd')}</TableCell>
                <TableCell>{formatDate(project.dueDate, 'yyyy-MM-dd')}</TableCell>
                <TableCell className="hidden lg:table-cell">{project.teamSize || 'N/A'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/projects/${project.id}`}><Eye className="mr-2 h-4 w-4" />View Details</Link>
                      </DropdownMenuItem>
                      
                      <ProjectForm
                        mode="edit"
                        projectData={project}
                        onSave={onUpdateProject}
                        triggerButton={
                           <DropdownMenuItem 
                            onSelect={(e) => e.preventDefault()} 
                            className="flex items-center w-full"
                          >
                            <Edit className="mr-2 h-4 w-4" />Edit
                          </DropdownMenuItem>
                        }
                      />
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
                              This action cannot be undone. This will permanently delete the project "{project.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(project)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
