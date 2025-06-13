
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
import { FileQuestion, MessageSquare, Target } from "lucide-react"; // Added Target

interface ProjectMenubarProps {
  projectId: string;
}

export function ProjectMenubar({ projectId }: ProjectMenubarProps) {
  return (
    <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
      <MenubarMenu>
        <MenubarTrigger>Planning</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/planning/gantt`}>Gantt Chart</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={`/projects/${projectId}/planning/milestones`}>
              <Target className="mr-2 h-4 w-4" /> Milestones
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => console.log('Resource Allocation for project', projectId)}>Resource Allocation</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Documents</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('Project Brief for project', projectId)}>Project Brief</MenubarItem>
          <MenubarItem onClick={() => console.log('Specifications for project', projectId)}>Specifications</MenubarItem>
          <MenubarItem onClick={() => console.log('Meeting Notes for project', projectId)}>Meeting Notes</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Resources</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('Team Members for project', projectId)}>Team Members</MenubarItem>
          <MenubarItem onClick={() => console.log('Equipment List for project', projectId)}>Equipment</MenubarItem>
          <MenubarItem onClick={() => console.log('Software Licenses for project', projectId)}>Software</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Financial</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('Budget Overview for project', projectId)}>Budget</MenubarItem>
          <MenubarItem onClick={() => console.log('Expense Tracking for project', projectId)}>Expenses</MenubarItem>
          <MenubarItem onClick={() => console.log('Invoices for project', projectId)}>Invoices</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Contracts</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('Client Agreement for project', projectId)}>Client Agreement</MenubarItem>
          <MenubarItem onClick={() => console.log('Vendor Contracts for project', projectId)}>Vendor Contracts</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Quotation</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log('View Quotation for project', projectId)}>View Quotation</MenubarItem>
          <MenubarItem onClick={() => console.log('Generate New Quote for project', projectId)}>Generate New</MenubarItem>
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
          {/* Other communication items can go here */}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
