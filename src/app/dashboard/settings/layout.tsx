
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
import { cn } from '@/lib/utils';
import { Bell, Palette, Briefcase, Image as ImageIcon } from 'lucide-react'; // Added ImageIcon

const settingsNavItems = [
  { href: '/dashboard/settings', label: 'Notifications', icon: Bell },
  { href: '/dashboard/settings/appearance', label: 'Appearance', icon: Palette },
  { href: '/dashboard/settings/scheduling', label: 'Scheduling', icon: Briefcase },
  { href: '/dashboard/settings/branding', label: 'Branding', icon: ImageIcon },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <PageTitle
        title="Application Settings"
        description="Customize your application experience and preferences."
      />
      <div className="mb-6">
        <nav className="flex border-b">
          {settingsNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-muted/50 focus:outline-none',
                pathname === item.href
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
      <div className="space-y-8 max-w-3xl mx-auto">
        {children}
      </div>
    </>
  );
}
