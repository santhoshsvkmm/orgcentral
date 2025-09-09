'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Users, 
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface Subcontractor {
  id: string;
  name: string;
  company: string;
  specialties: string[];
  rating: number;
  status: 'active' | 'pending' | 'completed' | 'on-hold';
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  currentProjects: {
    projectId: string;
    projectName: string;
    role: string;
    progress: number;
    startDate: string;
    endDate: string;
  }[];
  performance: {
    onTimeCompletion: number;
    qualityScore: number;
    budgetAdherence: number;
    safetyRecord: number;
  };
  financials: {
    totalContracts: number;
    currentValue: number;
    currency: string;
  };
  certifications: string[];
  avatar?: string;
}

interface SubcontractorManagementProps {
  subcontractors: Subcontractor[];
  onSubcontractorClick?: (subcontractor: Subcontractor) => void;
  className?: string;
}

const statusConfig = {
  active: { color: 'bg-green-100 text-green-800', label: 'Active' },
  pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
  completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
  'on-hold': { color: 'bg-gray-100 text-gray-800', label: 'On Hold' }
};

const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return 'text-green-600';
  if (rating >= 3.5) return 'text-yellow-600';
  return 'text-red-600';
};

const getPerformanceColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 75) return 'text-yellow-600';
  return 'text-red-600';
};

export function SubcontractorManagement({ 
  subcontractors, 
  onSubcontractorClick, 
  className = '' 
}: SubcontractorManagementProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Subcontractor Management
            </CardTitle>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Add Subcontractor
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage relationships, performance, and contracts with subcontractors
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {subcontractors.map((subcontractor, index) => {
          const statusInfo = statusConfig[subcontractor.status];

          return (
            <motion.div
              key={subcontractor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => onSubcontractorClick?.(subcontractor)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={subcontractor.avatar} />
                        <AvatarFallback>
                          {subcontractor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{subcontractor.name}</h3>
                        <p className="text-sm text-muted-foreground">{subcontractor.company}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className={`h-4 w-4 fill-current ${getRatingColor(subcontractor.rating)}`} />
                          <span className={`text-sm font-medium ${getRatingColor(subcontractor.rating)}`}>
                            {subcontractor.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({subcontractor.performance.onTimeCompletion}% on-time)
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={statusInfo.color}>
                      {statusInfo.label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Specialties */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {subcontractor.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Current Projects */}
                  {subcontractor.currentProjects.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Current Projects</h4>
                      <div className="space-y-2">
                        {subcontractor.currentProjects.slice(0, 2).map((project, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-muted/50">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{project.projectName}</span>
                              <span className="text-xs text-muted-foreground">{project.progress}%</span>
                            </div>
                            <div className="text-xs text-muted-foreground mb-1">{project.role}</div>
                            <Progress value={project.progress} className="h-1" />
                          </div>
                        ))}
                        {subcontractor.currentProjects.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{subcontractor.currentProjects.length - 2} more projects
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Performance Metrics */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Performance</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between">
                        <span>Quality Score</span>
                        <span className={`font-medium ${getPerformanceColor(subcontractor.performance.qualityScore)}`}>
                          {subcontractor.performance.qualityScore}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget Adherence</span>
                        <span className={`font-medium ${getPerformanceColor(subcontractor.performance.budgetAdherence)}`}>
                          {subcontractor.performance.budgetAdherence}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Safety Record</span>
                        <span className={`font-medium ${getPerformanceColor(subcontractor.performance.safetyRecord)}`}>
                          {subcontractor.performance.safetyRecord}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>On-Time Rate</span>
                        <span className={`font-medium ${getPerformanceColor(subcontractor.performance.onTimeCompletion)}`}>
                          {subcontractor.performance.onTimeCompletion}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact & Financial Info */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{subcontractor.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{subcontractor.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{subcontractor.contact.address}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {subcontractor.financials.currency}{subcontractor.financials.currentValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {subcontractor.financials.totalContracts} contracts
                        </span>
                      </div>
                      {subcontractor.certifications.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {subcontractor.certifications.length} certifications
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="h-3 w-3 mr-1" />
                      View Contracts
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Sample subcontractor data
export const sampleSubcontractors: Subcontractor[] = [
  {
    id: 'sub-1',
    name: 'Michael Rodriguez',
    company: 'Rodriguez Electrical Services',
    specialties: ['Electrical Installation', 'Industrial Wiring', 'Smart Building Systems'],
    rating: 4.8,
    status: 'active',
    contact: {
      email: 'michael@rodriguezelectric.com',
      phone: '(555) 123-4567',
      address: 'Downtown District'
    },
    currentProjects: [
      {
        projectId: 'project-alpha',
        projectName: 'Residential Tower A',
        role: 'Lead Electrician',
        progress: 75,
        startDate: '2024-01-15',
        endDate: '2024-03-30'
      },
      {
        projectId: 'project-beta',
        projectName: 'Commercial Plaza',
        role: 'Electrical Consultant',
        progress: 45,
        startDate: '2024-02-01',
        endDate: '2024-05-15'
      }
    ],
    performance: {
      onTimeCompletion: 95,
      qualityScore: 92,
      budgetAdherence: 88,
      safetyRecord: 98
    },
    financials: {
      totalContracts: 12,
      currentValue: 285000,
      currency: '$'
    },
    certifications: ['Licensed Electrician', 'OSHA 30', 'Smart Building Certified'],
    avatar: 'https://placehold.co/48x48.png?text=MR'
  },
  {
    id: 'sub-2',
    name: 'Sarah Chen',
    company: 'Chen Plumbing & HVAC',
    specialties: ['Plumbing Systems', 'HVAC Installation', 'Green Building Solutions'],
    rating: 4.6,
    status: 'active',
    contact: {
      email: 'sarah@chenplumbing.com',
      phone: '(555) 987-6543',
      address: 'Industrial Zone'
    },
    currentProjects: [
      {
        projectId: 'project-gamma',
        projectName: 'Infrastructure Bridge',
        role: 'HVAC Specialist',
        progress: 60,
        startDate: '2024-01-20',
        endDate: '2024-04-10'
      }
    ],
    performance: {
      onTimeCompletion: 87,
      qualityScore: 94,
      budgetAdherence: 91,
      safetyRecord: 96
    },
    financials: {
      totalContracts: 8,
      currentValue: 195000,
      currency: '$'
    },
    certifications: ['Master Plumber', 'HVAC Certified', 'Green Building Professional'],
    avatar: 'https://placehold.co/48x48.png?text=SC'
  },
  {
    id: 'sub-3',
    name: 'David Thompson',
    company: 'Thompson Steel Works',
    specialties: ['Steel Fabrication', 'Structural Welding', 'Heavy Construction'],
    rating: 4.4,
    status: 'pending',
    contact: {
      email: 'david@thompsonsteel.com',
      phone: '(555) 456-7890',
      address: 'Manufacturing District'
    },
    currentProjects: [],
    performance: {
      onTimeCompletion: 82,
      qualityScore: 89,
      budgetAdherence: 85,
      safetyRecord: 94
    },
    financials: {
      totalContracts: 15,
      currentValue: 450000,
      currency: '$'
    },
    certifications: ['Certified Welder', 'Steel Fabrication License', 'OSHA 30'],
    avatar: 'https://placehold.co/48x48.png?text=DT'
  },
  {
    id: 'sub-4',
    name: 'Lisa Martinez',
    company: 'Martinez Finishing Solutions',
    specialties: ['Interior Finishing', 'Painting', 'Flooring Installation'],
    rating: 4.9,
    status: 'completed',
    contact: {
      email: 'lisa@martinezfinishing.com',
      phone: '(555) 321-0987',
      address: 'Arts District'
    },
    currentProjects: [],
    performance: {
      onTimeCompletion: 98,
      qualityScore: 96,
      budgetAdherence: 93,
      safetyRecord: 99
    },
    financials: {
      totalContracts: 22,
      currentValue: 125000,
      currency: '$'
    },
    certifications: ['Interior Design Certified', 'Paint Contractor License', 'Flooring Specialist'],
    avatar: 'https://placehold.co/48x48.png?text=LM'
  }
];
