
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
// import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import { Bell, Palette, Briefcase as SettingsBriefcaseIcon, Image as ImageIcon, ListChecks, DollarSign, Users, ShieldCheck } from 'lucide-react'; // added icons
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const settingsNavItems = [
  { href: '/dashboard/settings', label: 'Notifications', icon: Bell },
  { href: '/dashboard/settings/appearance', label: 'Appearance', icon: Palette },
  { href: '/dashboard/settings/scheduling', label: 'Scheduling', icon: SettingsBriefcaseIcon },
  { href: '/dashboard/settings/data-types', label: 'Data Types', icon: ListChecks },
  { href: '/dashboard/settings/billing', label: 'Billing', icon: DollarSign },
  { href: '/dashboard/settings/permissions', label: 'Permissions', icon: Users },
  { href: '/dashboard/settings/branding', label: 'Branding', icon: ImageIcon },
  { href: '/dashboard/settings/integrations', label: 'Integrations', icon: ListChecks },
  { href: '/dashboard/settings/security', label: 'Security', icon: ShieldCheck },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <PageTitle
        title="Application Settings"
        description="Customize your application experience and preferences."
      />
      <Menubar className="mb-6 rounded-md border bg-card shadow-sm">
        {settingsNavItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <MenubarMenu key={item.href}>
              <MenubarTrigger asChild className="cursor-pointer">
                <Link href={item.href} className={`flex items-center px-3 py-2 text-sm gap-2 ${isActive ? 'bg-muted rounded-md font-medium' : 'text-muted-foreground'}`}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          );
        })}
      </Menubar>
      <div>
        {children}
      </div>
    </>
  );
}
