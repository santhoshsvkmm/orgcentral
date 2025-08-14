
'use client';

import type { ReactNode } from 'react';
import { Provider } from 'jotai';

type JotaiProviderProps = {
  readonly children: ReactNode;
};

export function JotaiProvider({ children }: JotaiProviderProps) {
  return <Provider>{children}</Provider>;
}
