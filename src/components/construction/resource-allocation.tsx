'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Wrench, 
  Truck, 
  HardHat,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export interface Resource {
  id: string;
  name: string;
  type: 'personnel' | 'equipment' | 'material' | 'vehicle';
  status: 'available' | 'assigned' | 'maintenance' | 'unavailable';
  utilization: number; // percentage
  currentProject?: string;
  location: string;
  cost: {
    hourly?: number;
    daily?: number;
    currency: string;
  };
  skills?: string[];
  nextAvailable?: string;
  avatar?: string;
}

interface ResourceAllocationProps {
  resources: Resource[];
  onResourceClick?: (resource: Resource) => void;
  className?: string;
}

const typeConfig = {
  personnel: { 
    icon: Users, 
    color: 'bg-blue-100 text-blue-800',
    bgColor: 'bg-blue-50'
  },
  equipment: { 
    icon: Wrench, 
    color: 'bg-orange-100 text-orange-800',
    bgColor: 'bg-orange-50'
  },
  material: { 
    icon: HardHat, 
    color: 'bg-green-100 text-green-800',
    bgColor: 'bg-green-50'
  },
  vehicle: { 
    icon: Truck, 
    color: 'bg-purple-100 text-purple-800',
    bgColor: 'bg-purple-50'
  }
};

const statusConfig = {
  available: { 
    color: 'bg-green-100 text-green-800', 
    label: 'Available',
    icon: CheckCircle
  },
  assigned: { 
    color: 'bg-blue-100 text-blue-800', 
    label: 'Assigned',
    icon: Clock
  },
  maintenance: { 
    color: 'bg-yellow-100 text-yellow-800', 
    label: 'Maintenance',
    icon: AlertTriangle
  },
  unavailable: { 
    color: 'bg-red-100 text-red-800', 
    label: 'Unavailable',
    icon: AlertTriangle
  }
};

export function ResourceAllocation({ 
  resources, 
  onResourceClick, 
  className = '' 
}: ResourceAllocationProps) {
  const resourcesByType = useMemo(() => {
    return resources.reduce((acc, resource) => {
      if (!acc[resource.type]) acc[resource.type] = [];
      acc[resource.type].push(resource);
      return acc;
    }, {} as Record<string, Resource[]>);
  }, [resources]);

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(resourcesByType).map(([type, typeResources]) => {
        const typeInfo = typeConfig[type as keyof typeof typeConfig];
        const TypeIcon = typeInfo.icon;
        const avgUtilization = typeResources.reduce((sum, r) => sum + r.utilization, 0) / typeResources.length;

        return (
          <Card key={type}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${typeInfo.color}`}>
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="capitalize">{type}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {typeResources.length} resources • {avgUtilization.toFixed(0)}% avg utilization
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage {type}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {typeResources.map((resource, index) => {
                  const statusInfo = statusConfig[resource.status];
                  const StatusIcon = statusInfo.icon;

                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div
                        className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 ${typeInfo.bgColor}`}
                        onClick={() => onResourceClick?.(resource)}
                      >
                        <div className="space-y-3">
                          {/* Resource header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              {resource.type === 'personnel' && (
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={resource.avatar} />
                                  <AvatarFallback>
                                    {resource.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <h3 className="font-semibold text-sm">{resource.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  {resource.location}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className={statusInfo.color}>
                              {statusInfo.label}
                            </Badge>
                          </div>

                          {/* Utilization */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Utilization</span>
                              <span className={`font-medium ${getUtilizationColor(resource.utilization)}`}>
                                {resource.utilization}%
                              </span>
                            </div>
                            <Progress value={resource.utilization} className="h-1.5" />
                          </div>

                          {/* Current assignment */}
                          {resource.currentProject && (
                            <div className="text-xs">
                              <span className="text-muted-foreground">Assigned to: </span>
                              <span className="font-medium">{resource.currentProject}</span>
                            </div>
                          )}

                          {/* Skills for personnel */}
                          {resource.skills && resource.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {resource.skills.slice(0, 3).map((skill, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {resource.skills.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{resource.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Cost and availability */}
                          <div className="flex justify-between items-center text-xs">
                            <div className="text-muted-foreground">
                              {resource.cost.hourly && `${resource.cost.currency}${resource.cost.hourly}/hr`}
                              {resource.cost.daily && `${resource.cost.currency}${resource.cost.daily}/day`}
                            </div>
                            {resource.nextAvailable && resource.status !== 'available' && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>Available {resource.nextAvailable}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Sample resource data
export const sampleResources: Resource[] = [
  // Personnel
  {
    id: 'person-1',
    name: 'John Smith',
    type: 'personnel',
    status: 'assigned',
    utilization: 85,
    currentProject: 'Residential Tower A',
    location: 'Site A',
    cost: { hourly: 45, currency: '$' },
    skills: ['Concrete', 'Steel Work', 'Safety Inspector'],
    avatar: 'https://placehold.co/40x40.png?text=JS'
  },
  {
    id: 'person-2',
    name: 'Maria Garcia',
    type: 'personnel',
    status: 'available',
    utilization: 60,
    location: 'Office',
    cost: { hourly: 55, currency: '$' },
    skills: ['Project Management', 'Quality Control', 'BIM'],
    avatar: 'https://placehold.co/40x40.png?text=MG'
  },
  {
    id: 'person-3',
    name: 'David Chen',
    type: 'personnel',
    status: 'assigned',
    utilization: 95,
    currentProject: 'Commercial Plaza',
    location: 'Site B',
    cost: { hourly: 50, currency: '$' },
    skills: ['Electrical', 'HVAC', 'Controls'],
    nextAvailable: 'Next Monday',
    avatar: 'https://placehold.co/40x40.png?text=DC'
  },

  // Equipment
  {
    id: 'equipment-1',
    name: 'Tower Crane TC-1',
    type: 'equipment',
    status: 'assigned',
    utilization: 78,
    currentProject: 'Residential Tower A',
    location: 'Site A',
    cost: { daily: 850, currency: '$' }
  },
  {
    id: 'equipment-2',
    name: 'Excavator CAT 320',
    type: 'equipment',
    status: 'maintenance',
    utilization: 0,
    location: 'Maintenance Yard',
    cost: { daily: 450, currency: '$' },
    nextAvailable: 'Thursday'
  },
  {
    id: 'equipment-3',
    name: 'Concrete Pump',
    type: 'equipment',
    status: 'available',
    utilization: 45,
    location: 'Equipment Pool',
    cost: { daily: 650, currency: '$' }
  },

  // Vehicles
  {
    id: 'vehicle-1',
    name: 'Delivery Truck DT-01',
    type: 'vehicle',
    status: 'assigned',
    utilization: 70,
    currentProject: 'Material Transport',
    location: 'En Route',
    cost: { daily: 200, currency: '$' }
  },
  {
    id: 'vehicle-2',
    name: 'Site Supervisor Van',
    type: 'vehicle',
    status: 'available',
    utilization: 30,
    location: 'Office Parking',
    cost: { daily: 120, currency: '$' }
  },

  // Materials
  {
    id: 'material-1',
    name: 'Steel Rebar Grade 60',
    type: 'material',
    status: 'available',
    utilization: 65,
    location: 'Warehouse A',
    cost: { hourly: 0, currency: '$' }
  },
  {
    id: 'material-2',
    name: 'Concrete Mix C30',
    type: 'material',
    status: 'assigned',
    utilization: 90,
    currentProject: 'Foundation Phase',
    location: 'Site A',
    cost: { hourly: 0, currency: '$' }
  }
];
