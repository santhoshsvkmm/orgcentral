
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, DollarSign, Users, Activity, TrendingUp, AlertTriangle, XOctagon, BarChart2, PieChart as PieChartIconLucide, ListChecks, CheckCircle, Orbit, AlertCircleIcon as AlertCircleLucide, CalendarClock, ShieldAlert, HardHat, Brain, Building2 } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { ConstructionMetrics, sampleConstructionMetrics } from "@/components/construction/construction-metrics";
import { AIInsightsPanel, sampleAIInsights } from "@/components/construction/ai-insights-panel";
import { ProjectStatusCard } from "@/components/construction/project-status-card";
import Link from "next/link";


const metrics = [
  { title: "Total Projects", value: "12", icon: <Briefcase className="h-5 w-5 text-muted-foreground" />, dataAiHint: "projects overview" },
  { title: "Projects Running Smoothly", value: "7", icon: <TrendingUp className="h-5 w-5 text-green-500" />, dataAiHint: "successful projects" },
  { title: "Projects with Warnings", value: "3", icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />, dataAiHint: "projects risk" },
  { title: "Projects in Critical State", value: "2", icon: <XOctagon className="h-5 w-5 text-red-500" />, dataAiHint: "danger projects" },
  { title: "Team Members", value: "23", icon: <Users className="h-5 w-5 text-muted-foreground" />, dataAiHint: "team collaboration" },
  { title: "Budget Overview", value: "$1.2M", icon: <DollarSign className="h-5 w-5 text-muted-foreground" />, dataAiHint: "finance graph" },
];

const recentActivity = [
  { id: 1, user: "Alice Wonderland", action: "updated task 'Design Mockups'", time: "2m ago", avatar: "https://placehold.co/40x40.png?text=AW", dataAiHint:"user avatar" },
  { id: 2, user: "Bob The Builder", action: "commented on 'Beta Platform Development'", time: "15m ago", avatar: "https://placehold.co/40x40.png?text=BB", dataAiHint:"user avatar" },
  { id: 3, user: "System", action: "Project 'Alpha Launch' marked as 'Completed'", time: "1h ago", avatar: "https://placehold.co/40x40.png?text=SYS", dataAiHint:"system icon" },
  { id: 4, user: "Charlie Brown", action: "added a new task 'User Testing Feedback'", time: "3h ago", avatar: "https://placehold.co/40x40.png?text=CB", dataAiHint:"user avatar" },
];

const allChartDataPoints = [
  { name: "Jan '24", planned: 30, actual: 25, budget: 50 },
  { name: "Feb '24", planned: 45, actual: 40, budget: 55 },
  { name: "Mar '24", planned: 60, actual: 58, budget: 60 },
  { name: "Apr '24", planned: 70, actual: 65, budget: 65 },
  { name: "May '24", planned: 85, actual: 82, budget: 70 },
  { name: "Jun '24", planned: 100, actual: 95, budget: 75 },
  { name: "Jul '24", planned: 110, actual: 105, budget: 80 },
  { name: "Aug '24", planned: 120, actual: 115, budget: 85 },
];

const chartConfig = {
  planned: {
    label: "Planned Progress",
    color: "hsl(var(--chart-1))",
  },
  actual: {
    label: "Actual Progress",
    color: "hsl(var(--chart-2))",
  },
  budget: {
    label: "Budget Spent (%)",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } 
  },
};


export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<string>("all");

  const filteredChartData = useMemo(() => {
    if (timeRange === "last3") {
      return allChartDataPoints.slice(-3);
    }
    if (timeRange === "last6") {
      return allChartDataPoints.slice(-6);
    }
    return allChartDataPoints;
  }, [timeRange]);

  return (
    <>
      <PageTitle title="Dashboard" description="Overview of your organization's key metrics and activities." />
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {metrics.map((metric) => (
          <motion.div key={metric.title} variants={itemVariants}>
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {/* Construction-Specific Components */}
      <motion.div 
        className="mt-8 space-y-6"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Construction Metrics */}
        <ConstructionMetrics metrics={sampleConstructionMetrics.slice(0, 4)} />
        
        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Project Progress Chart */}
          <Card className="shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div>
                <CardTitle>Overall Project Progress</CardTitle>
                <CardDescription>Visual summary of planned vs. actual progress across all projects.</CardDescription>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="last6">Last 6 Points</SelectItem>
                  <SelectItem value="last3">Last 3 Points</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredChartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: -20, 
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} />
                    <YAxis tickLine={false} axisLine={false} dx={-10} />
                    <RechartsTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" hideLabel />} 
                    />
                    <Legend content={<ChartLegendContent />} />
                    <Line
                      dataKey="planned"
                      type="monotone"
                      stroke="var(--color-planned)"
                      strokeWidth={2}
                      dot={true}
                    />
                    <Line
                      dataKey="actual"
                      type="monotone"
                      stroke="var(--color-actual)"
                      strokeWidth={2}
                      dot={true}
                    />
                     <Line
                      dataKey="budget"
                      type="monotone"
                      stroke="var(--color-budget)"
                      strokeWidth={2}
                      dot={true}
                      name="Budget Spent (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* AI Insights Panel */}
          <AIInsightsPanel 
            insights={sampleAIInsights.slice(0, 3)}
            onInsightClick={(insight) => console.log('Insight clicked:', insight.id)}
            onViewAll={() => console.log('View all insights')}
          />
        </div>
      </motion.div>
      {/* Quick Actions & Navigation */}
      <motion.div 
        className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Construction Dashboard</h3>
                <p className="text-sm text-muted-foreground">Detailed construction metrics</p>
              </div>
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/dashboard/construction">
                View Details
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI Insights</h3>
                <p className="text-sm text-muted-foreground">Smart recommendations</p>
              </div>
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/ai-insights">
                Explore AI
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-100">
                <HardHat className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Safety Center</h3>
                <p className="text-sm text-muted-foreground">Safety metrics & incidents</p>
              </div>
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/safety">
                View Safety
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-muted-foreground">Performance reports</p>
              </div>
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/analytics">
                View Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

