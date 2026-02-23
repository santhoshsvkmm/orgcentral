'use client';

import { useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ArrowLeft,
  Activity,
  Users,
  HardHat,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

// Mock Data
const METRICS = {
  activeWorkforce: 142,
  workforceTrend: 12,
  heavyEquipment: 18,
  equipmentUtilization: 85,
  safetyIncidents: 0,
  inspectionsPassed: 4,
  inspectionsTotal: 5
};

const ACTIVITY_TIMELINE = [
  { id: 1, time: '08:00 AM', title: 'Site Opened & Safety Briefing', team: 'All Staff', type: 'info', icon: Users },
  { id: 2, time: '09:30 AM', title: 'Concrete Delivery (Sector B)', team: 'Procurement', type: 'logistics', icon: Truck },
  { id: 3, time: '11:15 AM', title: 'Routine Safety Inspection', team: 'HSE Team', type: 'success', icon: CheckCircle2 },
  { id: 4, time: '02:00 PM', title: 'Minor Equipment Delay (Crane 2)', team: 'Operations', type: 'warning', icon: AlertTriangle },
  { id: 5, time: '04:30 PM', title: 'Foundation Pour Complete', team: 'Civil', type: 'success', icon: CheckCircle2 },
];

const WEATHER = {
  temp: 24,
  condition: 'Partly Cloudy',
  wind: '12 km/h'
};

export default function DailyMonitoringReportsPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const [projectName, setProjectName] = useState('Loading...');

  useEffect(() => {
    if (projectId) {
      getProjectNameById(projectId).then(setProjectName);
    }
  }, [projectId]);

  return (
    <div className="space-y-8 pb-12">
      <PageTitle
        title={`Daily Monitoring: ${projectName}`}
        description={`Live updates and daily logs for ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 rounded-xl gap-2 bg-white/50 backdrop-blur-sm border-white/20">
              <Download className="h-4 w-4" /> Export Daily Log
            </Button>
            <Button className="h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-none hover:opacity-90 transition-opacity">
              <Plus className="mr-2 h-4 w-4" /> New Entry
            </Button>
            <Button variant="outline" asChild className="h-10 rounded-xl border-white/20">
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        }
      />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Workforce"
          value={METRICS.activeWorkforce.toString()}
          trend={`+${METRICS.workforceTrend}% vs yesterday`}
          trendType="up"
          icon={<HardHat className="h-5 w-5 text-indigo-500" />}
          bgColor="bg-indigo-500/10"
        />
        <MetricCard
          title="Heavy Equipment"
          value={`${METRICS.heavyEquipment} Active`}
          trend={`${METRICS.equipmentUtilization}% utilization rate`}
          trendType="up"
          icon={<Truck className="h-5 w-5 text-amber-500" />}
          bgColor="bg-amber-500/10"
        />
        <MetricCard
          title="Safety Incidents"
          value={METRICS.safetyIncidents.toString()}
          trend="0 days since last incident"
          trendType="neutral"
          icon={<AlertTriangle className="h-5 w-5 text-emerald-500" />}
          bgColor="bg-emerald-500/10"
        />
        <MetricCard
          title="Daily Inspections"
          value={`${METRICS.inspectionsPassed} / ${METRICS.inspectionsTotal}`}
          trend="1 pending review"
          trendType="down"
          icon={<CheckCircle2 className="h-5 w-5 text-blue-500" />}
          bgColor="bg-blue-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Timeline */}
        <Card className="lg:col-span-2 border-none shadow-xl bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                Live Activity Log
              </CardTitle>
              <CardDescription>Real-time updates from site managers and sensors.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-xs font-bold text-muted-foreground rounded-xl border border-slate-200 bg-white">
              <Filter className="h-3 w-3" /> Filter Log
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-slate-100 ml-6 space-y-8 pb-4">
              {ACTIVITY_TIMELINE.map((event, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={event.id}
                  className="relative pl-8 group"
                >
                  <div className={cn(
                    "absolute -left-[17px] top-1 h-8 w-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover:scale-110",
                    event.type === 'info' ? 'bg-blue-500 text-white' :
                      event.type === 'logistics' ? 'bg-indigo-500 text-white' :
                        event.type === 'warning' ? 'bg-amber-500 text-white' :
                          'bg-emerald-500 text-white'
                  )}>
                    <event.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 group-hover:shadow-md group-hover:border-indigo-100 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-slate-800 text-sm">{event.title}</h4>
                      <Badge variant="outline" className="text-[10px] font-bold text-slate-500 px-2 py-0 border-slate-200">
                        <Clock className="h-3 w-3 mr-1 inline" />
                        {event.time}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Users className="h-3.5 w-3.5" />
                      {event.team}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Quick Snapshot Card */}
          <Card className="border-none shadow-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl overflow-hidden relative">
            <div className="absolute -right-10 -top-10 h-40 w-40 bg-indigo-500/20 rounded-full blur-3xl mix-blend-screen" />
            <CardHeader>
              <Badge className="w-fit bg-white/10 hover:bg-white/20 text-white border-none text-[10px] font-bold uppercase tracking-wider">
                Current Conditions
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-black mb-1">{WEATHER.temp}°C</div>
                <div className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                  {WEATHER.condition} • Wind: {WEATHER.wind}
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Site Productivity</span>
                  <span className="text-xs font-bold">92%</span>
                </div>
                <Progress value={92} className="h-1.5 bg-white/10" indicatorClassName="bg-emerald-400" />
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-3xl border border-white/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Pending Sign-offs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Morning Safety Brief', 'Concrete Slump Test', 'Crane #2 Inspection'].map((item) => (
                <div key={item} className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-indigo-200 transition-colors">
                  <span className="text-xs font-semibold text-slate-700">{item}</span>
                  <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 mt-2">
                View All Approvals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendType, icon, bgColor }: {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110", bgColor)}>
            {icon}
          </div>
          {trendType !== 'neutral' && (
            <Badge className={cn(
              "rounded-lg px-2 py-0.5 text-[10px] font-black border-none",
              trendType === 'up' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
            )}>
              {trendType === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {trendType === 'up' ? "UP" : "DOWN"}
            </Badge>
          )}
        </div>
        <div>
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">{title}</h3>
          <div className="text-3xl font-black text-slate-800 tracking-tight">{value}</div>
          <p className="mt-3 text-[10px] font-medium text-slate-500 leading-relaxed italic">
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
