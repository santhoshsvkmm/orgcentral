
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
import { Settings, MessageSquare, Users, Video, Phone, ScreenShare, Search as SearchIcon, Bell, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { ThemeToggleButton } from './theme-toggle-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator as DropdownMenuSeparatorNotifications,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function AuthenticatedPageLayout({ children }: { children: ReactNode }) {
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Global search submitted for:", globalSearchTerm);
    alert(`Global search for "${globalSearchTerm}" would be initiated here, searching across projects, tasks, users, etc.`);
  };

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
              <Link href="/dashboard/settings"> 
                <Settings className="mr-2 h-4 w-4" />
                <span className="group-data-[state=collapsed]:hidden">Settings</span>
              </Link>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          <div className="md:hidden"> 
            <SidebarTrigger />
          </div>
          
          <div className="flex-1 flex justify-center px-4">
            <form onSubmit={handleGlobalSearchSubmit} className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tasks, projects, people..."
                  className="w-full pl-10 h-9 bg-muted/40 hover:bg-muted/70 focus:bg-background"
                  value={globalSearchTerm}
                  onChange={(e) => setGlobalSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                   <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                  </span>
                  <span className="sr-only">Open Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparatorNotifications />
                <DropdownMenuItem onSelect={() => alert('Placeholder: Notification 1 clicked')}>
                  <div className="flex items-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/40x40.png?text=S" alt="System" data-ai-hint="system icon" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Project Alpha Update</p>
                      <p className="text-xs text-muted-foreground">Task 'Deployment' is overdue.</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => alert('Placeholder: Notification 2 clicked')}>
                   <div className="flex items-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                       <AvatarImage src="https://placehold.co/40x40.png?text=AU" alt="Alice" data-ai-hint="user avatar" />
                       <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">New Message from Alice</p>
                      <p className="text-xs text-muted-foreground">Regarding RFI-003...</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparatorNotifications />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="justify-center text-sm text-primary hover:underline">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                  <span className="sr-only">Open Chat</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-md p-0 flex flex-col">
                <SheetHeader className="p-6 pb-4 border-b">
                  <SheetTitle>Chat & Collaboration</SheetTitle>
                  <SheetDescription>
                    Connect with your team in real-time.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search contacts..." className="pl-8" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {[
                    { name: "Alice W.", status: "Online", avatar: "AW", dataAiHint:"user avatar" },
                    { name: "Bob B.", status: "Offline", avatar: "BB", dataAiHint:"user avatar" },
                    { name: "Charlie C.", status: "Away", avatar: "CC", dataAiHint:"user avatar" },
                  ].map(user => (
                    <div key={user.name} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={`https://placehold.co/40x40.png?text=${user.avatar}`} alt={user.name} data-ai-hint={user.dataAiHint} />
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className={`text-xs ${user.status === 'Online' ? 'text-green-500' : 'text-muted-foreground'}`}>{user.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="p-4 space-y-3 flex-grow-0">
                    <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded-md min-h-[150px] flex flex-col justify-center items-center">
                        <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="font-semibold">Select a contact to start chatting.</p>
                        <p className="text-xs">Full chat, video/audio calls, and screen sharing features would be implemented here.</p>
                    </div>
                    <div className="flex justify-around pt-2">
                        <Button variant="outline" size="icon" disabled><Video className="h-5 w-5"/></Button>
                        <Button variant="outline" size="icon" disabled><Phone className="h-5 w-5"/></Button>
                        <Button variant="outline" size="icon" disabled><ScreenShare className="h-5 w-5"/></Button>
                    </div>
                </div>
                <SheetFooter className="p-4 border-t">
                  <SheetClose asChild>
                    <Button type="button" variant="outline" className="w-full">Close Panel</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <UserNav />
          </div>
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
