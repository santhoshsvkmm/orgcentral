
'use client';

import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { 
  FileQuestion, 
  MessageSquare, 
  Target, 
  ClipboardList, 
  CloudSun, 
  Activity,
  DraftingCompass, 
  GanttChartSquare, 
  UsersRound, 
  FolderKanban, 
  FileText, 
  ListOrdered, 
  Package, 
  Users, 
  Construction, 
  Laptop, 
  Warehouse, 
  Landmark, 
  PiggyBank, 
  Receipt, 
  FileSpreadsheet, 
  Handshake, 
  FileCheck2, 
  FileSignature, 
  FileDigit, 
  FolderKanbanIcon, 
  LayoutDashboard,
  FileSearch, 
  FilePlus2,
  SquareKanban,
  LayoutGrid,
  Box, // Icon for 3D Model Viewer
  Image // Icon for 2D Drawings
} from "lucide-react";

interface ProjectMenubarProps {
  projectId: string;
}

export function ProjectMenubar({ projectId }: ProjectMenubarProps) {
  return (
    <Menubar className="mb-6 rounded-md border bg-card shadow-sm flex-wrap justify-start">
      <MenubarMenu>
        <MenubarTrigger asChild className="cursor-pointer">
          <Link href={`/projects/${projectId}`}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <DraftingCompass className="mr-2 h-4 w-4" /> Planning
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/planning/gantt`}>
              <GanttChartSquare className="mr-2 h-4 w-4" /> Gantt Chart (Overall)
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/planning/milestones`}>
              <Target className="mr-2 h-4 w-4" /> Milestones
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <LayoutGrid className="mr-2 h-4 w-4" /> Micro Planning
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem asChild>
                <Link href={`/projects/${projectId}/planning/micro-planning/kanban`}>
                  <SquareKanban className="mr-2 h-4 w-4" /> Kanban Board
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href={`/projects/${projectId}/planning/micro-planning/gantt`}>
                  <GanttChartSquare className="mr-2 h-4 w-4" /> Gantt Chart (Sprint)
                </Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
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
          <MenubarSub>
            <MenubarSubTrigger>
              <Image className="mr-2 h-4 w-4" /> 2D Drawings
            </MenubarSubTrigger>
            <MenubarSubContent>
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
                <Link href={`/projects/${projectId}/documents/drawings?type=shop-drawings`}>Shop Drawings</Link>
              </MenubarItem>
               <MenubarItem asChild>
                <Link href={`/projects/${projectId}/documents/drawings?type=detail-drawings`}>Detail Drawings</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href={`/projects/${projectId}/documents/drawings?type=isometric-axonometric`}>Isometric/Axonometric</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href={`/projects/${projectId}/documents/drawings?type=presentation-drawings`}>Presentation Drawings</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem asChild>
                <Link href={`/projects/${projectId}/documents/drawings?type=as-built`}>As-Built Drawings</Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
           <MenubarItem asChild>
            <Link href={`/projects/${projectId}/documents/drawings/3d-model-viewer`}>
               <Box className="mr-2 h-4 w-4" /> 3D Model Viewer/Editor
            </Link>
          </MenubarItem>
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
          <MessageSquare className="mr-1 h-4 w-4" />
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
            <ClipboardList className="mr-1 h-4 w-4" />
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
