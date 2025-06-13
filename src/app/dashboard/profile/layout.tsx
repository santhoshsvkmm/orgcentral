
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@/components/page-title';
import { cn } from '@/lib/utils';
import { UserCircle, GraduationCap, Briefcase, FileText } from 'lucide-react';

const profileNavItems = [
  { href: '/dashboard/profile', label: 'Personal Information', icon: UserCircle },
  { href: '/dashboard/profile/education', label: 'Education', icon: GraduationCap },
  { href: '/dashboard/profile/experience', label: 'Work Experience', icon: Briefcase },
  { href: '/dashboard/profile/documents', label: 'Official Documents', icon: FileText },
];

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <PageTitle
        title="Profile Management"
        description="View and manage your comprehensive user profile."
      />
      <div className="mb-6">
        <nav className="flex border-b">
          {profileNavItems.map((item) => (
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
      <div>{children}</div>
    </>
  );
}
