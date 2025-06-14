
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Users, HardHat, Handshake, Folder, Landmark, PieChart, UsersRound, TrendingUp, MessagesSquare, History, Mailbox } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/projects', label: 'Projects', icon: Briefcase },
  { href: '/users', label: 'User Management', icon: Users },
  { href: '/hr', label: 'HR Management', icon: UsersRound },
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

export function AppSidebarContent() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={item.exact ? pathname === item.href : pathname.startsWith(item.href)}
            className={cn(
              ((item.exact ? pathname === item.href : pathname.startsWith(item.href))) && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
            tooltip={{children: item.label, side: "right", align: "center"}}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
