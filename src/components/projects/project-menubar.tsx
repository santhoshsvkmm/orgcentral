'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LayoutDashboard,
  FileSearch,
  FilePlus2,
  SquareKanban,
  LayoutGrid,
  Box,
  Image as ImageIcon,
  ChevronDown,
  GitCommit
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectMenubarProps {
  projectId: string;
}

export function ProjectMenubar({ projectId }: ProjectMenubarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path.endsWith(projectId)) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const getTriggerClass = (active: boolean) => cn(
    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer",
    active
      ? "bg-primary/10 text-primary border border-primary/20"
      : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
  );

  return (
    <Menubar className="mb-8 h-auto p-1.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm flex-wrap gap-1">
      {/* Dashboard */}
      <MenubarMenu>
        <MenubarTrigger asChild className={getTriggerClass(isActive(`/projects/${projectId}`))}>
          <Link href={`/projects/${projectId}`}>
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      {/* Planning */}
      <MenubarMenu>
        <MenubarTrigger className={getTriggerClass(isActive(`/projects/${projectId}/planning`))}>
          <DraftingCompass className="h-4 w-4" />
          <span>Planning</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[200px] p-1.5 rounded-xl">
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname.includes('/planning/gantt') && !pathname.includes('/micro-planning') && "bg-muted")}>
            <Link href={`/projects/${projectId}/planning/gantt`} className="flex items-center gap-2 w-full p-2">
              <GanttChartSquare className="h-4 w-4 text-indigo-500" />
              <span>Gantt Chart (Overall)</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname.includes('/planning/milestones') && "bg-muted")}>
            <Link href={`/projects/${projectId}/planning/milestones`} className="flex items-center gap-2 w-full p-2">
              <Target className="h-4 w-4 text-rose-500" />
              <span>Milestones</span>
            </Link>
          </MenubarItem>
          <MenubarSeparator className="my-1" />
          <MenubarSub>
            <MenubarSubTrigger className={cn("rounded-lg mb-1 p-2", pathname.includes('/micro-planning') && "bg-muted")}>
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-amber-500" />
                <span>Micro Scheduling</span>
              </div>
            </MenubarSubTrigger>
            <MenubarSubContent className="min-w-[180px] p-1.5 rounded-xl">
              <MenubarItem asChild className={cn("rounded-lg mb-1", pathname.endsWith('/micro-planning') && "bg-muted")}>
                <Link href={`/projects/${projectId}/planning/micro-planning`} className="flex items-center gap-2 w-full p-2">
                  <LayoutGrid className="h-4 w-4" />
                  <span>Sprint Planning</span>
                </Link>
              </MenubarItem>
              <MenubarItem asChild className={cn("rounded-lg mb-1", pathname.includes('/micro-planning/kanban') && "bg-muted")}>
                <Link href={`/projects/${projectId}/planning/micro-planning/kanban`} className="flex items-center gap-2 w-full p-2">
                  <SquareKanban className="h-4 w-4" />
                  <span>Kanban Board</span>
                </Link>
              </MenubarItem>
              <MenubarItem asChild className={cn("rounded-lg", pathname.includes('/micro-planning/gantt') && "bg-muted")}>
                <Link href={`/projects/${projectId}/planning/micro-planning/gantt`} className="flex items-center gap-2 w-full p-2">
                  <GanttChartSquare className="h-4 w-4" />
                  <span>Sprint Gantt</span>
                </Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator className="my-1" />
          <MenubarItem asChild className={cn("rounded-lg", pathname.includes('/planning/resource-allocation') && "bg-muted")}>
            <Link href={`/projects/${projectId}/planning/resource-allocation`} className="flex items-center gap-2 w-full p-2">
              <UsersRound className="h-4 w-4 text-emerald-500" />
              <span>Resource Allocation</span>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Documents */}
      <MenubarMenu>
        <MenubarTrigger className={getTriggerClass(isActive(`/projects/${projectId}/documents`))}>
          <FolderKanban className="h-4 w-4" />
          <span>Documents</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[200px] p-1.5 rounded-xl">
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname?.includes('/documents/project-brief') && "bg-muted")}>
            <Link href={`/projects/${projectId}/documents/project-brief`} className="flex items-center gap-2 w-full p-2">
              <FileText className="h-4 w-4 text-indigo-500" /> <span>Project Brief</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname?.includes('/documents/specifications') && "bg-muted")}>
            <Link href={`/projects/${projectId}/documents/specifications`} className="flex items-center gap-2 w-full p-2">
              <ListOrdered className="h-4 w-4 text-cyan-500" /> <span>Specifications</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname?.includes('/documents/variations') && "bg-muted")}>
            <Link href={`/projects/${projectId}/documents/variations`} className="flex items-center gap-2 w-full p-2">
              <GitCommit className="h-4 w-4 text-emerald-500" /> <span>Variations</span>
            </Link>
          </MenubarItem>
          <MenubarSeparator className="my-1" />
          <MenubarSub>
                <MenubarSubTrigger className="rounded-lg mb-1 p-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> <span>2D Drawings</span>
              </div>
            </MenubarSubTrigger>
            <MenubarSubContent className="min-w-[180px] p-1.5 rounded-xl max-h-[400px] overflow-y-auto">
              {[
                { label: 'Architectural', type: 'architectural' },
                { label: 'Structural', type: 'structural' },
                { label: 'Mechanical', type: 'mechanical' },
                { label: 'Electrical', type: 'electrical' },
                { label: 'Plumbing', type: 'plumbing' },
                { label: 'Shop Drawings', type: 'shop-drawings' },
                { label: 'Detail Drawings', type: 'detail-drawings' }
              ].map(item => (
                <MenubarItem key={item.type} asChild className="rounded-lg mb-1">
                  <Link href={`/projects/${projectId}/documents/drawings?type=${item.type}`} className="p-2 w-full block">{item.label}</Link>
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem asChild className="rounded-lg">
            <Link href={`/projects/${projectId}/documents/drawings/3d-model-viewer`} className="flex items-center gap-2 w-full p-2">
              <Box className="h-4 w-4 text-blue-500" /> <span>3D Viewer</span>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Resources */}
      <MenubarMenu>
        <MenubarTrigger className={getTriggerClass(isActive(`/projects/${projectId}/resources`))}>
          <Package className="h-4 w-4" />
          <span>Resources</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[180px] p-1.5 rounded-xl">
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname?.includes('/resources/team-members') && "bg-muted")}>
            <Link href={`/projects/${projectId}/resources/team-members`} className="flex items-center gap-2 w-full p-2">
              <Users className="h-4 w-4 text-indigo-500" /> <span>Team Members</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname?.includes('/resources/labour') && "bg-muted")}>
            <Link href={`/projects/${projectId}/resources/labour`} className="flex items-center gap-2 w-full p-2">
              <Construction className="h-4 w-4 text-amber-500" /> <span>Labours</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname?.includes('/resources/equipment') && "bg-muted")}>
            <Link href={`/projects/${projectId}/resources/equipment`} className="flex items-center gap-2 w-full p-2">
              <Construction className="h-4 w-4 text-amber-500" /> <span>Equipment</span>
            </Link>
          </MenubarItem>
          <MenubarSeparator className="my-1" />
          <MenubarItem asChild className={cn("rounded-lg", pathname.includes('/resources/warehouses') && "bg-muted")}>
            <Link href={`/projects/${projectId}/resources/warehouses`} className="flex items-center gap-2 w-full p-2">
              <Warehouse className="h-4 w-4 text-emerald-500" /> <span>Warehouse</span>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Contracts */}
      <MenubarMenu>
        <MenubarTrigger className={getTriggerClass(isActive(`/projects/${projectId}/contracts`))}>
          <FileSignature className="h-4 w-4" />
          <span>Contracts</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[180px] p-1.5 rounded-xl">
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname?.includes('/contracts/client-agreement') && "bg-muted")}>
            <Link href={`/projects/${projectId}/contracts/client-agreement`} className="flex items-center gap-2 w-full p-2">
              <FileCheck2 className="h-4 w-4 text-indigo-500" /> <span>Client Agreement</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className={cn("rounded-lg mb-1", pathname?.includes('/contracts/vendor-contracts') && "bg-muted")}>
            <Link href={`/projects/${projectId}/contracts/vendor-contracts`} className="flex items-center gap-2 w-full p-2">
              <FileSignature className="h-4 w-4 text-cyan-500" /> <span>Vendor Contracts</span>
            </Link>
          </MenubarItem>
          <MenubarSeparator className="my-1" />
          <MenubarItem asChild className={cn("rounded-lg", pathname?.includes('/contracts/tenders') && "bg-muted")}>
            <Link href={`/projects/${projectId}/contracts/tenders`} className="flex items-center gap-2 w-full p-2">
              <FileSearch className="h-4 w-4 text-emerald-500" /> <span>Tenders</span>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Financial */}
      <MenubarMenu>
        <MenubarTrigger className={getTriggerClass(isActive(`/projects/${projectId}/financial`))}>
          <Landmark className="h-4 w-4" />
          <span>Financial</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[180px] p-1.5 rounded-xl">
          <MenubarItem asChild className="rounded-lg mb-1">
            <Link href={`/projects/${projectId}/financial/budget`} className="flex items-center gap-2 w-full p-2">
              <PiggyBank className="h-4 w-4 text-emerald-500" /> <span>Budget</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className="rounded-lg mb-1">
            <Link href={`/projects/${projectId}/financial/expenses`} className="flex items-center gap-2 w-full p-2">
              <Receipt className="h-4 w-4 text-rose-500" /> <span>Expenses</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className="rounded-lg">
            <Link href={`/projects/${projectId}/financial/invoices`} className="flex items-center gap-2 w-full p-2">
              <FileSpreadsheet className="h-4 w-4 text-blue-500" /> <span>Invoices</span>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Communication */}
      <MenubarMenu>
        <MenubarTrigger className={getTriggerClass(isActive(`/projects/${projectId}/communication`))}>
          <MessageSquare className="h-4 w-4" />
          <span>Comm.</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[150px] p-1.5 rounded-xl">
          <MenubarItem asChild className="rounded-lg">
            <Link href={`/projects/${projectId}/communication/rfi`} className="flex items-center gap-2 w-full p-2">
              <FileQuestion className="h-4 w-4" /> <span>RFIs</span>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Reports */}
      <MenubarMenu>
        <MenubarTrigger className={getTriggerClass(isActive(`/projects/${projectId}/reports`))}>
          <ClipboardList className="h-4 w-4" />
          <span>Reports</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[180px] p-1.5 rounded-xl">
          <MenubarItem asChild className="rounded-lg mb-1">
            <Link href={`/projects/${projectId}/reports/task-reports`} className="flex items-center gap-2 w-full p-2">
              <ClipboardList className="h-4 w-4" /> <span>Task Reports</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className="rounded-lg mb-1">
            <Link href={`/projects/${projectId}/reports/weather-reports`} className="flex items-center gap-2 w-full p-2">
              <CloudSun className="h-4 w-4" /> <span>Weather</span>
            </Link>
          </MenubarItem>
          <MenubarItem asChild className="rounded-lg">
            <Link href={`/projects/${projectId}/reports/daily-monitoring`} className="flex items-center gap-2 w-full p-2">
              <Activity className="h-4 w-4" /> <span>Monitoring</span>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
