
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, MoreHorizontal, Trash2, Users } from "lucide-react"; // Changed Icon
import { useToast } from "@/hooks/use-toast";
import type { Consultant } from "@/types/consultant";
import { ConsultantForm } from "./consultant-form"; 
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import React from "react";

interface ConsultantListProps {
  consultants: Consultant[];
  onUpdateConsultant: (consultant: Consultant | Omit<Consultant, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDeleteConsultant: (consultantId: string) => void;
}

export function ConsultantList({ consultants, onUpdateConsultant, onDeleteConsultant }: ConsultantListProps) {
  const { toast } = useToast();

  const handleDelete = (consultant: Consultant) => {
    onDeleteConsultant(consultant.id);
    toast({
      title: "Consultant Deleted",
      description: `Consultant "${consultant.name}" has been deleted.`,
    });
  };

  const columns: ColumnDef<Consultant>[] = [
    {
      accessorKey: "name",
      header: "Name/Company",
      enableSorting: true,
      cell: ({ row }) => <span className="font-medium">{row.name}</span>,
    },
    {
      accessorKey: "specialty",
      header: "Specialty",
      enableSorting: true,
      cell: ({ row }) => <Badge variant="secondary">{row.specialty}</Badge>,
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
          <ConsultantForm
            mode="edit"
            consultantData={row}
            onSave={onUpdateConsultant}
            triggerButton={
              <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Consultant</span>
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
                      This action cannot be undone. This will permanently delete the consultant "{row.name}".
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
  
  const searchableConsultantColumns: (keyof Consultant)[] = ['name', 'contactPerson', 'email', 'specialty'];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        {/* Title and Description are handled by PageTitle component on the page */}
        {/* Add Consultant button is also handled by PageTitle actions */}
      </CardHeader>
      <CardContent>
        {consultants.length === 0 ? (
          <div className="text-center py-10">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-semibold">No consultants found.</p>
            <p className="text-sm text-muted-foreground">Get started by adding a new consultant.</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={consultants}
            itemsPerPage={10}
            searchableColumns={searchableConsultantColumns}
            globalFilterPlaceholder="Search consultants..."
            noResultsMessage="No consultants match your search."
          />
        )}
      </CardContent>
    </Card>
  );
}
