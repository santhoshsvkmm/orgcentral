'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

export interface AnalyticsData {
  projectPerformance: {
    name: string;
    planned: number;
    actual: number;
    budget: number;
  }[];
  budgetDistribution: {
    name: string;
    value: number;
    color: string;
  }[];
  timelineAnalysis: {
    month: string;
    onTime: number;
    delayed: number;
    completed: number;
  }[];
  kpiMetrics: {
    id: string;
    name: string;
    value: string;
    change: number;
    trend: 'up' | 'down' | 'stable';
    target?: string;
  }[];
  resourceUtilization: {
    resource: string;
    utilization: number;
    capacity: number;
    efficiency: number;
  }[];
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
  onExport?: () => void;
  onRefresh?: () => void;
  className?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function AnalyticsDashboard({ 
  data, 
  onExport, 
  onRefresh, 
  className = '' 
}: AnalyticsDashboardProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Analytics & Reporting Dashboard
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Comprehensive analytics and insights for construction projects
          </p>
        </CardHeader>
      </Card>

      {/* KPI Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.kpiMetrics.map((metric, index) => {
          const TrendIcon = metric.trend === 'up' ? TrendingUp : 
                           metric.trend === 'down' ? TrendingDown : 
                           Calendar;

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.name}
                  </CardTitle>
                  <TrendIcon className={`h-4 w-4 ${
                    metric.trend === 'up' ? 'text-green-500' : 
                    metric.trend === 'down' ? 'text-red-500' : 
                    'text-gray-500'
                  }`} />
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    {metric.target && (
                      <div className="text-sm text-muted-foreground">
                        / {metric.target}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-medium ${
                      metric.change > 0 ? 'text-green-600' : 
                      metric.change < 0 ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Project Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.projectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planned" fill="#8884d8" name="Planned Progress" />
                <Bar dataKey="actual" fill="#82ca9d" name="Actual Progress" />
                <Bar dataKey="budget" fill="#ffc658" name="Budget Used %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Budget Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={data.budgetDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.budgetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            Project Timeline Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.timelineAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                name="Completed"
              />
              <Area 
                type="monotone" 
                dataKey="onTime" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="On Time"
              />
              <Area 
                type="monotone" 
                dataKey="delayed" 
                stackId="1" 
                stroke="#ffc658" 
                fill="#ffc658" 
                name="Delayed"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Utilization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Resource Utilization Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.resourceUtilization.map((resource, index) => (
              <motion.div
                key={resource.resource}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{resource.resource}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Utilization: {resource.utilization}%
                    </span>
                    <span className="text-muted-foreground">
                      Efficiency: {resource.efficiency}%
                    </span>
                    <Badge variant={resource.utilization > 90 ? 'destructive' : 
                                  resource.utilization > 70 ? 'default' : 'secondary'}>
                      {resource.utilization > 90 ? 'Overutilized' : 
                       resource.utilization > 70 ? 'Optimal' : 'Underutilized'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={resource.utilization} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>Capacity: {resource.capacity}</span>
                    <span>100%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sample analytics data
export const sampleAnalyticsData: AnalyticsData = {
  projectPerformance: [
    { name: 'Tower A', planned: 75, actual: 68, budget: 72 },
    { name: 'Plaza B', planned: 60, actual: 65, budget: 58 },
    { name: 'Bridge C', planned: 45, actual: 42, budget: 48 },
    { name: 'Mall D', planned: 30, actual: 35, budget: 32 },
  ],
  budgetDistribution: [
    { name: 'Labor', value: 35, color: '#0088FE' },
    { name: 'Materials', value: 30, color: '#00C49F' },
    { name: 'Equipment', value: 20, color: '#FFBB28' },
    { name: 'Overhead', value: 15, color: '#FF8042' },
  ],
  timelineAnalysis: [
    { month: 'Jan', onTime: 8, delayed: 2, completed: 5 },
    { month: 'Feb', onTime: 10, delayed: 3, completed: 7 },
    { month: 'Mar', onTime: 12, delayed: 1, completed: 9 },
    { month: 'Apr', onTime: 9, delayed: 4, completed: 6 },
    { month: 'May', onTime: 11, delayed: 2, completed: 8 },
    { month: 'Jun', onTime: 13, delayed: 1, completed: 10 },
  ],
  kpiMetrics: [
    {
      id: 'completion-rate',
      name: 'Project Completion Rate',
      value: '87%',
      change: 5.2,
      trend: 'up',
      target: '90%'
    },
    {
      id: 'budget-variance',
      name: 'Budget Variance',
      value: '+3.2%',
      change: -1.8,
      trend: 'down'
    },
    {
      id: 'safety-score',
      name: 'Safety Score',
      value: '94',
      change: 2.1,
      trend: 'up',
      target: '95'
    },
    {
      id: 'client-satisfaction',
      name: 'Client Satisfaction',
      value: '4.6/5',
      change: 0.3,
      trend: 'up'
    }
  ],
  resourceUtilization: [
    { resource: 'Construction Crews', utilization: 85, capacity: 100, efficiency: 92 },
    { resource: 'Heavy Equipment', utilization: 78, capacity: 95, efficiency: 88 },
    { resource: 'Project Managers', utilization: 95, capacity: 100, efficiency: 90 },
    { resource: 'Specialized Tools', utilization: 65, capacity: 80, efficiency: 85 },
    { resource: 'Vehicles', utilization: 72, capacity: 90, efficiency: 87 },
  ]
};
