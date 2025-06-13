
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Building } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Warehouse } from '@/types/warehouse'; // Assuming you have this type

// Mock data for warehouses - in a real app, this would be fetched based on projectId
// This should match or be similar to the one in your warehouses page
const initialMockWarehouses: Warehouse[] = [
  { id: 'wh-1', projectId: '1', name: 'Main Site Storage A', location: 'Sector A, Bay 1', capacity: 500, notes: 'Stores primary construction materials.', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'wh-2', projectId: '1', name: 'Equipment Shed 1', location: 'Near Gate 3', capacity: 100, notes: 'Heavy machinery and tools.', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'wh-3', projectId: '2', name: 'Central Parts Hub', location: 'Building C, Floor 1', capacity: 2000, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
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
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md">
            <p className="font-semibold text-blue-700">Procurement Plan Features:</p>
            <ul className="list-disc list-inside text-sm text-blue-600 mt-1 space-y-1">
              <li>List required materials with specifications and quantities.</li>
              <li>Track supplier quotes and selections.</li>
              <li>Monitor order statuses (e.g., Ordered, Shipped, Delivered).</li>
              <li>Manage delivery schedules and inventory receiving.</li>
            </ul>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="procurement list placeholder">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Material Procurement Plan Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Details of material orders and statuses will appear here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include integration with inventory management, supplier databases, and automated notifications for reordering.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
