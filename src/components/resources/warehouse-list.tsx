
'use client';

import type { Warehouse } from '@/types/warehouse';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, MoreHorizontal, Trash2, PlusCircle, PackageSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/date-utils";
import { WarehouseForm } from './warehouse-form';
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import React from "react";

interface WarehouseListProps {
  warehouses: Warehouse[];
  projectId: string;
  onUpdateWarehouse: (updatedWarehouse: Warehouse) => void;
  onDeleteWarehouse: (warehouseId: string, warehouseName: string) => void;
  onCreateWarehouse: (newWarehouse: Warehouse) => void; 
}

export function WarehouseList({ warehouses, projectId, onUpdateWarehouse, onDeleteWarehouse, onCreateWarehouse }: WarehouseListProps) {
  const { toast } = useToast();

  const handleDelete = (warehouse: Warehouse) => {
    onDeleteWarehouse(warehouse.id, warehouse.name);
  };

  const columns: ColumnDef<Warehouse>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
      cell: ({ row }) => <span className="font-medium">{row.name}</span>,
    },
    {
      accessorKey: "location",
      header: "Location",
      enableSorting: true,
      cell: ({ row }) => row.location || 'N/A',
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      enableSorting: true,
      cell: ({ row }) => row.capacity !== undefined ? `${row.capacity} units` : 'N/A',
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      enableSorting: true,
      cell: ({ row }) => formatDate(row.updatedAt, 'MMM d, yyyy HH:mm'),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <WarehouseForm
            mode="edit"
            projectId={projectId}
            warehouseData={row}
            onSave={onUpdateWarehouse}
            triggerButton={
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Warehouse</span>
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
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10 w-full flex items-center">
                    <Trash2 className="mr-2 h-4 w-4" />Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the warehouse "{row.name}".
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

  const searchableWarehouseColumns: (keyof Warehouse)[] = ['name', 'location'];

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Warehouses</CardTitle>
          <CardDescription>Manage warehouses for this project.</CardDescription>
        </div>
        <WarehouseForm
            mode="create"
            projectId={projectId}
            onSave={onCreateWarehouse}
            triggerButton={
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Warehouse
            </Button>
            }
        />
      </CardHeader>
      <CardContent>
        {warehouses.length === 0 ? (
           <div className="text-center py-10 text-muted-foreground">
                <PackageSearch className="mx-auto h-12 w-12 mb-4" />
                <p className="font-semibold">No warehouses found for this project.</p>
                <p className="text-sm">Get started by creating a new warehouse.</p>
           </div>
        ) : (
          <DataTable
            columns={columns}
            data={warehouses}
            itemsPerPage={10}
            searchableColumns={searchableWarehouseColumns}
            globalFilterPlaceholder="Search warehouses (name, location)..."
            noResultsMessage="No warehouses match your search."
          />
        )}
      </CardContent>
    </Card>
  );
}
