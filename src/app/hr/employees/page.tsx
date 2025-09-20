import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Search, Filter, Eye, Edit, Mail, Phone } from 'lucide-react';

export default function EmployeesPage() {
  const employees = [
    { 
      id: 1, 
      name: 'John Smith', 
      position: 'Senior Project Manager', 
      department: 'Construction', 
      email: 'john.smith@company.com',
      phone: '(555) 123-4567',
      status: 'Active',
      hireDate: '2022-03-15',
      location: 'New York'
    },
    { 
      id: 2, 
      name: 'Sarah Wilson', 
      position: 'Site Supervisor', 
      department: 'Field Operations', 
      email: 'sarah.wilson@company.com',
      phone: '(555) 234-5678',
      status: 'Active',
      hireDate: '2021-08-22',
      location: 'Chicago'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      position: 'Safety Coordinator', 
      department: 'Safety', 
      email: 'mike.johnson@company.com',
      phone: '(555) 345-6789',
      status: 'On Leave',
      hireDate: '2020-11-10',
      location: 'Los Angeles'
    },
    { 
      id: 4, 
      name: 'Lisa Chen', 
      position: 'Estimator', 
      department: 'Preconstruction', 
      email: 'lisa.chen@company.com',
      phone: '(555) 456-7890',
      status: 'Active',
      hireDate: '2023-01-08',
      location: 'Dallas'
    },
  ];

  const departments = ['All', 'Construction', 'Field Operations', 'Safety', 'Preconstruction', 'Administration'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employee Records</h1>
          <p className="text-muted-foreground">Manage employee information and records</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">247</div>
            <p className="text-sm text-muted-foreground">Total Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">235</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">On Leave</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border rounded-md">
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                    <Badge variant={employee.status === 'Active' ? 'default' : employee.status === 'On Leave' ? 'secondary' : 'destructive'}>
                      {employee.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 mt-2 text-sm text-muted-foreground">
                    <span>{employee.department}</span>
                    <span>{employee.location}</span>
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {employee.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {employee.phone}
                    </span>
                    <span>Hired: {employee.hireDate}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
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