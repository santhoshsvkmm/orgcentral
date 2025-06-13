
'use client';

import type { RFI, RfiStatus } from '@/types/rfi';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, MoreHorizontal, Trash2, Eye, CalendarDays, User, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/date-utils";
import { RfiForm } from './rfi-form';
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import React from "react";

interface RfiListProps {
  rfis: RFI[];
  projectId: string;
  onUpdateRfi: (updatedRfi: RFI) => void;
  onDeleteRfi: (rfiId: string) => void;
  onCreateRfi: (newRfi: RFI) => void; 
}

export function RfiList({ rfis, projectId, onUpdateRfi, onDeleteRfi, onCreateRfi }: RfiListProps) {
  const { toast } = useToast();

  const getStatusVariant = (status: RfiStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Open": return "default"; 
      case "In Progress": return "secondary"; 
      case "Needs Clarification": return "outline"; 
      case "Closed": return "outline"; 
      default: return "outline";
    }
  };

  const getStatusColorClass = (status: RfiStatus): string => {
    switch (status) {
      case "Open": return "bg-blue-500 hover:bg-blue-600";
      case "In Progress": return "bg-yellow-500 hover:bg-yellow-600";
      case "Needs Clarification": return "bg-orange-500 hover:bg-orange-600";
      case "Closed": return "bg-green-500 hover:bg-green-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const handleDelete = (rfi: RFI) => {
    onDeleteRfi(rfi.id);
    toast({
      title: "RFI Deleted",
      description: `RFI "${rfi.rfiNumber}: ${rfi.title}" has been deleted.`,
    });
  };

  const columns: ColumnDef<RFI>[] = [
    {
      accessorKey: "rfiNumber",
      header: "RFI No.",
      enableSorting: true,
      cell: ({ row }) => (
        <Link href={`/projects/${projectId}/communication/rfi/${row.id}`} className="hover:underline font-medium">
          {row.rfiNumber}
        </Link>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      enableSorting: true,
      cell: ({ row }) => (
         <Link href={`/projects/${projectId}/communication/rfi/${row.id}`} className="hover:underline">
          {row.title}
        </Link>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ row }) => <Badge variant={getStatusVariant(row.status)} className={`${getStatusColorClass(row.status)} text-white`}>{row.status}</Badge>,
    },
    {
      accessorKey: "priority",
      header: "Priority",
      enableSorting: true,
      cell: ({ row }) => <Badge variant={row.priority === 'High' ? 'destructive' : row.priority === 'Medium' ? 'default' : 'outline'}>{row.priority}</Badge>,
    },
    {
      accessorKey: "raisedByUserName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-transparent"
        >
          <User className="mr-1 h-4 w-4 inline-block" /> Raised By
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => row.raisedByUserName,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-transparent"
        >
           <CalendarDays className="mr-1 h-4 w-4 inline-block" /> Created
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => formatDate(row.createdAt, 'yyyy-MM-dd'),
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-transparent"
        >
           <CalendarDays className="mr-1 h-4 w-4 inline-block" /> Due Date
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => formatDate(row.dueDate, 'yyyy-MM-dd'),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/projects/${projectId}/communication/rfi/${row.id}`}><Eye className="mr-2 h-4 w-4" />View Details</Link>
              </DropdownMenuItem>
              <RfiForm
                mode="edit"
                projectId={projectId}
                rfiData={row}
                onSave={onUpdateRfi}
                triggerButton={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex items-center w-full">
                    <Edit className="mr-2 h-4 w-4" />Edit
                  </DropdownMenuItem>
                }
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10 w-full flex items-center">
                    <Trash2 className="mr-2 h-4 w-4" />Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete RFI "{row.rfiNumber}: {row.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(row)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const searchableRfiColumns: (keyof RFI)[] = ['rfiNumber', 'title', 'status', 'priority', 'raisedByUserName'];

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>All RFIs</CardTitle>
          <CardDescription>List of Requests for Information for this project.</CardDescription>
        </div>
        <RfiForm
            mode="create"
            projectId={projectId}
            onSave={onCreateRfi}
            triggerButton={
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New RFI
            </Button>
            }
        />
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={rfis}
          itemsPerPage={10}
          searchableColumns={searchableRfiColumns}
          globalFilterPlaceholder="Search RFIs (No., title, status...)"
          noResultsMessage={rfis.length === 0 && (localStorage.getItem('rfiFiltersActive') === 'true') ? "No RFIs match the current filters." : "No RFIs have been created yet for this project."}
        />
      </CardContent>
    </Card>
  );
}
