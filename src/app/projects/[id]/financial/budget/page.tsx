
// Server component: fetch project name on the server and render client-only
// parts (claims) via a dedicated client component.
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BudgetClaimsClient from '@/components/projects/budget-claims-client';
import Link from 'next/link';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, AlertTriangle, Calculator, FileText, PieChart } from 'lucide-react';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Downtown Office Complex";
  if (id === "2") return "Residential Tower Project";
  return `Construction Project (ID: ${id})`;
}

const budgetData = {
  totalBudget: 2500000,
  actualSpent: 1875000,
  committed: 425000,
  remaining: 200000,
  contingency: 125000,
  changeOrders: 75000
};

const costBreakdown = [
  { category: 'Labor', budgeted: 750000, actual: 680000, variance: -70000, percentage: 30 },
  { category: 'Materials', budgeted: 900000, actual: 950000, variance: 50000, percentage: 36 },
  { category: 'Equipment', budgeted: 400000, actual: 385000, variance: -15000, percentage: 16 },
  { category: 'Subcontractors', budgeted: 350000, actual: 360000, variance: 10000, percentage: 14 },
  { category: 'Overhead', budgeted: 100000, actual: 100000, variance: 0, percentage: 4 }
];

const changeOrders = [
  { id: 'CO-001', description: 'Additional HVAC Units', amount: 25000, status: 'Approved', date: '2024-01-15' },
  { id: 'CO-002', description: 'Upgraded Flooring Materials', amount: 35000, status: 'Pending', date: '2024-01-20' },
  { id: 'CO-003', description: 'Extra Electrical Outlets', amount: 15000, status: 'Approved', date: '2024-01-25' }
];

export default async function ProjectBudgetPage({ params }: { params: { id: string } }) {
  const projectId = params.id;
  const projectName = await getProjectNameById(projectId);

  const spentPercentage = (budgetData.actualSpent / budgetData.totalBudget) * 100;
  const remainingPercentage = (budgetData.remaining / budgetData.totalBudget) * 100;

  // Mock milestones and tasks for claim creation (would come from API in a real app)
  const sampleMilestones = [
    { id: 'm1', name: 'Foundation' },
    { id: 'm2', name: 'Structure' },
    { id: 'm3', name: 'Finishes' },
  ];

  const sampleTasks = [
    { id: 't1', title: 'Excavation', milestoneId: 'm1' },
    { id: 't2', title: 'Concrete Pour', milestoneId: 'm1' },
    { id: 't3', title: 'Steel Frame', milestoneId: 'm2' },
    { id: 't4', title: 'Roofing', milestoneId: 'm3' },
  ];

  // Claims are handled in a client component below so we keep this page
  // a server component (can use async/await and server-side data fetching).

  return (
    <>
      <PageTitle
        title={`Project Budget: ${projectName}`}
        description="Comprehensive budget management and cost tracking for construction project."
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Calculator className="mr-2 h-4 w-4" />
              Cost Estimate
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project
              </Link>
            </Button>
          </div>
        }
      />

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budgetData.totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Original contract amount</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actual Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budgetData.actualSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{spentPercentage.toFixed(1)}% of budget</p>
            <Progress value={spentPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Committed</CardTitle>
            <FileText className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budgetData.committed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Purchase orders & contracts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budgetData.remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{remainingPercentage.toFixed(1)}% available</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="change-orders">Change Orders</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Cost Category Breakdown
              </CardTitle>
              <CardDescription>
                Detailed breakdown by construction cost categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costBreakdown.map((item) => (
                  <div key={item.category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.category}</h3>
                        <Badge variant={item.variance > 0 ? 'destructive' : item.variance < 0 ? 'default' : 'secondary'}>
                          {item.variance > 0 ? '+' : ''}${item.variance.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Budgeted:</span>
                          <div className="font-medium">${item.budgeted.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Actual:</span>
                          <div className="font-medium">${item.actual.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">% of Total:</span>
                          <div className="font-medium">{item.percentage}%</div>
                        </div>
                      </div>
                      <Progress value={(item.actual / item.budgeted) * 100} className="mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="change-orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Change Orders
              </CardTitle>
              <CardDescription>
                Track and manage project change orders and their budget impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {changeOrders.map((co) => (
                  <div key={co.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{co.id}</h3>
                        <Badge variant={co.status === 'Approved' ? 'default' : 'secondary'}>
                          {co.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{co.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Amount: <span className="font-medium">${co.amount.toLocaleString()}</span></span>
                        <span className="text-muted-foreground">Date: <span className="font-medium">{co.date}</span></span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Change Order Impact</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Total change orders: ${budgetData.changeOrders.toLocaleString()} ({((budgetData.changeOrders / budgetData.totalBudget) * 100).toFixed(1)}% of original budget)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting">
          <Card>
            <CardHeader>
              <CardTitle>Budget Forecasting</CardTitle>
              <CardDescription>
                Projected costs and budget completion analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">Completion Forecast</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Projected Total Cost:</span>
                      <span className="font-medium">$2,650,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Budget Variance:</span>
                      <span className="font-medium text-red-600">+$150,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Completion Date:</span>
                      <span className="font-medium">March 15, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">Risk Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Material cost escalation risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Weather delay potential</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Labor productivity on track</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims">
          <Card>
            <CardHeader>
              <CardTitle>Claims & Variations</CardTitle>
              <CardDescription>Raise claims against milestones or specific tasks.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Use a client component to manage claims (stateful) */}
              <BudgetClaimsClient milestones={sampleMilestones} tasks={sampleTasks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Budget Reports</CardTitle>
              <CardDescription>
                Generate and export budget reports for stakeholders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Cost Summary Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <PieChart className="h-6 w-6 mb-2" />
                  <span>Variance Analysis</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span>Cash Flow Projection</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Calculator className="h-6 w-6 mb-2" />
                  <span>Cost Code Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  <span>Risk Assessment</span>
                </Button>
                {/* Payment Schedule removed. Use Claims tab to raise claims and manage payments against milestones/tasks. */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
