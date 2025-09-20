
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Users, HardHat, Handshake, Folder, Landmark, PieChart, UsersRound, TrendingUp, MessagesSquare, History, Mailbox, ChevronDown, ChevronRight, UserPlus, DollarSign, ClipboardCheck, Calendar, FileText, Award, UserCheck, UserX, Building2, Target } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/projects', label: 'Projects', icon: Briefcase },
  { href: '/users', label: 'User Management', icon: Users },
  { href: '/sales', label: 'Sales & CRM', icon: TrendingUp },
  { href: '/subcontractors', label: 'Subcontractors', icon: HardHat },
  { href: '/consultants', label: 'Consultants', icon: Users }, 
  { href: '/clients', label: 'Clients', icon: Handshake },
  { href: '/drive', label: 'File Storage', icon: Folder },
  { href: '/financials', label: 'Financials', icon: Landmark },
  { href: '/reports', label: 'Reports', icon: PieChart },
  { href: '/communication', label: 'Communication', icon: MessagesSquare },
  { href: '/email-templates', label: 'Email Templates', icon: Mailbox },
  { href: '/audit-logs', label: 'Audit Logs', icon: History },
];

const hrMenuItems = [
  { href: '/hr/recruitment', label: 'Recruitment', icon: UserPlus },
  { href: '/hr/interviews', label: 'Interviews', icon: Calendar },
  { href: '/hr/onboarding', label: 'Onboarding', icon: ClipboardCheck },
  { href: '/hr/employees', label: 'Employee Records', icon: Users },
  { href: '/hr/payroll', label: 'Payroll & Salary', icon: DollarSign },
  { href: '/hr/performance', label: 'Performance Reviews', icon: Target },
  { href: '/hr/training', label: 'Training & Development', icon: Award },
  { href: '/hr/attendance', label: 'Attendance & Leave', icon: UserCheck },
  { href: '/hr/policies', label: 'HR Policies', icon: FileText },
  { href: '/hr/organization', label: 'Organization Structure', icon: Building2 },
  { href: '/hr/separation', label: 'Employee Separation', icon: UserX },
];

export function AppSidebarContent() {
  const pathname = usePathname();
  const [isHrOpen, setIsHrOpen] = useState(pathname.startsWith('/hr'));

  const isHrActive = pathname.startsWith('/hr');

  return (
    <SidebarMenu className="space-y-1">
      {navItems.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                "h-11 rounded-lg transition-all duration-200 hover:bg-slate-200/60 hover:shadow-sm",
                isActive && "bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm font-medium"
              )}
              tooltip={{children: item.label, side: "right", align: "center"}}
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", isActive && "text-blue-600")} />
                <span className="group-data-[state=collapsed]:hidden">{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
      
      {/* HR Management Collapsible Menu */}
      <SidebarMenuItem>
        <Collapsible open={isHrOpen} onOpenChange={setIsHrOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "h-11 rounded-lg transition-all duration-200 hover:bg-slate-200/60 hover:shadow-sm",
                isHrActive && "bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm font-medium"
              )}
              tooltip={{children: "HR Management", side: "right", align: "center"}}
            >
              <UsersRound className={cn("h-5 w-5", isHrActive && "text-blue-600")} />
              <span className="group-data-[state=collapsed]:hidden">HR Management</span>
              {isHrOpen ? (
                <ChevronDown className="ml-auto h-4 w-4 group-data-[state=collapsed]:hidden" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4 group-data-[state=collapsed]:hidden" />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="ml-4 border-l border-slate-200">
              {hrMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuSubItem key={item.href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "h-9 rounded-md transition-all duration-200 hover:bg-slate-100",
                        isActive && "bg-blue-50 text-blue-700 font-medium"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={cn("h-4 w-4", isActive && "text-blue-600")} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
