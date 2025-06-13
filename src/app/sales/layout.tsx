
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { LineChart, UserPlus, Building, Target, LayoutGrid } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const salesNavItems = [
  { href: '/sales', label: 'Overview', icon: LineChart, exact: true },
  { href: '/sales/leads', label: 'Leads', icon: UserPlus },
  { href: '/sales/accounts', label: 'Accounts', icon: Building },
  { href: '/sales/opportunities', label: 'Opportunities', icon: Target },
  { href: '/sales/pipeline', label: 'Sales Pipeline', icon: LayoutGrid },
];

export default function SalesLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Sales & CRM"
        description="Manage leads, customer accounts, sales opportunities, and your sales pipeline."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {salesNavItems.map((item) => (
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
