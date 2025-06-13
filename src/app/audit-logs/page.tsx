
'use client';

import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";
import { History, Search, RotateCcw, AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/date-utils";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  actionType: string;
  details: string;
  ipAddress?: string;
  targetResource?: string;
}

const mockAuditLogEntries: AuditLogEntry[] = [
  { id: 'log-1', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), userName: 'Alice Wonderland', actionType: 'User Login', details: 'User logged in successfully.', ipAddress: '192.168.1.10' },
  { id: 'log-2', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), userName: 'Bob The Builder', actionType: 'Project Update', details: "Project 'Alpha Launch' status changed to 'In Progress'.", targetResource: 'Project:1' },
  { id: 'log-3', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), userName: 'Alice Wonderland', actionType: 'User Create', details: "New user 'Charlie Brown' created.", targetResource: 'User:3' },
  { id: 'log-4', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), userName: 'System', actionType: 'System Alert', details: 'Database backup completed successfully.', ipAddress: 'N/A' },
  { id: 'log-5', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), userName: 'Diana Prince', actionType: 'Task Delete', details: "Task 'Old Design Docs' deleted from project 'Beta Platform'.", targetResource: 'Task:t-old' },
  { id: 'log-6', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), userName: 'Bob The Builder', actionType: 'Role Change', details: "User 'Eve Adams' role changed from 'Member' to 'Editor'.", targetResource: 'User:5' },
];

const actionTypes = ["All", "User Login", "User Logout", "User Create", "User Update", "User Delete", "Project Create", "Project Update", "Project Delete", "Task Create", "Task Update", "Task Delete", "Role Change", "System Alert"];

export default function AuditLogsPage() {
  const [filterUser, setFilterUser] = useState('');
  const [filterActionType, setFilterActionType] = useState('All');
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');

  const filteredLogs = useMemo(() => {
    return mockAuditLogEntries.filter(log => {
      const logDate = new Date(log.timestamp);
      const startDate = filterDateStart ? new Date(filterDateStart) : null;
      const endDate = filterDateEnd ? new Date(filterDateEnd) : null;

      if (startDate && logDate < startDate) return false;
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999); // Include whole end day
        if (logDate > endOfDay) return false;
      }
      if (filterUser && !log.userName.toLowerCase().includes(filterUser.toLowerCase())) return false;
      if (filterActionType !== 'All' && log.actionType !== filterActionType) return false;
      return true;
    });
  }, [filterUser, filterActionType, filterDateStart, filterDateEnd]);

  const clearFilters = () => {
    setFilterUser('');
    setFilterActionType('All');
    setFilterDateStart('');
    setFilterDateEnd('');
  };

  const columns: ColumnDef<AuditLogEntry>[] = [
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      enableSorting: true,
      cell: ({ row }) => formatDate(row.timestamp, 'yyyy-MM-dd HH:mm:ss'),
    },
    {
      accessorKey: "userName",
      header: "User",
      enableSorting: true,
    },
    {
      accessorKey: "actionType",
      header: "Action Type",
      enableSorting: true,
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ row }) => <span className="whitespace-pre-line">{row.details}</span>
    },
    {
      accessorKey: "targetResource",
      header: "Target Resource",
      cell: ({ row }) => row.targetResource || 'N/A',
    },
    {
      accessorKey: "ipAddress",
      header: "IP Address",
      cell: ({ row }) => row.ipAddress || 'N/A',
    },
  ];

  return (
    <>
      <PageTitle
        title="Audit Logs"
        description="Track significant events and changes across the application."
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5 text-primary" />
            Filter Audit Logs
          </CardTitle>
          <CardDescription>Refine the list of audit entries using the filters below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="filterUser">User Name</Label>
              <Input id="filterUser" placeholder="Search by user name..." value={filterUser} onChange={e => setFilterUser(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterActionType">Action Type</Label>
              <Select value={filterActionType} onValueChange={setFilterActionType}>
                <SelectTrigger id="filterActionType">
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterDateStart">Date From</Label>
              <Input id="filterDateStart" type="date" value={filterDateStart} onChange={e => setFilterDateStart(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterDateEnd">Date To</Label>
              <Input id="filterDateEnd" type="date" value={filterDateEnd} onChange={e => setFilterDateEnd(e.target.value)} />
            </div>
          </div>
           <div className="flex justify-start gap-2">
            {/* Apply Filters button could be added if filtering was more expensive */}
            {/* <Button><Search className="mr-2 h-4 w-4"/> Apply Filters</Button> */}
            <Button onClick={clearFilters} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5 text-primary" />
            System Audit Trail
          </CardTitle>
          <CardDescription>Chronological record of activities performed in the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredLogs}
            itemsPerPage={10}
            searchableColumns={['userName', 'actionType', 'details', 'targetResource', 'ipAddress']}
            globalFilterPlaceholder="Search within current results..."
            noResultsMessage="No audit log entries match your criteria."
          />
           <div className="mt-6 p-3 bg-yellow-50 border border-yellow-300 rounded-md text-sm text-yellow-700">
                <AlertTriangle className="h-4 w-4 inline mr-1 mb-0.5" />
                <strong>Note:</strong> This audit log is a frontend prototype using mock data. A real audit log system requires robust backend logging capabilities to securely record and query all relevant system events.
            </div>
        </CardContent>
      </Card>
    </>
  );
}
