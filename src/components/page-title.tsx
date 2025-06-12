import type { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  actions?: ReactNode;
  description?: string;
}

export function PageTitle({ title, actions, description }: PageTitleProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl font-headline">{title}</h1>
        {actions && <div className="mt-4 sm:mt-0">{actions}</div>}
      </div>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
