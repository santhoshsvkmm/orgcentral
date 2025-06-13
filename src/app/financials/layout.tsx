
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { cn } from '@/lib/utils';
import { Landmark, PieChart, PiggyBank, ReceiptLong, FileText as FileTextIcon, WalletCards, ScrollText } from 'lucide-react';

const financialNavItems = [
  { href: '/financials', label: 'Overview', icon: PieChart, exact: true },
  { href: '/financials/budgets', label: 'Budgets', icon: PiggyBank },
  { href: '/financials/expenses', label: 'Expenses', icon: ReceiptLong },
  { href: '/financials/invoicing', label: 'Invoicing', icon: FileTextIcon },
  { href: '/financials/payroll', label: 'Payroll', icon: WalletCards },
  { href: '/financials/statements', label: 'Statements', icon: ScrollText },
];

export default function FinancialsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Financial Management"
        description="Manage your organization's financial data, budgets, expenses, and reports."
      />
      <div className="mb-6">
        <nav className="flex border-b">
          {financialNavItems.map((item) => (
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
