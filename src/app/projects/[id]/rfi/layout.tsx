
import type { ReactNode } from 'react';

export default function RfiLayout({ children }: { children: ReactNode }) {
  // This layout no longer uses AuthenticatedPageLayout to remove the main app sidebar
  // and top navigation for a more focused RFI experience within a project.
  // We add a <main> tag with padding to replicate the content area styling.
  return (
    <main className="flex-1 p-4 sm:p-6 bg-background text-foreground min-h-screen">
      {children}
    </main>
  );
}

