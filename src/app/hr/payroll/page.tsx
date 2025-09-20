import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Calendar, Download, Eye, AlertCircle } from 'lucide-react';

export default function PayrollPage() {
  const payrollRuns = [
    { 
      id: 1, 
      period: 'January 1-15, 2024', 
      payDate: '2024-01-20', 
      employees: 247, 
      grossPay: 1250000, 
      netPay: 950000,
      status: 'Completed'
    },
    { 
      id: 2, 
      period: 'December 16-31, 2023', 
      payDate: '2024-01-05', 
      employees: 245, 
      grossPay: 1180000, 
      netPay: 890000,
      status: 'Completed'
    },
    { 
      id: 3, 
      period: 'January 16-31, 2024', 
      payDate: '2024-02-05', 
      employees: 247, 
      grossPay: 0, 
      netPay: 0,
      status: 'In Progress'
    },
  ];

  const upcomingPayroll = [
    { employee: 'John Smith', department: 'Construction', grossPay: 8500, deductions: 2100, netPay: 6400 },
    { employee: 'Sarah Wilson', department: 'Field Operations', grossPay: 7200, deductions: 1800, netPay: 5400 },
    { employee: 'Mike Johnson', department: 'Safety', grossPay: 6800, deductions: 1700, netPay: 5100 },
    { employee: 'Lisa Chen', department: 'Preconstruction', grossPay: 7500, deductions: 1900, netPay: 5600 },
  ];

  const payrollAlerts = [
    { type: 'warning', message: 'Payroll processing due in 3 days', action: 'Review & Process' },
    { type: 'info', message: '5 employees have updated tax information', action: 'Review Changes' },
    { type: 'error', message: '2 employees missing timesheet data', action: 'Contact Employees' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payroll & Salary</h1>
          <p className="text-muted-foreground">Manage employee compensation and payroll processing</p>
        </div>
        <Button>
          <DollarSign className="h-4 w-4 mr-2" />
          Process Payroll
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$1.25M</div>
            <p className="text-sm text-muted-foreground">Monthly Gross Pay</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$950K</div>
            <p className="text-sm text-muted-foreground">Monthly Net Pay</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">247</div>
            <p className="text-sm text-muted-foreground">Active Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$5,061</div>
            <p className="text-sm text-muted-foreground">Average Salary</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payrollAlerts.map((alert, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                alert.type === 'error' ? 'bg-red-50 border border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <AlertCircle className={`h-4 w-4 ${
                    alert.type === 'error' ? 'text-red-500' :
                    alert.type === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <span className="text-sm font-medium">{alert.message}</span>
                </div>
                <Button variant="outline" size="sm">{alert.action}</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payroll History */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payrollRuns.map((run) => (
              <div key={run.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">Pay Period: {run.period}</h3>
                    <Badge variant={run.status === 'Completed' ? 'default' : 'secondary'}>
                      {run.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Pay Date: {run.payDate}
                    </span>
                    <span>{run.employees} employees</span>
                    <span>Gross: ${run.grossPay.toLocaleString()}</span>
                    <span>Net: ${run.netPay.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Payroll Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payroll Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingPayroll.map((employee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{employee.employee}</h3>
                  <p className="text-sm text-muted-foreground">{employee.department}</p>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-right">
                    <div className="font-medium">Gross: ${employee.grossPay.toLocaleString()}</div>
                    <div className="text-muted-foreground">Deductions: ${employee.deductions.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">Net: ${employee.netPay.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}