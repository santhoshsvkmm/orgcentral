
'use client'; 

import type { ReactNode } from 'react';
import { UserNav } from './user-nav';
import { AppSidebarContent } from './app-sidebar-content';
import { Logo } from '@/components/logo';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function AuthenticatedPageLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar 
        side="left" 
        variant="sidebar" 
        collapsible="icon" 
        className="border-r bg-sidebar text-sidebar-foreground"
      >
        <SidebarHeader className="flex h-16 items-center border-b px-4 lg:px-6">
          <Logo className="[&>span]:hidden group-data-[state=expanded]:[&>span]:inline"/>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <AppSidebarContent /> 
        </SidebarContent>
        <SidebarFooter className="border-t p-2">
           <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/settings"> {/* Placeholder link */}
                <Settings className="mr-2 h-4 w-4" />
                <span className="group-data-[state=collapsed]:hidden">Settings</span>
              </Link>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6 md:justify-end">
          <div className="md:hidden"> {/* This trigger is for mobile */}
            <SidebarTrigger />
          </div>
          <div className="hidden font-semibold md:block md:flex-1">
            {/* Breadcrumbs or dynamic page title could go here */}
          </div>
          <UserNav />
        </header>
        <motion.main 
          className="flex-1 p-4 sm:p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.main>
      </SidebarInset>
    </SidebarProvider>
  );
}
