import Link from 'next/link';
import { Logo } from '@/components/logo';
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
import { Building, Briefcase, Users, DollarSign, Phone, FileText, HardHat, Brain, BarChart3, Shield } from 'lucide-react';
import React from 'react';

const solutions = [
  {
    title: 'Project Command Center',
    href: '/solutions/project-command-center',
    description: 'Complete project management with planning, scheduling, and collaboration.',
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    title: 'Residential Construction',
    href: '/solutions/residential',
    description: 'Specialized tools for residential builders and developers.',
    icon: <Building className="h-4 w-4" />
  },
  {
    title: 'Commercial Construction',
    href: '/solutions/commercial',
    description: 'Enterprise solutions for large commercial projects.',
    icon: <Building className="h-4 w-4" />
  },
  {
    title: 'View All Solutions',
    href: '/solutions',
    description: 'Explore all our construction management solutions.',
    icon: <FileText className="h-4 w-4" />
  }
];

const resources = [
  {
    title: 'Case Studies',
    href: '/case-studies',
    description: 'See how construction companies succeed with OrgCentral.'
  },
  {
    title: 'Help Center',
    href: '/help',
    description: 'Get answers to your questions and learn best practices.'
  },
  {
    title: 'API Documentation',
    href: '/api-docs',
    description: 'Integrate OrgCentral with your existing tools.'
  },
  {
    title: 'Blog',
    href: '/blog',
    description: 'Industry insights and construction technology trends.'
  }
];

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {solutions.map((solution) => (
                      <ListItem
                        key={solution.title}
                        title={solution.title}
                        href={solution.href}
                        icon={solution.icon}
                      >
                        {solution.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              


              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Products
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/pricing" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {resources.map((resource) => (
                      <ListItem
                        key={resource.title}
                        title={resource.title}
                        href={resource.href}
                      >
                        {resource.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile & Auth Buttons */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
