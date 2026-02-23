
'use client';

import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/page-title";
import { useState, useEffect, use } from "react";
import type { Warehouse } from '@/types/warehouse';
import { WarehouseList } from '@/components/resources/warehouse-list';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock fetch function - replace with actual data fetching
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

// Mock data for warehouses - in a real app, this would be fetched based on projectId
const initialMockWarehouses: Warehouse[] = [
  { id: 'wh-1', projectId: '1', name: 'Main Site Storage A', location: 'Sector A, Bay 1', capacity: 500, currentStock: 120, notes: 'Stores primary construction materials.', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'wh-2', projectId: '1', name: 'Equipment Shed 1', location: 'Near Gate 3', capacity: 100, currentStock: 42, notes: 'Heavy machinery and tools.', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'wh-3', projectId: '2', name: 'Central Parts Hub', location: 'Building C, Floor 1', capacity: 2000, currentStock: 1500, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
];


export default function ProjectWarehousesPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;

  const [projectName, setProjectName] = useState<string>('');
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]); 
  const [loadingProjectDetails, setLoadingProjectDetails] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoadingProjectDetails(true);
      try {
        const name = await getProjectNameById(projectId);
        setProjectName(name);
        // Simulate fetching warehouses for this project
        const projectWarehouses = initialMockWarehouses.filter(wh => wh.projectId === projectId);
        setWarehouses(projectWarehouses);
      } catch (error) {
        toast({ title: "Error", description: "Failed to load project data.", variant: "destructive" });
      }
      setLoadingProjectDetails(false);
    };
    if (projectId) {
        fetchProjectData();
    }
  }, [projectId, toast]);

  const handleCreateWarehouse = (newWarehouse: Warehouse) => {
    setWarehouses(prev => [newWarehouse, ...prev]);
    // In a real app, also add to the global mock store or API
    initialMockWarehouses.unshift(newWarehouse); 
  };

  const handleUpdateWarehouse = (updatedWarehouse: Warehouse) => {
    setWarehouses(prev => prev.map(wh => (wh.id === updatedWarehouse.id ? updatedWarehouse : wh)));
    const index = initialMockWarehouses.findIndex(wh => wh.id === updatedWarehouse.id);
    if (index !== -1) initialMockWarehouses[index] = updatedWarehouse;
  };

  const handleDeleteWarehouse = (warehouseId: string, warehouseName: string) => {
    setWarehouses(prev => prev.filter(wh => wh.id !== warehouseId));
    const index = initialMockWarehouses.findIndex(wh => wh.id === warehouseId);
    if (index !== -1) initialMockWarehouses.splice(index, 1);
    toast({
      title: "Warehouse Deleted",
      description: `Warehouse "${warehouseName}" has been deleted.`,
    });
  };

  if (loadingProjectDetails) {
    return (
      <>
        <PageTitle title="Loading Warehouse Data..." description="Fetching warehouse information for the project." />
        <Skeleton className="h-10 w-1/4 mb-4" /> {/* Back button skeleton */}
        <Skeleton className="h-64 w-full" /> {/* Warehouse list skeleton */}
      </>
    );
  }

  return (
    <>
      <PageTitle
        title={`Warehouse Management: ${projectName}`}
        description="Oversee and manage all warehouses associated with this project."
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project
            </Link>
          </Button>
        }
      />
      <WarehouseList
        warehouses={warehouses}
        projectId={projectId}
        onCreateWarehouse={handleCreateWarehouse}
        onUpdateWarehouse={handleUpdateWarehouse}
        onDeleteWarehouse={handleDeleteWarehouse}
      />
    </>
  );
}
