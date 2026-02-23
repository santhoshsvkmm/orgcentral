
'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PieChart as PieChartIcon, FileText, CreditCard, DollarSign } from 'lucide-react';

type ProjectFin = {
  id: string;
  name: string;
  budget: number;
  spent: number;
  outstandingInvoices: number;
};

const sampleProjects: ProjectFin[] = [
  { id: 'project-alpha', name: 'Residential Tower A', budget: 850000, spent: 578000, outstandingInvoices: 45000 },
  { id: 'project-beta', name: 'Commercial Plaza', budget: 1200000, spent: 540000, outstandingInvoices: 120000 },
];

const sampleInvoices = [
  { id: 'INV-001', project: 'Residential Tower A', amount: 25000, status: 'Due' },
  { id: 'INV-002', project: 'Commercial Plaza', amount: 120000, status: 'Partially Paid' },
];

const sampleExpenses = [
  { id: 'EXP-101', project: 'Residential Tower A', amount: 1200, type: 'Fuel' },
  { id: 'EXP-102', project: 'Commercial Plaza', amount: 5400, type: 'Materials' },
];

export default function FinancialsOverviewPage() {
  const [projects] = useState<ProjectFin[]>(sampleProjects);
  const [invoices] = useState(sampleInvoices);
  const [expenses] = useState(sampleExpenses);

  const totals = useMemo(() => {
    const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
    const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
    const totalOutstanding = projects.reduce((s, p) => s + p.outstandingInvoices, 0);
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    return { totalBudget, totalSpent, totalOutstanding, totalExpenses };
  }, [projects, expenses]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
          Financial Overview
        </h2>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button className="bg-primary">Create Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.totalBudget.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Allocated across projects</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amount Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Actual spend to date</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outstanding Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.totalOutstanding.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Amount awaiting payment</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses (Recent)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Recent expense total</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projects Financials</CardTitle>
            <CardDescription>Budget vs Spent per project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 py-2 border-b last:border-b-0">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">Budget ${p.budget.toLocaleString()} • Spent ${p.spent.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">Outstanding</div>
                    <div className="font-semibold">${p.outstandingInvoices.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {invoices.map((inv: any) => (
                  <div key={inv.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{inv.id}</div>
                      <div className="text-sm text-muted-foreground">{inv.project} • ${inv.amount.toLocaleString()}</div>
                    </div>
                    <Badge variant={inv.status === 'Due' ? 'destructive' : 'secondary'}>{inv.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expenses.map((e: any) => (
                  <div key={e.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{e.id}</div>
                      <div className="text-sm text-muted-foreground">{e.project} • {e.type}</div>
                    </div>
                    <div className="font-semibold">${e.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
