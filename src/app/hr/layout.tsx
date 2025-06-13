
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { Users as UsersIcon, CalendarOff, Star, UserSearch } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const hrNavItems = [
  { href: '/hr', label: 'Employee Directory', icon: UsersIcon, exact: true },
  { href: '/hr/leave', label: 'Leave Management', icon: CalendarOff },
  { href: '/hr/reviews', label: 'Performance Reviews', icon: Star },
  { href: '/hr/recruitment', label: 'Recruitment/ATS', icon: UserSearch },
];

export default function HRLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="HR Management"
        description="Manage employee information, leave, performance, and recruitment processes."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {hrNavItems.map((item) => (
          <MenubarMenu key={item.href}>
            <MenubarTrigger asChild className="cursor-pointer">
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
      <div>{children}</div>
    </AuthenticatedPageLayout>
  );
}
