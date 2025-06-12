'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, MoreHorizontal, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock data - replace with actual data fetching
const initialProjects = [
  { id: "1", name: "Alpha Launch", status: "In Progress", dueDate: "2024-12-31", teamSize: 5 },
  { id: "2", name: "Beta Platform", status: "Completed", dueDate: "2024-08-15", teamSize: 8 },
  { id: "3", name: "Gamma Initiative", status: "On Hold", dueDate: "2025-03-01", teamSize: 3 },
  { id: "4", name: "Delta Overhaul", status: "Planning", dueDate: "2025-06-30", teamSize: 12 },
];

type Project = typeof initialProjects[0];

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Simulate data fetching
    setProjects(initialProjects);
  }, []);

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case "in progress": return "default";
      case "completed": return "secondary"; // Or a success variant if you add one
      case "on hold": return "destructive";
      case "planning": return "outline";
      default: return "outline";
    }
  };

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
              <TableHead>Due Date</TableHead>
              <TableHead className="hidden md:table-cell">Team Size</TableHead>
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
                <TableCell>{project.dueDate}</TableCell>
                <TableCell className="hidden md:table-cell">{project.teamSize}</TableCell>
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
                      <DropdownMenuItem onClick={() => console.log('Edit project', project.id)}>
                        <Edit className="mr-2 h-4 w-4" />Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => console.log('Delete project', project.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />Delete
                      </DropdownMenuItem>
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
