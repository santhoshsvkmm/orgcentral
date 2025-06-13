
'use client';

import { Button } from "@/components/ui/button";
import { FileQuestion, Search, RotateCcw } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import { useState, useEffect, use, useMemo } from "react";
import type { RFI, RfiStatus } from '@/types/rfi';
import { RfiList } from '@/components/rfi/rfi-list';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { parseISO, isWithinInterval, isBefore, isAfter, isValid, startOfDay, endOfDay } from 'date-fns';


// Mock fetch function - replace with actual data fetching
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

const initialMockRfisData: RFI[] = [
   {
    id: 'rfi-1', projectId: '1', rfiNumber: 'RFI-001', title: 'Clarification on Structural Beam Specifications', description: 'Need detailed specs...', status: 'Open', priority: 'High',
    raisedByUserId: 'user-alice', raisedByUserName: 'Alice Wonderland', assignedToUserId: 'user-bob', assignedToUserName: 'Bob The Builder',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), messages: [], attachments: [], tags: ['Structural', 'Sector A'],
  },
   {
    id: 'rfi-2', projectId: '1', rfiNumber: 'RFI-002', title: 'Electrical Conduit Routing Plan Approval', description: 'Submitting the proposed...', status: 'In Progress', priority: 'Medium',
    raisedByUserId: 'user-charlie', raisedByUserName: 'Charlie Brown', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), messages: [], attachments: [], tags: ['Electrical', 'Approval'],
  },
  {
    id: 'rfi-3', projectId: '2', rfiNumber: 'RFI-001', title: 'API Endpoint Specification Query', description: 'Requesting clarification...', status: 'Open', priority: 'Medium',
    raisedByUserId: 'user-eve', raisedByUserName: 'Eve Adams', assignedToUserId: 'user-frank', assignedToUserName: 'Frank Castle',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), messages: [], attachments: [], tags: ['API', 'Backend'],
  },
  {
    id: 'rfi-4', projectId: '1', rfiNumber: 'RFI-003', title: 'Material Safety Data Sheet for Sealant X', description: 'Please provide MSDS...', status: 'Closed', priority: 'Low',
    raisedByUserId: 'user-bob', raisedByUserName: 'Bob The Builder', assignedToUserId: 'user-alice', assignedToUserName: 'Alice Wonderland',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), messages: [], attachments: [], tags: ['Safety', 'Materials'],
  },
];

const rfiStatuses: RfiStatus[] = ["Open", "In Progress", "Needs Clarification", "Closed"];
const rfiPriorities: RFI['priority'][] = ["Low", "Medium", "High"];

const ALL_STATUSES_VALUE = "__ALL_STATUSES__";
const ALL_PRIORITIES_VALUE = "__ALL_PRIORITIES__";

export default function ProjectRfiListPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;

  const [projectName, setProjectName] = useState<string>('');
  const [allRfis, setAllRfis] = useState<RFI[]>([]); 
  const [loadingProjectName, setLoadingProjectName] = useState(true);
  const { toast } = useToast();

  const [filterRfiId, setFilterRfiId] = useState('');
  const [filterStatus, setFilterStatus] = useState<RfiStatus | ''>('');
  const [filterPriority, setFilterPriority] = useState<RFI['priority'] | ''>('');
  const [filterRaisedBy, setFilterRaisedBy] = useState('');
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');
  const [hasActiveFilters, setHasActiveFilters] = useState(false);


  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoadingProjectName(true);
      const name = await getProjectNameById(projectId);
      setProjectName(name);
      const projectRfis = initialMockRfisData.filter(rfi => rfi.projectId === projectId);
      setAllRfis(projectRfis);
      setLoadingProjectName(false);
    };
    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    const active = !!filterRfiId || !!filterStatus || !!filterPriority || !!filterRaisedBy || !!filterDateStart || !!filterDateEnd;
    setHasActiveFilters(active);
    // Persist filter state for DataTable's noResultsMessage
    if (typeof window !== 'undefined') {
      localStorage.setItem('rfiFiltersActive', active.toString());
    }
  }, [filterRfiId, filterStatus, filterPriority, filterRaisedBy, filterDateStart, filterDateEnd]);

  const filteredRfis = useMemo(() => {
    let RfiResults = allRfis;

    if (filterRfiId) {
      RfiResults = RfiResults.filter(rfi => rfi.rfiNumber.toLowerCase().includes(filterRfiId.toLowerCase()) || rfi.title.toLowerCase().includes(filterRfiId.toLowerCase()));
    }
    if (filterStatus) { 
      RfiResults = RfiResults.filter(rfi => rfi.status === filterStatus);
    }
    if (filterPriority) { 
      RfiResults = RfiResults.filter(rfi => rfi.priority === filterPriority);
    }
    if (filterRaisedBy) {
      RfiResults = RfiResults.filter(rfi => rfi.raisedByUserName.toLowerCase().includes(filterRaisedBy.toLowerCase()));
    }
    
    const startDate = filterDateStart ? startOfDay(parseISO(filterDateStart)) : null;
    const endDate = filterDateEnd ? endOfDay(parseISO(filterDateEnd)) : null;

    if (startDate && endDate && isValid(startDate) && isValid(endDate)) {
      RfiResults = RfiResults.filter(rfi => {
        const createdAt = parseISO(rfi.createdAt);
        return isValid(createdAt) && isWithinInterval(createdAt, { start: startDate, end: endDate });
      });
    } else if (startDate && isValid(startDate)) {
      RfiResults = RfiResults.filter(rfi => {
        const createdAt = parseISO(rfi.createdAt);
        return isValid(createdAt) && (isAfter(createdAt, startDate) || isWithinInterval(createdAt, { start: startDate, end: startDate}) ); 
      });
    } else if (endDate && isValid(endDate)) {
      RfiResults = RfiResults.filter(rfi => {
        const createdAt = parseISO(rfi.createdAt);
        return isValid(createdAt) && (isBefore(createdAt, endDate) || isWithinInterval(createdAt, { start: endDate, end: endDate})); 
      });
    }

    return RfiResults;
  }, [allRfis, filterRfiId, filterStatus, filterPriority, filterRaisedBy, filterDateStart, filterDateEnd]);

  const clearFilters = () => {
    setFilterRfiId('');
    setFilterStatus('');
    setFilterPriority('');
    setFilterRaisedBy('');
    setFilterDateStart('');
    setFilterDateEnd('');
    if (typeof window !== 'undefined') {
      localStorage.setItem('rfiFiltersActive', 'false');
    }
    toast({ title: "Filters Cleared", description: "Showing all RFIs for this project." });
  };


  const handleAddRfi = (newRfi: RFI) => {
    const rfiWithGeneratedNumber = {
      ...newRfi,
      rfiNumber: `RFI-${String(allRfis.length + 1).padStart(3, '0')}`,
      projectId: projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAllRfis(prevRfis => [rfiWithGeneratedNumber, ...prevRfis]);
    initialMockRfisData.unshift(rfiWithGeneratedNumber); // Update global mock store
  };

  const handleUpdateRfi = (updatedRfi: RFI) => {
    setAllRfis(prevRfis =>
      prevRfis.map(rfi => (rfi.id === updatedRfi.id ? { ...rfi, ...updatedRfi, updatedAt: new Date().toISOString() } : rfi))
    );
    const index = initialMockRfisData.findIndex(rfi => rfi.id === updatedRfi.id);
    if (index !== -1) initialMockRfisData[index] = { ...initialMockRfisData[index], ...updatedRfi, updatedAt: new Date().toISOString()};
  };

  const handleDeleteRfi = (rfiId: string) => {
    setAllRfis(prevRfis => prevRfis.filter(rfi => rfi.id !== rfiId));
    const index = initialMockRfisData.findIndex(rfi => rfi.id === rfiId);
    if (index !== -1) initialMockRfisData.splice(index,1);
     toast({
      title: "RFI Deleted",
      description: `RFI has been deleted.`,
    });
  };

  if (loadingProjectName) {
    return (
      <>
        <PageTitle title="Loading RFIs..." description="Fetching Requests for Information for the project." />
        <Skeleton className="h-48 w-full mb-6" /> 
        <Skeleton className="h-64 w-full" /> 
      </>
    );
  }

  return (
    <>
      <PageTitle
        title={`RFIs for ${projectName}`}
        description="Manage Requests for Information, track discussions, and view attachments."
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project
            </Link>
          </Button>
        }
      />

      <Card className="mb-6 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center"><Search className="mr-2 h-5 w-5 text-primary"/>Filter RFIs</CardTitle>
          <CardDescription>Refine the list of RFIs using the filters below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="filterRfiId">RFI No. / Title</Label>
              <Input id="filterRfiId" placeholder="Search No. or Title..." value={filterRfiId} onChange={e => setFilterRfiId(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterStatus">Status</Label>
              <Select 
                value={filterStatus === '' ? ALL_STATUSES_VALUE : filterStatus} 
                onValueChange={(value) => {
                  setFilterStatus(value === ALL_STATUSES_VALUE ? '' : value as RfiStatus);
                }}
              >
                <SelectTrigger id="filterStatus"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_STATUSES_VALUE}>All Statuses</SelectItem>
                  {rfiStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterPriority">Priority</Label>
              <Select 
                value={filterPriority === '' ? ALL_PRIORITIES_VALUE : filterPriority} 
                onValueChange={(value) => {
                  setFilterPriority(value === ALL_PRIORITIES_VALUE ? '' : value as RFI['priority']);
                }}
              >
                <SelectTrigger id="filterPriority"><SelectValue placeholder="All Priorities" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_PRIORITIES_VALUE}>All Priorities</SelectItem>
                  {rfiPriorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterRaisedBy">Raised By</Label>
              <Input id="filterRaisedBy" placeholder="Search User Name..." value={filterRaisedBy} onChange={e => setFilterRaisedBy(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterDateStart">Created After</Label>
              <Input id="filterDateStart" type="date" value={filterDateStart} onChange={e => setFilterDateStart(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterDateEnd">Created Before</Label>
              <Input id="filterDateEnd" type="date" value={filterDateEnd} onChange={e => setFilterDateEnd(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={clearFilters} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </CardFooter>
      </Card>

      <RfiList
        rfis={filteredRfis}
        projectId={projectId}
        onUpdateRfi={handleUpdateRfi}
        onDeleteRfi={handleDeleteRfi}
        onCreateRfi={handleAddRfi} 
      />
    </>
  );
}

