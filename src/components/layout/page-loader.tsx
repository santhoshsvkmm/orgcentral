'use client';

import { useAtom } from 'jotai';
import { loadingAtom } from '@/lib/store/loading';

export function PageLoader() {
  const [isLoading] = useAtom(loadingAtom);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
}