
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { RfiList } from '@/components/rfi/rfi-list';
import type { RFI } from '@/types/rfi';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { RfiForm } from '@/components/rfi/rfi-form'; // We'll create this

// Mock data - replace with actual data fetching
const mockRfis: RFI[] = [
  {
    id: 'rfi-1',
    projectId: '1',
    rfiNumber: 'RFI-001',
    title: 'Clarification on Structural Beam Specifications',
    description: 'Need detailed specs for the main support beams in Sector A, including load capacity and material grade.',
    status: 'Open',
    priority: 'High',
    raisedByUserId: 'user-alice',
    raisedByUserName: 'Alice Wonderland',
    assignedToUserId: 'user-bob',
    assignedToUserName: 'Bob The Builder',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    messages: [],
    attachments: [{ id: 'att-1', fileName: 'Initial_Query.pdf', fileUrl: '#', uploadedAt: new Date().toISOString(), uploadedBy: 'Alice Wonderland', fileSize: '1.2MB', fileType: 'PDF' }],
    tags: ['Structural', 'Sector A'],
  },
  {
    id: 'rfi-2',
    projectId: '1',
    rfiNumber: 'RFI-002',
    title: 'Electrical Conduit Routing Plan Approval',
    description: 'Submitting the proposed electrical conduit routing for the main hall. Please review and approve or provide feedback.',
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
];


export default function ProjectRfiPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const [rfis, setRfis] = useState<RFI[]>([]);
  const [projectInfo, setProjectInfo] = useState<{ name: string } | null>(null); // To display project name

  useEffect(() => {
    // In a real app, fetch project details and its RFIs
    setProjectInfo({ name: `Project Alpha (ID: ${projectId})` }); // Mock project name
    setRfis(mockRfis.filter(rfi => rfi.projectId === projectId));
  }, [projectId]);

  const handleAddRfi = (newRfi: RFI) => {
    setRfis(prevRfis => [
      {
        ...newRfi,
        rfiNumber: `RFI-${String(prevRfis.length + 1).padStart(3, '0')}`,
        projectId: projectId, // Ensure projectId is set
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...prevRfis,
    ]);
  };

  const handleUpdateRfi = (updatedRfi: RFI) => {
    setRfis(prevRfis =>
      prevRfis.map(rfi => (rfi.id === updatedRfi.id ? { ...rfi, ...updatedRfi, updatedAt: new Date().toISOString() } : rfi))
    );
  };

  const handleDeleteRfi = (rfiId: string) => {
    setRfis(prevRfis => prevRfis.filter(rfi => rfi.id !== rfiId));
  };


  return (
    <>
      <PageTitle
        title={`RFIs for ${projectInfo?.name || 'Project'}`}
        description="Manage Requests for Information for this project."
        actions={
          <RfiForm
            mode="create"
            projectId={projectId}
            onSave={handleAddRfi}
            triggerButton={
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Create RFI
              </Button>
            }
          />
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
