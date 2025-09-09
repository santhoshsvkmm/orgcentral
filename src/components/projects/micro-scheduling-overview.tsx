'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MicroTask {
  id: string;
  name: string;
  duration: number; // in hours
  startTime: string;
  endTime: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[];
  resources: string[];
  estimatedEffort: number;
  actualEffort?: number;
}

interface TimeSlot {
  time: string;
  tasks: MicroTask[];
  utilization: number;
}

interface MicroSchedulingOverviewProps {
  projectId: string;
  date?: string;
}

const sampleMicroTasks: MicroTask[] = [
  {
    id: 'mt1',
    name: 'Database Schema Review',
    duration: 2,
    startTime: '09:00',
    endTime: '11:00',
    assignee: 'Alice Developer',
    status: 'completed',
    priority: 'high',
    dependencies: [],
    resources: ['Database Server', 'Documentation'],
    estimatedEffort: 2,
    actualEffort: 1.5
  },
  {
    id: 'mt2',
    name: 'API Endpoint Implementation',
    duration: 4,
    startTime: '11:00',
    endTime: '15:00',
    assignee: 'Bob Backend',
    status: 'in-progress',
    priority: 'critical',
    dependencies: ['mt1'],
    resources: ['Development Server', 'API Documentation'],
    estimatedEffort: 4,
    actualEffort: 2.5
  },
  {
    id: 'mt3',
    name: 'Unit Test Writing',
    duration: 3,
    startTime: '15:00',
    endTime: '18:00',
    assignee: 'Charlie Tester',
    status: 'pending',
    priority: 'medium',
    dependencies: ['mt2'],
    resources: ['Testing Framework'],
    estimatedEffort: 3
  },
  {
    id: 'mt4',
    name: 'UI Component Design',
    duration: 2.5,
    startTime: '09:30',
    endTime: '12:00',
    assignee: 'Diana Designer',
    status: 'in-progress',
    priority: 'high',
    dependencies: [],
    resources: ['Design System', 'Figma'],
    estimatedEffort: 2.5,
    actualEffort: 1.8
  },
  {
    id: 'mt5',
    name: 'Code Review Session',
    duration: 1.5,
    startTime: '16:00',
    endTime: '17:30',
    assignee: 'Eve Lead',
    status: 'blocked',
    priority: 'medium',
    dependencies: ['mt2'],
    resources: ['Review Checklist'],
    estimatedEffort: 1.5
  }
];

export function MicroSchedulingOverview({ projectId, date = new Date().toISOString().split('T')[0] }: MicroSchedulingOverviewProps) {
  const [tasks, setTasks] = useState<MicroTask[]>([]);
  const [selectedView, setSelectedView] = useState<'timeline' | 'resource' | 'performance'>('timeline');

  useEffect(() => {
    // Simulate fetching micro tasks for the project and date
    setTasks(sampleMicroTasks);
  }, [projectId, date]);

  const getStatusColor = (status: MicroTask['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: MicroTask['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const tasksAtTime = tasks.filter(task => {
        const taskStart = parseInt(task.startTime.split(':')[0]);
        const taskEnd = parseInt(task.endTime.split(':')[0]);
        return hour >= taskStart && hour < taskEnd;
      });
      
      slots.push({
        time,
        tasks: tasksAtTime,
        utilization: Math.min((tasksAtTime.length / 4) * 100, 100) // Assuming max 4 parallel tasks
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const totalEstimated = tasks.reduce((sum, task) => sum + task.estimatedEffort, 0);
  const totalActual = tasks.reduce((sum, task) => sum + (task.actualEffort || 0), 0);
  const efficiencyRate = totalEstimated > 0 ? (totalEstimated / Math.max(totalActual, totalEstimated)) * 100 : 100;

  const blockedTasks = tasks.filter(t => t.status === 'blocked').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Timer className="h-5 w-5 text-primary" />
                </div>
                Micro-Scheduling Overview
              </CardTitle>
              <CardDescription>
                Detailed task scheduling and resource allocation for {new Date(date).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Change Date
              </Button>
              <Button size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Optimize Schedule
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </p>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{efficiencyRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {totalActual}h actual vs {totalEstimated}h estimated
              </p>
              <Progress value={efficiencyRate} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressTasks}</div>
              <p className="text-xs text-muted-foreground">
                Currently in progress
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked Tasks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{blockedTasks}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="resource">Resource View</TabsTrigger>
          <TabsTrigger value="performance">Performance View</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Hourly Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {timeSlots.map((slot, index) => (
                    <motion.div
                      key={slot.time}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card"
                    >
                      <div className="min-w-16 text-sm font-mono text-muted-foreground">
                        {slot.time}
                      </div>
                      <div className="flex-1">
                        {slot.tasks.length === 0 ? (
                          <div className="text-sm text-muted-foreground italic">No scheduled tasks</div>
                        ) : (
                          <div className="space-y-2">
                            {slot.tasks.map(task => (
                              <div key={task.id} className="flex items-center gap-3 p-2 rounded border-l-4" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{task.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {task.assignee} • {task.duration}h • {task.startTime}-{task.endTime}
                                  </div>
                                </div>
                                <Badge className={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Resource Utilization</span>
                            <span>{slot.utilization.toFixed(0)}%</span>
                          </div>
                          <Progress value={slot.utilization} className="h-1 mt-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resource" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Resource Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(tasks.map(t => t.assignee))).map(assignee => {
                  const assigneeTasks = tasks.filter(t => t.assignee === assignee);
                  const totalHours = assigneeTasks.reduce((sum, task) => sum + task.duration, 0);
                  const completedHours = assigneeTasks
                    .filter(t => t.status === 'completed')
                    .reduce((sum, task) => sum + task.duration, 0);
                  const utilization = (totalHours / 8) * 100; // Assuming 8-hour workday

                  return (
                    <motion.div
                      key={assignee}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{assignee}</h4>
                          <p className="text-sm text-muted-foreground">
                            {totalHours}h scheduled • {completedHours}h completed
                          </p>
                        </div>
                        <Badge variant={utilization > 100 ? 'destructive' : utilization > 80 ? 'default' : 'secondary'}>
                          {utilization.toFixed(0)}% utilized
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {assigneeTasks.map(task => (
                          <div key={task.id} className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                            <span className="flex-1">{task.name}</span>
                            <span className="text-muted-foreground">{task.startTime}-{task.endTime}</span>
                            <Badge size="sm" className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Task Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.filter(t => t.actualEffort).map(task => {
                    const variance = ((task.actualEffort! - task.estimatedEffort) / task.estimatedEffort) * 100;
                    return (
                      <div key={task.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{task.name}</span>
                          <Badge variant={variance > 20 ? 'destructive' : variance < -10 ? 'default' : 'secondary'}>
                            {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Estimated: {task.estimatedEffort}h • Actual: {task.actualEffort}h
                        </div>
                        <Progress 
                          value={Math.min((task.actualEffort! / task.estimatedEffort) * 100, 100)} 
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Productivity Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">High Performers</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Alice Developer completed tasks 25% faster than estimated
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Attention Needed</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      1 task blocked, affecting downstream dependencies
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-800">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">Optimization</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      Resource utilization can be improved by 15% with task rebalancing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
