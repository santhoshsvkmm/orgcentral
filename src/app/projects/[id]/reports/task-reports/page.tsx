'use client';

import { use, useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowLeft,
  ClipboardList,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  BarChart3,
  PieChart,
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

// Mock Data for Performance
const PERFORMANCE_METRICS = {
  completionRate: 68,
  overdueTasks: 4,
  totalEffort: 342,
  productivityIndex: 1.2,
  trends: {
    completion: 12, // +12%
    overdue: -2, // -2 tasks
    effort: 5, // +5%
    productivity: 0.1 // +0.1
  }
};

const TASK_STATUS_DISTRIBUTION = [
  { status: 'Done', count: 24, color: 'bg-emerald-500' },
  { status: 'In Progress', count: 12, color: 'bg-amber-500' },
  { status: 'Review', count: 6, color: 'bg-purple-500' },
  { status: 'To Do', count: 15, color: 'bg-blue-500' },
  { status: 'Blocked', count: 3, color: 'bg-rose-500' },
];

const TEAM_PERFORMANCE = [
  { name: 'Alice Designer', tasks: 12, completed: 10, efficiency: 94, avatar: 'AD' },
  { name: 'Bob Developer', tasks: 18, completed: 12, efficiency: 88, avatar: 'BD' },
  { name: 'Charlie UX', tasks: 8, completed: 7, efficiency: 91, avatar: 'CU' },
  { name: 'Diana Writer', tasks: 10, completed: 5, efficiency: 76, avatar: 'DW' },
];

export default function TaskReportsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const [projectName, setProjectName] = useState('Loading...');
  const [activeRange, setActiveRange] = useState('This Sprint');

  useEffect(() => {
    if (projectId) {
      getProjectNameById(projectId).then(setProjectName);
    }
  }, [projectId]);

  return (
    <div className="space-y-8 pb-12">
      <PageTitle
        title={`Task Performance: ${projectName}`}
        description="Detailed analysis of task velocity, team efficiency, and completion trends."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 rounded-xl gap-2 bg-white/50 backdrop-blur-sm border-white/20">
              <Download className="h-4 w-4" /> Export Report
            </Button>
            <Button variant="outline" asChild className="h-10 rounded-xl border-white/20">
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Project Detail
              </Link>
            </Button>
          </div>
        }
      />

      {/* Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Completion Rate"
          value={`${PERFORMANCE_METRICS.completionRate}%`}
          trend={`+${PERFORMANCE_METRICS.trends.completion}% from last sprint`}
          trendType="up"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          bgColor="bg-emerald-500/10"
        />
        <MetricCard
          title="Overdue Tasks"
          value={PERFORMANCE_METRICS.overdueTasks.toString()}
          trend={`${PERFORMANCE_METRICS.trends.overdue} tasks since Monday`}
          trendType="down"
          icon={<AlertCircle className="h-5 w-5 text-rose-500" />}
          bgColor="bg-rose-500/10"
        />
        <MetricCard
          title="Total Effort (hrs)"
          value={PERFORMANCE_METRICS.totalEffort.toString()}
          trend={`+${PERFORMANCE_METRICS.trends.effort}% velocity increase`}
          trendType="up"
          icon={<Clock className="h-5 w-5 text-indigo-500" />}
          bgColor="bg-indigo-500/10"
        />
        <MetricCard
          title="Productivity Index"
          value={PERFORMANCE_METRICS.productivityIndex.toString()}
          trend={`+${PERFORMANCE_METRICS.trends.productivity} vs target`}
          trendType="up"
          icon={<TrendingUp className="h-5 w-5 text-violet-500" />}
          bgColor="bg-violet-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Distribution Chart */}
        <Card className="lg:col-span-2 border-none shadow-xl bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Task Distribution by Status
              </CardTitle>
              <CardDescription>Current snapshot of all active and completed tasks</CardDescription>
            </div>
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
              {['Status', 'Priority', 'Assignee'].map(tab => (
                <button key={tab} className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                  tab === 'Status' ? "bg-white text-primary shadow-sm" : "hover:bg-white/50 text-muted-foreground"
                )}>
                  {tab}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-8 px-8">
            <div className="h-72 flex items-end gap-6 w-full">
              {TASK_STATUS_DISTRIBUTION.map((item, idx) => {
                const height = (item.count / 30) * 100;
                return (
                  <div key={item.status} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                        className={cn("w-full max-w-[40px] rounded-t-xl relative group-hover:brightness-110 transition-all", item.color)}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap z-10">
                          {item.count} Tasks
                        </div>
                      </motion.div>
                    </div>
                    <span className="mt-4 text-[10px] font-black uppercase text-muted-foreground/60 tracking-tighter text-center h-8 leading-tight">
                      {item.status.split(' ').map(s => <span key={s} className="block">{s}</span>)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Priority Breakdown */}
        <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <PieChart className="h-5 w-5 text-violet-600" />
              Priority Load
            </CardTitle>
            <CardDescription>Resource allocation by task urgency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center pt-4">
              <div className="relative h-48 w-48 mb-8">
                {/* Simulated Donut Chart */}
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f43f5e" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="210" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="120" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-800">42</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Total</span>
                </div>
              </div>

              <div className="w-full space-y-3">
                <LegendItem color="bg-rose-500" label="Critical" value="12%" />
                <LegendItem color="bg-amber-500" label="High" value="28%" />
                <LegendItem color="bg-indigo-500" label="Medium" value="45%" />
                <LegendItem color="bg-slate-300" label="Low" value="15%" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Leaderboard */}
        <Card className="lg:col-span-2 border-none shadow-xl bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Team Performance
              </CardTitle>
              <CardDescription>Individual productivity and task completion metrics</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 rounded-xl">
              Full Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {TEAM_PERFORMANCE.map((member, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={member.name}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/40 transition-colors border border-transparent hover:border-white/20 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                      {member.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 leading-none mb-1.5">{member.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{member.tasks} Active Tasks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 text-right">
                    <div className="w-32 hidden md:block">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground">EFFICIENCY</span>
                        <span className="text-[10px] font-black text-indigo-600">{member.efficiency}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${member.efficiency}%` }} />
                      </div>
                    </div>
                    <div className="min-w-[60px]">
                      <div className="text-lg font-black text-slate-800 leading-none">{member.completed}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Done</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actionable Insights */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-3xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="h-32 w-32" />
            </div>
            <CardHeader>
              <Badge className="w-fit bg-white/20 backdrop-blur-md border-none text-white text-[10px] font-bold uppercase py-1 px-3">Weekly Tip</Badge>
              <CardTitle className="text-xl font-bold mt-4 leading-tight">Maximize your team velocity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-indigo-50/80 leading-relaxed">
                You have 4 tasks in "Review" status for more than 48 hours. Closing these could boost your completion rate by 15% this sprint.
              </p>
              <Button className="mt-6 w-full bg-white text-indigo-600 hover:bg-slate-50 font-bold rounded-2xl h-12 shadow-xl shadow-black/10 capitalize">
                View Critical Tasks
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-violet-600" />
                Report Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Jan 2024 Performance', 'Q4 2023 Summary', 'Efficiency Audit Dec'].map((report, idx) => (
                <div key={report} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                    <span className="text-xs font-medium text-slate-700">{report}</span>
                  </div>
                  <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-indigo-600" />
                </div>
              ))}
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
  trendType: 'up' | 'down';
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-2.5 rounded-2xl", bgColor)}>
            {icon}
          </div>
          <Badge className={cn(
            "rounded-lg px-2 py-0.5 text-[10px] font-black border-none",
            trendType === 'up' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
          )}>
            {trendType === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {trendType === 'up' ? "GROWTH" : "DELAY"}
          </Badge>
        </div>
        <div>
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">{title}</h3>
          <div className="text-3xl font-black text-slate-800 tracking-tight">{value}</div>
          <p className="mt-3 text-[10px] font-medium text-muted-foreground leading-relaxed italic">
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function LegendItem({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between group cursor-default">
      <div className="flex items-center gap-2.5">
        <div className={cn("h-3 w-3 rounded-full shadow-sm group-hover:scale-125 transition-transform", color)} />
        <span className="text-xs font-bold text-slate-600 transition-colors group-hover:text-slate-900">{label}</span>
      </div>
      <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">{value}</span>
    </div>
  );
}
