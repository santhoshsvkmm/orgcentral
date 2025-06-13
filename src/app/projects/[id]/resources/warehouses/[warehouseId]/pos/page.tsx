
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ScanLine, Building } from 'lucide-react';
import type { Warehouse } from '@/types/warehouse';

// Mock data for warehouses (same as in warehouses page and procurement plan page for consistency)
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

// Mock function to get warehouse by ID
async function getWarehouseById(warehouseId: string, projectId: string): Promise<Warehouse | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return initialMockWarehouses.find(wh => wh.id === warehouseId && wh.projectId === projectId) || null;
}

export default function MaterialPosPage({ params: paramsPromise }: { params: Promise<{ id: string; warehouseId: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const warehouseId = params.warehouseId;
  
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
        title={`Material POS: ${warehouse.name}`}
        description={`Track material inventory for ${warehouse.name} (Project: ${projectName})`}
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
            <ScanLine className="mr-2 h-5 w-5 text-primary" />
            Material Point of System (POS)
          </CardTitle>
          <CardDescription>
            This system is for tracking materials entering and leaving the warehouse: <strong>{warehouse.name}</strong>.
            <br />
            Project: <Link href={`/projects/${projectId}`} className="underline hover:text-primary"><Building className="inline-block h-4 w-4 mr-1" />{projectName}</Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md">
            <p className="font-semibold text-green-700">Material POS Features would include:</p>
            <ul className="list-disc list-inside text-sm text-green-600 mt-1 space-y-1">
              <li>Recording material check-ins (receipts from procurement).</li>
              <li>Tracking material check-outs (issues to site/tasks).</li>
              <li>Real-time inventory levels for each material.</li>
              <li>Searchable log of all material transactions.</li>
              <li>Low stock alerts and integration with procurement plans.</li>
            </ul>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="pos system interface placeholder">
            <ScanLine className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Material POS System Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Interface for material check-in/out and inventory tracking will appear here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            A full Material POS system requires backend database integration and specialized UI components for efficient material tracking.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
