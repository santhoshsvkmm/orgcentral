'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import { AgreementForm } from "./agreement-form";
import type { Agreement } from "@/types/agreement";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from 'lucide-react';

interface AgreementListProps {
  agreements: Agreement[];
  clientsMap?: Record<string, string>; // id->name map to display party name
  onUpdateAgreement: (agreement: Agreement) => void;
  onDeleteAgreement: (agreementId: string) => void;
}

export function AgreementList({ agreements, clientsMap = {}, onUpdateAgreement, onDeleteAgreement }: AgreementListProps) {
  const { toast } = useToast();

  const handleDelete = (a: Agreement) => {
    onDeleteAgreement(a.id);
    toast({ title: 'Agreement Deleted', description: `Agreement "${a.referenceNumber}" deleted.` });
  };

  const columns: ColumnDef<Agreement>[] = [
    { accessorKey: 'referenceNumber', header: 'Ref', cell: ({ row }) => <span className="font-medium">{row.referenceNumber}</span> },
    { accessorKey: 'title', header: 'Title', cell: ({ row }) => <>{row.title}</> },
    { accessorKey: 'partyId', header: 'Party', cell: ({ row }) => <>{clientsMap[row.partyId] || row.partyId}</> },
    { accessorKey: 'startDate', header: 'Start', cell: ({ row }) => <>{row.startDate || '—'}</> },
    { accessorKey: 'endDate', header: 'End', cell: ({ row }) => <>{row.endDate || '—'}</> },
    { accessorKey: 'value', header: 'Value', cell: ({ row }) => <>{row.value ? `${row.currency || 'USD'} ${row.value.toLocaleString()}` : '—'}</> },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <>{row.status}</> },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <AgreementForm
            mode="edit"
            agreementData={row}
            onSave={(a) => onUpdateAgreement(a as Agreement)}
            triggerButton={<Button size="icon" variant="ghost" className="h-8 w-8 p-0"><Edit className="h-4 w-4" /></Button>}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8 p-0"><Trash2 className="h-4 w-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm delete</AlertDialogTitle>
                <AlertDialogDescription>Delete agreement "{row.referenceNumber}"? This cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(row)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Agreements</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={agreements}
          itemsPerPage={10}
          noResultsMessage="No agreements found."
        />
      </CardContent>
    </Card>
  );
}
