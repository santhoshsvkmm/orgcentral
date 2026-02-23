"use client";

import { useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FileSearch, PlusCircle } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';

interface Tender {
  id: string;
  title: string;
  type: 'material' | 'labour' | 'equipment' | 'subcontract';
  description?: string;
  createdAt: string;
  closingDate?: string;
  submissions?: number;
}

const mockTenders: Tender[] = [
  { id: 't-1', title: 'Supply: Structural Steel', type: 'material', description: 'Require beams and columns', createdAt: new Date().toISOString().slice(0,10), closingDate: new Date(Date.now()+7*24*60*60*1000).toISOString().slice(0,10), submissions: 2 },
  { id: 't-2', title: 'Subcontract: Electrical Fitout', type: 'subcontract', description: 'Lighting and power installation', createdAt: new Date().toISOString().slice(0,10), closingDate: new Date(Date.now()+14*24*60*60*1000).toISOString().slice(0,10), submissions: 0 },
];

export default function TendersPage({ params }: { params: { id: string } }) {
  const projectId = params.id;
  const { toast } = useToast();

  const [tenders, setTenders] = useState<Tender[]>(mockTenders);

  const handleCreate = (payload: Omit<Tender, 'id' | 'createdAt' | 'submissions'>) => {
    const newTender: Tender = { id: `t-${Date.now()}`, createdAt: new Date().toISOString().slice(0,10), submissions: 0, ...payload } as Tender;
    setTenders(prev => [newTender, ...prev]);
    toast({ title: 'Tender Released', description: `${payload.title} released.` });
  };

  const columns: ColumnDef<Tender>[] = [
    { accessorKey: 'title', header: 'Title', cell: ({ row }: any) => <span className="font-medium">{row.original.title}</span> },
    { accessorKey: 'type', header: 'Type', cell: ({ row }: any) => <span className="text-sm lowercase">{row.original.type}</span> },
    { accessorKey: 'closingDate', header: 'Closing', cell: ({ row }: any) => <span className="text-sm">{row.original.closingDate || 'Open'}</span> },
    { accessorKey: 'submissions', header: 'Submissions', cell: ({ row }: any) => <span className="font-mono">{row.original.submissions}</span> },
    { accessorKey: 'actions', header: 'Actions', cell: ({ row }: any) => (
      <div className="flex gap-2">
        <Link href={`/projects/${projectId}/contracts/tenders/${row.original.id}`} className="text-sm text-primary">View</Link>
      </div>
    ), size: '160px' }
  ];

  return (
    <div className="space-y-6">
      <PageTitle
        title={`Tenders`}
        description="Release tenders for materials, labour, equipment, or subcontract works and review quotations."
        actions={
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground"><PlusCircle className="mr-2 h-4 w-4"/> Release Tender</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Release Tender</DialogTitle>
                  <DialogDescription>Define the scope and publish to suppliers/contractors.</DialogDescription>
                </DialogHeader>
                <TenderForm onSave={(p) => { handleCreate(p); }} onCancel={() => {}} />
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><FileSearch className="mr-2 h-5 w-5 text-primary"/> Project Tenders</CardTitle>
          <CardDescription>List of tenders released for this project and received quotations.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={tenders} itemsPerPage={10} noResultsMessage="No tenders found." />
        </CardContent>
      </Card>
    </div>
  );
}

function TenderForm({ onSave, onCancel }: { onSave: (p: Omit<Tender, 'id'|'createdAt'|'submissions'>) => void, onCancel?: () => void }) {
  const [form, setForm] = useState({ title: '', type: 'material', description: '', closingDate: '' });
  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave({ title: form.title, type: form.type as any, description: form.description, closingDate: form.closingDate || undefined }); }}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <select id="type" className="w-full p-2 border rounded" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="material">Material</option>
          <option value="labour">Labour</option>
          <option value="equipment">Equipment</option>
          <option value="subcontract">Subcontract</option>
        </select>
      </div>
      <div>
        <Label htmlFor="closingDate">Closing Date</Label>
        <Input id="closingDate" type="date" value={form.closingDate} onChange={(e) => setForm({ ...form, closingDate: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={() => onCancel && onCancel()}>Cancel</Button>
        <Button type="submit">Publish Tender</Button>
      </DialogFooter>
    </form>
  );
}
