import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Eye, Download } from 'lucide-react';

export default function PoliciesPage() {
  const policies = [
    { title: 'Employee Handbook', category: 'General', lastUpdated: '2024-01-15', version: '2.1', status: 'Active' },
    { title: 'Safety Guidelines', category: 'Safety', lastUpdated: '2024-01-10', version: '1.8', status: 'Active' },
    { title: 'Code of Conduct', category: 'Ethics', lastUpdated: '2023-12-20', version: '1.5', status: 'Active' },
    { title: 'Remote Work Policy', category: 'Work Arrangements', lastUpdated: '2024-01-05', version: '1.2', status: 'Draft' },
    { title: 'Anti-Harassment Policy', category: 'HR', lastUpdated: '2023-11-30', version: '2.0', status: 'Active' },
    { title: 'Equipment Usage Policy', category: 'Operations', lastUpdated: '2024-01-12', version: '1.3', status: 'Active' },
  ];

  const categories = ['All', 'General', 'Safety', 'Ethics', 'Work Arrangements', 'HR', 'Operations'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">HR Policies</h1>
          <p className="text-muted-foreground">Manage company policies and procedures</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Create Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Total Policies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">22</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Draft</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Need Review</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            {categories.map(category => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Policy Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policies.map((policy, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">{policy.title}</h3>
                    <Badge variant={policy.status === 'Active' ? 'default' : 'secondary'}>
                      {policy.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>{policy.category}</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Updated: {policy.lastUpdated}
                    </span>
                    <span>Version {policy.version}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}