
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import type { ReactNode } from 'react';
// Import dynamic configuration
import './config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SubcontractorsLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedPageLayout>{children}</AuthenticatedPageLayout>;
}
