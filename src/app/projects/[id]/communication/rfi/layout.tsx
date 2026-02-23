
import type { ReactNode } from 'react';

// This layout is for pages under /projects/[id]/communication/rfi/*
// It assumes that AuthenticatedPageLayout is already applied by a higher-level layout (e.g., src/app/projects/layout.tsx)
export default function ProjectCommunicationRfiSectionLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
  const projectId = params.id;

  return (
    <>
            <div className="mt-0"> {/* ProjectMenubar already has mb-6, adjust if needed or remove mt-6 from here if ProjectMenubar controls spacing */}
        {children}
      </div>
    </>
  );
}
