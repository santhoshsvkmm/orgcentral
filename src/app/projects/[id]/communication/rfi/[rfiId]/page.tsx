
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { RfiDetail } from '@/components/rfi/rfi-detail';
import type { RFI } from '@/types/rfi';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data - replace with actual data fetching for a specific RFI
const mockRfisData: RFI[] = [
   {
    id: 'rfi-1',
    projectId: '1',
    rfiNumber: 'RFI-001',
    title: 'Clarification on Structural Beam Specifications',
    description: 'Need detailed specs for the main support beams in Sector A, including load capacity and material grade. We are looking for materials that can withstand up to 500kN of shear force and have a fire rating of at least 2 hours. Please provide manufacturer datasheets if possible. Deadline for this information is next Friday to keep the structural work on schedule.',
    status: 'Open',
    priority: 'High',
    raisedByUserId: 'user-alice',
    raisedByUserName: 'Alice Wonderland',
    assignedToUserId: 'user-bob',
    assignedToUserName: 'Bob The Builder',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    messages: [
      { id: 'msg-1', rfiId: 'rfi-1', senderId: 'user-alice', senderName: 'Alice Wonderland', text: 'Hi Bob, could you please provide the beam specs?', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 60000).toISOString(), senderAvatarUrl: 'https://placehold.co/40x40.png?text=AW' },
      { id: 'msg-2', rfiId: 'rfi-1', senderId: 'user-bob', senderName: 'Bob The Builder', text: 'Sure Alice, I am gathering the documents. Will update by EOD.', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), senderAvatarUrl: 'https://placehold.co/40x40.png?text=BB' },
    ],
    attachments: [
      { id: 'att-1', fileName: 'Initial_Query_Doc.pdf', fileUrl: '#', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), uploadedBy: 'Alice Wonderland', fileSize: '1.2MB', fileType: 'PDF' },
      { id: 'att-2', fileName: 'Site_Plan_SectorA.dwg', fileUrl: '#', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), uploadedBy: 'Alice Wonderland', fileSize: '5.8MB', fileType: 'DWG' }
    ],
    tags: ['Structural', 'Sector A', 'Urgent'],
  },
   {
    id: 'rfi-2',
    projectId: '1',
    rfiNumber: 'RFI-002',
    title: 'Electrical Conduit Routing Plan Approval',
    description: 'Submitting the proposed electrical conduit routing for the main hall. Please review and approve or provide feedback. The plan includes routing for power, data, and security systems. We need to finalize this before wall paneling begins next month.',
    status: 'In Progress',
    priority: 'Medium',
    raisedByUserId: 'user-charlie',
    raisedByUserName: 'Charlie Brown',
    assignedToUserId: 'user-diana',
    assignedToUserName: 'Diana Prince',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
        { id: 'msg-3', rfiId: 'rfi-2', senderId: 'user-charlie', senderName: 'Charlie Brown', text: 'Hi Diana, attached is the conduit plan for your review.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 120000).toISOString(), senderAvatarUrl: 'https://placehold.co/40x40.png?text=CB' },
    ],
    attachments: [
        { id: 'att-3', fileName: 'Conduit_Plan_MainHall_Rev1.pdf', fileUrl: '#', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 120000).toISOString(), uploadedBy: 'Charlie Brown', fileSize: '2.5MB', fileType: 'PDF' }
    ],
    tags: ['Electrical', 'Approval', 'Main Hall'],
  },
   {
    id: 'rfi-3', // For project 2
    projectId: '2',
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

async function getRfiById(rfiId: string, projectId: string): Promise<RFI | null> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRfisData.find(rfi => rfi.id === rfiId && rfi.projectId === projectId) || null;
}


export default function RfiDetailPage({ params: paramsPromise }: { params: Promise<{ id: string; rfiId: string }> }) {
  const resolvedParams = use(paramsPromise);
  const { id: projectId, rfiId } = resolvedParams; 
  const [rfi, setRfi] = useState<RFI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRfi = async () => {
      setLoading(true);
      const fetchedRfi = await getRfiById(rfiId, projectId);
      setRfi(fetchedRfi);
      setLoading(false);
    };
    if (projectId && rfiId) {
        fetchRfi();
    }
  }, [rfiId, projectId]);

  const handleUpdateRfi = (updatedRfi: RFI) => {
    setRfi(prev => prev ? { ...prev, ...updatedRfi, messages: updatedRfi.messages, attachments: updatedRfi.attachments, updatedAt: new Date().toISOString() } : null);
    // In a real app, you'd also persist this change to the backend
    const rfiIndex = mockRfisData.findIndex(r => r.id === updatedRfi.id);
    if (rfiIndex !== -1) {
        mockRfisData[rfiIndex] = { ...mockRfisData[rfiIndex], ...updatedRfi }; // Update mock global store
    }
  };

  if (loading) {
    return (
      <>
      <PageTitle
        title="Loading RFI Details..."
        description="Please wait while we fetch the information."
        actions={
          <Button variant="outline" asChild disabled={!projectId}>
            <Link href={projectId ? `/projects/${projectId}/communication/rfi` : '#'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to RFIs
            </Link>
          </Button>
        }
      />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
        <div className="md:col-span-2">
            <Skeleton className="h-96 w-full" />
        </div>
      </div>
      </>
    );
  }

  if (!rfi) {
    return (
      <PageTitle
        title="RFI Not Found"
        description={`Could not find RFI with ID: ${rfiId} for this project.`}
        actions={
          <Button variant="outline" asChild disabled={!projectId}>
            <Link href={projectId ? `/projects/${projectId}/communication/rfi` : '#'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to RFIs
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      <PageTitle
        title={`${rfi.rfiNumber}: ${rfi.title}`}
        description={`Details for RFI raised by ${rfi.raisedByUserName}.`}
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}/communication/rfi`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to RFIs
            </Link>
          </Button>
        }
      />
      <RfiDetail rfi={rfi} onRfiUpdate={handleUpdateRfi} />
    </>
  );
}
