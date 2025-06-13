
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { cn } from '@/lib/utils';
import { Users as UsersIcon, CalendarOff, Star, UserSearch } from 'lucide-react';

const hrNavItems = [
  { href: '/hr', label: 'Employee Directory', icon: UsersIcon, exact: true },
  { href: '/hr/leave', label: 'Leave Management', icon: CalendarOff },
  { href: '/hr/reviews', label: 'Performance Reviews', icon: Star },
  { href: '/hr/recruitment', label: 'Recruitment/ATS', icon: UserSearch },
];

export default function HRLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="HR Management"
        description="Manage employee information, leave, performance, and recruitment processes."
      />
      <div className="mb-6">
        <nav className="flex border-b">
          {hrNavItems.map((item) => (
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
