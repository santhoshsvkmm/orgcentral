'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  BarChart3,
  Kanban,
  Timer,
  TrendingUp,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EnhancedGanttChart } from '@/components/projects/enhanced-gantt-chart';
import { MicroSchedulingOverview } from '@/components/projects/micro-scheduling-overview';
import { EnhancedKanbanBoard } from '@/components/projects/enhanced-kanban-board';

interface ComprehensivePlanningProps {
  params: {
    id: string;
  };
}

interface ProjectOverview {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'planning' | 'in-progress' | 'delayed' | 'completed';
  budget: number;
  spent: number;
  teamSize: number;
  tasksTotal: number;
  tasksCompleted: number;
  milestonesTotal: number;
  milestonesCompleted: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

const sampleProject: ProjectOverview = {
  id: '1',
  name: 'Construction Management Platform',
  description: 'Comprehensive platform for managing construction projects with AI-powered insights',
  startDate: '2024-11-01',
  endDate: '2024-12-31',
  progress: 45,
  status: 'in-progress',
  budget: 250000,
  spent: 112500,
  teamSize: 12,
  tasksTotal: 47,
  tasksCompleted: 21,
  milestonesTotal: 8,
  milestonesCompleted: 3,
  riskLevel: 'medium'
};

export default function ComprehensivePlanningPage({ params }: ComprehensivePlanningProps) {
  const [project, setProject] = useState<ProjectOverview | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching project data
    setTimeout(() => {
      setProject(sampleProject);
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Project Not Found</h3>
          <p className="text-muted-foreground">The requested project could not be loaded.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: ProjectOverview['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: ProjectOverview['riskLevel']) => {
    switch (risk) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const budgetUtilization = (project.spent / project.budget) * 100;
  const taskCompletion = (project.tasksCompleted / project.tasksTotal) * 100;
  const milestoneCompletion = (project.milestonesCompleted / project.milestonesTotal) * 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <CardDescription className="mt-2 max-w-2xl">
                  {project.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(project.status)}>
                  {project.status.replace('-', ' ')}
                </Badge>
                <Badge className={getRiskColor(project.riskLevel)}>
                  {project.riskLevel} risk
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budgetUtilization.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              ${project.spent.toLocaleString()} of ${project.budget.toLocaleString()}
            </p>
            <Progress value={budgetUtilization} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskCompletion.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {project.tasksCompleted} of {project.tasksTotal} tasks
            </p>
            <Progress value={taskCompletion} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.teamSize}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Planning Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="gantt" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Gantt Chart
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <Kanban className="h-4 w-4" />
              Kanban Board
            </TabsTrigger>
            <TabsTrigger value="micro-scheduling" className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Micro-Scheduling
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Project Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Start Date</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">End Date</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Duration</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Completed</span>
                      <span className="text-sm text-muted-foreground">
                        {project.milestonesCompleted} of {project.milestonesTotal}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Milestone Progress</span>
                        <span>{milestoneCompletion.toFixed(1)}%</span>
                      </div>
                      <Progress value={milestoneCompletion} />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs">Project Kickoff</span>
                        <Badge variant="outline" className="ml-auto">Completed</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs">Requirements Finalized</span>
                        <Badge variant="outline" className="ml-auto">Completed</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs">Design Phase Complete</span>
                        <Badge variant="outline" className="ml-auto">In Progress</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Project Health & Risks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">On Track</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Development progress is meeting planned milestones
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-800 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Resource Constraint</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Backend team capacity at 95% utilization
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">Budget Healthy</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Spending is within projected budget range
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gantt">
            <EnhancedGanttChart projectId={project.id} projectName={project.name} />
          </TabsContent>

          <TabsContent value="kanban">
            <EnhancedKanbanBoard projectId={project.id} />
          </TabsContent>

          <TabsContent value="micro-scheduling">
            <MicroSchedulingOverview projectId={project.id} />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>
                  Visual representation of project phases and key milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4" />
                  <p>Timeline component will be implemented here</p>
                  <p className="text-sm">Interactive timeline with phases, dependencies, and critical path</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
