
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { cn } from '@/lib/utils';
import { Megaphone, BookOpen, CalendarDays, MessageCircle } from 'lucide-react';

const communicationNavItems = [
  { href: '/communication', label: 'Announcements', icon: Megaphone, exact: true },
  { href: '/communication/wiki', label: 'Wiki/Knowledge Base', icon: BookOpen },
  { href: '/communication/calendar', label: 'Org Calendar', icon: CalendarDays },
  { href: '/communication/chat', label: 'Chat', icon: MessageCircle },
];

export default function CommunicationLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Communication & Collaboration"
        description="Manage internal announcements, knowledge sharing, scheduling, and team chat."
      />
      <div className="mb-6">
        <nav className="flex border-b">
          {communicationNavItems.map((item) => (
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
