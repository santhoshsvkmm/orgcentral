import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, User, Briefcase } from 'lucide-react';

export default function OrganizationPage() {
  const departments = [
    { name: 'Construction', manager: 'John Smith', employees: 85, budget: '$2.1M' },
    { name: 'Field Operations', manager: 'Sarah Wilson', employees: 62, budget: '$1.8M' },
    { name: 'Safety', manager: 'Mike Johnson', employees: 18, budget: '$450K' },
    { name: 'Preconstruction', manager: 'Lisa Chen', employees: 24, budget: '$680K' },
    { name: 'Administration', manager: 'Tom Wilson', employees: 32, budget: '$920K' },
    { name: 'Finance', manager: 'Emily Davis', employees: 12, budget: '$380K' },
  ];

  const orgChart = [
    { level: 1, position: 'CEO', name: 'Robert Johnson', reports: 4 },
    { level: 2, position: 'VP Construction', name: 'John Smith', reports: 12 },
    { level: 2, position: 'VP Operations', name: 'Sarah Wilson', reports: 8 },
    { level: 2, position: 'CFO', name: 'Emily Davis', reports: 6 },
    { level: 2, position: 'VP Safety', name: 'Mike Johnson', reports: 4 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Organization Structure</h1>
          <p className="text-muted-foreground">Manage company hierarchy and departments</p>
        </div>
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">6</div>
            <p className="text-sm text-muted-foreground">Departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">247</div>
            <p className="text-sm text-muted-foreground">Total Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Managers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Hierarchy Levels</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organizational Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orgChart.map((role, index) => (
              <div key={index} className={`flex items-center p-4 border rounded-lg ${role.level === 1 ? 'bg-blue-50 border-blue-200' : ''}`}>
                <div className={`w-2 h-12 rounded mr-4 ${role.level === 1 ? 'bg-blue-500' : role.level === 2 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold">{role.position}</h3>
                  <p className="text-sm text-muted-foreground">{role.name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Level {role.level}</div>
                    <div className="text-sm text-muted-foreground">{role.reports} direct reports</div>
                  </div>
                  <Button variant="outline" size="sm">View Team</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{dept.name}</h3>
                  <Badge variant="outline">{dept.employees} employees</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Manager: {dept.manager}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Team Size: {dept.employees}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Budget: {dept.budget}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}