
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, CheckSquare, DollarSign, Users, ListChecks, Activity, Orbit, AlertCircle, CalendarClock, ShieldAlert } from "lucide-react";
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


const metrics = [
  { title: "Total Projects", value: "12", icon: <Briefcase className="h-5 w-5 text-muted-foreground" />, dataAiHint: "projects chart" },
  { title: "Active Tasks", value: "78", icon: <CheckSquare className="h-5 w-5 text-muted-foreground" />, dataAiHint: "tasks progress" },
  { title: "Completed Tasks", value: "153", icon: <ListChecks className="h-5 w-5 text-muted-foreground" />, dataAiHint: "completed items" },
  { title: "In Progress Tasks", value: "45", icon: <Orbit className="h-5 w-5 text-muted-foreground" />, dataAiHint: "task progress" },
  { title: "Delayed Tasks", value: "8", icon: <AlertCircle className="h-5 w-5 text-muted-foreground" />, dataAiHint: "overdue tasks" },
  { title: "Upcoming Tasks", value: "22", icon: <CalendarClock className="h-5 w-5 text-muted-foreground" />, dataAiHint: "task schedule" },
  { title: "Critical Tasks", value: "3", icon: <ShieldAlert className="h-5 w-5 text-muted-foreground" />, dataAiHint: "priority tasks" },
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"> {/* Adjusted xl:grid-cols-3 for 9 items */}
        {metrics.map((metric) => (
          <Card key={metric.title} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow md:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-2">
            <div>
              <CardTitle>Project Progress Overview</CardTitle>
              <CardDescription>Visual summary of planned vs. actual progress.</CardDescription>
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
                    left: -20, // Adjusted for YAxis labels
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
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates across your projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentActivity.map((activity, index) => (
                <li key={activity.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={activity.avatar} alt={activity.user} data-ai-hint={activity.dataAiHint} />
                    <AvatarFallback>{activity.user.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium text-foreground">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                   {index < recentActivity.length - 1 && <Separator orientation="vertical" className="h-auto self-stretch mx-2"/>}
                </li>
              ))}
            </ul>
             <div className="mt-4 h-24 w-full bg-muted rounded-md flex items-center justify-center" data-ai-hint="activity timeline">
              <span className="text-sm text-muted-foreground">More Detailed Activity Timeline</span>
            </div>
          </CardContent>
        </Card>
      </div>
       <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Placeholder for team performance metrics.</p>
            <div className="mt-4 h-48 w-full bg-muted rounded-md flex items-center justify-center" data-ai-hint="team workload chart">
              <span className="text-sm text-muted-foreground">Team Performance Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Task Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Placeholder for task summary or chart.</p>
            <div className="mt-4 h-48 w-full bg-muted rounded-md flex items-center justify-center" data-ai-hint="tasks completion donut">
              <span className="text-sm text-muted-foreground">Task Completion Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

