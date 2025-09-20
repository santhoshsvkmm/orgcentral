import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ClipboardCheck, User, Calendar, FileText, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const newHires = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      position: 'Project Manager', 
      startDate: '2024-01-22', 
      progress: 75, 
      status: 'In Progress',
      completedTasks: 6,
      totalTasks: 8
    },
    { 
      id: 2, 
      name: 'Mike Chen', 
      position: 'Site Supervisor', 
      startDate: '2024-01-29', 
      progress: 25, 
      status: 'Not Started',
      completedTasks: 2,
      totalTasks: 8
    },
    { 
      id: 3, 
      name: 'Lisa Rodriguez', 
      position: 'Safety Coordinator', 
      startDate: '2024-02-05', 
      progress: 0, 
      status: 'Pending',
      completedTasks: 0,
      totalTasks: 8
    },
  ];

  const onboardingTasks = [
    { task: 'Complete I-9 Form', category: 'Documentation', required: true },
    { task: 'Safety Training Certification', category: 'Training', required: true },
    { task: 'Company Handbook Review', category: 'Orientation', required: true },
    { task: 'IT Equipment Setup', category: 'Equipment', required: true },
    { task: 'Benefits Enrollment', category: 'Benefits', required: false },
    { task: 'Direct Deposit Setup', category: 'Payroll', required: true },
    { task: 'Emergency Contact Information', category: 'Personal', required: true },
    { task: 'Department Introduction', category: 'Orientation', required: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employee Onboarding</h1>
          <p className="text-muted-foreground">Manage new hire onboarding process</p>
        </div>
        <Button>
          <User className="h-4 w-4 mr-2" />
          Add New Hire
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Active Onboarding</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">89%</div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">5.2</div>
            <p className="text-sm text-muted-foreground">Avg Days to Complete</p>
          </CardContent>
        </Card>
      </div>

      {/* New Hires Progress */}
      <Card>
        <CardHeader>
          <CardTitle>New Hire Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {newHires.map((hire) => (
              <div key={hire.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{hire.name}</h3>
                    <p className="text-sm text-muted-foreground">{hire.position}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">Start Date</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {hire.startDate}
                      </div>
                    </div>
                    <Badge variant={hire.status === 'In Progress' ? 'default' : hire.status === 'Pending' ? 'secondary' : 'outline'}>
                      {hire.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: {hire.completedTasks}/{hire.totalTasks} tasks completed</span>
                    <span>{hire.progress}%</span>
                  </div>
                  <Progress value={hire.progress} className="h-2" />
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Checklist Template */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Checklist Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onboardingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-muted-foreground">{task.category}</p>
                  </div>
                </div>
                <Badge variant={task.required ? 'destructive' : 'secondary'}>
                  {task.required ? 'Required' : 'Optional'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}