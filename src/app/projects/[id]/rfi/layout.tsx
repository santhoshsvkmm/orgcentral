
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import type { ReactNode } from 'react';

export default function RfiLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedPageLayout>{children}</AuthenticatedPageLayout>;
}

