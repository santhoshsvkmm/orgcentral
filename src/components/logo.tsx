import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { readonly className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5 font-headline', className)}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow-sm flex-shrink-0">
        <Building2 className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-lg font-bold tracking-tight text-sidebar-primary-foreground group-data-[state=collapsed]:hidden">
        Org<span className="text-indigo-400">Central</span>
      </span>
    </Link>
  );
}
