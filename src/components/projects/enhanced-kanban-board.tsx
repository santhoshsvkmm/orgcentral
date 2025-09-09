'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, MoreHorizontal, Trash2, Plus, Calendar, Clock, UserCircle, Tag, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Task, TaskStatus, TaskPriority } from "@/types/task";

// Enhanced mock data for tasks
const initialTasks: Task[] = [
  {
    id: "t1",
    projectId: "1",
    name: "Design System Setup",
    description: "Create comprehensive design system with components and tokens",
    status: "Done",
    priority: "High",
    assignee: "Alice Designer",
    dueDate: "2024-10-15",
    startDate: "2024-10-01",
    estimatedHours: 32,
    actualHours: 28,
    completionPercentage: 100,
    tags: ["Design", "UI/UX", "Foundation"],
    createdAt: "2024-09-15",
    updatedAt: "2024-10-15"
  },
  {
    id: "t2",
    projectId: "1",
    name: "API Development",
    description: "Build RESTful API with authentication and CRUD operations",
    status: "In Progress",
    priority: "Critical",
    assignee: "Bob Developer",
    dueDate: "2024-11-01",
    startDate: "2024-10-16",
    estimatedHours: 60,
    actualHours: 25,
    completionPercentage: 45,
    tags: ["Backend", "API", "Database"],
    createdAt: "2024-09-15",
    updatedAt: "2024-10-20"
  },
  {
    id: "t3",
    projectId: "1",
    name: "User Testing Sessions",
    description: "Conduct usability testing with target users",
    status: "To Do",
    priority: "Medium",
    assignee: "Charlie UX",
    dueDate: "2024-11-20",
    estimatedHours: 24,
    completionPercentage: 0,
    tags: ["Testing", "User Research", "UX"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "t4",
    projectId: "1",
    name: "Documentation Writing",
    description: "Create comprehensive user and developer documentation",
    status: "Blocked",
    priority: "Low",
    assignee: "Diana Writer",
    dueDate: "2024-12-01",
    estimatedHours: 40,
    completionPercentage: 0,
    tags: ["Documentation", "Technical Writing"],
    createdAt: "2024-09-15",
    updatedAt: "2024-10-10"
  }
];

interface EnhancedKanbanBoardProps {
  projectId: string;
}

export function EnhancedKanbanBoard({ projectId }: EnhancedKanbanBoardProps) {
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
  const [estimatedHours, setEstimatedHours] = useState<number | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
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
    setEstimatedHours(undefined);
    setTags([]);
    setTagInput("");
    setEditingTask(null);
  };

  const handleOpenDialog = (task?: Task, initialStatus?: TaskStatus) => {
    resetForm();
    if (task) {
      setEditingTask(task);
      setName(task.name);
      setDescription(task.description || "");
      setStatus(task.status as TaskStatus);
      setPriority(task.priority);
      setAssignee(task.assignee || "");
      setDueDate(task.dueDate || "");
      setEstimatedHours(task.estimatedHours);
      setTags(task.tags || []);
    } else if (initialStatus) {
      setStatus(initialStatus);
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
      estimatedHours,
      completionPercentage: status === "Done" ? 100 : 0,
      tags: tags.length > 0 ? tags : undefined,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? newTask : t));
      toast({
        title: "Task Updated",
        description: `Task "${name}" has been updated.`
      });
    } else {
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

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    
    setTasks(prev => prev.map(task => {
      if (task.id === draggableId) {
        return { 
          ...task, 
          status: newStatus, 
          completionPercentage: newStatus === "Done" ? 100 : task.completionPercentage,
          updatedAt: new Date().toISOString() 
        };
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
        return <Badge variant="destructive" className="text-xs"><AlertCircle className="h-3 w-3 mr-1" />{priority}</Badge>;
      case "High":
        return <Badge variant="secondary" className="bg-orange-500/20 text-orange-700 border-orange-500/50 text-xs"><TrendingUp className="h-3 w-3 mr-1" />{priority}</Badge>;
      case "Medium":
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-500/50 text-xs">{priority}</Badge>;
      case "Low":
        return <Badge variant="outline" className="text-xs">{priority}</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{priority}</Badge>;
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "Backlog": return "bg-gray-100 border-gray-300";
      case "To Do": return "bg-blue-50 border-blue-200";
      case "In Progress": return "bg-yellow-50 border-yellow-200";
      case "Review": return "bg-purple-50 border-purple-200";
      case "Done": return "bg-green-50 border-green-200";
      case "Blocked": return "bg-red-50 border-red-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  const filteredTasks = activeFilter === "all" 
    ? tasks 
    : tasks.filter(task => {
        if (activeFilter === "my-tasks") return task.assignee === "Alice Designer";
        if (activeFilter === "unassigned") return !task.assignee;
        if (activeFilter === "overdue") {
          if (!task.dueDate) return false;
          return new Date(task.dueDate) < new Date() && task.status !== "Done";
        }
        return task.tags?.includes(activeFilter);
      });

  const uniqueTags = Array.from(new Set(tasks.flatMap(task => task.tags || [])));

  const tasksByStatus: Record<TaskStatus, Task[]> = {
    "Backlog": filteredTasks.filter(t => t.status === "Backlog"),
    "To Do": filteredTasks.filter(t => t.status === "To Do"),
    "In Progress": filteredTasks.filter(t => t.status === "In Progress"),
    "Review": filteredTasks.filter(t => t.status === "Review"),
    "Done": filteredTasks.filter(t => t.status === "Done"),
    "Blocked": filteredTasks.filter(t => t.status === "Blocked")
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            Enhanced Kanban Board
          </CardTitle>
          <CardDescription>Drag and drop tasks to manage project workflow efficiently.</CardDescription>
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
              {uniqueTags.length > 0 && <SelectItem value="" disabled className="font-semibold">By Tag</SelectItem>}
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
                    className={`rounded-lg p-4 transition-colors ${getStatusColor(status as TaskStatus)} ${
                      snapshot.isDraggingOver ? 'ring-2 ring-primary/50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm text-gray-700">
                        {status} ({statusTasks.length})
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-white/50" 
                        onClick={() => handleOpenDialog(undefined, status as TaskStatus)}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add {status} task</span>
                      </Button>
                    </div>
                    <ScrollArea className="h-[calc(100vh-350px)]">
                      <div className="space-y-3 pr-2">
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
                                  className={`bg-white p-3 rounded-lg border shadow-sm transition-all duration-200 ${
                                    snapshot.isDragging ? 'rotate-2 shadow-lg ring-2 ring-primary/30' : 'hover:shadow-md'
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{task.name}</h4>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                                  )}
                                  
                                  {task.tags && task.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {task.tags.slice(0, 2).map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs py-0 h-5">
                                          {tag}
                                        </Badge>
                                      ))}
                                      {task.tags.length > 2 && (
                                        <Badge variant="outline" className="text-xs py-0 h-5">
                                          +{task.tags.length - 2}
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                    <div className="flex items-center">
                                      {task.assignee ? (
                                        <div className="flex items-center">
                                          <UserCircle className="h-3 w-3 mr-1" />
                                          <span className="truncate max-w-20">{task.assignee}</span>
                                        </div>
                                      ) : (
                                        <span className="italic">Unassigned</span>
                                      )}
                                    </div>
                                    {task.dueDate && (
                                      <div className="flex items-center">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    {getPriorityBadge(task.priority)}
                                    {task.estimatedHours && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {task.estimatedHours}h
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

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
                  placeholder="e.g., Implement user authentication"
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
                  <Label htmlFor="taskDueDate">Due Date (Optional)</Label>
                  <Input
                    id="taskDueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
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
