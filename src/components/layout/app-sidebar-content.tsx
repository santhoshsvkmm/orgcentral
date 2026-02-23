
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Briefcase, Users, HardHat, Handshake, Folder, Landmark,
  PieChart, UsersRound, TrendingUp, MessagesSquare, History, Mailbox,
  ChevronDown, UserPlus, DollarSign, ClipboardCheck, Calendar,
  FileText, Award, UserCheck, UserX, Building2, Target,
  Search, Brain, BrainCog, FolderKanban, Lock
} from 'lucide-react';
import {
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';

/* ─── Types ──────────────────────────────────────────────── */
interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  badge?: string | number;
  badgeDestructive?: boolean;
}
interface NavGroup { label: string; items: NavItem[] }

/* ─── Nav data ───────────────────────────────────────────── */
const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/projects', label: 'Projects', icon: FolderKanban, badge: 12 },
      { href: '/sales', label: 'Sales & CRM', icon: TrendingUp, badge: 3, badgeDestructive: true },
      { href: '/clients', label: 'Clients', icon: Handshake },
      { href: '/subcontractors', label: 'Subcontractors', icon: HardHat },
      { href: '/consultants', label: 'Consultants', icon: Users },
    ],
  },
  {
    label: 'Finance & Reports',
    items: [
      { href: '/financials', label: 'Financials', icon: Landmark },
      { href: '/reports', label: 'Reports', icon: PieChart },
    ],
  },
  {
    label: 'Collaboration',
    items: [
      { href: '/communication', label: 'Communication', icon: MessagesSquare, badge: 5 },
      { href: '/email-templates', label: 'Email Templates', icon: Mailbox },
      { href: '/drive', label: 'File Storage', icon: Folder },
    ],
  },
  {
    label: 'AI & Intelligence',
    items: [
      { href: '/ai-features', label: 'AI Features', icon: Brain },
      { href: '/ai-in-construction', label: 'AI Construction', icon: BrainCog },
    ],
  },
  {
    label: 'Admin',
    items: [
      { href: '/users', label: 'User Management', icon: Users },
      { href: '/roles', label: 'Roles & Perms', icon: Lock },
      { href: '/audit-logs', label: 'Audit Logs', icon: History },
    ],
  },
];

const hrChildren: NavItem[] = [
  { href: '/hr/employees', label: 'Employees', icon: Users },
  { href: '/hr/recruitment', label: 'Recruitment', icon: UserPlus, badge: 4 },
  { href: '/hr/interviews', label: 'Interviews', icon: Calendar },
  { href: '/hr/onboarding', label: 'Onboarding', icon: ClipboardCheck },
  { href: '/hr/payroll', label: 'Payroll', icon: DollarSign },
  { href: '/hr/performance', label: 'Performance', icon: Target },
  { href: '/hr/training', label: 'Training', icon: Award },
  { href: '/hr/attendance', label: 'Attendance', icon: UserCheck },
  { href: '/hr/policies', label: 'Policies', icon: FileText },
  { href: '/hr/organization', label: 'Org Chart', icon: Building2 },
  { href: '/hr/separation', label: 'Separation', icon: UserX },
];

/* ─── Badge pill ─────────────────────────────────────────── */
function NavBadge({ value, destructive }: { value?: string | number; destructive?: boolean }) {
  if (value === undefined || value === null) return null;
  return (
    <span className={cn(
      'ml-auto flex-shrink-0 group-data-[state=collapsed]:hidden',
      'inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1.5 rounded-full',
      'text-[10px] font-bold leading-none',
      destructive
        ? 'bg-red-500/15 text-red-500 dark:text-red-400 ring-1 ring-red-500/25'
        : 'bg-sidebar-primary/15 text-sidebar-primary ring-1 ring-sidebar-primary/25'
    )}>
      {value}
    </span>
  );
}

/* ─── Section label ──────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="group-data-[state=collapsed]:hidden px-3 pt-5 pb-1.5">
      <p className="text-[9.5px] font-bold uppercase tracking-widest text-sidebar-foreground/35 select-none">
        {label}
      </p>
    </div>
  );
}

/* ─── Single nav button ──────────────────────────────────── */
function NavButton({ href, label, icon: Icon, isActive, badge, badgeDestructive }: NavItem & { isActive: boolean }) {
  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      className={cn(
        'relative h-9 rounded-xl text-[13px] font-medium transition-all duration-150 group/item',
        isActive
          ? [
            'bg-sidebar-primary/10 border border-sidebar-primary/20',
            'text-sidebar-primary shadow-sm',
          ]
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      )}
      tooltip={{ children: label, side: 'right', align: 'center' }}
    >
      <Link href={href} className="flex items-center gap-2.5 px-2.5">
        {/* Active left-side accent bar */}
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-sidebar-primary" />
        )}
        {/* Icon box */}
        <span className={cn(
          'flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-150',
          isActive
            ? 'bg-sidebar-primary/15 text-sidebar-primary'
            : 'text-sidebar-foreground/40 group-hover/item:bg-sidebar-accent group-hover/item:text-sidebar-accent-foreground'
        )}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="group-data-[state=collapsed]:hidden flex-1 truncate">{label}</span>
        <NavBadge value={badge} destructive={badgeDestructive} />
      </Link>
    </SidebarMenuButton>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export function AppSidebarContent() {
  const pathname = usePathname();
  const [isHrOpen, setIsHrOpen] = useState(pathname.startsWith('/hr'));
  const [searchQuery, setSearchQuery] = useState('');

  const isHrActive = pathname.startsWith('/hr');
  const allItems: NavItem[] = [...navGroups.flatMap(g => g.items), ...hrChildren];
  const filtered = searchQuery.trim()
    ? allItems.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="flex flex-col">
      {/* Sidebar search */}
      <div className="px-3 pb-2 group-data-[state=collapsed]:hidden">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sidebar-foreground/30 pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full h-8 pl-8 pr-3 rounded-lg text-xs',
              'bg-sidebar-accent/60 border border-sidebar-border',
              'text-sidebar-foreground placeholder:text-sidebar-foreground/30',
              'focus:outline-none focus:border-sidebar-primary/50 focus:bg-sidebar-accent',
              'transition-all duration-150'
            )}
          />
        </div>
      </div>

      {/* Search results */}
      {filtered ? (
        <SidebarMenu className="px-2 space-y-0.5">
          {filtered.length === 0 && (
            <p className="text-xs text-sidebar-foreground/40 text-center py-8 group-data-[state=collapsed]:hidden">
              No results for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
          {filtered.map(item => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <NavButton {...item} isActive={isActive} />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      ) : (
        /* Grouped nav */
        <>
          {navGroups.map((group) => (
            <div key={group.label}>
              <SectionLabel label={group.label} />
              <SidebarMenu className="px-2 space-y-0.5">
                {group.items.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  return (
                    <SidebarMenuItem key={item.href}>
                      <NavButton {...item} isActive={isActive} />
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </div>
          ))}

          {/* People / HR */}
          <SectionLabel label="People" />
          <SidebarMenu className="px-2 space-y-0.5">
            <SidebarMenuItem>
              <Collapsible open={isHrOpen} onOpenChange={setIsHrOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={cn(
                      'relative h-9 rounded-xl text-[13px] font-medium transition-all duration-150 group/item',
                      isHrActive
                        ? 'bg-sidebar-primary/10 border border-sidebar-primary/20 text-sidebar-primary shadow-sm'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                    tooltip={{ children: 'HR Management', side: 'right', align: 'center' }}
                  >
                    <div className="flex items-center gap-2.5 px-2.5 w-full">
                      {isHrActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-sidebar-primary" />
                      )}
                      <span className={cn(
                        'flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-150',
                        isHrActive
                          ? 'bg-sidebar-primary/15 text-sidebar-primary'
                          : 'text-sidebar-foreground/40 group-hover/item:bg-sidebar-accent group-hover/item:text-sidebar-accent-foreground'
                      )}>
                        <UsersRound className="h-3.5 w-3.5" />
                      </span>
                      <span className="group-data-[state=collapsed]:hidden flex-1">HR Management</span>
                      <ChevronDown className={cn(
                        'h-3.5 w-3.5 text-sidebar-foreground/30 flex-shrink-0',
                        'group-data-[state=collapsed]:hidden transition-transform duration-200',
                        isHrOpen && 'rotate-180'
                      )} />
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-5 mt-1 pb-1 border-l border-sidebar-border pl-3 space-y-0.5">
                    {hrChildren.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href);
                      return (
                        <SidebarMenuSubItem key={item.href}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive}
                            className={cn(
                              'h-8 rounded-lg text-xs transition-all duration-150 group/sub',
                              isActive
                                ? 'bg-sidebar-primary/10 text-sidebar-primary font-medium'
                                : 'text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                            )}
                          >
                            <Link href={item.href} className="flex items-center gap-2 px-2">
                              <item.icon className={cn(
                                'h-3.5 w-3.5 flex-shrink-0 transition-colors',
                                isActive
                                  ? 'text-sidebar-primary'
                                  : 'text-sidebar-foreground/35 group-hover/sub:text-sidebar-accent-foreground'
                              )} />
                              <span className="flex-1">{item.label}</span>
                              {item.badge && <NavBadge value={item.badge} />}
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

          {/* Bottom padding */}
          <div className="h-4" />
        </>
      )}
    </div>
  );
}
