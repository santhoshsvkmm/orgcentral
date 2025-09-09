'use client';
import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Building } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import AddMaterialForm from '@/components/procurement/add-material-form';
import type { Warehouse } from '@/types/warehouse'; // Assuming you have this type

// Mock data for warehouses - in a real app, this would be fetched based on projectId
// This should match or be similar to the one in your warehouses page
const initialMockWarehouses: Warehouse[] = [
  {
    id: 'wh-1', projectId: '1', name: 'Main Site Storage A', location: 'Sector A, Bay 1', capacity: 500, notes: 'Stores primary construction materials.', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    currentStock: 0
  },
  {
    id: 'wh-2', projectId: '1', name: 'Equipment Shed 1', location: 'Near Gate 3', capacity: 100, notes: 'Heavy machinery and tools.', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    currentStock: 0
  },
  {
    id: 'wh-3', projectId: '2', name: 'Central Parts Hub', location: 'Building C, Floor 1', capacity: 2000, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    currentStock: 0
  },
];


// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 50)); 
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

// Mock function to get warehouse name by ID
async function getWarehouseById(warehouseId: string, projectId: string): Promise<Warehouse | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return initialMockWarehouses.find(wh => wh.id === warehouseId && wh.projectId === projectId) || null;
}

const mockMaterials = [
  {
    id: 'mat-1',
    name: 'Concrete Mix',
    specifications: 'Type I, 4000 PSI',
    quantity: 50,
    unitOfMeasurement: 'bags',
    supplier: 'ABC Supplies',
    estimatedCost: 250,
    requiredDeliveryDate: '2023-11-15',
    priority: 'High',
  },
  {
    id: 'mat-2',
    name: 'Steel Rebar',
    specifications: '#4, Grade 60',
    quantity: 200,
    unitOfMeasurement: 'feet',
    supplier: 'XYZ Steel',
    estimatedCost: 1200,
    requiredDeliveryDate: '2023-11-20',
    priority: 'Medium',
  },
  {
    id: 'mat-3',
    name: 'Wood Planks',
    specifications: '2x4, Pine',
    quantity: 100,
    unitOfMeasurement: 'pieces',
    supplier: 'Local Lumber',
    estimatedCost: 300,
    requiredDeliveryDate: '2023-11-18',
    priority: 'Low',
  },
];

const materialColumns = [
  {
    accessorKey: 'name',
    header: 'Material Name',
    cell: ({ row }) => row.name,
  },
  {
    accessorKey: 'specifications',
    header: 'Specifications',
    cell: ({ row }) => row.specifications,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => row.quantity,
  },
  {
    accessorKey: 'unitOfMeasurement',
    header: 'Unit',
    cell: ({ row }) => row.unitOfMeasurement || 'N/A',
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ row }) => row.supplier || 'N/A',
  },
  {
    accessorKey: 'estimatedCost',
    header: 'Estimated Cost',
    cell: ({ row }) => row.estimatedCost !== undefined ? `$${row.estimatedCost.toFixed(2)}` : 'N/A',
  },
  {
    accessorKey: 'requiredDeliveryDate',
    header: 'Required Delivery Date',
    cell: ({ row }) => row.requiredDeliveryDate || 'N/A',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => row.priority || 'N/A',
  },
  // You might want to add an 'Actions' column for editing/deleting materials later
  // {
  //   accessorKey: 'actions',
  //   header: 'Actions',
  //   cell: ({ row }) => (
  //     // Add buttons for edit/delete here
  //   ),
  // },
];

export default function MaterialProcurementPlanPage({ params: paramsPromise }: { params: Promise<{ id: string; warehouseId: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const warehouseId = params.warehouseId;
  
  // Fetch project and warehouse details
  const projectName = use(getProjectNameById(projectId));
  const warehouse = use(getWarehouseById(warehouseId, projectId));

  if (!warehouse) {
    return (
       <>
        <PageTitle
            title="Warehouse Not Found"
            description={`Could not find warehouse with ID: ${warehouseId} for project ${projectName}.`}
            actions={
            <Button variant="outline" asChild>
                <Link href={`/projects/${projectId}/resources/warehouses`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Warehouses
                </Link>
            </Button>
            }
        />
        <Card>
            <CardContent className="pt-6">
                 <p>Please check the warehouse ID or return to the list of warehouses.</p>
            </CardContent>
        </Card>
       </>
    );
  }


  return (
    <>
      <PageTitle
        title={`Procurement Plan: ${warehouse.name}`}
        description={`Manage material procurement for ${warehouse.name} (Project: ${projectName})`}
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}/resources/warehouses`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Warehouses
            </Link>
          </Button>
        }
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
            Material Procurement Details
          </CardTitle>
          <CardDescription>
            This section is for planning and tracking material procurement for the warehouse: <strong>{warehouse.name}</strong>.
            <br />
            Project: <Link href={`/projects/${projectId}`} className="underline hover:text-primary"><Building className="inline-block h-4 w-4 mr-1" />{projectName}</Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
      
          {/* Replace placeholder with MaterialList component */}
          <DataTable
            data={mockMaterials}
            columns={materialColumns}
            searchableColumns={['name', 'specifications', 'supplier']}
          />
          
          {/* Add the AddMaterialForm component */}
          <AddMaterialForm />


          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include integration with inventory management, supplier databases, and automated notifications for reordering.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
