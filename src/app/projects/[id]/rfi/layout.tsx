
import { AuthenticatedPageLayout } from '@/components/layout/authenticated-page-layout';
import type { ReactNode } from 'react';

export default function RfiLayout({ children }: { children: ReactNode }) {
  // This layout can be expanded later if RFI pages need a specific sub-layout
  return <AuthenticatedPageLayout>{children}</AuthenticatedPageLayout>;
}
