'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  HardHat, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Wrench,
  ShieldAlert,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface ConstructionMetric {
  id: string;
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  status?: 'good' | 'warning' | 'critical' | 'neutral';
  icon: 'safety' | 'productivity' | 'budget' | 'timeline' | 'quality' | 'workforce' | 'equipment' | 'compliance';
  description?: string;
  target?: string | number;
}

interface ConstructionMetricsProps {
  metrics: ConstructionMetric[];
  className?: string;
}

const iconMap = {
  safety: { icon: ShieldAlert, color: 'text-red-500' },
  productivity: { icon: TrendingUp, color: 'text-green-500' },
  budget: { icon: DollarSign, color: 'text-blue-500' },
  timeline: { icon: Calendar, color: 'text-purple-500' },
  quality: { icon: Target, color: 'text-orange-500' },
  workforce: { icon: Users, color: 'text-indigo-500' },
  equipment: { icon: Wrench, color: 'text-gray-500' },
  compliance: { icon: CheckCircle, color: 'text-emerald-500' },
};

const statusConfig = {
  good: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Good' },
  warning: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Warning' },
  critical: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Critical' },
  neutral: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Neutral' },
};

export function ConstructionMetrics({ metrics, className = '' }: ConstructionMetricsProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {metrics.map((metric, index) => {
        const iconConfig = iconMap[metric.icon];
        const IconComponent = iconConfig.icon;
        const statusInfo = metric.status ? statusConfig[metric.status] : null;

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
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-full bg-muted ${iconConfig.color}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
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

                {metric.change && (
                  <div className="flex items-center gap-1">
                    {metric.change.type === 'increase' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : metric.change.type === 'decrease' ? (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.change.type === 'increase' ? 'text-green-600' :
                      metric.change.type === 'decrease' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {metric.change.value > 0 ? '+' : ''}{metric.change.value}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {metric.change.period}
                    </span>
                  </div>
                )}

                {statusInfo && (
                  <Badge 
                    variant="outline" 
                    className={`${statusInfo.color} text-xs`}
                  >
                    {statusInfo.label}
                  </Badge>
                )}

                {metric.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {metric.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

// Sample data for construction metrics
export const sampleConstructionMetrics: ConstructionMetric[] = [
  {
    id: 'safety-incidents',
    title: 'Safety Incidents',
    value: 2,
    change: { value: -50, type: 'decrease', period: 'this month' },
    status: 'good',
    icon: 'safety',
    description: 'Total safety incidents reported across all active projects',
    target: 0
  },
  {
    id: 'productivity-index',
    title: 'Productivity Index',
    value: '87%',
    change: { value: 12, type: 'increase', period: 'this quarter' },
    status: 'good',
    icon: 'productivity',
    description: 'Overall productivity compared to industry benchmarks'
  },
  {
    id: 'budget-variance',
    title: 'Budget Variance',
    value: '+3.2%',
    change: { value: 1.5, type: 'increase', period: 'this month' },
    status: 'warning',
    icon: 'budget',
    description: 'Average budget variance across all active projects'
  },
  {
    id: 'schedule-adherence',
    title: 'Schedule Adherence',
    value: '92%',
    change: { value: -2, type: 'decrease', period: 'this week' },
    status: 'good',
    icon: 'timeline',
    description: 'Percentage of milestones completed on time'
  },
  {
    id: 'quality-score',
    title: 'Quality Score',
    value: '4.6',
    change: { value: 8, type: 'increase', period: 'this month' },
    status: 'good',
    icon: 'quality',
    description: 'Average quality rating from inspections and reviews',
    target: '5.0'
  },
  {
    id: 'workforce-utilization',
    title: 'Workforce Utilization',
    value: '89%',
    change: { value: 5, type: 'increase', period: 'this week' },
    status: 'good',
    icon: 'workforce',
    description: 'Percentage of available workforce actively engaged'
  },
  {
    id: 'equipment-uptime',
    title: 'Equipment Uptime',
    value: '94%',
    change: { value: -3, type: 'decrease', period: 'this week' },
    status: 'warning',
    icon: 'equipment',
    description: 'Percentage of equipment operational time'
  },
  {
    id: 'compliance-rate',
    title: 'Compliance Rate',
    value: '98%',
    change: { value: 2, type: 'increase', period: 'this month' },
    status: 'good',
    icon: 'compliance',
    description: 'Percentage of regulatory compliance across all projects'
  }
];
