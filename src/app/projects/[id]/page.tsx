
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, CalendarDays, Users, Info, MapPin, ToggleLeft, ToggleRight, Briefcase, Brain, AlertTriangle, CheckCircle, Clock, Orbit, AlertCircleIcon as AlertCircleLucide, CalendarClock, ShieldAlert, ListChecks } from "lucide-react";
import { TaskList } from "@/components/projects/task-list";
import { PageTitle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { calculateWorkingDays, formatDate } from "@/lib/date-utils";
import { useState, useEffect, use, useMemo } from "react";
import type { Project } from "@/components/projects/project-form";
import { ProjectMenubar } from "@/components/projects/project-menubar"; // Import the new menubar
import { analyzeProjectIssues, AnalyzeProjectIssuesInput, AnalyzeProjectIssuesOutput, CriticalIssue } from "@/ai/flows/analyze-project-issues-flow";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
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

// Mock fetch function - replace with actual data fetching
async function getProjectById(id: string): Promise<Project | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const mockProjects: Project[] = [
    { id: "1", name: "Alpha Launch", description: "Initial launch of the Alpha platform. This project aims to deliver the core features for early adopters.", status: "In Progress", startDate: "2024-06-01", dueDate: "2024-12-31", teamSize: 5, geoLocation: "New York, USA", activateMicroScheduling: true },
    { id: "2", name: "Beta Platform Development", description: "Development of the new Beta platform features, focusing on scalability and user feedback integration.", status: "Completed", startDate: "2024-03-15", dueDate: "2024-08-15", teamSize: 8, geoLocation: "London, UK", activateMicroScheduling: false },
    { id: "3", name: "Gamma Initiative Research", description: "Research phase for the Gamma Initiative. Exploring new market opportunities and technologies.", status: "On Hold", startDate: "2025-01-10", dueDate: "2025-03-01", teamSize: 3, geoLocation: "Tokyo, Japan", activateMicroScheduling: false },
  ];
  return mockProjects.find(p => p.id === id) || null;
}

// Mock task data, similar to what's in task-list.tsx. In a real app, this would be fetched based on projectId.
const mockTasksForAI = [
  { id: "t1", name: "Design Mockups for Core UI", assignee: "Alice Wonderland", status: "Completed", dueDate: "2024-10-15" },
  { id: "t2", name: "Develop Core API Endpoints", assignee: "Bob The Builder", status: "In Progress", dueDate: "2024-11-01" },
  { id: "t3", name: "User Acceptance Testing Setup", assignee: "Charlie Brown", status: "Pending", dueDate: "2024-11-20" },
  { id: "t4", name: "Write Technical Documentation", assignee: "Diana Prince", status: "Blocked", dueDate: "2024-12-01" },
  { id: "t5", name: "Plan Marketing Campaign", assignee: "Eve Adams", status: "In Progress", dueDate: "2024-10-30" },
  { id: "t6", name: "Security Audit", assignee: "Frank Castle", status: "Pending", dueDate: "2024-12-10"},
];

// Mock data for project-specific metrics
const projectSpecificMetrics = [
  { title: "Total Tasks", value: "6", icon: <ListChecks className="h-5 w-5 text-muted-foreground" />, dataAiHint: "project tasks" },
  { title: "Completed Tasks", value: "1", icon: <CheckCircle className="h-5 w-5 text-muted-foreground" />, dataAiHint: "project done" },
  { title: "In Progress Tasks", value: "2", icon: <Orbit className="h-5 w-5 text-muted-foreground" />, dataAiHint: "project progress" },
  { title: "Delayed Tasks", value: "1", icon: <AlertCircleLucide className="h-5 w-5 text-muted-foreground" />, dataAiHint: "project overdue" },
  { title: "Upcoming Tasks", value: "2", icon: <CalendarClock className="h-5 w-5 text-muted-foreground" />, dataAiHint: "project schedule" },
  { title: "Critical Tasks", value: "0", icon: <ShieldAlert className="h-5 w-5 text-muted-foreground" />, dataAiHint: "project priority" },
];

// Mock data for project-specific chart
const projectAllChartDataPoints = [
  { name: "Week 1", planned: 10, actual: 8, budget: 15 },
  { name: "Week 2", planned: 20, actual: 18, budget: 25 },
  { name: "Week 3", planned: 30, actual: 30, budget: 35 },
  { name: "Week 4", planned: 40, actual: 38, budget: 45 },
  { name: "Week 5", planned: 50, actual: 45, budget: 55 },
  { name: "Week 6", planned: 60, actual: 58, budget: 60 },
];

const projectChartConfig = {
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


export default function ProjectDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [aiAnalysisResults, setAIAnalysisResults] = useState<AnalyzeProjectIssuesOutput | null>(null);
  const [chartTimeRange, setChartTimeRange] = useState<string>("all");


  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const fetchedProject = await getProjectById(projectId);
      setProject(fetchedProject);
      setLoading(false);
    };
    fetchProject();
  }, [projectId]);


  const filteredProjectChartData = useMemo(() => {
    if (chartTimeRange === "last3") {
      return projectAllChartDataPoints.slice(-3);
    }
    if (chartTimeRange === "last6") {
      return projectAllChartDataPoints.slice(-6);
    }
    return projectAllChartDataPoints;
  }, [chartTimeRange]);


  const handleAIAnalysis = async () => {
    if (!project) return;
    setIsAIAnalyzing(true);
    setAIAnalysisResults(null);
    try {
      const input: AnalyzeProjectIssuesInput = {
        projectName: project.name,
        projectDescription: project.description,
        projectStatus: project.status,
        projectStartDate: project.startDate,
        projectDueDate: project.dueDate,
        tasks: mockTasksForAI,
      };
      const results = await analyzeProjectIssues(input);
      setAIAnalysisResults(results);
      toast({
        title: "AI Analysis Complete",
        description: results.criticalIssues.length > 0 ? `Found ${results.criticalIssues.length} potential issues.` : "No critical issues found by AI.",
      });
    } catch (error) {
      console.error("AI Analysis failed:", error);
      toast({
        title: "AI Analysis Failed",
        description: "Could not analyze project issues. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAIAnalyzing(false);
    }
  };

  const getSeverityBadgeVariant = (severity: CriticalIssue['severity']): "default" | "destructive" | "secondary" | "outline" => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };
   const getSeverityIcon = (severity: CriticalIssue['severity']) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="h-4 w-4 mr-1 text-destructive" />;
      case 'Medium': return <Clock className="h-4 w-4 mr-1 text-primary" />;
      case 'Low': return <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />;
      default: return null;
    }
  };


  if (loading) {
    return (
      <>
        <PageTitle title="Loading Project..." description="Please wait while we fetch the project details."/>
        <Skeleton className="h-10 w-full mb-6" /> {/* Menubar Skeleton */}
        <Card className="mb-8 shadow-md">
            <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
            <CardContent><Skeleton className="h-24 w-full" /></CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
        <Card className="mb-8 shadow-md">
            <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent>
        </Card>
        <Card className="shadow-sm mt-8">
            <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent>
        </Card>
      </>
    );
  }

  if (!project) {
    return (
      <PageTitle title="Project Not Found" description={`Could not find project with ID: ${projectId}.`}/>
    );
  }

  const companyNonWorkingDays = ["2024-07-04", "2024-12-25", "2025-01-01"];
  const workingDays = calculateWorkingDays(project.startDate, project.dueDate, companyNonWorkingDays);

  return (
    <>
      <PageTitle
        title={project.name}
        description="Detailed view of the project including tasks and progress."
        actions={
          <div className="flex gap-2">
            <Button onClick={handleAIAnalysis} disabled={isAIAnalyzing} variant="outline">
              <Brain className="mr-2 h-4 w-4 text-primary" />
              {isAIAnalyzing ? "Analyzing..." : "Analyze Issues with AI"}
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
        }
      />

      <ProjectMenubar projectId={projectId} />

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" /> Project Information
          </CardTitle>
          <CardDescription>Key details about this project.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{project.description || "No description provided."}</p>
          </div>
          <Separator />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Status</h3>
              <Badge variant={project.status === "In Progress" ? "default" : project.status === "Completed" ? "secondary" : "outline"}>{project.status}</Badge>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                <CalendarDays className="h-4 w-4 text-muted-foreground" /> Dates
              </h3>
              <p className="text-sm text-muted-foreground">Start: {formatDate(project.startDate)}</p>
              <p className="text-sm text-muted-foreground">Due: {formatDate(project.dueDate)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                <Briefcase className="h-4 w-4 text-muted-foreground" /> Working Days
              </h3>
              <p className="text-sm text-muted-foreground">
                {workingDays !== null ? `${workingDays} working day(s)` : 'Dates not set'}
              </p>
              <p className="text-xs text-muted-foreground">(Excludes weekends & company holidays)</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                <Users className="h-4 w-4 text-muted-foreground" /> Team
              </h3>
              <p className="text-sm text-muted-foreground">{project.teamSize ? `${project.teamSize} member(s)` : 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                <MapPin className="h-4 w-4 text-muted-foreground" /> Location
              </h3>
              <p className="text-sm text-muted-foreground">{project.geoLocation || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1 mb-1">
                {project.activateMicroScheduling ? <ToggleRight className="h-4 w-4 text-green-500" /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                Micro Scheduling
              </h3>
              <p className="text-sm text-muted-foreground">{project.activateMicroScheduling ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Project Task Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projectSpecificMetrics.map((metric) => (
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
      </div>

      <Card className="mb-8 shadow-md">
        <CardHeader className="flex flex-row items-start justify-between gap-2">
          <div>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Planned vs. Actual progress for this project.</CardDescription>
          </div>
          <Select value={chartTimeRange} onValueChange={setChartTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Data</SelectItem>
              <SelectItem value="last6">Last 6 Weeks</SelectItem>
              <SelectItem value="last3">Last 3 Weeks</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={projectChartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredProjectChartData}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} />
                <YAxis tickLine={false} axisLine={false} dx={-10} />
                <RechartsTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" hideLabel />}
                />
                <Legend content={<ChartLegendContent />} />
                <Line dataKey="planned" type="monotone" stroke="var(--color-planned)" strokeWidth={2} dot={true} />
                <Line dataKey="actual" type="monotone" stroke="var(--color-actual)" strokeWidth={2} dot={true} />
                <Line dataKey="budget" type="monotone" stroke="var(--color-budget)" strokeWidth={2} dot={true} name="Budget Spent (%)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>


      {isAIAnalyzing && !aiAnalysisResults && (
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary animate-pulse" /> AI Analysis in Progress
            </CardTitle>
            <CardDescription>The AI is analyzing project data for critical issues...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      )}

      {aiAnalysisResults && (
        <Card className="mb-8 shadow-md border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" /> AI Critical Issue Analysis
            </CardTitle>
            {aiAnalysisResults.summary && (
                 <CardDescription>{aiAnalysisResults.summary}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {aiAnalysisResults.criticalIssues.length > 0 ? (
              <ul className="space-y-4">
                {aiAnalysisResults.criticalIssues.map((issue, index) => (
                  <li key={index} className="p-3 border rounded-md bg-card hover:shadow-sm transition-shadow">
                    <div className="flex items-center mb-1">
                       {getSeverityIcon(issue.severity)}
                      <Badge variant={getSeverityBadgeVariant(issue.severity)} className="mr-2">{issue.severity}</Badge>
                      <strong className="text-foreground">{issue.issue}</strong>
                    </div>
                    {issue.recommendation && (
                      <p className="text-sm text-muted-foreground ml-6 mb-1">Recommendation: {issue.recommendation}</p>
                    )}
                    {issue.relatedTaskIds && issue.relatedTaskIds.length > 0 && (
                       <p className="text-xs text-muted-foreground ml-6">Related Task IDs: {issue.relatedTaskIds.join(', ')}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No critical issues identified by the AI.</p>
            )}
          </CardContent>
        </Card>
      )}

      <Separator className="my-8" />

      <TaskList projectId={projectId} />
    </>
  );
}
