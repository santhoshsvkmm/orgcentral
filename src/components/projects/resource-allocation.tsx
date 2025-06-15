'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Edit, MoreHorizontal, Trash2, Plus, Calendar, Users, UserCircle, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Task, Resource, ResourceAllocation } from "@/types/task";
import { formatDate } from "@/lib/date-utils";

// Mock data for resources
const initialResources: Resource[] = [
  {
    id: "r1",
    name: "Alice Wonderland",
    role: "UI/UX Designer",
    availability: 80,
    skills: ["UI Design", "UX Research", "Prototyping"],
    costRate: 75,
    email: "alice@example.com",
    phone: "123-456-7890"
  },
  {
    id: "r2",
    name: "Bob Builder",
    role: "Senior Developer",
    availability: 100,
    skills: ["JavaScript", "React", "Node.js", "API Development"],
    costRate: 95,
    email: "bob@example.com",
    phone: "123-456-7891"
  },
  {
    id: "r3",
    name: "Charlie Brown",
    role: "Project Manager",
    availability: 60,
    skills: ["Project Management", "Agile", "Client Communication"],
    costRate: 85,
    email: "charlie@example.com",
    phone: "123-456-7892"
  },
  {
    id: "r4",
    name: "Diana Prince",
    role: "QA Engineer",
    availability: 90,
    skills: ["Testing", "Automation", "Documentation"],
    costRate: 70,
    email: "diana@example.com",
    phone: "123-456-7893"
  },
  {
    id: "r5",
    name: "Edward Norton",
    role: "DevOps Engineer",
    availability: 50,
    skills: ["CI/CD", "Docker", "Kubernetes", "AWS"],
    costRate: 90,
    email: "edward@example.com",
    phone: "123-456-7894"
  }
];

// Mock data for tasks (simplified version)
const initialTasks: Task[] = [
  {
    id: "t1",
    projectId: "1",
    name: "Design Mockups",
    status: "Done",
    priority: "Medium",
    assignee: "Alice Wonderland",
    dueDate: "2024-10-15",
    startDate: "2024-10-01",
    estimatedHours: 20,
    completionPercentage: 100,
    createdAt: "2024-09-15",
    updatedAt: "2024-10-15"
  },
  {
    id: "t2",
    projectId: "1",
    name: "Develop API",
    status: "In Progress",
    priority: "High",
    assignee: "Bob Builder",
    dueDate: "2024-11-01",
    startDate: "2024-10-16",
    estimatedHours: 40,
    completionPercentage: 40,
    createdAt: "2024-09-15",
    updatedAt: "2024-10-20"
  },
  {
    id: "t3",
    projectId: "1",
    name: "User Testing",
    status: "To Do",
    priority: "Medium",
    assignee: "Charlie Brown",
    dueDate: "2024-11-20",
    estimatedHours: 16,
    completionPercentage: 0,
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "t4",
    projectId: "1",
    name: "Documentation",
    status: "Blocked",
    priority: "Low",
    assignee: "Diana Prince",
    dueDate: "2024-12-01",
    estimatedHours: 24,
    completionPercentage: 0,
    createdAt: "2024-09-15",
    updatedAt: "2024-10-10"
  },
  {
    id: "t5",
    projectId: "1",
    name: "Deployment Setup",
    status: "To Do",
    priority: "High",
    assignee: "Edward Norton",
    dueDate: "2024-11-15",
    estimatedHours: 16,
    completionPercentage: 0,
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  }
];

// Mock data for resource allocations
const initialAllocations: ResourceAllocation[] = [
  {
    id: "a1",
    resourceId: "r1",
    taskId: "t1",
    allocationPercentage: 100,
    startDate: "2024-10-01",
    endDate: "2024-10-15",
    hoursPerDay: 8
  },
  {
    id: "a2",
    resourceId: "r2",
    taskId: "t2",
    allocationPercentage: 75,
    startDate: "2024-10-16",
    endDate: "2024-11-01",
    hoursPerDay: 6
  },
  {
    id: "a3",
    resourceId: "r3",
    taskId: "t3",
    allocationPercentage: 50,
    startDate: "2024-11-01",
    endDate: "2024-11-20",
    hoursPerDay: 4
  },
  {
    id: "a4",
    resourceId: "r4",
    taskId: "t4",
    allocationPercentage: 100,
    startDate: "2024-11-15",
    endDate: "2024-12-01",
    hoursPerDay: 8
  },
  {
    id: "a5",
    resourceId: "r5",
    taskId: "t5",
    allocationPercentage: 50,
    startDate: "2024-11-01",
    endDate: "2024-11-15",
    hoursPerDay: 4
  }
];

interface ResourceAllocationProps {
  projectId: string;
}

export function ResourceAllocationComponent({ projectId }: ResourceAllocationProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allocations, setAllocations] = useState<ResourceAllocation[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState<ResourceAllocation | null>(null);
  const [activeView, setActiveView] = useState<string>("resources");
  const { toast } = useToast();

  // Form state
  const [resourceId, setResourceId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [allocationPercentage, setAllocationPercentage] = useState(100);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);

  useEffect(() => {
    // Simulate fetching data for the project
    console.log("Fetching resource allocation data for project:", projectId);
    setResources(initialResources);
    setTasks(initialTasks.filter(t => t.projectId === projectId));
    setAllocations(initialAllocations);
  }, [projectId]);

  const resetForm = () => {
    setResourceId("");
    setTaskId("");
    setAllocationPercentage(100);
    setStartDate("");
    setEndDate("");
    setHoursPerDay(8);
    setEditingAllocation(null);
  };

  const handleOpenDialog = (allocation?: ResourceAllocation) => {
    resetForm();
    if (allocation) {
      setEditingAllocation(allocation);
      setResourceId(allocation.resourceId);
      setTaskId(allocation.taskId);
      setAllocationPercentage(allocation.allocationPercentage);
      setStartDate(allocation.startDate);
      setEndDate(allocation.endDate);
      setHoursPerDay(allocation.hoursPerDay || 8);
    }
    setIsDialogOpen(true);
  };

  const handleSaveAllocation = () => {
    if (!resourceId || !taskId || !startDate || !endDate) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast({
        title: "Invalid Dates",
        description: "Start date must be before end date.",
        variant: "destructive"
      });
      return;
    }

    const newAllocation: ResourceAllocation = {
      id: editingAllocation ? editingAllocation.id : `a${Date.now()}`,
      resourceId,
      taskId,
      allocationPercentage,
      startDate,
      endDate,
      hoursPerDay
    };

    if (editingAllocation) {
      // Update existing allocation
      setAllocations(prev => prev.map(a => a.id === editingAllocation.id ? newAllocation : a));
      toast({
        title: "Allocation Updated",
        description: "Resource allocation has been updated."
      });
    } else {
      // Add new allocation
      setAllocations(prev => [...prev, newAllocation]);
      toast({
        title: "Allocation Created",
        description: "Resource allocation has been created."
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteAllocation = (id: string) => {
    setAllocations(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Allocation Deleted",
      description: "The resource allocation has been deleted."
    });
  };

  // Helper function to get resource name by ID
  const getResourceName = (id: string) => {
    return resources.find(r => r.id === id)?.name || "Unknown Resource";
  };

  // Helper function to get task name by ID
  const getTaskName = (id: string) => {
    return tasks.find(t => t.id === id)?.name || "Unknown Task";
  };

  // Calculate resource utilization
  const calculateResourceUtilization = (resourceId: string) => {
    const resourceAllocations = allocations.filter(a => a.resourceId === resourceId);
    if (resourceAllocations.length === 0) return 0;

    // Simple calculation for demo purposes
    // In a real app, you would calculate based on date ranges and allocation percentages
    const totalAllocation = resourceAllocations.reduce((sum, a) => sum + a.allocationPercentage, 0);
    return Math.min(100, totalAllocation / resourceAllocations.length);
  };

  // Check for overallocated resources (>100% allocation)
  const isResourceOverallocated = (resourceId: string) => {
    return calculateResourceUtilization(resourceId) > 100;
  };

  return (
    <Card className="shadow-sm mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Resource Allocation</CardTitle>
          <CardDescription>Manage resource assignments to tasks.</CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" /> Add Allocation
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="resources" value={activeView} onValueChange={setActiveView} className="mb-6">
          <TabsList>
            <TabsTrigger value="resources">By Resource</TabsTrigger>
            <TabsTrigger value="tasks">By Task</TabsTrigger>
            <TabsTrigger value="allocations">All Allocations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Assigned Tasks</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => {
                    const resourceAllocations = allocations.filter(a => a.resourceId === resource.id);
                    const utilization = calculateResourceUtilization(resource.id);
                    const isOverallocated = isResourceOverallocated(resource.id);
                    
                    return (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <UserCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                            {resource.name}
                          </div>
                        </TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>{resource.availability}%</TableCell>
                        <TableCell>
                          <div className="w-32">
                            <Progress 
                              value={utilization} 
                              className="h-2" 
                              indicatorClassName={isOverallocated ? "bg-destructive" : undefined}
                            />
                            <div className="flex items-center justify-between text-xs mt-1">
                              <span className={isOverallocated ? "text-destructive font-medium" : "text-muted-foreground"}>
                                {utilization}%
                              </span>
                              {isOverallocated && (
                                <span className="text-destructive flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Overallocated
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {resourceAllocations.length === 0 ? (
                              <span className="text-sm text-muted-foreground italic">No tasks assigned</span>
                            ) : (
                              resourceAllocations.map(allocation => {
                                const task = tasks.find(t => t.id === allocation.taskId);
                                return (
                                  <div key={allocation.id} className="text-sm flex items-center justify-between">
                                    <span>{getTaskName(allocation.taskId)}</span>
                                    <Badge variant="outline" className="ml-2">{allocation.allocationPercentage}%</Badge>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setResourceId(resource.id);
                              handleOpenDialog();
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Assign
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Estimated Hours</TableHead>
                    <TableHead>Assigned Resources</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => {
                    const taskAllocations = allocations.filter(a => a.taskId === task.id);
                    
                    return (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.name}</TableCell>
                        <TableCell>
                          <Badge variant={task.status === "Done" ? "secondary" : task.status === "Blocked" ? "destructive" : "default"}>
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {task.dueDate ? formatDate(task.dueDate, "MMM d, yyyy") : "—"}
                        </TableCell>
                        <TableCell>
                          {task.estimatedHours ? `${task.estimatedHours}h` : "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {taskAllocations.length === 0 ? (
                              <span className="text-sm text-muted-foreground italic">No resources assigned</span>
                            ) : (
                              taskAllocations.map(allocation => (
                                <div key={allocation.id} className="text-sm flex items-center justify-between">
                                  <span>{getResourceName(allocation.resourceId)}</span>
                                  <Badge variant="outline" className="ml-2">{allocation.allocationPercentage}%</Badge>
                                </div>
                              ))
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setTaskId(task.id);
                              handleOpenDialog();
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Assign
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="allocations" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Allocation %</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Hours/Day</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No resource allocations found. Click "Add Allocation" to assign resources to tasks.
                      </TableCell>
                    </TableRow>
                  ) : (
                    allocations.map((allocation) => (
                      <TableRow key={allocation.id}>
                        <TableCell className="font-medium">{getResourceName(allocation.resourceId)}</TableCell>
                        <TableCell>{getTaskName(allocation.taskId)}</TableCell>
                        <TableCell>
                          <Badge variant={allocation.allocationPercentage > 100 ? "destructive" : "outline"}>
                            {allocation.allocationPercentage}%
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(allocation.startDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>{formatDate(allocation.endDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>{allocation.hoursPerDay || 8}h</TableCell>
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
                              <DropdownMenuItem onClick={() => handleOpenDialog(allocation)}>
                                <Edit className="mr-2 h-4 w-4" />Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteAllocation(allocation.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Resource Allocation Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingAllocation ? "Edit Resource Allocation" : "Add Resource Allocation"}</DialogTitle>
              <DialogDescription>
                {editingAllocation ? "Update the resource allocation details." : "Assign a resource to a task."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="resource">Resource</Label>
                <Select value={resourceId} onValueChange={setResourceId}>
                  <SelectTrigger id="resource">
                    <SelectValue placeholder="Select a resource" />
                  </SelectTrigger>
                  <SelectContent>
                    {resources.map(resource => (
                      <SelectItem key={resource.id} value={resource.id}>
                        {resource.name} ({resource.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="task">Task</Label>
                <Select value={taskId} onValueChange={setTaskId}>
                  <SelectTrigger id="task">
                    <SelectValue placeholder="Select a task" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks.map(task => (
                      <SelectItem key={task.id} value={task.id}>
                        {task.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="allocationPercentage">Allocation Percentage</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="allocationPercentage"
                      type="number"
                      min="1"
                      max="200"
                      value={allocationPercentage}
                      onChange={(e) => setAllocationPercentage(parseInt(e.target.value))}
                      required
                    />
                    <span>%</span>
                  </div>
                  {allocationPercentage > 100 && (
                    <p className="text-xs text-destructive mt-1 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Warning: Over 100% allocation
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="hoursPerDay">Hours Per Day</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="hoursPerDay"
                      type="number"
                      min="0.5"
                      max="24"
                      step="0.5"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
                      required
                    />
                    <span>h</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveAllocation}>
                {editingAllocation ? "Save Changes" : "Create Allocation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}