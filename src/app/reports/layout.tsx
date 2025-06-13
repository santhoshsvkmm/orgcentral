
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { Settings2, Gauge, Users as UsersIcon, DollarSign, PieChart } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const reportsNavItems = [
  { href: '/reports', label: 'Overview', icon: PieChart, exact: true },
  { href: '/reports/custom-builder', label: 'Custom Builder', icon: Settings2 },
  { href: '/reports/kpis', label: 'KPIs', icon: Gauge },
  { href: '/reports/resource-utilization', label: 'Resource Utilization', icon: UsersIcon },
  { href: '/reports/project-profitability', label: 'Project Profitability', icon: DollarSign },
];

export default function ReportsLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Reports & Analytics"
        description="Generate and view various reports for insights into your organization's performance."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {reportsNavItems.map((item) => (
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
