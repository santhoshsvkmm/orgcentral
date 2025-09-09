'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Timer,
  Activity,
  Plus,
  Edit,
  Trash2,
  Link,
  GitBranch
} from 'lucide-react';
import { motion } from 'framer-motion';

interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: number; // in days
  progress: number; // 0-100
  assignee: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[];
  milestone: boolean;
  category: string;
  estimatedHours: number;
  actualHours?: number;
  description?: string;
}

interface EnhancedGanttChartProps {
  projectId: string;
  projectName: string;
}

const sampleGanttTasks: GanttTask[] = [
  {
    id: 'gt1',
    name: 'Project Planning & Requirements',
    startDate: '2024-11-01',
    endDate: '2024-11-07',
    duration: 7,
    progress: 100,
    assignee: 'Project Manager',
    status: 'completed',
    priority: 'high',
    dependencies: [],
    milestone: false,
    category: 'Planning',
    estimatedHours: 40,
    actualHours: 35,
    description: 'Initial project planning and requirements gathering'
  },
  {
    id: 'gt2',
    name: 'System Architecture Design',
    startDate: '2024-11-08',
    endDate: '2024-11-14',
    duration: 7,
    progress: 85,
    assignee: 'Lead Architect',
    status: 'in-progress',
    priority: 'critical',
    dependencies: ['gt1'],
    milestone: false,
    category: 'Design',
    estimatedHours: 60,
    actualHours: 45,
    description: 'Design system architecture and technical specifications'
  },
  {
    id: 'gt3',
    name: 'Database Schema Design',
    startDate: '2024-11-10',
    endDate: '2024-11-16',
    duration: 7,
    progress: 60,
    assignee: 'Database Architect',
    status: 'in-progress',
    priority: 'high',
    dependencies: ['gt1'],
    milestone: false,
    category: 'Database',
    estimatedHours: 35,
    actualHours: 20,
    description: 'Design and optimize database schema'
  },
  {
    id: 'gt4',
    name: 'Frontend Development',
    startDate: '2024-11-15',
    endDate: '2024-12-05',
    duration: 21,
    progress: 25,
    assignee: 'Frontend Team',
    status: 'in-progress',
    priority: 'high',
    dependencies: ['gt2'],
    milestone: false,
    category: 'Development',
    estimatedHours: 120,
    actualHours: 30,
    description: 'Develop user interface and frontend components'
  },
  {
    id: 'gt5',
    name: 'Backend API Development',
    startDate: '2024-11-17',
    endDate: '2024-12-10',
    duration: 24,
    progress: 15,
    assignee: 'Backend Team',
    status: 'not-started',
    priority: 'critical',
    dependencies: ['gt2', 'gt3'],
    milestone: false,
    category: 'Development',
    estimatedHours: 150,
    description: 'Develop backend APIs and business logic'
  },
  {
    id: 'gt6',
    name: 'Integration Testing',
    startDate: '2024-12-06',
    endDate: '2024-12-15',
    duration: 10,
    progress: 0,
    assignee: 'QA Team',
    status: 'not-started',
    priority: 'medium',
    dependencies: ['gt4', 'gt5'],
    milestone: false,
    category: 'Testing',
    estimatedHours: 80,
    description: 'Integration testing and quality assurance'
  },
  {
    id: 'gt7',
    name: 'Production Deployment',
    startDate: '2024-12-16',
    endDate: '2024-12-16',
    duration: 1,
    progress: 0,
    assignee: 'DevOps Team',
    status: 'not-started',
    priority: 'critical',
    dependencies: ['gt6'],
    milestone: true,
    category: 'Deployment',
    estimatedHours: 8,
    description: 'Deploy to production environment'
  }
];

export function EnhancedGanttChart({ projectId, projectName }: EnhancedGanttChartProps) {
  const [tasks, setTasks] = useState<GanttTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'days' | 'weeks' | 'months'>('weeks');
  const [showCriticalPath, setShowCriticalPath] = useState(false);

  useEffect(() => {
    setTasks(sampleGanttTasks);
  }, [projectId]);

  const getStatusColor = (status: GanttTask['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'not-started': return 'bg-gray-400';
      case 'delayed': return 'bg-orange-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: GanttTask['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Planning': 'bg-purple-100 text-purple-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Database': 'bg-indigo-100 text-indigo-800',
      'Development': 'bg-blue-100 text-blue-800',
      'Testing': 'bg-yellow-100 text-yellow-800',
      'Deployment': 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const calculateProjectProgress = () => {
    const totalTasks = tasks.length;
    const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
    return totalTasks > 0 ? totalProgress / totalTasks : 0;
  };

  const getTasksOnCriticalPath = () => {
    // Simplified critical path calculation
    return tasks.filter(task => 
      task.priority === 'critical' || 
      task.dependencies.length > 0 ||
      tasks.some(t => t.dependencies.includes(task.id))
    );
  };

  const generateTimelineGrid = () => {
    const startDate = new Date(Math.min(...tasks.map(t => new Date(t.startDate).getTime())));
    const endDate = new Date(Math.max(...tasks.map(t => new Date(t.endDate).getTime())));
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const columns = [];
    for (let i = 0; i <= totalDays; i += viewMode === 'days' ? 1 : viewMode === 'weeks' ? 7 : 30) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      columns.push(date);
    }
    return { startDate, endDate, totalDays, columns };
  };

  const getTaskPosition = (task: GanttTask, startDate: Date, totalDays: number) => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    const startOffset = Math.ceil((taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`
    };
  };

  const timeline = generateTimelineGrid();
  const criticalPathTasks = getTasksOnCriticalPath();
  const projectProgress = calculateProjectProgress();

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const delayedTasks = tasks.filter(t => t.status === 'delayed').length;
  const blockedTasks = tasks.filter(t => t.status === 'blocked').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                Enhanced Gantt Chart - {projectName}
              </CardTitle>
              <CardDescription>
                Visual project timeline with dependencies, critical path, and resource allocation
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant={showCriticalPath ? "default" : "outline"} 
                size="sm"
                onClick={() => setShowCriticalPath(!showCriticalPath)}
              >
                <GitBranch className="h-4 w-4 mr-2" />
                Critical Path
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Project Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectProgress.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
            <Progress value={projectProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">of {tasks.length} total tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed Tasks</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{delayedTasks}</div>
            <p className="text-xs text-muted-foreground">Behind schedule</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Tasks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{blockedTasks}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Gantt Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Timeline Header */}
            <div className="flex border-b pb-2">
              <div className="w-80 flex-shrink-0 font-medium text-sm">Task</div>
              <div className="flex-1 relative">
                <div className="flex">
                  {timeline.columns.map((date, index) => (
                    <div key={index} className="flex-1 text-xs text-center text-muted-foreground border-l px-1">
                      {date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: viewMode === 'days' ? 'numeric' : undefined,
                        year: viewMode === 'months' ? 'numeric' : undefined
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tasks */}
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {tasks.map((task, index) => {
                  const position = getTaskPosition(task, timeline.startDate, timeline.totalDays);
                  const isCriticalPath = showCriticalPath && criticalPathTasks.includes(task);
                  
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center py-2 hover:bg-muted/50 rounded ${
                        isCriticalPath ? 'bg-red-50 border border-red-200' : ''
                      }`}
                    >
                      {/* Task Info */}
                      <div className="w-80 flex-shrink-0 px-2">
                        <div className="flex items-center gap-2">
                          {task.milestone && <div className="w-3 h-3 bg-yellow-500 rotate-45" />}
                          <div className="flex-1">
                            <div className="font-medium text-sm">{task.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge size="sm" className={getCategoryColor(task.category)}>
                                {task.category}
                              </Badge>
                              <Badge size="sm" className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{task.assignee}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              setSelectedTask(task);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Timeline Bar */}
                      <div className="flex-1 relative h-8 px-2">
                        <div className="relative h-full">
                          <div
                            className={`absolute top-1 h-6 rounded ${getStatusColor(task.status)} ${
                              isCriticalPath ? 'ring-2 ring-red-400' : ''
                            }`}
                            style={position}
                          >
                            <div className="h-full flex items-center px-2">
                              <div className="text-xs text-white font-medium truncate">
                                {task.progress}%
                              </div>
                            </div>
                            {/* Progress overlay */}
                            <div
                              className="absolute top-0 left-0 h-full bg-white/30 rounded"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          
                          {/* Dependencies */}
                          {task.dependencies.length > 0 && (
                            <div className="absolute -top-1 left-0">
                              <Link className="h-3 w-3 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Task Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
            <DialogDescription>
              View and edit task information
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Task Name</Label>
                  <Input value={selectedTask.name} readOnly />
                </div>
                <div>
                  <Label>Assignee</Label>
                  <Input value={selectedTask.assignee} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input value={selectedTask.startDate} readOnly />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input value={selectedTask.endDate} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Progress</Label>
                  <div className="mt-2">
                    <Progress value={selectedTask.progress} />
                    <span className="text-sm text-muted-foreground">{selectedTask.progress}%</span>
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={`mt-2 ${getStatusColor(selectedTask.status)} text-white`}>
                    {selectedTask.status}
                  </Badge>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge className={`mt-2 ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority}
                  </Badge>
                </div>
              </div>
              {selectedTask.description && (
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedTask.description}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Estimated Hours</Label>
                  <Input value={selectedTask.estimatedHours} readOnly />
                </div>
                <div>
                  <Label>Actual Hours</Label>
                  <Input value={selectedTask.actualHours || 'N/A'} readOnly />
                </div>
              </div>
              {selectedTask.dependencies.length > 0 && (
                <div>
                  <Label>Dependencies</Label>
                  <div className="flex gap-1 mt-1">
                    {selectedTask.dependencies.map(depId => {
                      const depTask = tasks.find(t => t.id === depId);
                      return depTask ? (
                        <Badge key={depId} variant="outline">{depTask.name}</Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button>Edit Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
