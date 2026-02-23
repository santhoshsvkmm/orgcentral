'use client';

import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, MoreHorizontal, Trash2, Plus, Calendar, Clock, UserCircle, Tag, TrendingUp, AlertCircle, Circle, CheckCircle2, Eye, ListTodo, Search, Filter, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Task, TaskStatus, TaskPriority } from "@/types/task";
import { cn } from "@/lib/utils";


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

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "Backlog": return <ListTodo className="h-4 w-4 text-slate-500" />;
      case "To Do": return <Circle className="h-4 w-4 text-blue-500" />;
      case "In Progress": return <Zap className="h-4 w-4 text-amber-500" />;
      case "Review": return <Eye className="h-4 w-4 text-purple-500" />;
      case "Done": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "Blocked": return <AlertCircle className="h-4 w-4 text-rose-500" />;
      default: return <Tag className="h-4 w-4" />;
    }
  };

  const getStatusStyles = (status: TaskStatus) => {
    switch (status) {
      case "Backlog": return "bg-slate-500/5 border-slate-200/50";
      case "To Do": return "bg-blue-500/5 border-blue-200/50";
      case "In Progress": return "bg-amber-500/5 border-amber-200/50";
      case "Review": return "bg-purple-500/5 border-purple-200/50";
      case "Done": return "bg-emerald-500/5 border-emerald-200/50";
      case "Blocked": return "bg-rose-500/5 border-rose-200/50";
      default: return "bg-gray-500/5 border-gray-200/50";
    }
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
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between px-0 pb-6">
        <div>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            Sprint Board
          </CardTitle>
          <CardDescription className="text-muted-foreground/80 font-medium">Manage and track your sprint tasks visually.</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search tasks..."
              className="pl-9 w-[240px] h-10 bg-white/50 backdrop-blur-sm border-white/20 focus:bg-white transition-all rounded-xl"
            />
          </div>
          <Select value={activeFilter} onValueChange={setActiveFilter}>
            <SelectTrigger className="w-[160px] h-10 bg-white/50 backdrop-blur-sm border-white/20 rounded-xl">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Filter" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-white/20 shadow-xl backdrop-blur-md">
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="my-tasks">My Tasks</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              {uniqueTags.length > 0 && <SelectItem value="tag-divider" disabled className="text-[10px] uppercase font-bold text-muted-foreground/50 py-2">By Tag</SelectItem>}
              {uniqueTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => handleOpenDialog()}
            className="h-10 px-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/20 border-none rounded-xl gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" /> Add Task
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <div key={status} className="flex flex-col h-full min-w-[240px]">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("p-1.5 rounded-lg", getStatusStyles(status as TaskStatus).split(' ')[0])}>
                      {getStatusIcon(status as TaskStatus)}
                    </div>
                    <h3 className="font-bold text-sm text-foreground/80 tracking-tight flex items-center gap-2">
                      {status}
                      <span className="text-[10px] h-5 w-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                        {statusTasks.length}
                      </span>
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg hover:bg-muted"
                    onClick={() => handleOpenDialog(undefined, status as TaskStatus)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <Droppable key={status} droppableId={status} isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
                  {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "flex-1 min-h-[500px] rounded-2xl p-3 transition-all duration-300 border backdrop-blur-[2px]",
                        getStatusStyles(status as TaskStatus),
                        snapshot.isDraggingOver ? "ring-2 ring-indigo-500/30 bg-indigo-500/5 border-indigo-500/20" : "border-transparent"
                      )}
                    >
                      <div className="space-y-3">
                        {statusTasks.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground/40 gap-2">
                            <ListTodo className="h-8 w-8 opacity-20" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Empty</span>
                          </div>
                        ) : (
                          statusTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={cn(
                                    "group relative bg-white dark:bg-slate-900 p-4 rounded-xl border border-border/50 shadow-sm transition-all duration-200 select-none",
                                    snapshot.isDragging ? "shadow-2xl ring-2 ring-indigo-500/50 scale-[1.02] z-50 rotate-1" : "hover:border-indigo-500/30 hover:shadow-md active:scale-[0.98]"
                                  )}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-sm text-foreground/90 leading-snug line-clamp-2 pr-6">
                                      {task.name}
                                    </h4>
                                    <div className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl">
                                          <DropdownMenuItem onClick={() => handleOpenDialog(task)} className="gap-2">
                                            <Edit className="h-4 w-4" /> Edit Task
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-destructive focus:text-destructive gap-2" onClick={() => handleDeleteTask(task.id)}>
                                            <Trash2 className="h-4 w-4" /> Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>

                                  {task.description && (
                                    <p className="text-[11px] text-muted-foreground/80 mb-3 line-clamp-2 leading-relaxed">
                                      {task.description}
                                    </p>
                                  )}

                                  <div className="flex flex-wrap gap-1.5 mb-4">
                                    {task.tags?.slice(0, 2).map(tag => (
                                      <Badge key={tag} variant="outline" className="text-[9px] font-bold uppercase tracking-wider py-0 px-1.5 h-5 bg-muted/30 border-none text-muted-foreground">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {task.tags && task.tags.length > 2 && (
                                      <Badge variant="outline" className="text-[9px] font-bold py-0 h-5 bg-muted/30 border-none text-muted-foreground">
                                        +{task.tags.length - 2}
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex items-center justify-between border-t border-border/30 pt-3 mt-1">
                                    <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground/70">
                                      <div className="flex items-center gap-1">
                                        <UserCircle className="h-3.5 w-3.5" />
                                        <span>{task.assignee?.split(' ')[0] || "Unassigned"}</span>
                                      </div>
                                      {task.dueDate && (
                                        <div className="flex items-center gap-1">
                                          <Calendar className="h-3.5 w-3.5" />
                                          <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {task.estimatedHours && (
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/60 bg-muted/50 px-1.5 py-0.5 rounded-md">
                                          <Clock className="h-3 w-3" />
                                          {task.estimatedHours}h
                                        </div>
                                      )}
                                      {getPriorityBadge(task.priority)}
                                    </div>
                                  </div>

                                  {/* Glass highlight on hover */}
                                  <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
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
