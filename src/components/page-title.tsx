
'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  actions?: ReactNode;
  description?: string;
  badge?: string;
}

export function PageTitle({ title, actions, description, badge }: PageTitleProps) {
  return (
    <div className="mb-6 pb-5 border-b border-border/60">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          {badge && (
            <motion.span
              className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {badge}
            </motion.span>
          )}
          <motion.h1
            className={cn(
              "text-2xl font-bold tracking-tight text-foreground font-headline",
              "md:text-3xl"
            )}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
            >
              {description}
            </motion.p>
          )}
        </div>
        {actions && (
          <motion.div
            className="flex items-center gap-2 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.12, ease: 'easeOut' }}
          >
            {actions}
          </motion.div>
        )}
      </div>
    </div>
  );
}
