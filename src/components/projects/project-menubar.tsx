
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
  FolderKanbanIcon, // For Drawings (using a different icon for distinction)
  LayoutDashboard, // Added comma here
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
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}`}>
 <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
 </Link>
 </MenubarItem>
 </MenubarMenu>
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
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/planning/resource-allocation`}>
              <UsersRound className="mr-2 h-4 w-4" /> Resource Allocation
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <FolderKanban className="mr-2 h-4 w-4" /> Documents
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/documents/project-brief`}>
              <FileText className="mr-2 h-4 w-4" /> Project Brief
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/documents/specifications`}>
              <ListOrdered className="mr-2 h-4 w-4" /> Specifications
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/documents/meeting-notes`}>
              <ClipboardList className="mr-2 h-4 w-4" /> Meeting Notes
            </Link>
          </MenubarItem>
          <MenubarSeparator />
 <MenubarMenu>
 <MenubarTrigger className="flex items-center">
 <FolderKanbanIcon className="mr-2 h-4 w-4" /> Drawings
 </MenubarTrigger>
 <MenubarContent>
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}/documents/drawings?type=architectural`}>Architectural</Link>
 </MenubarItem>
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}/documents/drawings?type=structural`}>Structural</Link>
 </MenubarItem>
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}/documents/drawings?type=mechanical`}>Mechanical</Link>
 </MenubarItem>
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}/documents/drawings?type=electrical`}>Electrical</Link>
 </MenubarItem>
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}/documents/drawings?type=plumbing`}>Plumbing</Link>
 </MenubarItem>
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}/documents/drawings?type=shop-drawing`}>Shop Drawing</Link>
 </MenubarItem>
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}/documents/drawings?type=as-built`}>As-Built</Link>
 </MenubarItem>
 <MenubarItem asChild>
 <Link href={`/projects/${projectId}/documents/drawings?type=presentation-drawings`}>Presentation Drawings</Link>
 </MenubarItem>
 </MenubarContent>
 </MenubarMenu>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center">
          <Package className="mr-2 h-4 w-4" /> Resources
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/resources/team-members`}>
              <Users className="mr-2 h-4 w-4" /> Team Members
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/resources/equipment`}>
              <Construction className="mr-2 h-4 w-4" /> Equipment
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/resources/software`}>
              <Laptop className="mr-2 h-4 w-4" /> Software
            </Link>
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
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/financial/budget`}>
              <PiggyBank className="mr-2 h-4 w-4" /> Budget
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/financial/expenses`}>
              <Receipt className="mr-2 h-4 w-4" /> Expenses
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/financial/invoices`}>
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Invoices
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Handshake className="mr-2 h-4 w-4" /> Contracts
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/contracts/client-agreement`}>
              <FileCheck2 className="mr-2 h-4 w-4" /> Client Agreement
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/contracts/vendor-contracts`}>
              <FileSignature className="mr-2 h-4 w-4" /> Vendor Contracts
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <FileDigit className="mr-2 h-4 w-4" /> Quotation
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/quotation/view`}>
              <FileSearch className="mr-2 h-4 w-4" /> View Quotation
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/quotation/generate`}>
              <FilePlus2 className="mr-2 h-4 w-4" /> Generate New
            </Link>
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
