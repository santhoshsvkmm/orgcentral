
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, CheckSquare, DollarSign, Users, ListChecks, Activity } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const metrics = [
  { title: "Total Projects", value: "12", icon: <Briefcase className="h-5 w-5 text-muted-foreground" />, dataAiHint: "projects chart" },
  { title: "Active Tasks", value: "78", icon: <CheckSquare className="h-5 w-5 text-muted-foreground" />, dataAiHint: "tasks progress" },
  { title: "Completed Tasks", value: "153", icon: <ListChecks className="h-5 w-5 text-muted-foreground" />, dataAiHint: "completed items" },
  { title: "Team Members", value: "23", icon: <Users className="h-5 w-5 text-muted-foreground" />, dataAiHint: "team collaboration" },
  { title: "Budget Overview", value: "$1.2M", icon: <DollarSign className="h-5 w-5 text-muted-foreground" />, dataAiHint: "finance graph" },
];

const recentActivity = [
  { id: 1, user: "Alice Wonderland", action: "updated task 'Design Mockups'", time: "2m ago", avatar: "https://placehold.co/40x40.png?text=AW", dataAiHint:"user avatar" },
  { id: 2, user: "Bob The Builder", action: "commented on 'Beta Platform Development'", time: "15m ago", avatar: "https://placehold.co/40x40.png?text=BB", dataAiHint:"user avatar" },
  { id: 3, user: "System", action: "Project 'Alpha Launch' marked as 'Completed'", time: "1h ago", avatar: "https://placehold.co/40x40.png?text=SYS", dataAiHint:"system icon" },
  { id: 4, user: "Charlie Brown", action: "added a new task 'User Testing Feedback'", time: "3h ago", avatar: "https://placehold.co/40x40.png?text=CB", dataAiHint:"user avatar" },
];


export default function DashboardPage() {
  return (
    <>
      <PageTitle title="Dashboard" description="Overview of your organization's key metrics and activities." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
          <CardHeader>
            <CardTitle>Project Progress Overview</CardTitle>
            <CardDescription>Visual summary of ongoing projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full bg-muted rounded-md flex items-center justify-center" data-ai-hint="projects gantt chart">
              <span className="text-sm text-muted-foreground">Project Progress Chart Placeholder</span>
            </div>
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
