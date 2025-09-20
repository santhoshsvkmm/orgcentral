import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function AttendancePage() {
  const attendanceData = [
    { employee: 'John Smith', department: 'Construction', status: 'Present', checkIn: '08:00 AM', checkOut: '-', hours: '4.5' },
    { employee: 'Sarah Wilson', department: 'Field Operations', status: 'Present', checkIn: '07:30 AM', checkOut: '-', hours: '5.0' },
    { employee: 'Mike Johnson', department: 'Safety', status: 'On Leave', checkIn: '-', checkOut: '-', hours: '0' },
    { employee: 'Lisa Chen', department: 'Preconstruction', status: 'Late', checkIn: '09:15 AM', checkOut: '-', hours: '3.25' },
  ];

  const leaveRequests = [
    { employee: 'Robert Brown', type: 'Vacation', dates: 'Feb 20-22, 2024', status: 'Pending' },
    { employee: 'Emily Davis', type: 'Sick Leave', dates: 'Feb 16, 2024', status: 'Approved' },
    { employee: 'Tom Wilson', type: 'Personal', dates: 'Feb 25, 2024', status: 'Pending' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance & Leave</h1>
          <p className="text-muted-foreground">Track employee attendance and manage leave requests</p>
        </div>
        <Button>
          <UserCheck className="h-4 w-4 mr-2" />
          Mark Attendance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">235</div>
            <p className="text-sm text-muted-foreground">Present Today</p>
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
            <p className="text-sm text-muted-foreground">Late Arrivals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">95.2%</div>
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{record.employee}</h3>
                  <p className="text-sm text-muted-foreground">{record.department}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      In: {record.checkIn} | Out: {record.checkOut}
                    </div>
                    <div className="text-muted-foreground">Hours: {record.hours}</div>
                  </div>
                  <Badge variant={
                    record.status === 'Present' ? 'default' : 
                    record.status === 'Late' ? 'destructive' : 
                    'secondary'
                  }>
                    {record.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((request, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{request.employee}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                    <span>{request.type}</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {request.dates}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={request.status === 'Approved' ? 'default' : request.status === 'Pending' ? 'secondary' : 'destructive'}>
                    {request.status}
                  </Badge>
                  <Button variant="outline" size="sm">Review</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}