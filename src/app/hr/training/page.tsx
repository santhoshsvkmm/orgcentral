import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Users, BookOpen } from 'lucide-react';

export default function TrainingPage() {
  const trainings = [
    { title: 'Safety Training Certification', type: 'Mandatory', participants: 25, date: '2024-02-20', status: 'Scheduled' },
    { title: 'Project Management Fundamentals', type: 'Optional', participants: 12, date: '2024-02-15', status: 'In Progress' },
    { title: 'Equipment Operation Training', type: 'Mandatory', participants: 18, date: '2024-01-30', status: 'Completed' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Training & Development</h1>
          <p className="text-muted-foreground">Manage employee training programs</p>
        </div>
        <Button>
          <Award className="h-4 w-4 mr-2" />
          Schedule Training
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Active Programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">Enrolled Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">92%</div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Hours This Month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainings.map((training, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{training.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {training.date}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {training.participants} participants
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={training.type === 'Mandatory' ? 'destructive' : 'secondary'}>
                    {training.type}
                  </Badge>
                  <Badge variant={training.status === 'Completed' ? 'default' : training.status === 'In Progress' ? 'secondary' : 'outline'}>
                    {training.status}
                  </Badge>
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