import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Building, Briefcase, Brain, Building2, ArrowRight } from 'lucide-react';
import React from 'react';

const solutions = [
  {
    title: 'Project Command Center',
    href: '/solutions/project-command-center',
    description: 'Complete project management with planning, scheduling, and collaboration.',
    icon: <Briefcase className="h-4 w-4 text-indigo-500" />,
  },
  {
    title: 'Residential Construction',
    href: '/solutions/residential',
    description: 'Specialized tools for residential builders and developers.',
    icon: <Building className="h-4 w-4 text-violet-500" />,
  },
  {
    title: 'Commercial Construction',
    href: '/solutions/commercial',
    description: 'Enterprise solutions for large commercial projects.',
    icon: <Building2 className="h-4 w-4 text-indigo-500" />,
  },
  {
    title: 'AI-Powered Insights',
    href: '/ai-in-construction',
    description: 'Leverage AI to identify risks and optimize your projects.',
    icon: <Brain className="h-4 w-4 text-violet-500" />,
  },
];

const resources = [
  { title: 'Case Studies', href: '/case-studies', description: 'See how companies succeed with OrgCentral.' },
  { title: 'Help Center', href: '/help', description: 'Get answers and learn best practices.' },
  { title: 'API Documentation', href: '/api-docs', description: 'Integrate OrgCentral with your tools.' },
  { title: 'Software', href: '/resources/software', description: 'Manage software and licenses.' },
  { title: 'Blog', href: '/blog', description: 'Industry insights and tech trends.' },
];

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          'group flex select-none gap-3 rounded-xl p-3 leading-none no-underline outline-none transition-all',
          'hover:bg-primary/5 hover:border-primary/20 border border-transparent',
          className
        )}
        {...props}
      >
        {icon && (
          <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            {icon}
          </div>
        )}
        <div>
          <div className="text-sm font-semibold leading-none mb-1 text-foreground">{title}</div>
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{children}</p>
        </div>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';

const navLinkClass = [
  'group inline-flex h-9 items-center justify-center rounded-lg px-3.5 py-2',
  'text-sm font-medium text-muted-foreground',
  'transition-colors hover:text-foreground hover:bg-muted/60',
  'focus:outline-none focus:bg-muted/60',
  'data-[active]:bg-primary/5 data-[active]:text-primary',
].join(' ');

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-headline flex-shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow-sm flex-shrink-0">
            <Building2 className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold tracking-tight">
            Org<span className="text-indigo-600 dark:text-indigo-400">Central</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-0.5">
              {/* Solutions */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navLinkClass}>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[480px] gap-1.5 p-3 md:w-[540px] md:grid-cols-2">
                    {solutions.map((s) => (
                      <ListItem key={s.title} title={s.title} href={s.href} icon={s.icon}>
                        {s.description}
                      </ListItem>
                    ))}
                  </ul>
                  <div className="border-t border-border/60 p-2">
                    <Link href="/solutions" className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      View all solutions <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Products */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products" className={navLinkClass}>Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Pricing */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/pricing" className={navLinkClass}>Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Resources */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navLinkClass}>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[340px] gap-1.5 p-3">
                    {resources.map((r) => (
                      <ListItem key={r.title} title={r.title} href={r.href}>
                        {r.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about" className={navLinkClass}>About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Contact */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className={navLinkClass}>Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Buttons */}
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            asChild
            className="h-9 px-5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white border-0 shadow-glow-sm transition-all"
          >
            <Link href="/register">Get Started →</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
