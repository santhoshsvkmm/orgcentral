
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { Users as UsersIcon, ShieldCheck } from 'lucide-react'; // Using ShieldCheck for Roles
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const userManagementNavItems = [
  { href: '/users', label: 'Manage Users', icon: UsersIcon },
  { href: '/users/roles', label: 'Manage Roles', icon: ShieldCheck },
];

export default function UserManagementLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="User & Role Management"
        description="Administer users, assign roles, and manage application permissions."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {userManagementNavItems.map((item) => (
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
