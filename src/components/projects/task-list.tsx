
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, MoreHorizontal, Trash2, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";

// Mock data - replace with actual data fetching for a specific project
const initialTasks = [
  { id: "t1", name: "Design Mockups", assignee: "Alice Wonderland", status: "Completed", dueDate: "2024-10-15" },
  { id: "t2", name: "Develop API", assignee: "Bob The Builder", status: "In Progress", dueDate: "2024-11-01" },
  { id: "t3", name: "User Testing", assignee: "Charlie Brown", status: "Pending", dueDate: "2024-11-20" },
  { id: "t4",name: "Documentation", assignee: "Diana Prince", status: "Blocked", dueDate: "2024-12-01" },
  { id: "t5", name: "Requirement Gathering", assignee: "Alice Wonderland", status: "Completed", dueDate: "2024-09-15" },
  { id: "t6", name: "Backend Logic Implementation", assignee: "Bob The Builder", status: "In Progress", dueDate: "2024-11-10" },
  { id: "t7", name: "Client Feedback Session", assignee: "Charlie Brown", status: "Pending", dueDate: "2024-11-25" },
  { id: "t8", name: "Code Review", assignee: "Diana Prince", status: "Pending", dueDate: "2024-12-05" },
  { id: "t9", name: "Deployment to Staging", assignee: "Alice Wonderland", status: "In Progress", dueDate: "2024-12-10" },
  { id: "t10", name: "Performance Optimization", assignee: "Bob The Builder", status: "Pending", dueDate: "2024-12-15" },
  { id: "t11", name: "Final QA Testing", assignee: "Charlie Brown", status: "Pending", dueDate: "2024-12-20" },
  { id: "t12", name: "Production Release Plan", assignee: "Diana Prince", status: "Blocked", dueDate: "2024-12-22" },
];

type Task = typeof initialTasks[0];

interface TaskListProps {
  projectId: string;
}

const ITEMS_PER_PAGE = 5;

export function TaskList({ projectId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulate data fetching for tasks of projectId
    console.log("Fetching tasks for project:", projectId);
    // In a real app, filter tasks by projectId if initialTasks contains all tasks
    const projectTasks = initialTasks.filter(() => Math.random() > 0.3); // Randomly assign some tasks for demo
    setTasks(projectTasks);
    setCurrentPage(1); // Reset to first page when projectId changes or tasks are refetched
  }, [projectId]);

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTasks = tasks.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };


  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case "in progress": return "default";
      case "completed": return "secondary";
      case "pending": return "outline";
      case "blocked": return "destructive";
      default: return "outline";
    }
  };

  return (
    <Card className="shadow-sm mt-8">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Manage tasks for this project.</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
                No tasks found for this project.
            </div>
        ) : (
        <>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {currentTasks.map((task) => (
                <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>
                    <div className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4 text-muted-foreground"/> 
                        {task.assignee}
                    </div>
                    </TableCell>
                    <TableCell>
                    <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                    </TableCell>
                    <TableCell>{task.dueDate}</TableCell>
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
                        <DropdownMenuItem onClick={() => console.log('Edit task', task.id)}>
                            <Edit className="mr-2 h-4 w-4" />Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => console.log('Delete task', task.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />Delete
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4 mt-4 border-t pt-4">
                <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
                </span>
                <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                >
                Previous
                </Button>
                <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                >
                Next
                </Button>
            </div>
            )}
        </>
        )}
      </CardContent>
    </Card>
  );
}
