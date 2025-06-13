
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { UserCircle, GraduationCap, Briefcase, FileText } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const profileNavItems = [
  { href: '/dashboard/profile', label: 'Personal Information', icon: UserCircle },
  { href: '/dashboard/profile/education', label: 'Education', icon: GraduationCap },
  { href: '/dashboard/profile/experience', label: 'Work Experience', icon: Briefcase },
  { href: '/dashboard/profile/documents', label: 'Official Documents', icon: FileText },
];

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <AuthenticatedPageLayout>
      <PageTitle
        title="Profile Management"
        description="View and manage your comprehensive user profile."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {profileNavItems.map((item) => (
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
