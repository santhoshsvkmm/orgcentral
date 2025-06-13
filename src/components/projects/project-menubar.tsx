
'use client';

import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { 
  FileQuestion, 
  MessageSquare, 
  Target, 
  ClipboardList, 
  CloudSun, 
  Activity,
  DraftingCompass, // For Planning
  GanttChartSquare, // For Gantt
  UsersRound, // For Resource Allocation
  FolderKanban, // For Documents
  FileText, // For Project Brief, etc.
  ListOrdered, // For Specifications
  Package, // For Resources
  Users, // For Team Members
  Construction, // For Equipment
  Laptop, // For Software
  Warehouse, // For Warehouse Management
  Landmark, // For Financial
  PiggyBank, // For Budget
  Receipt, // For Expenses
  FileSpreadsheet, // For Invoices
  Handshake, // For Contracts
  FileCheck2, // For Client Agreement
  FileSignature, // For Vendor Contracts
  FileDigit, // For Quotation
  FileSearch, // For View Quotation
  FilePlus2 // For Generate New Quote
} from "lucide-react";

interface ProjectMenubarProps {
  projectId: string;
}

export function ProjectMenubar({ projectId }: ProjectMenubarProps) {
  return (
    <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
      <MenubarMenu>
        <MenubarTrigger>
          <DraftingCompass className="mr-2 h-4 w-4" /> Planning
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/planning/gantt`}>
              <GanttChartSquare className="mr-2 h-4 w-4" /> Gantt Chart
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/planning/milestones`}>
              <Target className="mr-2 h-4 w-4" /> Milestones
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => console.log('Resource Allocation for project', projectId)}>
            <UsersRound className="mr-2 h-4 w-4" /> Resource Allocation
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <FolderKanban className="mr-2 h-4 w-4" /> Documents
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('Project Brief for project', projectId)}>
            <FileText className="mr-2 h-4 w-4" /> Project Brief
          </MenubarItem>
          <MenubarItem onClick={() => console.log('Specifications for project', projectId)}>
            <ListOrdered className="mr-2 h-4 w-4" /> Specifications
          </MenubarItem>
          <MenubarItem onClick={() => console.log('Meeting Notes for project', projectId)}>
            <ClipboardList className="mr-2 h-4 w-4" /> Meeting Notes
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Package className="mr-2 h-4 w-4" /> Resources
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('Team Members for project', projectId)}>
            <Users className="mr-2 h-4 w-4" /> Team Members
          </MenubarItem>
          <MenubarItem onClick={() => console.log('Equipment List for project', projectId)}>
            <Construction className="mr-2 h-4 w-4" /> Equipment
          </MenubarItem>
          <MenubarItem onClick={() => console.log('Software Licenses for project', projectId)}>
            <Laptop className="mr-2 h-4 w-4" /> Software
          </MenubarItem>
           <MenubarSeparator />
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/resources/warehouses`}>
              <Warehouse className="mr-2 h-4 w-4" /> Warehouse Mgmt
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Landmark className="mr-2 h-4 w-4" /> Financial
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('Budget Overview for project', projectId)}>
            <PiggyBank className="mr-2 h-4 w-4" /> Budget
          </MenubarItem>
          <MenubarItem onClick={() => console.log('Expense Tracking for project', projectId)}>
            <Receipt className="mr-2 h-4 w-4" /> Expenses
          </MenubarItem>
          <MenubarItem onClick={() => console.log('Invoices for project', projectId)}>
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Invoices
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Handshake className="mr-2 h-4 w-4" /> Contracts
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('Client Agreement for project', projectId)}>
            <FileCheck2 className="mr-2 h-4 w-4" /> Client Agreement
          </MenubarItem>
          <MenubarItem onClick={() => console.log('Vendor Contracts for project', projectId)}>
            <FileSignature className="mr-2 h-4 w-4" /> Vendor Contracts
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <FileDigit className="mr-2 h-4 w-4" /> Quotation
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('View Quotation for project', projectId)}>
            <FileSearch className="mr-2 h-4 w-4" /> View Quotation
          </MenubarItem>
          <MenubarItem onClick={() => console.log('Generate New Quote for project', projectId)}>
            <FilePlus2 className="mr-2 h-4 w-4" /> Generate New
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <MessageSquare className="mr-1 h-4 w-4 group-hover:text-accent-foreground" />
          Communication
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/communication/rfi`}>
              <FileQuestion className="mr-2 h-4 w-4" /> RFIs
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
            <ClipboardList className="mr-1 h-4 w-4 group-hover:text-accent-foreground" />
            Reports
        </MenubarTrigger>
        <MenubarContent>
            <MenubarItem asChild>
                <Link href={`/projects/${projectId}/reports/task-reports`}>
                    <ClipboardList className="mr-2 h-4 w-4" /> Task Reports
                </Link>
            </MenubarItem>
            <MenubarItem asChild>
                <Link href={`/projects/${projectId}/reports/weather-reports`}>
                    <CloudSun className="mr-2 h-4 w-4" /> Weather Reports
                </Link>
            </MenubarItem>
            <MenubarItem asChild>
                <Link href={`/projects/${projectId}/reports/daily-monitoring`}>
                    <Activity className="mr-2 h-4 w-4" /> Daily Monitoring
                </Link>
            </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
