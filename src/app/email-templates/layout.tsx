
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { UserCog, BellRing, Settings2, LayoutGrid } from 'lucide-react'; // Added LayoutGrid for Overview
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const emailTemplateNavItems = [
  { href: '/email-templates', label: 'Overview', icon: LayoutGrid, exact: true },
  { href: '/email-templates/user-lifecycle', label: 'User Lifecycle', icon: UserCog },
  { href: '/email-templates/project-notifications', label: 'Project Notifications', icon: BellRing },
  { href: '/email-templates/system-general', label: 'System & General', icon: Settings2 },
  // Future: { href: '/email-templates/languages', label: 'Manage Languages', icon: Languages },
];

export default function EmailTemplatesLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Email Template Management"
        description="Create, customize, and manage email templates for various application events and communications."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {emailTemplateNavItems.map((item) => (
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
