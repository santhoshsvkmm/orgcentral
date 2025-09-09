'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Circle,
  Users,
  ChevronRight,
  Flag
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface TimelinePhase {
  id: string;
  name: string;
  description?: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed' | 'on-hold';
  startDate: string;
  endDate: string;
  progress: number;
  assignedTeam?: string[];
  dependencies?: string[];
  milestones?: {
    id: string;
    name: string;
    date: string;
    completed: boolean;
  }[];
  estimatedDuration: number; // in days
  actualDuration?: number; // in days
}

interface ProjectTimelineProps {
  phases: TimelinePhase[];
  projectName: string;
  onPhaseClick?: (phase: TimelinePhase) => void;
  className?: string;
}

const statusConfig = {
  completed: { 
    icon: CheckCircle, 
    color: 'text-green-500', 
    bgColor: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-800'
  },
  'in-progress': { 
    icon: Clock, 
    color: 'text-blue-500', 
    bgColor: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-800'
  },
  upcoming: { 
    icon: Circle, 
    color: 'text-gray-400', 
    bgColor: 'bg-gray-50 border-gray-200',
    badge: 'bg-gray-100 text-gray-800'
  },
  delayed: { 
    icon: AlertCircle, 
    color: 'text-red-500', 
    bgColor: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-800'
  },
  'on-hold': { 
    icon: Clock, 
    color: 'text-yellow-500', 
    bgColor: 'bg-yellow-50 border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-800'
  }
};

export function ProjectTimeline({ 
  phases, 
  projectName, 
  onPhaseClick, 
  className = '' 
}: ProjectTimelineProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Project Timeline
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {projectName} - Phase progression and milestones
            </p>
          </div>
          <Button variant="outline" size="sm">
            View Gantt Chart
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="relative">
          {phases.map((phase, index) => {
            const statusInfo = statusConfig[phase.status];
            const StatusIcon = statusInfo.icon;
            const isLast = index === phases.length - 1;

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                )}

                <div
                  className={`relative flex gap-4 p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 ${statusInfo.bgColor}`}
                  onClick={() => onPhaseClick?.(phase)}
                >
                  {/* Status icon */}
                  <div className={`flex-shrink-0 p-2 rounded-full bg-white border-2 ${statusInfo.color}`}>
                    <StatusIcon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 space-y-3">
                    {/* Phase header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{phase.name}</h3>
                        {phase.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {phase.description}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className={statusInfo.badge}>
                        {phase.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>

                    {/* Progress bar */}
                    {phase.status === 'in-progress' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                    )}

                    {/* Timeline info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Start Date</div>
                          <div className="text-muted-foreground">
                            {formatDate(phase.startDate)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">End Date</div>
                          <div className="text-muted-foreground">
                            {formatDate(phase.endDate)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">
                            {phase.actualDuration || calculateDuration(phase.startDate, phase.endDate)} days
                            {phase.actualDuration && phase.actualDuration !== phase.estimatedDuration && (
                              <span className={`ml-1 ${phase.actualDuration > phase.estimatedDuration ? 'text-red-500' : 'text-green-500'}`}>
                                ({phase.actualDuration > phase.estimatedDuration ? '+' : '-'}
                                {Math.abs(phase.actualDuration - phase.estimatedDuration)})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Team assignment */}
                    {phase.assignedTeam && phase.assignedTeam.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          {phase.assignedTeam.map((member, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Milestones */}
                    {phase.milestones && phase.milestones.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Key Milestones
                        </h4>
                        <div className="space-y-1">
                          {phase.milestones.map((milestone) => (
                            <div 
                              key={milestone.id} 
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className={`h-2 w-2 rounded-full ${
                                milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`} />
                              <span className={milestone.completed ? 'line-through text-muted-foreground' : ''}>
                                {milestone.name}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                ({formatDate(milestone.date)})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Sample timeline data
export const sampleTimelinePhases: TimelinePhase[] = [
  {
    id: 'phase-1',
    name: 'Site Preparation & Foundation',
    description: 'Site clearing, excavation, and foundation work',
    status: 'completed',
    startDate: '2024-01-15',
    endDate: '2024-03-01',
    progress: 100,
    assignedTeam: ['Site Team A', 'Foundation Crew'],
    estimatedDuration: 45,
    actualDuration: 42,
    milestones: [
      { id: 'm1', name: 'Site Clearing Complete', date: '2024-01-25', completed: true },
      { id: 'm2', name: 'Foundation Poured', date: '2024-02-20', completed: true }
    ]
  },
  {
    id: 'phase-2',
    name: 'Structural Framework',
    description: 'Steel framework and concrete structure',
    status: 'in-progress',
    startDate: '2024-03-01',
    endDate: '2024-05-15',
    progress: 65,
    assignedTeam: ['Steel Crew', 'Concrete Team', 'Safety Inspector'],
    estimatedDuration: 75,
    milestones: [
      { id: 'm3', name: 'Steel Frame Complete', date: '2024-04-01', completed: true },
      { id: 'm4', name: 'Concrete Floors Poured', date: '2024-04-30', completed: false }
    ]
  },
  {
    id: 'phase-3',
    name: 'MEP Installation',
    description: 'Mechanical, Electrical, and Plumbing systems',
    status: 'upcoming',
    startDate: '2024-05-01',
    endDate: '2024-07-30',
    progress: 0,
    assignedTeam: ['Electrical Team', 'Plumbing Crew', 'HVAC Specialists'],
    estimatedDuration: 90,
    milestones: [
      { id: 'm5', name: 'Electrical Rough-in', date: '2024-06-01', completed: false },
      { id: 'm6', name: 'Plumbing Installation', date: '2024-06-15', completed: false }
    ]
  },
  {
    id: 'phase-4',
    name: 'Interior Finishing',
    description: 'Drywall, flooring, painting, and fixtures',
    status: 'upcoming',
    startDate: '2024-07-15',
    endDate: '2024-09-30',
    progress: 0,
    assignedTeam: ['Finishing Crew', 'Painters', 'Flooring Team'],
    estimatedDuration: 75,
    milestones: [
      { id: 'm7', name: 'Drywall Complete', date: '2024-08-15', completed: false },
      { id: 'm8', name: 'Final Inspections', date: '2024-09-25', completed: false }
    ]
  }
];
