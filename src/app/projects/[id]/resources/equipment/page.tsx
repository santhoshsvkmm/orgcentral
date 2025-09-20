
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft, Construction, Truck, Wrench, Calendar, MapPin, DollarSign, AlertTriangle, CheckCircle, Clock, Search, Plus } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Downtown Office Complex";
  if (id === "2") return "Residential Tower Project";
  return `Construction Project (ID: ${id})`;
}

const equipment = [
  {
    id: 'EQ-001',
    name: 'Caterpillar 320 Excavator',
    type: 'Heavy Machinery',
    status: 'Active',
    location: 'Site A - Foundation',
    operator: 'John Martinez',
    dailyRate: 850,
    nextMaintenance: '2024-02-15',
    hoursUsed: 245,
    condition: 'Good'
  },
  {
    id: 'EQ-002', 
    name: 'Concrete Mixer Truck',
    type: 'Vehicle',
    status: 'Active',
    location: 'Site B - Concrete Pour',
    operator: 'Mike Thompson',
    dailyRate: 650,
    nextMaintenance: '2024-02-20',
    hoursUsed: 180,
    condition: 'Excellent'
  },
  {
    id: 'EQ-003',
    name: 'Tower Crane TC-200',
    type: 'Crane',
    status: 'Maintenance',
    location: 'Maintenance Yard',
    operator: 'Sarah Wilson',
    dailyRate: 1200,
    nextMaintenance: '2024-02-10',
    hoursUsed: 520,
    condition: 'Fair'
  },
  {
    id: 'EQ-004',
    name: 'Bobcat Skid Loader',
    type: 'Light Machinery',
    status: 'Available',
    location: 'Equipment Yard',
    operator: 'Unassigned',
    dailyRate: 350,
    nextMaintenance: '2024-03-01',
    hoursUsed: 95,
    condition: 'Good'
  }
];

const maintenanceSchedule = [
  { equipment: 'Tower Crane TC-200', type: 'Preventive', date: '2024-02-10', status: 'Overdue', priority: 'High' },
  { equipment: 'Caterpillar 320 Excavator', type: 'Inspection', date: '2024-02-15', status: 'Scheduled', priority: 'Medium' },
  { equipment: 'Concrete Mixer Truck', type: 'Service', date: '2024-02-20', status: 'Scheduled', priority: 'Low' },
  { equipment: 'Bobcat Skid Loader', type: 'Preventive', date: '2024-03-01', status: 'Upcoming', priority: 'Medium' }
];

const equipmentCosts = [
  { month: 'January', rental: 45000, maintenance: 8500, fuel: 12000, total: 65500 },
  { month: 'February', rental: 48000, maintenance: 6200, fuel: 13500, total: 67700 },
  { month: 'March', rental: 52000, maintenance: 9800, fuel: 14200, total: 76000 }
];

export default function EquipmentPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  const totalEquipment = equipment.length;
  const activeEquipment = equipment.filter(eq => eq.status === 'Active').length;
  const maintenanceEquipment = equipment.filter(eq => eq.status === 'Maintenance').length;
  const totalDailyCost = equipment.reduce((sum, eq) => sum + eq.dailyRate, 0);

  return (
    <>
      <PageTitle
        title={`Equipment Management: ${projectName}`}
        description="Track and manage construction equipment, maintenance, and costs."
        actions={
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
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

      {/* Equipment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equipment</CardTitle>
            <Construction className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEquipment}</div>
            <p className="text-xs text-muted-foreground">Units on project</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Equipment</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEquipment}</div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceEquipment}</div>
            <p className="text-xs text-muted-foreground">Under service</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDailyCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total daily rates</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory">Equipment Inventory</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="costs">Cost Tracking</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Construction className="h-5 w-5" />
                Equipment Inventory
              </CardTitle>
              <CardDescription>
                Complete list of equipment assigned to this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search equipment..." className="max-w-sm" />
              </div>
              <div className="space-y-4">
                {equipment.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge variant={item.status === 'Active' ? 'default' : item.status === 'Maintenance' ? 'destructive' : 'secondary'}>
                          {item.status}
                        </Badge>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                        <div>Operator: {item.operator}</div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          ${item.dailyRate}/day
                        </div>
                        <div>Hours: {item.hoursUsed}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.condition === 'Excellent' ? 'default' : item.condition === 'Good' ? 'secondary' : 'destructive'}>
                        {item.condition}
                      </Badge>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Maintenance Schedule
              </CardTitle>
              <CardDescription>
                Track maintenance schedules and service history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceSchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{item.equipment}</h3>
                        <Badge variant={item.status === 'Overdue' ? 'destructive' : item.status === 'Scheduled' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                        <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'default' : 'secondary'}>
                          {item.priority} Priority
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{item.type} Maintenance</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {item.status === 'Overdue' ? 'Schedule Now' : 'View Details'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Equipment Cost Tracking
              </CardTitle>
              <CardDescription>
                Monitor equipment-related expenses and budget utilization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipmentCosts.map((cost, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{cost.month} 2024</h3>
                      <div className="text-lg font-bold">${cost.total.toLocaleString()}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Rental:</span>
                        <div className="font-medium">${cost.rental.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Maintenance:</span>
                        <div className="font-medium">${cost.maintenance.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fuel:</span>
                        <div className="font-medium">${cost.fuel.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Equipment Utilization
              </CardTitle>
              <CardDescription>
                Track equipment usage efficiency and productivity metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipment.map((item) => {
                  const utilizationRate = Math.min((item.hoursUsed / 600) * 100, 100);
                  return (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="text-sm font-medium">{utilizationRate.toFixed(1)}% Utilized</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Hours Used: {item.hoursUsed}</span>
                          <span>Target: 600 hours</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${utilizationRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
