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
];

type Task = typeof initialTasks[0];

interface TaskListProps {
  projectId: string;
}

export function TaskList({ projectId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simulate data fetching for tasks of projectId
    console.log("Fetching tasks for project:", projectId);
    setTasks(initialTasks);
  }, [projectId]);

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
            {tasks.map((task) => (
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
      </CardContent>
    </Card>
  );
}
