import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MapPin, User, Phone } from 'lucide-react';

export default function InterviewsPage() {
  const upcomingInterviews = [
    { 
      id: 1, 
      candidate: 'John Smith', 
      position: 'Senior Project Manager', 
      date: '2024-01-16', 
      time: '10:00 AM', 
      type: 'Video Call', 
      interviewer: 'Sarah Wilson',
      status: 'Confirmed'
    },
    { 
      id: 2, 
      candidate: 'Emily Davis', 
      position: 'Site Supervisor', 
      date: '2024-01-16', 
      time: '2:00 PM', 
      type: 'In-Person', 
      interviewer: 'Mike Johnson',
      status: 'Pending'
    },
    { 
      id: 3, 
      candidate: 'Robert Brown', 
      position: 'Safety Coordinator', 
      date: '2024-01-17', 
      time: '11:00 AM', 
      type: 'Phone Call', 
      interviewer: 'Lisa Chen',
      status: 'Confirmed'
    },
  ];

  const interviewHistory = [
    { candidate: 'Alice Johnson', position: 'Estimator', date: '2024-01-12', result: 'Hired', interviewer: 'Tom Wilson' },
    { candidate: 'David Lee', position: 'Project Manager', date: '2024-01-11', result: 'Rejected', interviewer: 'Sarah Wilson' },
    { candidate: 'Maria Garcia', position: 'Site Supervisor', date: '2024-01-10', result: 'Second Round', interviewer: 'Mike Johnson' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Interviews</h1>
          <p className="text-muted-foreground">Schedule and manage candidate interviews</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Today's Interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">32</div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">Total This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">78%</div>
            <p className="text-sm text-muted-foreground">Show-up Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">{interview.candidate}</h3>
                    <Badge variant={interview.status === 'Confirmed' ? 'default' : 'secondary'}>
                      {interview.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{interview.position}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {interview.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {interview.time}
                    </span>
                    <span className="flex items-center">
                      {interview.type === 'Video Call' && <Video className="h-4 w-4 mr-1" />}
                      {interview.type === 'Phone Call' && <Phone className="h-4 w-4 mr-1" />}
                      {interview.type === 'In-Person' && <MapPin className="h-4 w-4 mr-1" />}
                      {interview.type}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {interview.interviewer}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button size="sm">Join/Start</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Interview Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviewHistory.map((interview, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{interview.candidate}</h3>
                  <p className="text-sm text-muted-foreground">{interview.position}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{interview.date}</div>
                    <div className="text-sm text-muted-foreground">by {interview.interviewer}</div>
                  </div>
                  <Badge 
                    variant={
                      interview.result === 'Hired' ? 'default' : 
                      interview.result === 'Rejected' ? 'destructive' : 
                      'secondary'
                    }
                  >
                    {interview.result}
                  </Badge>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}