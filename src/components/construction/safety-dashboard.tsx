'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  HardHat,
  Eye,
  FileText,
  TrendingDown,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface SafetyIncident {
  id: string;
  type: 'near-miss' | 'minor-injury' | 'major-injury' | 'property-damage';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  reportedBy: string;
  reportedDate: string;
  location: string;
  projectId?: string;
}

export interface SafetyMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  period: string;
}

interface SafetyDashboardProps {
  incidents: SafetyIncident[];
  metrics: SafetyMetric[];
  onIncidentClick?: (incident: SafetyIncident) => void;
  className?: string;
}

const incidentTypeConfig = {
  'near-miss': { 
    color: 'bg-yellow-100 text-yellow-800', 
    label: 'Near Miss',
    icon: Eye
  },
  'minor-injury': { 
    color: 'bg-orange-100 text-orange-800', 
    label: 'Minor Injury',
    icon: AlertTriangle
  },
  'major-injury': { 
    color: 'bg-red-100 text-red-800', 
    label: 'Major Injury',
    icon: AlertTriangle
  },
  'property-damage': { 
    color: 'bg-purple-100 text-purple-800', 
    label: 'Property Damage',
    icon: AlertTriangle
  }
};

const severityConfig = {
  low: { color: 'bg-green-100 text-green-800', label: 'Low' },
  medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
  high: { color: 'bg-orange-100 text-orange-800', label: 'High' },
  critical: { color: 'bg-red-100 text-red-800', label: 'Critical' }
};

const statusConfig = {
  reported: { color: 'bg-blue-100 text-blue-800', label: 'Reported' },
  investigating: { color: 'bg-yellow-100 text-yellow-800', label: 'Investigating' },
  resolved: { color: 'bg-green-100 text-green-800', label: 'Resolved' },
  closed: { color: 'bg-gray-100 text-gray-800', label: 'Closed' }
};

export function SafetyDashboard({ 
  incidents, 
  metrics, 
  onIncidentClick, 
  className = '' 
}: SafetyDashboardProps) {
  const recentIncidents = incidents
    .sort((a, b) => new Date(b.reportedDate).getTime() - new Date(a.reportedDate).getTime())
    .slice(0, 5);

  const criticalIncidents = incidents.filter(i => i.severity === 'critical' && i.status !== 'closed');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Safety Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const isOnTarget = metric.value <= metric.target;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : 
                           metric.trend === 'down' ? TrendingDown : Clock;

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
                  <Shield className={`h-4 w-4 ${isOnTarget ? 'text-green-500' : 'text-red-500'}`} />
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">
                      / {metric.target} {metric.unit}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <TrendIcon className={`h-4 w-4 ${
                      metric.trend === 'down' ? 'text-green-500' : 
                      metric.trend === 'up' ? 'text-red-500' : 
                      'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      metric.trend === 'down' ? 'text-green-600' : 
                      metric.trend === 'up' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {metric.period}
                    </span>
                  </div>

                  <Progress 
                    value={(metric.value / metric.target) * 100} 
                    className="h-2"
                  />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Critical Incidents Alert */}
      {criticalIncidents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Critical Safety Incidents Requiring Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {criticalIncidents.map((incident) => (
                  <div 
                    key={incident.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer hover:shadow-sm"
                    onClick={() => onIncidentClick?.(incident)}
                  >
                    <div>
                      <div className="font-medium text-sm">{incident.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {incident.location} • {incident.reportedDate}
                      </div>
                    </div>
                    <Badge variant="outline" className={statusConfig[incident.status].color}>
                      {statusConfig[incident.status].label}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Safety Incidents
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {recentIncidents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                <p>No recent incidents</p>
                <p className="text-sm">Great safety record!</p>
              </div>
            ) : (
              recentIncidents.map((incident, index) => {
                const typeInfo = incidentTypeConfig[incident.type];
                const TypeIcon = typeInfo.icon;

                return (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className="p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200"
                      onClick={() => onIncidentClick?.(incident)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${typeInfo.color}`}>
                          <TypeIcon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{incident.title}</h4>
                            <div className="flex gap-1">
                              <Badge variant="outline" className={severityConfig[incident.severity].color}>
                                {severityConfig[incident.severity].label}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {incident.description}
                          </p>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <span className="text-muted-foreground">
                                {incident.location}
                              </span>
                              <span className="text-muted-foreground">
                                Reported by {incident.reportedBy}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{incident.reportedDate}</span>
                            </div>
                          </div>

                          <Badge variant="outline" className={statusConfig[incident.status].color}>
                            {statusConfig[incident.status].label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Safety Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-primary" />
              Safety Compliance Status
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">PPE Compliance</span>
                <span className="text-sm font-bold text-green-600">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Safety Training</span>
                <span className="text-sm font-bold text-green-600">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Equipment Inspections</span>
                <span className="text-sm font-bold text-yellow-600">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Site Safety Audits</span>
                <span className="text-sm font-bold text-green-600">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Safety Officers Active</span>
                </div>
                <span className="text-sm font-medium">8/10 sites</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Sample safety data
export const sampleSafetyIncidents: SafetyIncident[] = [
  {
    id: 'incident-1',
    type: 'near-miss',
    title: 'Crane Load Swing Near Workers',
    description: 'Crane operator noticed workers in swing radius during material lift. Load was stopped immediately.',
    severity: 'medium',
    status: 'resolved',
    reportedBy: 'Mike Johnson',
    reportedDate: '2024-01-15',
    location: 'Site A - Tower Construction',
    projectId: 'project-alpha'
  },
  {
    id: 'incident-2',
    type: 'minor-injury',
    title: 'Cut from Sharp Metal Edge',
    description: 'Worker sustained minor cut on hand from unfinished steel beam edge. First aid administered.',
    severity: 'low',
    status: 'closed',
    reportedBy: 'Sarah Wilson',
    reportedDate: '2024-01-12',
    location: 'Site B - Steel Framework',
    projectId: 'project-beta'
  },
  {
    id: 'incident-3',
    type: 'property-damage',
    title: 'Equipment Collision',
    description: 'Forklift backed into temporary fence causing minor damage. No injuries reported.',
    severity: 'low',
    status: 'investigating',
    reportedBy: 'Tom Davis',
    reportedDate: '2024-01-10',
    location: 'Site A - Material Storage'
  }
];

export const sampleSafetyMetrics: SafetyMetric[] = [
  {
    id: 'incidents-month',
    name: 'Incidents This Month',
    value: 2,
    target: 5,
    unit: 'incidents',
    trend: 'down',
    trendValue: -60,
    period: 'vs last month'
  },
  {
    id: 'days-without-injury',
    name: 'Days Without Injury',
    value: 45,
    target: 30,
    unit: 'days',
    trend: 'up',
    trendValue: 50,
    period: 'current streak'
  },
  {
    id: 'safety-score',
    name: 'Safety Score',
    value: 94,
    target: 95,
    unit: '%',
    trend: 'up',
    trendValue: 3,
    period: 'this quarter'
  },
  {
    id: 'training-completion',
    name: 'Training Completion',
    value: 98,
    target: 100,
    unit: '%',
    trend: 'stable',
    trendValue: 0,
    period: 'this month'
  }
];
