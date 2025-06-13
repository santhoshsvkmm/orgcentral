
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { cn } from '@/lib/utils';
import { BarChartBig, Settings2, Gauge, Users as UsersIcon, DollarSign, PieChart } from 'lucide-react'; // Added LineChart

const reportsNavItems = [
  { href: '/reports', label: 'Overview', icon: PieChart, exact: true },
  { href: '/reports/custom-builder', label: 'Custom Builder', icon: Settings2 },
  { href: '/reports/kpis', label: 'KPIs', icon: Gauge },
  { href: '/reports/resource-utilization', label: 'Resource Utilization', icon: UsersIcon },
  { href: '/reports/project-profitability', label: 'Project Profitability', icon: DollarSign },
];

export default function ReportsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Reports & Analytics"
        description="Generate and view various reports for insights into your organization's performance."
      />
      <div className="mb-6">
        <nav className="flex border-b">
          {reportsNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-muted/50 focus:outline-none',
                (item.exact ? pathname === item.href : pathname.startsWith(item.href))
                  ? 'border-b-2 border-primary text-primary'
                  : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div>{children}</div>
    </AuthenticatedPageLayout>
  );
}
