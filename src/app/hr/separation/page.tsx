import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserX, Calendar, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SeparationPage() {
  const activeSeparations = [
    { 
      id: 1, 
      employee: 'Robert Johnson', 
      position: 'Site Supervisor', 
      department: 'Field Operations',
      separationType: 'Resignation', 
      lastWorkingDay: '2024-02-15', 
      status: 'In Progress',
      completedTasks: 4,
      totalTasks: 8
    },
    { 
      id: 2, 
      employee: 'Maria Garcia', 
      position: 'Project Coordinator', 
      department: 'Construction',
      separationType: 'Termination', 
      lastWorkingDay: '2024-01-31', 
      status: 'Pending',
      completedTasks: 1,
      totalTasks: 8
    },
  ];

  const separationHistory = [
    { employee: 'David Lee', position: 'Estimator', separationType: 'Resignation', exitDate: '2024-01-15', status: 'Completed' },
    { employee: 'Jennifer Smith', position: 'Safety Officer', separationType: 'Retirement', exitDate: '2023-12-31', status: 'Completed' },
    { employee: 'Tom Wilson', position: 'Foreman', separationType: 'Layoff', exitDate: '2023-12-15', status: 'Completed' },
  ];

  const separationChecklist = [
    { task: 'Exit Interview Scheduled', category: 'Interview', required: true },
    { task: 'Equipment Return', category: 'Assets', required: true },
    { task: 'Access Revocation', category: 'Security', required: true },
    { task: 'Final Paycheck Processing', category: 'Payroll', required: true },
    { task: 'Benefits Termination', category: 'Benefits', required: true },
    { task: 'Knowledge Transfer', category: 'Handover', required: false },
    { task: 'Return Company Property', category: 'Assets', required: true },
    { task: 'Final Documentation', category: 'HR Records', required: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employee Separation</h1>
          <p className="text-muted-foreground">Manage employee departures and offboarding process</p>
        </div>
        <Button>
          <UserX className="h-4 w-4 mr-2" />
          Initiate Separation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Active Separations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm text-muted-foreground">This Quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8.5%</div>
            <p className="text-sm text-muted-foreground">Turnover Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-sm text-muted-foreground">Avg Days to Complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Separations */}
      <Card>
        <CardHeader>
          <CardTitle>Active Separations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSeparations.map((separation) => (
              <div key={separation.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{separation.employee}</h3>
                    <p className="text-sm text-muted-foreground">{separation.position} - {separation.department}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={separation.separationType === 'Resignation' ? 'default' : 'destructive'}>
                      {separation.separationType}
                    </Badge>
                    <Badge variant={separation.status === 'In Progress' ? 'default' : 'secondary'}>
                      {separation.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Last Working Day: {separation.lastWorkingDay}
                    </span>
                    <span>Progress: {separation.completedTasks}/{separation.totalTasks} tasks</span>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Separation Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Separation Checklist Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {separationChecklist.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.task}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <Badge variant={item.required ? 'destructive' : 'secondary'}>
                  {item.required ? 'Required' : 'Optional'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Separation History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Separations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {separationHistory.map((separation, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{separation.employee}</h3>
                  <p className="text-sm text-muted-foreground">{separation.position}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{separation.separationType}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {separation.exitDate}
                    </div>
                  </div>
                  <Badge variant="default">{separation.status}</Badge>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    View Records
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}