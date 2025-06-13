
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { Megaphone, BookOpen, CalendarDays, MessageCircle } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const communicationNavItems = [
  { href: '/communication', label: 'Announcements', icon: Megaphone, exact: true },
  { href: '/communication/wiki', label: 'Wiki/Knowledge Base', icon: BookOpen },
  { href: '/communication/calendar', label: 'Org Calendar', icon: CalendarDays },
  { href: '/communication/chat', label: 'Chat', icon: MessageCircle },
];

export default function CommunicationLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Communication & Collaboration"
        description="Manage internal announcements, knowledge sharing, scheduling, and team chat."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {communicationNavItems.map((item) => (
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
