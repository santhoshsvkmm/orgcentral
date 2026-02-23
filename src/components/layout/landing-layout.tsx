'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Building2, Twitter, Facebook, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

interface LandingLayoutProps {
  children: React.ReactNode;
}

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Detailed Features', href: '/features-detailed' },
      { label: 'AI in Construction', href: '/ai-in-construction' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Request Demo', href: '/register' },
    ]
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Project Command Center', href: '/solutions/project-command-center' },
      { label: 'Residential', href: '/solutions/residential' },
      { label: 'Commercial', href: '/solutions/commercial' },
      { label: 'All Solutions', href: '/solutions' },
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Sales', href: '/contact' },
      { label: 'Careers', href: '#' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Help Center', href: '/help' },
      { label: 'API Docs', href: '/api-docs' },
    ]
  },
];

export function LandingLayout({ children }: LandingLayoutProps) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30">
        <div className="container mx-auto px-4 py-14">
          {/* Top section */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <motion.div
              className="col-span-2 md:col-span-1"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                  <Building2 className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-base font-bold tracking-tight">
                  Org<span className="text-indigo-600 dark:text-indigo-400">Central</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                AI-powered construction management for teams that build the future.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-2 mt-5">
                {[
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Github, href: '#' },
                  { icon: Facebook, href: '#' },
                ].map(({ icon: Icon, href }) => (
                  <Link
                    key={href + Icon.displayName}
                    href={href}
                    className="h-8 w-8 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Nav columns */}
            {footerColumns.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * (i + 1) }}
              >
                <h5 className="text-sm font-semibold text-foreground mb-3">{col.title}</h5>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar */}
          <motion.div
            className="border-t border-border/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>© {currentYear ?? new Date().getFullYear()} OrgCentral. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <span className="text-border">|</span>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}