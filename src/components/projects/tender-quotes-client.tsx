"use client";

import React from 'react';
import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import Link from 'next/link';

interface Quote {
  id: string;
  supplier: string;
  amount: number;
  currency: string;
  submittedAt: string;
  notes?: string;
}

export default function TenderQuotesClient({ quotes, projectId, tenderId }: { quotes: Quote[]; projectId: string; tenderId: string }) {
  const columns: ColumnDef<Quote>[] = [
    { accessorKey: 'supplier', header: 'Supplier', cell: ({ row }: any) => <span className="font-medium">{row.original.supplier}</span> },
    { accessorKey: 'amount', header: 'Amount', cell: ({ row }: any) => <span className="font-mono">{row.original.currency} {row.original.amount.toLocaleString()}</span> },
    { accessorKey: 'submittedAt', header: 'Submitted', cell: ({ row }: any) => <span className="text-sm">{row.original.submittedAt}</span> },
    { accessorKey: 'actions', header: 'Actions', cell: ({ row }: any) => <Link href={`/projects/${projectId}/contracts/tenders/${tenderId}?quote=${row.original.id}`} className="text-sm text-primary">View</Link>, size: '120px' }
  ];

  return (
    <DataTable columns={columns} data={quotes} itemsPerPage={10} noResultsMessage="No quotations submitted yet." />
  );
}
