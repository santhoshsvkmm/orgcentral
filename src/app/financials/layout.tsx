
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { Landmark, PieChart, PiggyBank, Receipt, FileText as FileTextIcon, WalletCards, ScrollText } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const financialNavItems = [
  { href: '/financials', label: 'Overview', icon: PieChart, exact: true },
  { href: '/financials/budgets', label: 'Budgets', icon: PiggyBank },
  { href: '/financials/expenses', label: 'Expenses', icon: Receipt },
  { href: '/financials/invoicing', label: 'Invoicing', icon: FileTextIcon },
  { href: '/financials/payroll', label: 'Payroll', icon: WalletCards },
  { href: '/financials/statements', label: 'Statements', icon: ScrollText },
];

export default function FinancialsLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Financial Management"
        description="Manage your organization's financial data, budgets, expenses, and reports."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {financialNavItems.map((item) => (
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
