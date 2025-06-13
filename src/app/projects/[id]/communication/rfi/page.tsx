
'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle, FileQuestion } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import { useState, useEffect, use } from "react";
import type { RFI } from '@/types/rfi';
import { RfiForm } from '@/components/rfi/rfi-form';
import { RfiList } from '@/components/rfi/rfi-list';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


// Mock fetch function - replace with actual data fetching
async function getProjectNameById(id: string): Promise<string> {
  // In a real app, fetch project details. For now, simulate.
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  // Add more or a default
  return `Project (ID: ${id})`;
}


// Mock RFI data - in a real app, this would be fetched based on projectId
const initialMockRfisData: RFI[] = [
   {
    id: 'rfi-1',
    projectId: '1',
    rfiNumber: 'RFI-001',
    title: 'Clarification on Structural Beam Specifications',
    description: 'Need detailed specs for the main support beams in Sector A...',
    status: 'Open',
    priority: 'High',
    raisedByUserId: 'user-alice',
    raisedByUserName: 'Alice Wonderland',
    assignedToUserId: 'user-bob',
    assignedToUserName: 'Bob The Builder',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [],
    attachments: [],
    tags: ['Structural', 'Sector A'],
  },
   {
    id: 'rfi-2',
    projectId: '1',
    rfiNumber: 'RFI-002',
    title: 'Electrical Conduit Routing Plan Approval',
    description: 'Submitting the proposed electrical conduit routing...',
    status: 'In Progress',
    priority: 'Medium',
    raisedByUserId: 'user-charlie',
    raisedByUserName: 'Charlie Brown',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [],
    attachments: [],
    tags: ['Electrical', 'Approval'],
  },
    {
    id: 'rfi-3',
    projectId: '2', // RFI for a different project
    rfiNumber: 'RFI-001',
    title: 'API Endpoint Specification Query',
    description: 'Requesting clarification on the rate limits for the new user API endpoint.',
    status: 'Open',
    priority: 'Medium',
    raisedByUserId: 'user-eve',
    raisedByUserName: 'Eve Adams',
    assignedToUserId: 'user-frank',
    assignedToUserName: 'Frank Castle',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [],
    attachments: [],
    tags: ['API', 'Backend'],
  },
];


export default function ProjectRfiListPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;

  const [projectName, setProjectName] = useState<string>('');
  const [rfis, setRfis] = useState<RFI[]>([]);
  const [loadingProjectName, setLoadingProjectName] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoadingProjectName(true);
      const name = await getProjectNameById(projectId);
      setProjectName(name);
      // Filter mock RFIs for the current project
      // In a real app, this fetch would be API driven based on projectId
      setRfis(initialMockRfisData.filter(rfi => rfi.projectId === projectId));
      setLoadingProjectName(false);
    };
    fetchProjectDetails();
  }, [projectId]);


  const handleAddRfi = (newRfi: RFI) => {
    const rfiWithGeneratedNumber = {
      ...newRfi,
      rfiNumber: `RFI-${String(rfis.length + 1).padStart(3, '0')}`,
      projectId: projectId, // Ensure projectId is set
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRfis(prevRfis => [rfiWithGeneratedNumber, ...prevRfis]);
  };

  const handleUpdateRfi = (updatedRfi: RFI) => {
    setRfis(prevRfis =>
      prevRfis.map(rfi => (rfi.id === updatedRfi.id ? { ...rfi, ...updatedRfi, updatedAt: new Date().toISOString() } : rfi))
    );
  };

  const handleDeleteRfi = (rfiId: string) => {
    setRfis(prevRfis => prevRfis.filter(rfi => rfi.id !== rfiId));
     toast({
      title: "RFI Deleted",
      description: `RFI has been deleted.`,
    });
  };

  if (loadingProjectName) {
    return (
      <>
        <PageTitle title="Loading RFIs..." description="Fetching Requests for Information for the project." />
        <Skeleton className="h-10 w-1/4 mb-4" /> {/* Create RFI Button Skeleton */}
        <Skeleton className="h-64 w-full" /> {/* RFI List Skeleton */}
      </>
    );
  }

  return (
    <>
      <PageTitle
        title={`RFIs for ${projectName}`}
        description="Manage Requests for Information, track discussions, and view attachments."
        actions={
          <div className="flex gap-2 items-center">
             <Button variant="outline" asChild>
                <Link href={`/projects/${projectId}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Project
                </Link>
            </Button>
            <RfiForm
                mode="create"
                projectId={projectId}
                onSave={handleAddRfi}
                triggerButton={
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New RFI
                </Button>
                }
            />
          </div>
        }
      />
      <RfiList
        rfis={rfis}
        projectId={projectId}
        onUpdateRfi={handleUpdateRfi}
        onDeleteRfi={handleDeleteRfi}
      />
    </>
  );
}
