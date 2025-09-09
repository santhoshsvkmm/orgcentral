
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
import { ProjectTimeline, sampleTimelinePhases } from "@/components/construction/project-timeline";
import { ResourceAllocation, sampleResources } from "@/components/construction/resource-allocation";
import { SafetyDashboard, sampleSafetyIncidents, sampleSafetyMetrics } from "@/components/construction/safety-dashboard";
import { FinancialOverview, sampleFinancialMetrics, sampleProjectBudgets } from "@/components/construction/financial-overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";


const sampleProjects = [
  {
    id: 'project-alpha',
    name: 'Residential Tower A',
    type: 'residential' as const,
    status: 'in-progress' as const,
    progress: 68,
    budget: {
      allocated: 850000,
      spent: 578000,
      currency: '$'
    },
    timeline: {
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      daysRemaining: 45
    },
    location: 'Downtown District',
    projectManager: {
      name: 'John Smith',
      avatar: 'https://placehold.co/40x40.png?text=JS'
    },
    teamSize: 15,
    riskLevel: 'medium' as const,
    lastUpdate: '2 hours ago'
  },
  {
    id: 'project-beta',
    name: 'Commercial Plaza',
    type: 'commercial' as const,
    status: 'in-progress' as const,
    progress: 45,
    budget: {
      allocated: 1200000,
      spent: 540000,
      currency: '$'
    },
    timeline: {
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      daysRemaining: 78
    },
    location: 'Business District',
    projectManager: {
      name: 'Maria Garcia',
      avatar: 'https://placehold.co/40x40.png?text=MG'
    },
    teamSize: 22,
    riskLevel: 'low' as const,
    lastUpdate: '1 hour ago'
  }
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
      <PageTitle title="Construction Dashboard" description="Comprehensive overview of construction projects, AI insights, and performance metrics." />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Construction Metrics Overview */}
        <motion.section variants={itemVariants}>
          <ConstructionMetrics metrics={sampleConstructionMetrics} />
        </motion.section>

        {/* Main Content Tabs */}
        <motion.section variants={itemVariants}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Project Status Cards */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold">Active Projects</h3>
                  <div className="space-y-4">
                    {sampleProjects.map((project) => (
                      <ProjectStatusCard 
                        key={project.id} 
                        project={project}
                        onClick={() => console.log('Project clicked:', project.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Insights Panel */}
                <div className="space-y-4">
                  <AIInsightsPanel 
                    insights={sampleAIInsights}
                    onInsightClick={(insight) => console.log('Insight clicked:', insight.id)}
                    onViewAll={() => console.log('View all insights')}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <ProjectTimeline 
                phases={sampleTimelinePhases}
                projectName="Residential Tower A"
                onPhaseClick={(phase) => console.log('Phase clicked:', phase.id)}
              />
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              <AIInsightsPanel 
                insights={sampleAIInsights}
                onInsightClick={(insight) => console.log('Insight clicked:', insight.id)}
                onViewAll={() => console.log('View all insights')}
                className="max-w-none"
              />
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <ResourceAllocation 
                resources={sampleResources}
                onResourceClick={(resource) => console.log('Resource clicked:', resource.id)}
              />
            </TabsContent>

            <TabsContent value="safety" className="space-y-6">
              <SafetyDashboard 
                incidents={sampleSafetyIncidents}
                metrics={sampleSafetyMetrics}
                onIncidentClick={(incident) => console.log('Incident clicked:', incident.id)}
              />
            </TabsContent>

            <TabsContent value="financials" className="space-y-6">
              <FinancialOverview 
                budgets={sampleProjectBudgets}
                metrics={sampleFinancialMetrics}
                onProjectClick={(projectId) => console.log('Project clicked:', projectId)}
              />
            </TabsContent>
          </Tabs>
        </motion.section>
      </motion.div>

    </>
  );
}

