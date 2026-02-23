'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    GripVertical,
    Calendar,
    Clock,
    User,
    ChevronRight,
    ChevronDown,
    ListTodo,
    Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskForm } from "./task-form";
import { SprintForm } from "./sprint-form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Task {
    id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    estimate: number;
}

interface Sprint {
    id: string;
    name: string;
    status: 'active' | 'planned' | 'completed';
    startDate?: string;
    endDate?: string;
    tasks: Task[];
}

const mockBacklog: Task[] = [
    { id: '1', title: 'Implement user authentication flow', status: 'todo', priority: 'high', assignee: 'Alice', estimate: 5 },
    { id: '2', title: 'Design new landing page hero section', status: 'todo', priority: 'medium', assignee: 'Bob', estimate: 3 },
    { id: '3', title: 'Fix bug in data export utility', status: 'todo', priority: 'low', assignee: 'Charlie', estimate: 2 },
    { id: '4', title: 'Refactor sidebar component', status: 'todo', priority: 'high', assignee: 'Alice', estimate: 8 },
    { id: '5', title: 'Add unit tests for API endpoints', status: 'todo', priority: 'medium', assignee: 'Bob', estimate: 5 },
];

const mockSprints: Sprint[] = [
    {
        id: 's1',
        name: 'Sprint 1 (Active)',
        status: 'active',
        startDate: '2024-11-20',
        endDate: '2024-12-04',
        tasks: [
            { id: '101', title: 'Database schema migration', status: 'in-progress', priority: 'high', assignee: 'Charlie', estimate: 4 },
            { id: '102', title: 'Setup CI/CD pipeline', status: 'todo', priority: 'high', assignee: 'Alice', estimate: 6 },
        ]
    },
    {
        id: 's2',
        name: 'Sprint 2 (Next)',
        status: 'planned',
        tasks: []
    }
];

export function SprintPlanning() {
    const [sprints, setSprints] = useState<Sprint[]>(mockSprints);
    const [backlog, setBacklog] = useState<Task[]>(mockBacklog);
    const [isBacklogExpanded, setIsBacklogExpanded] = useState(true);
    const { toast } = useToast();

    const totalBacklogEstimate = backlog.reduce((acc, task) => acc + task.estimate, 0);

    const handleSaveTask = (task: Task, sprintId?: string) => {
        if (sprintId) {
            setSprints(sprints.map(s => {
                if (s.id === sprintId) {
                    const exists = s.tasks.some(t => t.id === task.id);
                    return {
                        ...s,
                        tasks: exists ? s.tasks.map(t => t.id === task.id ? task : t) : [...s.tasks, task]
                    };
                }
                return s;
            }));
        } else {
            const exists = backlog.some(t => t.id === task.id);
            setBacklog(exists ? backlog.map(t => t.id === task.id ? task : t) : [...backlog, task]);
        }
        toast({ title: "Task Saved", description: `Task "${task.title}" has been saved.` });
    };

    const handleDeleteTask = (taskId: string, sprintId?: string) => {
        if (sprintId) {
            setSprints(sprints.map(s => s.id === sprintId ? { ...s, tasks: s.tasks.filter(t => t.id !== taskId) } : s));
        } else {
            setBacklog(backlog.filter(t => t.id !== taskId));
        }
        toast({ title: "Task Deleted", description: "The task has been removed.", variant: "destructive" });
    };

    const handleSaveSprint = (sprint: Sprint) => {
        const exists = sprints.some(s => s.id === sprint.id);
        setSprints(exists ? sprints.map(s => s.id === sprint.id ? sprint : s) : [...sprints, sprint]);
        toast({ title: "Sprint Saved", description: `Sprint "${sprint.name}" has been saved.` });
    };

    const handleDeleteSprint = (sprintId: string) => {
        setSprints(sprints.filter(s => s.id !== sprintId));
        toast({ title: "Sprint Deleted", description: "The sprint has been removed.", variant: "destructive" });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border border-border/50">
                    <Button variant="ghost" size="sm" className="h-8 rounded-md bg-background shadow-sm">Board</Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-md">Backlog</Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-md">Timeline</Button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search tasks..." className="pl-9 h-9 w-[200px] lg:w-[300px] rounded-lg" />
                    </div>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                        <Filter className="h-4 w-4" /> Filter
                    </Button>
                    <SprintForm
                        onSave={handleSaveSprint}
                        trigger={
                            <Button size="sm" className="h-9 gap-2 bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="h-4 w-4" /> Create Sprint
                            </Button>
                        }
                    />
                </div>
            </div>

            <div className="grid gap-6">
                {/* Active & Planned Sprints */}
                {sprints.map((sprint) => (
                    <Card key={sprint.id} className="border-border/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 py-3 px-4 border-b border-border/40">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Badge className={cn(
                                        "uppercase text-[10px] tracking-wider",
                                        sprint.status === 'active' ? "bg-emerald-500 hover:bg-emerald-600" : "bg-blue-500 hover:bg-blue-600 font-medium"
                                    )}>
                                        {sprint.status}
                                    </Badge>
                                    <CardTitle className="text-base font-bold flex items-center gap-2">
                                        {sprint.name}
                                        <span className="text-xs font-normal text-muted-foreground ml-2">
                                            {sprint.startDate ? `${sprint.startDate} - ${sprint.endDate}` : 'Dates not set'}
                                        </span>
                                    </CardTitle>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2].map(i => (
                                            <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                                                U{i}
                                            </div>
                                        ))}
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Sprint Actions</DropdownMenuLabel>
                                            <SprintForm
                                                initialData={sprint}
                                                onSave={handleSaveSprint}
                                                trigger={
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <Edit className="mr-2 h-4 w-4" /> Edit Sprint
                                                    </DropdownMenuItem>
                                                }
                                            />
                                            <DropdownMenuSeparator />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete Sprint
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Sprint?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will permanently delete "{sprint.name}". All tasks in this sprint will be lost if not moved.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteSprint(sprint.id)} className="bg-destructive hover:bg-destructive/90 text-white">
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {sprint.tasks.length > 0 ? (
                                <div className="divide-y divide-border/40">
                                    {sprint.tasks.map((task) => (
                                        <TaskRow
                                            key={task.id}
                                            task={task}
                                            onEdit={(t) => handleSaveTask(t, sprint.id)}
                                            onDelete={(id) => handleDeleteTask(id, sprint.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center border-dashed border-2 border-border/40 m-4 rounded-xl flex flex-col items-center gap-2">
                                    <Rocket className="h-8 w-8 text-muted-foreground/30" />
                                    <p className="text-sm text-muted-foreground">Drag tasks here to include them in this sprint</p>
                                    <Button variant="outline" size="sm" className="mt-2">Add Existing Tasks</Button>
                                </div>
                            )}
                            <div className="p-2 border-t border-border/40">
                                <TaskForm
                                    onSave={(t) => handleSaveTask(t, sprint.id)}
                                    trigger={
                                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-9 text-muted-foreground hover:text-foreground">
                                            <Plus className="h-4 w-4" /> Add task
                                        </Button>
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Backlog */}
                <div className="bg-card border border-border/60 rounded-xl shadow-sm">
                    <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => setIsBacklogExpanded(!isBacklogExpanded)}
                    >
                        <div className="flex items-center gap-3">
                            {isBacklogExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                            <div className="flex items-center gap-2">
                                <ListTodo className="h-5 w-5 text-indigo-500" />
                                <h3 className="font-bold text-lg">Backlog</h3>
                                <Badge variant="secondary" className="ml-2 bg-indigo-500/10 text-indigo-600 border-indigo-500/20">{backlog.length} issues</Badge>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                {totalBacklogEstimate}h total
                            </div>
                            <TaskForm
                                onSave={(t) => handleSaveTask(t)}
                                trigger={
                                    <Button size="sm" className="gap-2 h-8" onClick={(e) => e.stopPropagation()}>
                                        <Plus className="h-4 w-4" /> Create Issue
                                    </Button>
                                }
                            />
                        </div>
                    </div>

                    {isBacklogExpanded && (
                        <div className="border-t border-border/40 divide-y divide-border/40">
                            {backlog.map((task) => (
                                <TaskRow
                                    key={task.id}
                                    task={task}
                                    onEdit={(t) => handleSaveTask(t)}
                                    onDelete={(id) => handleDeleteTask(id)}
                                />
                            ))}
                            <div className="p-3">
                                <TaskForm
                                    onSave={(t) => handleSaveTask(t)}
                                    trigger={
                                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-10 text-muted-foreground hover:text-foreground border border-dashed border-border/60 rounded-lg">
                                            <Plus className="h-4 w-4" /> Create another issue
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function TaskRow({ task, onEdit, onDelete }: { task: Task; onEdit: (t: Task) => void; onDelete: (id: string) => void }) {
    const priorityColor = {
        low: "text-blue-500",
        medium: "text-amber-500",
        high: "text-rose-500"
    };

    return (
        <div className="group flex items-center justify-between py-2 px-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4 flex-1">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground min-w-[60px] justify-center bg-muted/30">
                        OC-{task.id}
                    </Badge>
                    <span className="text-sm font-medium text-foreground/90 leading-none">{task.title}</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", priorityColor[task.priority])} />
                    <span className="text-[11px] font-semibold uppercase tracking-tight text-muted-foreground/60">{task.priority}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 h-6 px-2 rounded-md bg-muted/60 text-[11px] font-bold">
                        {task.estimate}h
                    </div>
                    <div className="h-7 w-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                        {task.assignee[0]}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                            <TaskForm
                                initialData={task}
                                onSave={onEdit}
                                trigger={
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Edit className="mr-2 h-4 w-4" /> Edit Task
                                    </DropdownMenuItem>
                                }
                            />
                            <DropdownMenuSeparator />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete Task
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently remove the task "{task.title}".
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onDelete(task.id)} className="bg-destructive hover:bg-destructive/90 text-white">
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
