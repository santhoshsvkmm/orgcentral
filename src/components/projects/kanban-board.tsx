'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, MoreHorizontal, Trash2, Plus, Calendar, Clock, UserCircle, Tag, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Task, TaskStatus, TaskPriority } from "@/types/task";
import { formatDate } from "@/lib/date-utils";

// Mock data for tasks
const initialTasks: Task[] = [
  {
    id: "t1",
    projectId: "1",
    name: "Design Mockups",
    description: "Create initial design mockups for client approval",
    status: "Done",
    priority: "Medium",
    assignee: "Alice Wonderland",
    dueDate: "2024-10-15",
    startDate: "2024-10-01",
    estimatedHours: 20,
    actualHours: 18,
    completionPercentage: 100,
    tags: ["Design", "UI/UX"],
    createdAt: "2024-09-15",
    updatedAt: "2024-10-15"
  },
  {
    id: "t2",
    projectId: "1",
    name: "Develop API",
    description: "Implement RESTful API endpoints",
    status: "In Progress",
    priority: "High",
    assignee: "Bob Builder",
    dueDate: "2024-11-01",
    startDate: "2024-10-16",
    estimatedHours: 40,
    actualHours: 15,
    completionPercentage: 40,
    tags: ["Backend", "API"],
    createdAt: "2024-09-15",
    updatedAt: "2024-10-20"
  },
  {
    id: "t3",
    projectId: "1",
    name: "User Testing",
    description: "Conduct user testing sessions",
    status: "To Do",
    priority: "Medium",
    assignee: "Charlie Brown",
    dueDate: "2024-11-20",
    estimatedHours: 16,
    completionPercentage: 0,
    tags: ["Testing", "User Experience"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "t4",
    projectId: "1",
    name: "Documentation",
    description: "Create user and developer documentation",
    status: "Blocked",
    priority: "Low",
    assignee: "Diana Prince",
    dueDate: "2024-12-01",
    estimatedHours: 24,
    completionPercentage: 0,
    tags: ["Documentation"],
    createdAt: "2024-09-15",
    updatedAt: "2024-10-10"
  },
  {
    id: "t5",
    projectId: "1",
    name: "Requirement Gathering",
    description: "Collect and document project requirements",
    status: "Done",
    priority: "High",
    assignee: "Alice Wonderland",
    dueDate: "2024-09-15",
    startDate: "2024-09-01",
    estimatedHours: 30,
    actualHours: 32,
    completionPercentage: 100,
    tags: ["Planning", "Requirements"],
    createdAt: "2024-08-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "t6",
    projectId: "1",
    name: "Backend Logic Implementation",
    description: "Implement core business logic",
    status: "In Progress",
    priority: "High",
    assignee: "Bob Builder",
    dueDate: "2024-11-10",
    startDate: "2024-10-20",
    estimatedHours: 50,
    actualHours: 20,
    completionPercentage: 40,
    tags: ["Backend", "Development"],
    createdAt: "2024-09-15",
    updatedAt: "2024-10-25"
  },
  {
    id: "t7",
    projectId: "1",
    name: "Client Feedback Session",
    description: "Present progress to client and gather feedback",
    status: "To Do",
    priority: "Medium",
    assignee: "Charlie Brown",
    dueDate: "2024-11-25",
    estimatedHours: 4,
    completionPercentage: 0,
    tags: ["Client", "Feedback"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "t8",
    projectId: "1",
    name: "Code Review",
    description: "Perform code review for quality assurance",
    status: "Backlog",
    priority: "Medium",
    dueDate: "2024-12-05",
    estimatedHours: 8,
    completionPercentage: 0,
    tags: ["Development", "Quality"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "t9",
    projectId: "1",
    name: "Deployment to Staging",
    description: "Deploy application to staging environment",
    status: "Backlog",
    priority: "High",
    dueDate: "2024-12-10",
    estimatedHours: 6,
    completionPercentage: 0,
    tags: ["DevOps", "Deployment"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "t10",
    projectId: "1",
    name: "Performance Optimization",
    description: "Optimize application performance",
    status: "Backlog",
    priority: "Medium",
    dueDate: "2024-12-15",
    estimatedHours: 16,
    completionPercentage: 0,
    tags: ["Development", "Performance"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  }
];

interface KanbanBoardProps {
  projectId: string;
}

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("To Do");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState<number | undefined>(undefined);
  const [actualHours, setActualHours] = useState<number | undefined>(undefined);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    // Simulate fetching tasks for the project
    console.log("Fetching tasks for project:", projectId);
    const projectTasks = initialTasks.filter(t => t.projectId === projectId);
    setTasks(projectTasks);
  }, [projectId]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("To Do");
    setPriority("Medium");
    setAssignee("");
    setDueDate("");
    setStartDate("");
    setEstimatedHours(undefined);
    setActualHours(undefined);
    setCompletionPercentage(0);
    setTags([]);
    setTagInput("");
    setEditingTask(null);
  };

  const handleOpenDialog = (task?: Task) => {
    resetForm();
    if (task) {
      setEditingTask(task);
      setName(task.name);
      setDescription(task.description || "");
      setStatus(task.status as TaskStatus);
      setPriority(task.priority);
      setAssignee(task.assignee || "");
      setDueDate(task.dueDate || "");
      setStartDate(task.startDate || "");
      setEstimatedHours(task.estimatedHours);
      setActualHours(task.actualHours);
      setCompletionPercentage(task.completionPercentage);
      setTags(task.tags || []);
    }
    setIsDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (!name.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please provide a task name.",
        variant: "destructive"
      });
      return;
    }

    const newTask: Task = {
      id: editingTask ? editingTask.id : `t${Date.now()}`,
      projectId,
      name: name.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      assignee: assignee.trim() || undefined,
      dueDate: dueDate || undefined,
      startDate: startDate || undefined,
      estimatedHours,
      actualHours,
      completionPercentage,
      tags: tags.length > 0 ? tags : undefined,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingTask) {
      // Update existing task
      setTasks(prev => prev.map(t => t.id === editingTask.id ? newTask : t));
      toast({
        title: "Task Updated",
        description: `Task "${name}" has been updated.`
      });
    } else {
      // Add new task
      setTasks(prev => [...prev, newTask]);
      toast({
        title: "Task Created",
        description: `Task "${name}" has been created.`
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Task Deleted",
      description: "The task has been deleted."
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // If the item dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    
    setTasks(prev => prev.map(task => {
      if (task.id === draggableId) {
        return { ...task, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return task;
    }));

    toast({
      title: "Task Moved",
      description: `Task moved to ${newStatus}`
    });
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "Critical":
        return <Badge variant="destructive">{priority}</Badge>;
      case "High":
        return <Badge variant="secondary" className="bg-orange-500/20 text-orange-700 border-orange-500/50">{priority}</Badge>;
      case "Medium":
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-500/50">{priority}</Badge>;
      case "Low":
        return <Badge variant="outline">{priority}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredTasks = activeFilter === "all" 
    ? tasks 
    : tasks.filter(task => {
        if (activeFilter === "my-tasks") return task.assignee === "Alice Wonderland"; // Replace with actual user
        if (activeFilter === "unassigned") return !task.assignee;
        if (activeFilter === "overdue") {
          if (!task.dueDate) return false;
          return new Date(task.dueDate) < new Date() && task.status !== "Done";
        }
        return task.tags?.includes(activeFilter);
      });

  // Get unique tags for filter options
  const uniqueTags = Array.from(new Set(tasks.flatMap(task => task.tags || [])));

  // Group tasks by status
  const tasksByStatus: Record<TaskStatus, Task[]> = {
    "Backlog": filteredTasks.filter(t => t.status === "Backlog"),
    "To Do": filteredTasks.filter(t => t.status === "To Do"),
    "In Progress": filteredTasks.filter(t => t.status === "In Progress"),
    "Review": filteredTasks.filter(t => t.status === "Review"),
    "Done": filteredTasks.filter(t => t.status === "Done"),
    "Blocked": filteredTasks.filter(t => t.status === "Blocked")
  };

  return (
    <Card className="shadow-sm mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Kanban Board</CardTitle>
          <CardDescription>Manage and track tasks using a Kanban board.</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={activeFilter} onValueChange={setActiveFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="my-tasks">My Tasks</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="" disabled className="font-semibold">By Tag</SelectItem>
              {uniqueTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" /> Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <Droppable key={status} droppableId={status}>
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-muted/40 rounded-md p-3 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-primary/10' : ''
                    }`}
                  >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">{status} ({statusTasks.length})</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={() => {
                    setStatus(status as TaskStatus);
                    handleOpenDialog();
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add {status} task</span>
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2 pr-2">
                  {statusTasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm italic">
                      No tasks
                    </div>
                  ) : (
                    statusTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-card p-3 rounded-md border shadow-sm transition-transform ${
                              snapshot.isDragging ? 'rotate-1 shadow-lg' : ''
                            }`}
                          >
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{task.name}</h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleOpenDialog(task)}>
                                <Edit className="mr-2 h-4 w-4" />Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteTask(task.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        {task.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {task.tags?.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs py-0 h-5">
                              <Tag className="h-3 w-3 mr-1" />{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center">
                            {task.assignee ? (
                              <div className="flex items-center">
                                <UserCircle className="h-3 w-3 mr-1" />
                                {task.assignee}
                              </div>
                            ) : (
                              <span className="italic">Unassigned</span>
                            )}
                          </div>
                          {task.dueDate && (
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(task.dueDate, "MMM d")}
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          {getPriorityBadge(task.priority)}
                          {task.estimatedHours && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.estimatedHours}h
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>

        {/* Task Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
              <DialogDescription>
                {editingTask ? "Update the task details." : "Fill in the details for the new task."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <Label htmlFor="taskName">Task Name</Label>
                <Input
                  id="taskName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Implement login functionality"
                  required
                />
              </div>
              <div>
                <Label htmlFor="taskDescription">Description (Optional)</Label>
                <Textarea
                  id="taskDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this task"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taskStatus">Status</Label>
                  <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
                    <SelectTrigger id="taskStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Backlog">Backlog</SelectItem>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taskPriority">Priority</Label>
                  <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority)}>
                    <SelectTrigger id="taskPriority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="taskAssignee">Assignee (Optional)</Label>
                <Input
                  id="taskAssignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  placeholder="e.g., John Doe"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taskStartDate">Start Date (Optional)</Label>
                  <Input
                    id="taskStartDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="taskDueDate">Due Date (Optional)</Label>
                  <Input
                    id="taskDueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taskEstimatedHours">Estimated Hours (Optional)</Label>
                  <Input
                    id="taskEstimatedHours"
                    type="number"
                    min="0"
                    step="0.5"
                    value={estimatedHours || ""}
                    onChange={(e) => setEstimatedHours(e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="e.g., 8"
                  />
                </div>
                <div>
                  <Label htmlFor="taskActualHours">Actual Hours (Optional)</Label>
                  <Input
                    id="taskActualHours"
                    type="number"
                    min="0"
                    step="0.5"
                    value={actualHours || ""}
                    onChange={(e) => setActualHours(e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="taskCompletionPercentage">Completion Percentage: {completionPercentage}%</Label>
                <Input
                  id="taskCompletionPercentage"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={completionPercentage}
                  onChange={(e) => setCompletionPercentage(parseInt(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="taskTags">Tags (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="taskTags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="e.g., Frontend"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">Add</Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveTask}>
                {editingTask ? "Save Changes" : "Create Task"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}