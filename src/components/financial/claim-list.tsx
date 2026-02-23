'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import type { Claim } from '@/types/claim';
import { ClaimForm } from './claim-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Edit, Trash2 } from 'lucide-react';

interface ClaimListProps {
  claims: Claim[];
  milestones?: Record<string,string>;
  tasks?: Record<string,string>;
  onUpdate: (claim: Claim | Omit<Claim, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDelete: (id: string) => void;
}

export function ClaimList({ claims, milestones = {}, tasks = {}, onUpdate, onDelete }: ClaimListProps) {
  const { toast } = useToast();

  const handleDelete = (c: Claim) => {
    onDelete(c.id);
    toast({ title: 'Claim deleted', description: `Claim ${c.reference} removed.` });
  };

  const columns: ColumnDef<Claim>[] = [
    { accessorKey: 'reference', header: 'Ref', cell: ({ row }) => <span className="font-medium">{row.reference}</span> },
    { accessorKey: 'milestoneId', header: 'Milestone', cell: ({ row }) => <>{row.milestoneId ? (milestones[row.milestoneId] || row.milestoneId) : '—'}</> },
    { accessorKey: 'taskIds', header: 'Tasks', cell: ({ row }) => <>{row.taskIds.map(id => tasks[id] || id).join(', ') || '—'}</> },
    { accessorKey: 'amount', header: 'Amount', cell: ({ row }) => <>{row.currency || 'USD'} {row.amount.toLocaleString()}</> },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <>{row.status}</> },
    {
      accessorKey: 'actions', header: 'Actions', cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <ClaimForm mode="edit" initialData={row} milestones={Object.entries(milestones).map(([id,name])=>({ id, name }))} tasks={Object.entries(tasks).map(([id,title])=>({ id, title }))} onSave={onUpdate} triggerButton={<Button size="icon" variant="ghost" className="h-8 w-8 p-0"><Edit className="h-4 w-4" /></Button>} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8 p-0"><Trash2 className="h-4 w-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm delete</AlertDialogTitle>
                <AlertDialogDescription>Delete claim {row.reference}? This cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(row)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={claims} itemsPerPage={10} noResultsMessage="No claims found." />
      </CardContent>
    </Card>
  );
}
