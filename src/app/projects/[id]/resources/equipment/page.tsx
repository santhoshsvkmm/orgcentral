
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import {
  ArrowLeft,
  Construction,
  Wrench,
  Clock,
  MapPin,
  Plus,
  Activity,
  Zap,
  Fuel,
  TrendingDown,
  BarChart3,
  AlertTriangle,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EquipmentForm } from '@/components/resources/equipment-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 50));
  if (id === "1") return "Downtown Office Complex";
  if (id === "2") return "Residential Tower Project";
  return `Construction Project (ID: ${id})`;
}

const EQUIPMENT_DATA = [
  {
    id: 'EQ-001',
    name: 'Caterpillar 320 Excavator',
    type: 'Heavy Machinery',
    status: 'Active',
    location: 'Site A - Foundation',
    operator: 'John Martinez',
    dailyRate: 850,
    nextMaintenance: '2026-02-28',
    hoursUsed: 245,
    condition: 'Excellent',
    fuelLevel: 85,
    lastMaintenance: '2026-01-10'
  },
  {
    id: 'EQ-002',
    name: 'Concrete Mixer Truck',
    type: 'Vehicle',
    status: 'Active',
    location: 'Site B - Concrete Pour',
    operator: 'Mike Thompson',
    dailyRate: 650,
    nextMaintenance: '2026-03-05',
    hoursUsed: 180,
    condition: 'Good',
    fuelLevel: 42,
    lastMaintenance: '2026-01-20'
  },
  {
    id: 'EQ-003',
    name: 'Tower Crane TC-200',
    type: 'Crane',
    status: 'Maintenance',
    location: 'Maintenance Yard',
    operator: 'Sarah Wilson',
    dailyRate: 1200,
    nextMaintenance: '2026-02-20',
    hoursUsed: 520,
    condition: 'Fair',
    fuelLevel: 10,
    lastMaintenance: '2025-12-15'
  },
  {
    id: 'EQ-004',
    name: 'Bobcat Skid Loader',
    type: 'Light Machinery',
    status: 'Available',
    location: 'Equipment Yard',
    operator: 'Unassigned',
    dailyRate: 350,
    nextMaintenance: '2026-03-15',
    hoursUsed: 95,
    condition: 'Good',
    fuelLevel: 98,
    lastMaintenance: '2026-02-01'
  }
];

const MAINTENANCE_LOG = [
  { equipment: 'Tower Crane TC-200', type: 'Hydraulic Service', date: '2026-02-10', status: 'Completed', cost: 1200 },
  { equipment: 'Caterpillar 320 Excavator', type: 'Engine Checkup', date: '2026-02-28', status: 'Scheduled', cost: 450 },
  { equipment: 'Excavator Bucket', type: 'Welding Repair', date: '2026-02-15', status: 'In Progress', cost: 300 },
];

export default function EquipmentPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const [equipment, setEquipment] = useState(EQUIPMENT_DATA);

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      getProjectNameById(projectId).then(name => {
        setProjectName(name);
        setIsLoading(false);
      });
    }
  }, [projectId]);

  const filteredEquipment = equipment.filter(eq =>
    eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    eq.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Fleet Health', value: '92%', icon: Activity, color: 'text-emerald-500', trend: '+2%' },
    { label: 'Active Units', value: equipment.filter(e => e.status === 'Active').length, icon: Zap, color: 'text-amber-500', trend: 'Steady' },
    { label: 'Avg Fuel', value: '64%', icon: Fuel, color: 'text-blue-500', trend: '-5%' },
    { label: 'Downtime', value: '14h', icon: Clock, color: 'text-rose-500', trend: '-15%' }
  ];

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading fleet data...</div>;

  return (
    <div className="space-y-6 container mx-auto py-8">
      
      <PageTitle
        title={`Fleet & Equipment: ${projectName}`}
        description="Monitor machine health, coordinate maintenance, and track operational costs."
        actions={
          <div className="flex gap-2">
            <EquipmentForm
              onSave={(newEq) => {
                setEquipment([...equipment, newEq]);
                toast({
                  title: "Equipment Registered",
                  description: `${newEq.name} (${newEq.id}) has been added to the fleet.`,
                });
              }}
              trigger={
                <Button className="bg-amber-500 hover:bg-amber-600 shadow-md">
                  <Plus className="mr-2 h-4 w-4" />
                  Register Equipment
                </Button>
              }
            />
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden group">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                  <span className={cn("text-[10px] font-bold", stat.trend.startsWith('+') ? "text-emerald-500" : stat.trend.startsWith('-') ? "text-rose-500" : "text-slate-400")}>
                    {stat.trend}
                  </span>
                </div>
              </div>
              <div className={cn("p-3 rounded-xl bg-slate-50 group-hover:rotate-12 transition-transform", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="fleet" className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList className="bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="fleet" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Fleet Directory</TabsTrigger>
            <TabsTrigger value="maintenance" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Maintenance Hub</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Cost Analytics</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Filter fleet..."
              className="pl-9 bg-white border-slate-200 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="fleet" className="animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((eq, idx) => (
              <Card key={eq.id} className="border-none shadow-md hover:shadow-xl transition-all rounded-3xl overflow-hidden group">
                <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/30">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
                        <Construction className="h-5 w-5" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <EquipmentForm
                            initialData={eq}
                            onSave={(updatedEq) => {
                              setEquipment(equipment.map(e => e.id === updatedEq.id ? { ...e, ...updatedEq } : e));
                              toast({
                                title: "Equipment Updated",
                                description: `${updatedEq.name} details have been updated.`,
                              });
                            }}
                            trigger={
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                            }
                          />
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Equipment
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete {eq.name} ({eq.id}) from the fleet tracking system.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    setEquipment(equipment.filter(e => e.id !== eq.id));
                                    toast({
                                      title: "Equipment Deleted",
                                      description: `${eq.name} has been removed.`,
                                      variant: "destructive",
                                    });
                                  }}
                                  className="bg-destructive hover:bg-destructive/90 text-white"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Badge className={cn(
                      "text-[9px] font-black uppercase py-0.5",
                      eq.status === 'Active' ? "bg-emerald-100 text-emerald-700" :
                        eq.status === 'Maintenance' ? "bg-rose-100 text-rose-700" :
                          "bg-slate-100 text-slate-600"
                    )}>
                      {eq.status}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <CardTitle className="text-lg font-bold text-slate-800">{eq.name}</CardTitle>
                    <CardDescription className="text-xs">{eq.id} • {eq.type}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{eq.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{eq.hoursUsed} hrs used</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                      <span>Fuel Level</span>
                      <span className={cn(eq.fuelLevel < 20 ? "text-rose-500" : "text-slate-600")}>{eq.fuelLevel}%</span>
                    </div>
                    <Progress value={eq.fuelLevel} className="h-1.5" />
                  </div>

                  <Separator className="bg-slate-100" />

                  <div className="flex items-center justify-between text-[10px]">
                    <div className="text-slate-400 font-medium">Daily Rate: <span className="text-slate-700 font-bold">${eq.dailyRate}</span></div>
                    <div className="text-slate-400 font-medium">Next Serv: <span className="text-slate-700 font-bold">{eq.nextMaintenance}</span></div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50/50 p-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-[10px] font-bold h-8 border-slate-200 hover:bg-white transition-all">
                    View Logs
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-[10px] font-bold h-8 border-slate-200 hover:bg-white transition-all">
                    Assign Task
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-amber-500" />
                  Recent Service Log
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {MAINTENANCE_LOG.map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-amber-500">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{log.equipment}</p>
                        <p className="text-xs text-slate-500">{log.type} • {log.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn(
                      "text-[10px]",
                      log.status === 'Completed' ? "border-emerald-200 text-emerald-600 bg-emerald-50" :
                        log.status === 'In Progress' ? "border-amber-200 text-amber-600 bg-amber-50" :
                          "border-slate-200 text-slate-500"
                    )}>
                      {log.status}
                    </Badge>
                  </div>
                ))}
                <div className="pt-2">
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold h-10 rounded-2xl border-none">
                    Schedule New Service
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md rounded-3xl bg-indigo-900 text-white relative overflow-hidden">
              <TrendingDown className="absolute -bottom-6 -right-6 h-48 w-48 text-indigo-800/50 -rotate-12" />
              <CardHeader>
                <CardTitle className="text-lg font-bold">Predictive Maintenance</CardTitle>
                <CardDescription className="text-indigo-300">AI-driven analysis based on operational hours.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-indigo-200 uppercase">Tower Crane TC-200</span>
                    <span className="text-xs text-rose-300 font-black">CRITICAL</span>
                  </div>
                  <p className="text-sm">High risk of hydraulic failure detected. Motor vibration exceeded threshold by <span className="text-rose-300 font-bold">12%</span>.</p>
                </div>
                <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold h-10 rounded-2xl border-none">
                  View Full Health Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-900 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-400" />
                    Operating Cost Breakdown
                  </CardTitle>
                  <CardDescription className="text-slate-400">Monthly expenditure across fuel, rental, and repairs.</CardDescription>
                </div>
                <Select defaultValue="feb">
                  <SelectTrigger className="w-32 bg-white/10 border-white/20 text-xs h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feb">February</SelectItem>
                    <SelectItem value="jan">January</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3">
              <div className="p-8 border-r border-slate-100 space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Spend</p>
                  <p className="text-4xl font-black text-slate-800">$67,700</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Equipment Rental', value: 48000, color: 'bg-indigo-500' },
                    { label: 'Fuel & Energy', value: 13500, color: 'bg-blue-500' },
                    { label: 'Maintenance', value: 6200, color: 'bg-amber-500' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-slate-800">${item.value.toLocaleString()}</span>
                      </div>
                      <Progress value={(item.value / 67700) * 100} className="h-1" indicatorClassName={item.color} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 p-8 bg-slate-50/50 flex flex-col items-center justify-center text-center">
                <div className="h-20 w-20 rounded-full bg-white shadow-xl flex items-center justify-center mb-6">
                  <TrendingDown className="h-10 w-10 text-emerald-500" />
                </div>
                <h4 className="text-xl font-bold text-slate-800">Operational Savings</h4>
                <p className="text-sm text-slate-500 mt-2 max-w-sm">By optimizing excavator utilization, you saved <span className="font-bold text-emerald-600">$3,200</span> in fuel costs compared to last month.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-3xl flex gap-4 items-start shadow-sm">
        <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-md shadow-amber-500/20">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-amber-900 leading-tight">Critical Maintenance Advisory</h4>
          <p className="text-sm text-amber-800 mt-1 leading-relaxed max-w-2xl">
            Extreme weather conditions are forecasted for the next 48 hours. Ensure all heavy machinery is properly secured.
          </p>
          <div className="mt-4 flex gap-3">
            <Button size="sm" className="bg-amber-900 hover:bg-amber-950 text-white font-bold h-8 text-xs border-none">
              Check Security Checklist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
