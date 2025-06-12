import type { ReactNode } from 'react';
import { MainHeader } from './main-header';

export function AuthPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
