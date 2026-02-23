'use client';

import { useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Building, Download, UploadCloud } from 'lucide-react';
import type { Warehouse } from '@/types/warehouse';
import MaterialPosInterface from '@/components/procurement/material-pos-interface';
import { useParams } from 'next/navigation';

// Mock data for warehouses (same as in warehouses page and procurement plan page for consistency)
const initialMockWarehouses: Warehouse[] = [
  { id: 'wh-1', projectId: '1', name: 'Main Site Storage A', location: 'Sector A, Bay 1', capacity: 500, notes: 'Stores primary construction materials.', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), currentStock: 320 },
  { id: 'wh-2', projectId: '1', name: 'Equipment Shed 1', location: 'Near Gate 3', capacity: 100, notes: 'Heavy machinery and tools.', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), currentStock: 45 },
  { id: 'wh-3', projectId: '2', name: 'Central Parts Hub', location: 'Building C, Floor 1', capacity: 2000, notes: 'Centralized hub for project beta.', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), currentStock: 1200 },
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

export default function MaterialPosPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const warehouseId = params?.warehouseId as string;

  const [projectName, setProjectName] = useState('Loading...');
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (projectId && warehouseId) {
      setIsLoading(true);
      Promise.all([
        getProjectNameById(projectId),
        getWarehouseById(warehouseId, projectId)
      ]).then(([pName, wh]) => {
        setProjectName(pName);
        setWarehouse(wh);
        setIsLoading(false);
      });
    }
  }, [projectId, warehouseId]);

  if (isLoading) {
    return <div className="container mx-auto py-12 text-center text-slate-500 font-medium">Initializing POS Terminal...</div>;
  }

  if (!warehouse) {
    return (
      <div className="container mx-auto py-8 text-center">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <PageTitle
        title={`Terminal: ${warehouse.name}`}
        description="Warehouse POS and real-time material logging interface."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="h-10 rounded-xl bg-white/50 backdrop-blur-sm border-white/20 whitespace-nowrap">
              <Download className="mr-2 h-4 w-4" /> Export Ledger
            </Button>
            <Button variant="outline" className="h-10 rounded-xl bg-white/50 backdrop-blur-sm border-white/20 whitespace-nowrap">
              <UploadCloud className="mr-2 h-4 w-4" /> Sync Cloud
            </Button>
            <Button variant="outline" asChild className="h-10 rounded-xl border-white/20 whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white border-none hover:text-white">
              <Link href={`/projects/${projectId}/resources/warehouses/${warehouseId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Exit Terminal
              </Link>
            </Button>
          </div>
        }
      />

      <div className="mt-8">
        <MaterialPosInterface warehouseName={warehouse.name} />
      </div>

      <div className="mt-8 p-6 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center gap-5 relative z-10">
          <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
            <Building className="h-7 w-7 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-xl font-bold">{projectName}</h4>
            <p className="text-sm text-indigo-300">Project Engine • Live Material Tracking Active</p>
          </div>
        </div>
        <Button asChild className="bg-white/10 hover:bg-white/20 text-white border-none rounded-2xl px-8 h-12 relative z-10 shadow-none font-bold">
          <Link href={`/projects/${projectId}`}>
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
