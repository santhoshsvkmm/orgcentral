import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Eye, Calendar, MapPin, Clock } from 'lucide-react';

export default function RecruitmentPage() {
  const openPositions = [
    { id: 1, title: 'Senior Project Manager', department: 'Construction', location: 'New York', applicants: 24, status: 'Active', priority: 'High' },
    { id: 2, title: 'Site Supervisor', department: 'Field Operations', location: 'Chicago', applicants: 18, status: 'Active', priority: 'Medium' },
    { id: 3, title: 'Safety Coordinator', department: 'Safety', location: 'Los Angeles', applicants: 12, status: 'Active', priority: 'High' },
    { id: 4, title: 'Estimator', department: 'Preconstruction', location: 'Dallas', applicants: 8, status: 'Draft', priority: 'Low' },
  ];

  const recentApplications = [
    { name: 'John Smith', position: 'Senior Project Manager', appliedDate: '2024-01-15', status: 'Under Review' },
    { name: 'Sarah Johnson', position: 'Site Supervisor', appliedDate: '2024-01-14', status: 'Interview Scheduled' },
    { name: 'Mike Davis', position: 'Safety Coordinator', appliedDate: '2024-01-13', status: 'Phone Screen' },
    { name: 'Lisa Wilson', position: 'Estimator', appliedDate: '2024-01-12', status: 'Application Received' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Recruitment</h1>
          <p className="text-muted-foreground">Manage job postings and candidate applications</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">18</div>
            <p className="text-sm text-muted-foreground">Open Positions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">32</div>
            <p className="text-sm text-muted-foreground">In Interview Process</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Offers Extended</p>
          </CardContent>
        </Card>
      </div>

      {/* Open Positions */}
      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div key={position.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">{position.title}</h3>
                    <Badge variant={position.priority === 'High' ? 'destructive' : position.priority === 'Medium' ? 'default' : 'secondary'}>
                      {position.priority}
                    </Badge>
                    <Badge variant={position.status === 'Active' ? 'default' : 'secondary'}>
                      {position.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {position.location}
                    </span>
                    <span>{position.department}</span>
                    <span>{position.applicants} applicants</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((application, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{application.name}</h3>
                  <p className="text-sm text-muted-foreground">{application.position}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {application.appliedDate}
                    </div>
                    <Badge variant="outline">{application.status}</Badge>
                  </div>
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