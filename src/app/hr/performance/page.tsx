import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, TrendingUp, User } from 'lucide-react';

export default function PerformancePage() {
  const reviews = [
    { employee: 'John Smith', position: 'Project Manager', dueDate: '2024-02-15', status: 'Pending', score: null },
    { employee: 'Sarah Wilson', position: 'Site Supervisor', dueDate: '2024-01-30', status: 'Completed', score: 4.2 },
    { employee: 'Mike Johnson', position: 'Safety Coordinator', dueDate: '2024-02-10', status: 'In Progress', score: null },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance Reviews</h1>
          <p className="text-muted-foreground">Manage employee performance evaluations</p>
        </div>
        <Button>
          <Target className="h-4 w-4 mr-2" />
          New Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm text-muted-foreground">Pending Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">42</div>
            <p className="text-sm text-muted-foreground">Completed This Quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.1</div>
            <p className="text-sm text-muted-foreground">Average Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">89%</div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{review.employee}</h3>
                  <p className="text-sm text-muted-foreground">{review.position}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {review.dueDate}
                    </div>
                    {review.score && <div className="text-sm font-medium">Score: {review.score}/5</div>}
                  </div>
                  <Badge variant={review.status === 'Completed' ? 'default' : review.status === 'In Progress' ? 'secondary' : 'outline'}>
                    {review.status}
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