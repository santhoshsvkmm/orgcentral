import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckSquare, DollarSign, Users } from "lucide-react";
import { PageTitle } from "@/components/page-title";

const metrics = [
  { title: "Total Projects", value: "12", icon: <Briefcase className="h-5 w-5 text-muted-foreground" />, dataAiHint: "projects chart" },
  { title: "Active Tasks", value: "78", icon: <CheckSquare className="h-5 w-5 text-muted-foreground" />, dataAiHint: "tasks progress" },
  { title: "Team Members", value: "23", icon: <Users className="h-5 w-5 text-muted-foreground" />, dataAiHint: "team collaboration" },
  { title: "Budget Overview", value: "$1.2M", icon: <DollarSign className="h-5 w-5 text-muted-foreground" />, dataAiHint: "finance graph" },
];

export default function DashboardPage() {
  return (
    <>
      <PageTitle title="Dashboard" description="Overview of your organization's key metrics." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Placeholder for recent projects list or chart.</p>
            <div className="mt-4 h-48 w-full bg-muted rounded-md flex items-center justify-center" data-ai-hint="projects timeline">
              <span className="text-sm text-muted-foreground">Project Activity Chart</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Task Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Placeholder for task summary or chart.</p>
            <div className="mt-4 h-48 w-full bg-muted rounded-md flex items-center justify-center" data-ai-hint="tasks completion">
              <span className="text-sm text-muted-foreground">Task Completion Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
