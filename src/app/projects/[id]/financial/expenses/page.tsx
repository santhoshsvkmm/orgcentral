'use client';

import { useState, use, useMemo } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, ArrowLeft, Receipt, DollarSign, PieChart } from 'lucide-react';
import Link from 'next/link';

interface Expense {
  readonly id: string;
  readonly date: string;
  readonly category: string;
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
}

const initialMockExpenses: Expense[] = [
  { id: 'exp-1', date: new Date().toISOString().slice(0, 10), category: 'Travel', amount: 120.5, currency: 'USD', description: 'Site visit transport' },
  { id: 'exp-2', date: new Date().toISOString().slice(0, 10), category: 'Materials', amount: 540.0, currency: 'USD', description: 'Small hardware purchase' },
];

export default function ProjectExpensesPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  
  const [expenses, setExpenses] = useState<Expense[]>(initialMockExpenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Calculate totals for a summary view
  const totalAmount = useMemo(() => 
    expenses.reduce((sum, exp) => sum + exp.amount, 0), 
  [expenses]);

  const handleAddExpense = (payload: Omit<Expense, 'id'>) => {
    const newExpense: Expense = { id: `exp-${Date.now()}`, ...payload };
    setExpenses(prev => [newExpense, ...prev]);
    setIsDialogOpen(false);
    toast({ title: 'Expense Added', description: `${payload.category} expense of ${payload.amount} recorded.` });
  };

  const columns: ColumnDef<Expense>[] = [
    { accessorKey: 'date', header: 'Date', cell: ({ row }: any) => <span className="font-medium">{row.original.date}</span> },
    { 
      accessorKey: 'category', 
      header: 'Category',
      cell: ({ row }: any) => <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">{row.original.category}</span>
    },
    { 
      accessorKey: 'amount', 
      header: 'Amount', 
      cell: ({ row }: any) => <span className="font-mono">{row.original.currency} {row.original.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> 
    },
    { accessorKey: 'description', header: 'Description', cell: ({ row }: any) => <span className="text-sm">{row.original.description ?? '-'}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageTitle
        title="Project Expenses"
        description="Track and manage financial outlays for this project."
        actions={
          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Record New Expense</DialogTitle>
                  <DialogDescription>Enter the details of the project expenditure.</DialogDescription>
                </DialogHeader>
                <ExpenseForm onSave={handleAddExpense} onCancel={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Project
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <h3 className="text-2xl font-bold">${totalAmount.toLocaleString()}</h3>
              </div>
              <DollarSign className="h-8 w-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                <h3 className="text-2xl font-bold">{expenses.length}</h3>
              </div>
              <Receipt className="h-8 w-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Main Category</p>
                <h3 className="text-2xl font-bold">{expenses[0]?.category || 'N/A'}</h3>
              </div>
              <PieChart className="h-8 w-8 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Log</CardTitle>
          <CardDescription>A detailed list of all costs associated with this project.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={expenses} 
            itemsPerPage={10} 
            noResultsMessage="No expenses found. Click 'Add Expense' to get started." 
          />
        </CardContent>
      </Card>
    </div>
  );
}

function ExpenseForm({ onSave, onCancel }: { onSave: (p: Omit<Expense, 'id'>) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: 'General',
    amount: '',
    currency: 'USD',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(formData.amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    onSave({
      ...formData,
      amount: numAmount
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" placeholder="e.g. Travel" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" step="0.01" placeholder="0.00" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Input id="currency" value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="What was this for?" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>
      <DialogFooter className="pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Expense</Button>
      </DialogFooter>
    </form>
  );
}
