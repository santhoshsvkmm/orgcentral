'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MapPin,
  Hammer
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface ProjectStatusData {
  id: string;
  name: string;
  type: 'residential' | 'commercial' | 'infrastructure';
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'delayed';
  progress: number;
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    daysRemaining?: number;
  };
  location: string;
  projectManager: {
    name: string;
    avatar?: string;
  };
  teamSize: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdate: string;
}

interface ProjectStatusCardProps {
  project: ProjectStatusData;
  onClick?: () => void;
}

const statusConfig = {
  planning: { color: 'bg-blue-500', label: 'Planning', icon: Calendar },
  'in-progress': { color: 'bg-green-500', label: 'In Progress', icon: Hammer },
  'on-hold': { color: 'bg-yellow-500', label: 'On Hold', icon: Clock },
  completed: { color: 'bg-emerald-500', label: 'Completed', icon: CheckCircle },
  delayed: { color: 'bg-red-500', label: 'Delayed', icon: AlertTriangle },
};

const riskConfig = {
  low: { color: 'bg-green-100 text-green-800', label: 'Low Risk' },
  medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium Risk' },
  high: { color: 'bg-red-100 text-red-800', label: 'High Risk' },
};

const typeConfig = {
  residential: { label: 'Residential', color: 'bg-blue-100 text-blue-800' },
  commercial: { label: 'Commercial', color: 'bg-purple-100 text-purple-800' },
  infrastructure: { label: 'Infrastructure', color: 'bg-orange-100 text-orange-800' },
};

export function ProjectStatusCard({ project, onClick }: ProjectStatusCardProps) {
  const statusInfo = statusConfig[project.status];
  const StatusIcon = statusInfo.icon;
  const budgetPercentage = (project.budget.spent / project.budget.allocated) * 100;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary"
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={typeConfig[project.type].color}>
                  {typeConfig[project.type].label}
                </Badge>
                <Badge variant="outline" className={riskConfig[project.riskLevel].color}>
                  {riskConfig[project.riskLevel].label}
                </Badge>
              </div>
            </div>
            <div className={`p-2 rounded-full ${statusInfo.color}`}>
              <StatusIcon className="h-4 w-4 text-white" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          {/* Budget Section */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-medium">
                {budgetPercentage.toFixed(1)}% used
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>
                {project.budget.currency}{project.budget.spent.toLocaleString()} / {project.budget.currency}{project.budget.allocated.toLocaleString()}
              </span>
            </div>
            <Progress value={budgetPercentage} className="h-2" />
          </div>

          {/* Timeline & Location */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">
                  {project.timeline.daysRemaining ? `${project.timeline.daysRemaining} days left` : 'Timeline'}
                </div>
                <div className="text-muted-foreground text-xs">
                  {new Date(project.timeline.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-muted-foreground text-xs">{project.location}</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={project.projectManager.avatar} />
                <AvatarFallback>
                  {project.projectManager.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{project.projectManager.name}</div>
                <div className="text-muted-foreground">Project Manager</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{project.teamSize} members</span>
            </div>
          </div>

          {/* Last Update */}
          <div className="text-xs text-muted-foreground">
            Last updated: {project.lastUpdate}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
