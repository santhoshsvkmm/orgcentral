import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedPageLayout>{children}</AuthenticatedPageLayout>;
}
