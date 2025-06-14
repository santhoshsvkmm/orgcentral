'use client';

import { GanttChart } from '@/components/ui/gantt-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GanttChartSquare, Calendar, Users, FileText } from 'lucide-react';

export default function GanttChartExample() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gantt Chart Examples</h1>
      <p className="text-muted-foreground">
        These examples demonstrate different ways to use the Gantt chart component for project planning and scheduling.
      </p>
      
      <Tabs defaultValue="construction">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="construction">Construction</TabsTrigger>
          <TabsTrigger value="software">Software Dev</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="event">Event Planning</TabsTrigger>
        </TabsList>
        
        <TabsContent value="construction" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GanttChartSquare className="mr-2 h-5 w-5 text-primary" />
                Construction Project Timeline
              </CardTitle>
              <CardDescription>
                Gantt chart for a typical construction project showing phases, tasks, and dependencies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GanttChart projectId="construction-1" projectName="Office Building Construction" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="software" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GanttChartSquare className="mr-2 h-5 w-5 text-primary" />
                Software Development Sprints
              </CardTitle>
              <CardDescription>
                Agile development timeline with sprints, user stories, and release milestones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GanttChart projectId="software-1" projectName="Mobile App Development" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GanttChartSquare className="mr-2 h-5 w-5 text-primary" />
                Marketing Campaign Timeline
              </CardTitle>
              <CardDescription>
                Marketing campaign planning with content creation, approvals, and launch dates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GanttChart projectId="marketing-1" projectName="Product Launch Campaign" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="event" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GanttChartSquare className="mr-2 h-5 w-5 text-primary" />
                Event Planning Schedule
              </CardTitle>
              <CardDescription>
                Event planning timeline with venue booking, vendor coordination, and setup tasks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GanttChart projectId="event-1" projectName="Annual Conference" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              Timeline Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Multiple timeline scales (days to quarters)</li>
              <li>Drag-and-drop task scheduling</li>
              <li>Adjustable task durations</li>
              <li>Visual progress tracking</li>
              <li>Critical path highlighting</li>
              <li>Milestone markers</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-4 w-4 text-primary" />
              Resource Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Resource allocation visualization</li>
              <li>Workload balancing</li>
              <li>Team capacity planning</li>
              <li>Resource conflict detection</li>
              <li>Multi-resource assignments</li>
              <li>Resource availability tracking</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-4 w-4 text-primary" />
              Reporting Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Project status snapshots</li>
              <li>Timeline comparison reports</li>
              <li>Task completion statistics</li>
              <li>Delay and bottleneck analysis</li>
              <li>Resource utilization reports</li>
              <li>Exportable timeline views</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}