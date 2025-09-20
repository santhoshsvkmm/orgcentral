'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, Clock, FileCheck, Camera, AlertCircle, TrendingUp, Plus } from 'lucide-react';

async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Downtown Office Complex";
  if (id === "2") return "Residential Tower Project";
  return `Construction Project (ID: ${id})`;
}

const qualityMetrics = {
  overallScore: 94,
  passedInspections: 87,
  failedInspections: 8,
  pendingInspections: 12,
  reworkItems: 5,
  completionRate: 91
};

const inspections = [
  {
    id: 'QC-001',
    type: 'Concrete Pour',
    area: 'Foundation - Section A',
    date: '2024-02-01',
    inspector: 'Mike Johnson',
    status: 'Passed',
    score: 96,
    defects: 0,
    photos: 8
  },
  {
    id: 'QC-002',
    type: 'Rebar Installation',
    area: 'Level 2 - East Wing',
    date: '2024-02-02',
    inspector: 'Sarah Wilson',
    status: 'Failed',
    score: 72,
    defects: 3,
    photos: 12
  },
  {
    id: 'QC-003',
    type: 'Electrical Rough-in',
    area: 'Level 3 - All Areas',
    date: '2024-02-03',
    inspector: 'Tom Martinez',
    status: 'Pending',
    score: null,
    defects: null,
    photos: 0
  },
  {
    id: 'QC-004',
    type: 'Drywall Installation',
    area: 'Level 1 - Lobby',
    date: '2024-02-04',
    inspector: 'Lisa Chen',
    status: 'Passed',
    score: 89,
    defects: 1,
    photos: 6
  }
];

const defects = [
  {
    id: 'DEF-001',
    type: 'Dimensional Variance',
    severity: 'Medium',
    area: 'Level 2 - East Wing',
    description: 'Rebar spacing exceeds tolerance by 2 inches',
    status: 'Open',
    assignedTo: 'John Martinez',
    dueDate: '2024-02-10',
    photos: 4
  },
  {
    id: 'DEF-002',
    type: 'Material Defect',
    severity: 'High',
    area: 'Foundation - Section B',
    description: 'Concrete surface shows honeycomb pattern',
    status: 'In Progress',
    assignedTo: 'Mike Thompson',
    dueDate: '2024-02-08',
    photos: 6
  },
  {
    id: 'DEF-003',
    type: 'Workmanship',
    severity: 'Low',
    area: 'Level 1 - Lobby',
    description: 'Minor drywall joint imperfection',
    status: 'Resolved',
    assignedTo: 'Sarah Wilson',
    dueDate: '2024-02-05',
    photos: 3
  }
];

const punchList = [
  { item: 'Touch up paint in conference room', trade: 'Painting', priority: 'Low', status: 'Open', dueDate: '2024-02-15' },
  { item: 'Replace damaged ceiling tile', trade: 'Ceiling', priority: 'Medium', status: 'In Progress', dueDate: '2024-02-12' },
  { item: 'Fix door alignment in main entrance', trade: 'Carpentry', priority: 'High', status: 'Open', dueDate: '2024-02-08' },
  { item: 'Clean construction debris from HVAC vents', trade: 'HVAC', priority: 'Medium', status: 'Completed', dueDate: '2024-02-06' }
];

export default function QualityPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  return (
    <>
      <PageTitle
        title={`Quality Control: ${projectName}`}
        description="Comprehensive quality management, inspections, and defect tracking."
        actions={
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Inspection
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

      {/* Quality Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualityMetrics.overallScore}%</div>
            <p className="text-xs text-muted-foreground">Overall quality rating</p>
            <Progress value={qualityMetrics.overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed Inspections</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualityMetrics.passedInspections}</div>
            <p className="text-xs text-muted-foreground">Successful inspections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Inspections</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualityMetrics.failedInspections}</div>
            <p className="text-xs text-muted-foreground">Requiring rework</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualityMetrics.pendingInspections}</div>
            <p className="text-xs text-muted-foreground">Awaiting inspection</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inspections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="defects">Defects</TabsTrigger>
          <TabsTrigger value="punch-list">Punch List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Quality Inspections
              </CardTitle>
              <CardDescription>
                Track quality control inspections and compliance checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspections.map((inspection) => (
                  <div key={inspection.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{inspection.type}</h3>
                        <Badge variant={inspection.status === 'Passed' ? 'default' : inspection.status === 'Failed' ? 'destructive' : 'secondary'}>
                          {inspection.status}
                        </Badge>
                        {inspection.score && (
                          <Badge variant={inspection.score >= 90 ? 'default' : inspection.score >= 70 ? 'secondary' : 'destructive'}>
                            Score: {inspection.score}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{inspection.area}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>Date: {inspection.date}</div>
                        <div>Inspector: {inspection.inspector}</div>
                        <div className="flex items-center gap-1">
                          <Camera className="h-3 w-3" />
                          {inspection.photos} photos
                        </div>
                        {inspection.defects !== null && <div>Defects: {inspection.defects}</div>}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defects">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Quality Defects
              </CardTitle>
              <CardDescription>
                Track and manage quality defects and corrective actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {defects.map((defect) => (
                  <div key={defect.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{defect.id}</h3>
                        <Badge variant={defect.severity === 'High' ? 'destructive' : defect.severity === 'Medium' ? 'default' : 'secondary'}>
                          {defect.severity}
                        </Badge>
                        <Badge variant={defect.status === 'Resolved' ? 'default' : defect.status === 'In Progress' ? 'secondary' : 'destructive'}>
                          {defect.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{defect.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>Type: {defect.type}</div>
                        <div>Area: {defect.area}</div>
                        <div>Assigned: {defect.assignedTo}</div>
                        <div>Due: {defect.dueDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Camera className="h-3 w-3" />
                        {defect.photos}
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="punch-list">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Punch List Items
              </CardTitle>
              <CardDescription>
                Final completion items and touch-up work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {punchList.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{item.item}</h3>
                        <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'default' : 'secondary'}>
                          {item.priority}
                        </Badge>
                        <Badge variant={item.status === 'Completed' ? 'default' : item.status === 'In Progress' ? 'secondary' : 'destructive'}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>Trade: {item.trade}</div>
                        <div>Due Date: {item.dueDate}</div>
                        <div>Status: {item.status}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {item.status === 'Completed' ? 'View' : 'Update'}
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
                  Quality Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Inspection Pass Rate</h3>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex justify-between mb-1">
                        <span>This Month:</span>
                        <span className="text-green-600">91.6%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Last Month:</span>
                        <span>88.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Target:</span>
                        <span>≥90%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Common Defect Types</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Dimensional Issues (35%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Material Defects (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Workmanship (25%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Other (10%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>First-Time Pass Rate</span>
                      <span>91.6%</span>
                    </div>
                    <Progress value={91.6} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Target: ≥90%</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Defect Resolution Time</span>
                      <span>3.2 days</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Target: ≤5 days</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Punch List Completion</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Target: ≥95%</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Satisfaction</span>
                      <span>4.6/5.0</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Target: ≥4.5</p>
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