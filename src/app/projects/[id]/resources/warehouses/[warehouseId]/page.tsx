
'use client';

import { use } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, MapPin, Package, ScanLine, ShoppingCart, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { Warehouse } from '@/types/warehouse';
import { formatDate } from '@/lib/date-utils';

// Mock data for warehouses (same as in warehouses page for consistency)
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

export default function WarehouseDetailPage({ params: paramsPromise }: { params: Promise<{ id: string; warehouseId: string }> }) {
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
        title={`${warehouse.name}`}
        description={`Details and management options for warehouse at ${warehouse.location || 'N/A'}. Part of project: ${projectName}.`}
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}/resources/warehouses`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Warehouses
            </Link>
          </Button>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center"><Package className="mr-2 h-5 w-5 text-primary"/>Warehouse Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start">
                        <Building className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div><strong>Name:</strong> {warehouse.name}</div>
                    </div>
                     <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div><strong>Location:</strong> {warehouse.location || 'N/A'}</div>
                    </div>
                     <div className="flex items-start">
                        <ScanLine className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" /> {/* Placeholder for capacity icon */}
                        <div><strong>Capacity:</strong> {warehouse.capacity !== undefined ? `${warehouse.capacity} units` : 'N/A'}</div>
                    </div>
                     <div className="flex items-start">
                        <FileText className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div><strong>Notes:</strong> {warehouse.notes || 'No notes provided.'}</div>
                    </div>
                    <Separator className="my-2"/>
                     <div className="text-xs text-muted-foreground">
                        Created: {formatDate(warehouse.createdAt)} <br />
                        Last Updated: {formatDate(warehouse.updatedAt)}
                     </div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center"><ShoppingCart className="mr-2 h-5 w-5 text-primary"/>Material Procurement</CardTitle>
                    <CardDescription>Plan, order, and track materials required for this warehouse.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Manage the procurement lifecycle for materials, from requests to delivery and supplier management.</p>
                    <Button asChild>
                        <Link href={`/projects/${projectId}/resources/warehouses/${warehouseId}/procurement-plan`}>
                            Go to Procurement Plan
                        </Link>
                    </Button>
                </CardContent>
            </Card>
             <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center"><ScanLine className="mr-2 h-5 w-5 text-primary"/>Material POS System</CardTitle>
                    <CardDescription>Track material inventory, check-ins, and check-outs.</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-muted-foreground mb-4">Maintain real-time visibility of material stock levels, record receipts from suppliers, and track issues to project tasks.</p>
                    <Button asChild>
                        <Link href={`/projects/${projectId}/resources/warehouses/${warehouseId}/pos`}>
                            Access Material POS
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
