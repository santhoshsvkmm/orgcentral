
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, MoreHorizontal, Trash2, HardHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Subcontractor } from "@/types/subcontractor";
import { SubcontractorForm } from "./subcontractor-form"; 
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import React from "react";

interface SubcontractorListProps {
  subcontractors: Subcontractor[];
  onUpdateSubcontractor: (subcontractor: Subcontractor) => void;
  onDeleteSubcontractor: (subcontractorId: string) => void;
}

export function SubcontractorList({ subcontractors, onUpdateSubcontractor, onDeleteSubcontractor }: SubcontractorListProps) {
  const { toast } = useToast();

  const handleDelete = (sub: Subcontractor) => {
    onDeleteSubcontractor(sub.id);
    toast({
      title: "Subcontractor Deleted",
      description: `Subcontractor "${sub.name}" has been deleted.`,
    });
  };

  const columns: ColumnDef<Subcontractor>[] = [
    {
      accessorKey: "name",
      header: "Company Name",
      enableSorting: true,
      cell: ({ row }) => <span className="font-medium">{row.name}</span>,
    },
    {
      accessorKey: "trade",
      header: "Trade/Specialty",
      enableSorting: true,
      cell: ({ row }) => <Badge variant="secondary">{row.trade}</Badge>,
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
      enableSorting: true,
      cell: ({ row }) => <>{row.contactPerson}</>,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
      cell: ({ row }) => <>{row.email}</>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <>{row.phone || 'N/A'}</>,
    },
    {
      accessorKey: "mappedProjectsCount",
      header: "Mapped Projects",
      enableSorting: true,
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.mappedProjects.length} Project{row.mappedProjects.length === 1 ? "" : "s"}
        </Badge>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <SubcontractorForm
            mode="edit"
            subcontractorData={row}
            onSave={onUpdateSubcontractor}
            triggerButton={
              <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Subcontractor</span>
              </Button>
            }
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* Future: View Details Item */}
              {/* <DropdownMenuItem asChild>
                <Link href={`/subcontractors/${row.original.id}`}><Eye className="mr-2 h-4 w-4" />View Details</Link>
              </DropdownMenuItem> */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive focus:bg-destructive/10 w-full flex items-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the subcontractor "{row.name}".
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
  
  const searchableSubcontractorColumns: (keyof Subcontractor)[] = ['name', 'contactPerson', 'email', 'trade'];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        {/* Title and Description are handled by PageTitle component on the page */}
        {/* Add Subcontractor button is also handled by PageTitle actions */}
      </CardHeader>
      <CardContent>
        {subcontractors.length === 0 ? (
          <div className="text-center py-10">
            <HardHat className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-semibold">No subcontractors found.</p>
            <p className="text-sm text-muted-foreground">Get started by adding a new subcontractor.</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={subcontractors}
            itemsPerPage={10}
            searchableColumns={searchableSubcontractorColumns}
            globalFilterPlaceholder="Search subcontractors..."
            noResultsMessage="No subcontractors match your search."
          />
        )}
      </CardContent>
    </Card>
  );
}

