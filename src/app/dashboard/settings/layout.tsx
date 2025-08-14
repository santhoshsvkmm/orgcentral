
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';
// import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { Bell, Palette, Briefcase as SettingsBriefcaseIcon, Image as ImageIcon } from 'lucide-react'; // Renamed Briefcase to avoid conflict
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const settingsNavItems = [
  { href: '/dashboard/settings', label: 'Notifications', icon: Bell },
  { href: '/dashboard/settings/appearance', label: 'Appearance', icon: Palette },
  { href: '/dashboard/settings/scheduling', label: 'Scheduling', icon: SettingsBriefcaseIcon }, // Use renamed icon
  { href: '/dashboard/settings/branding', label: 'Branding', icon: ImageIcon },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTitle
        title="Application Settings"
        description="Customize your application experience and preferences."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {settingsNavItems.map((item) => (
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
      <div>
        {children}
      </div>
    </>
  );
}
