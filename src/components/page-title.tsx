
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTitleProps {
  title: string;
  actions?: ReactNode;
  description?: string;
}

const titleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: "easeOut" } },
};

const actionsVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2, ease: "easeOut" } },
};


export function PageTitle({ title, actions, description }: PageTitleProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <motion.h1 
          className="text-2xl font-semibold text-foreground md:text-3xl font-headline"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>
        {actions && (
          <motion.div 
            className="mt-4 sm:mt-0"
            variants={actionsVariants}
            initial="hidden"
            animate="visible"
          >
            {actions}
          </motion.div>
        )}
      </div>
      {description && (
        <motion.p 
          className="mt-2 text-sm text-muted-foreground"
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
