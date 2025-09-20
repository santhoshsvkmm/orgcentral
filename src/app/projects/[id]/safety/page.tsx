'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, FileText, Users, Calendar, TrendingUp, Eye, Plus } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Downtown Office Complex";
  if (id === "2") return "Residential Tower Project";
  return `Construction Project (ID: ${id})`;
}

const safetyMetrics = {
  totalIncidents: 3,
  daysWithoutIncident: 45,
  safetyScore: 92,
  completedInspections: 28,
  pendingInspections: 4,
  trainingCompliance: 87
};

const incidents = [
  {
    id: 'INC-001',
    type: 'Near Miss',
    severity: 'Low',
    date: '2024-01-15',
    location: 'Site A - Foundation',
    description: 'Worker slipped on wet surface, no injury',
    status: 'Closed',
    reportedBy: 'John Martinez'
  },
  {
    id: 'INC-002',
    type: 'Minor Injury',
    severity: 'Medium',
    date: '2024-01-20',
    location: 'Site B - 3rd Floor',
    description: 'Cut on hand from sharp metal edge',
    status: 'Under Investigation',
    reportedBy: 'Sarah Wilson'
  },
  {
    id: 'INC-003',
    type: 'Equipment Damage',
    severity: 'High',
    date: '2024-01-25',
    location: 'Equipment Yard',
    description: 'Crane cable snapped during operation',
    status: 'Open',
    reportedBy: 'Mike Thompson'
  }
];

const inspections = [
  {
    id: 'INS-001',
    type: 'Daily Safety Walk',
    area: 'Entire Site',
    date: '2024-02-01',
    inspector: 'Safety Officer',
    status: 'Completed',
    score: 95,
    issues: 2
  },
  {
    id: 'INS-002',
    type: 'Equipment Inspection',
    area: 'Tower Crane',
    date: '2024-02-02',
    inspector: 'Certified Inspector',
    status: 'Pending',
    score: null,
    issues: null
  },
  {
    id: 'INS-003',
    type: 'PPE Compliance Check',
    area: 'All Work Areas',
    date: '2024-02-03',
    inspector: 'Site Supervisor',
    status: 'Scheduled',
    score: null,
    issues: null
  }
];

const trainingRecords = [
  { employee: 'John Martinez', course: 'Fall Protection', completion: '2024-01-15', expiry: '2025-01-15', status: 'Current' },
  { employee: 'Sarah Wilson', course: 'Confined Space Entry', completion: '2023-12-20', expiry: '2024-12-20', status: 'Expiring Soon' },
  { employee: 'Mike Thompson', course: 'Crane Operation Safety', completion: '2023-11-10', expiry: '2024-11-10', status: 'Expired' },
  { employee: 'Lisa Chen', course: 'Hazmat Handling', completion: '2024-01-25', expiry: '2025-01-25', status: 'Current' }
];

export default function SafetyPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Safety Management: ${projectName}`}
        description="Comprehensive safety monitoring, incident tracking, and compliance management."
        actions={
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Report Incident
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project
              </Link>
            </Button>
          </div>
        }
      />

      {/* Safety Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safetyMetrics.safetyScore}%</div>
            <p className="text-xs text-muted-foreground">Overall safety rating</p>
            <Progress value={safetyMetrics.safetyScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Without Incident</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safetyMetrics.daysWithoutIncident}</div>
            <p className="text-xs text-muted-foreground">Consecutive safe days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safetyMetrics.totalIncidents}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Compliance</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safetyMetrics.trainingCompliance}%</div>
            <p className="text-xs text-muted-foreground">Team compliance rate</p>
            <Progress value={safetyMetrics.trainingCompliance} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Safety Incidents
              </CardTitle>
              <CardDescription>
                Track and manage safety incidents, near misses, and corrective actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{incident.id}</h3>
                        <Badge variant={incident.severity === 'High' ? 'destructive' : incident.severity === 'Medium' ? 'default' : 'secondary'}>
                          {incident.severity}
                        </Badge>
                        <Badge variant={incident.status === 'Closed' ? 'default' : incident.status === 'Open' ? 'destructive' : 'secondary'}>
                          {incident.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>Type: {incident.type}</div>
                        <div>Location: {incident.location}</div>
                        <div>Date: {incident.date}</div>
                        <div>Reported by: {incident.reportedBy}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspections">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Safety Inspections
              </CardTitle>
              <CardDescription>
                Schedule and track safety inspections and compliance checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspections.map((inspection) => (
                  <div key={inspection.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{inspection.type}</h3>
                        <Badge variant={inspection.status === 'Completed' ? 'default' : inspection.status === 'Pending' ? 'secondary' : 'outline'}>
                          {inspection.status}
                        </Badge>
                        {inspection.score && (
                          <Badge variant={inspection.score >= 90 ? 'default' : inspection.score >= 70 ? 'secondary' : 'destructive'}>
                            Score: {inspection.score}%
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>Area: {inspection.area}</div>
                        <div>Date: {inspection.date}</div>
                        <div>Inspector: {inspection.inspector}</div>
                        {inspection.issues !== null && <div>Issues Found: {inspection.issues}</div>}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {inspection.status === 'Completed' ? 'View Report' : 'Manage'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Safety Training Records
              </CardTitle>
              <CardDescription>
                Monitor safety training compliance and certification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{record.employee}</h3>
                        <Badge variant={record.status === 'Current' ? 'default' : record.status === 'Expiring Soon' ? 'secondary' : 'destructive'}>
                          {record.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>Course: {record.course}</div>
                        <div>Completed: {record.completion}</div>
                        <div>Expires: {record.expiry}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {record.status === 'Expired' ? 'Renew' : 'View Certificate'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Safety Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Incident Rate Trend</h3>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex justify-between mb-1">
                        <span>This Month:</span>
                        <span className="text-green-600">↓ 25% decrease</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Last Month:</span>
                        <span>4 incidents</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average:</span>
                        <span>3.2 incidents/month</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Common Incident Types</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Slips & Falls (40%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Equipment Related (35%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">PPE Violations (25%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Lost Time Injury Rate</span>
                      <span>0.8</span>
                    </div>
                    <Progress value={20} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Target: &lt;1.0</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Near Miss Reporting</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Target: &gt;80%</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Safety Meeting Attendance</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Target: &gt;90%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}