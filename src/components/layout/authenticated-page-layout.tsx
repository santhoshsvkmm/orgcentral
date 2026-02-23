
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
import {
  Settings, MessageSquare, Users, Video, Phone, ScreenShare,
  Search as SearchIcon, Bell, Languages, ArrowLeft, Zap,
  Badge as BadgeLucide
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MotionProvider } from '@/components/ui/motion-provider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from "@/components/ui/badge";
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
import { cn } from '@/lib/utils';


interface MockChatMessage {
  id: string;
  sender: 'currentUser' | 'contact';
  text: string;
  timestamp: string;
}

interface MockChatContact {
  id: string;
  name: string;
  status: 'Online' | 'Offline' | 'Away';
  avatarText: string;
  avatarImage?: string;
  dataAiHint: string;
  messages: MockChatMessage[];
}

const initialMockContacts: MockChatContact[] = [
  {
    id: 'user-alice',
    name: "Alice Wonderland",
    status: "Online",
    avatarText: "AW",
    avatarImage: "https://placehold.co/40x40.png?text=AW",
    dataAiHint: "user avatar",
    messages: [
      { id: 'm1-1', sender: 'contact', text: 'Hey! How is the project going?', timestamp: '10:00 AM' },
      { id: 'm1-2', sender: 'currentUser', text: 'Pretty good, making progress on the UI. Thanks for asking!', timestamp: '10:01 AM' },
      { id: 'm1-3', sender: 'contact', text: 'Great to hear! Let me know if you need any design assets.', timestamp: '10:02 AM' },
    ]
  },
  {
    id: 'user-bob',
    name: "Bob The Builder",
    status: "Offline",
    avatarText: "BB",
    avatarImage: "https://placehold.co/40x40.png?text=BB",
    dataAiHint: "user avatar",
    messages: [
      { id: 'm2-1', sender: 'currentUser', text: 'Hi Bob, do you have a moment to discuss the API integration?', timestamp: 'Yesterday' },
      { id: 'm2-2', sender: 'contact', text: 'Sure, I will be online tomorrow morning.', timestamp: 'Yesterday' },
    ]
  },
  {
    id: 'user-charlie',
    name: "Charlie Brown",
    status: "Away",
    avatarText: "CB",
    avatarImage: "https://placehold.co/40x40.png?text=CB",
    dataAiHint: "user avatar",
    messages: [
      { id: 'm3-1', sender: 'contact', text: 'Just wanted to follow up on the user testing feedback.', timestamp: 'Mon 9:30 AM' },
    ]
  },
  {
    id: 'user-diana',
    name: "Diana Prince",
    status: "Online",
    avatarText: "DP",
    avatarImage: "https://placehold.co/40x40.png?text=DP",
    dataAiHint: "user avatar",
    messages: []
  }
];


export function AuthenticatedPageLayout({ children }: { children: ReactNode }) {
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [contacts, setContacts] = useState<MockChatContact[]>(initialMockContacts);
  const [selectedChatUser, setSelectedChatUser] = useState<MockChatContact | null>(null);
  const [chatInputValue, setChatInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Global search submitted for:", globalSearchTerm);
  };

  const handleSelectChatUser = (user: MockChatContact) => {
    setSelectedChatUser(user);
  };

  const handleSendMessage = () => {
    if (!selectedChatUser || !chatInputValue.trim()) return;
    const newMessage: MockChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'currentUser',
      text: chatInputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedContacts = contacts.map(contact =>
      contact.id === selectedChatUser.id
        ? { ...contact, messages: [...contact.messages, newMessage] }
        : contact
    );
    setContacts(updatedContacts);
    setSelectedChatUser(prevUser => prevUser ? { ...prevUser, messages: [...prevUser.messages, newMessage] } : null);
    setChatInputValue('');
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MotionProvider>
      <SidebarProvider defaultOpen={true}>
      {/* ─── Sidebar ─────────────────────────────────────────────── */}
      <Sidebar
        side="left"
        variant="sidebar"
        collapsible="icon"
        className="border-r border-sidebar-border bg-gradient-to-b from-[hsl(230,47%,14%)] to-[hsl(222,47%,11%)] text-sidebar-foreground shadow-xl"
      >
        {/* Sidebar Header */}
        <SidebarHeader className="flex flex-col gap-4 border-b border-sidebar-border/50 px-3 py-4">
          <Logo />

          {/* User Profile Card (Mini) */}
          <div className="group-data-[state=collapsed]:hidden flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Avatar className="h-9 w-9 border border-white/20">
              <AvatarImage src="https://placehold.co/40x40.png?text=US" data-ai-hint="user avatar" />
              <AvatarFallback className="bg-indigo-500 text-white text-xs">US</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate leading-none mb-1">Demo User</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] text-sidebar-foreground/50 truncate">Project Admin</p>
              </div>
            </div>
          </div>
        </SidebarHeader>

        {/* Navigation */}
        <SidebarContent className="py-2 overflow-y-auto">
          <AppSidebarContent />
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="border-t border-sidebar-border/50 p-3 flex flex-col gap-2">
          <Button
            variant="ghost"
            className="w-full justify-start h-9 text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-lg text-sm group/settings"
            asChild
          >
            <Link href="/dashboard/settings">
              <Settings className="mr-2.5 h-4 w-4 text-sidebar-foreground/40 group-hover/settings:text-sidebar-accent-foreground transition-colors" />
              <span className="group-data-[state=collapsed]:hidden">Settings</span>
            </Link>
          </Button>

          <div className="group-data-[state=collapsed]:hidden mt-1 px-3 py-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-md bg-indigo-500 flex items-center justify-center">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-bold text-sidebar-foreground/90">OrgCentral</span>
              </div>
              <Badge variant="outline" className="h-4 px-1 text-[10px] bg-indigo-500/10 border-indigo-500/30 text-indigo-400">v3.0</Badge>
            </div>
            <p className="text-[11px] text-sidebar-foreground/40 leading-relaxed font-medium">
              Next-Gen Construction Management
            </p>
          </div>
        </SidebarFooter>
      </Sidebar>

  {/* ─── Main Area ───────────────────────────────────────────── */}
      <SidebarInset>
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border/60 bg-background/85 backdrop-blur-md backdrop-saturate-150 px-4 sm:px-5">
          {/* Left: Sidebar trigger */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors -ml-1" />
          </div>

          {/* Center: Search */}
          <div className="flex-1 flex justify-center px-2 max-w-xl mx-auto">
            <form onSubmit={handleGlobalSearchSubmit} className="w-full">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search tasks, projects, people..."
                  className="w-full pl-9 h-9 text-sm bg-muted/50 border-border/60 focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/30 rounded-lg transition-all placeholder:text-muted-foreground/60"
                  value={globalSearchTerm}
                  onChange={(e) => setGlobalSearchTerm(e.target.value)}
                />
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-px rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
                  ⌘K
                </kbd>
              </div>
            </form>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-0.5">
            <ThemeToggleButton />

            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg">
                  <Languages className="h-4 w-4" />
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Language</DropdownMenuLabel>
                <DropdownMenuSeparatorNotifications />
                {['English', 'Español', 'Français', 'Deutsch', 'हिन्दी'].map(lang => (
                  <DropdownMenuItem key={lang} className="text-sm">{lang}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground relative rounded-lg">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-1 ring-background">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                  </span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-2 py-2">
                  <DropdownMenuLabel className="text-sm font-semibold p-0">Notifications</DropdownMenuLabel>
                  <span className="text-xs text-indigo-500 font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                <DropdownMenuSeparatorNotifications />
                {[
                  { title: 'Project Alpha Update', desc: "Task 'Deployment' is overdue.", time: '2m ago', dot: 'bg-red-500' },
                  { title: 'New Message from Alice', desc: 'Regarding RFI-003...', time: '15m ago', dot: 'bg-indigo-500' },
                  { title: 'Budget Alert', desc: 'Budget for Project Beta is 90% used.', time: '1h ago', dot: 'bg-amber-500' },
                ].map((n, i) => (
                  <DropdownMenuItem key={i} className="flex items-start gap-3 p-3 cursor-pointer">
                    <span className={cn('mt-1.5 h-2 w-2 rounded-full flex-shrink-0', n.dot)} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.desc}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{n.time}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparatorNotifications />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="justify-center text-xs text-primary hover:text-primary py-2">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Chat */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground relative rounded-lg">
                  <MessageSquare className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-background">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  </span>
                  <span className="sr-only">Chat</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm p-0 flex flex-col border-l border-border/60" onOpenAutoFocus={(e) => e.preventDefault()}>
                {!selectedChatUser ? (
                  <>
                    <SheetHeader className="p-4 pb-3 border-b border-border/60">
                      <SheetTitle className="text-base font-semibold">Team Chat</SheetTitle>
                      <SheetDescription className="text-xs text-muted-foreground">Connect with your team in real-time.</SheetDescription>
                    </SheetHeader>
                    <div className="px-4 pt-3 pb-2">
                      <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                          placeholder="Search contacts..."
                          className="pl-8 h-8 text-sm bg-muted/50 border-border/60"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
                      {filteredContacts.map(user => (
                        <div
                          key={user.id}
                          className="flex items-center gap-3 p-2.5 hover:bg-muted/60 rounded-lg cursor-pointer transition-colors group"
                          onClick={() => handleSelectChatUser(user)}
                        >
                          <div className="relative flex-shrink-0">
                            <Avatar className="h-8 w-8 border border-border/50">
                              <AvatarImage src={user.avatarImage} alt={user.name} data-ai-hint={user.dataAiHint} />
                              <AvatarFallback className="text-xs">{user.avatarText}</AvatarFallback>
                            </Avatar>
                            <span className={cn(
                              'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-1.5 ring-background',
                              user.status === 'Online' ? 'bg-emerald-500' : user.status === 'Away' ? 'bg-amber-500' : 'bg-muted-foreground/40'
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className={cn('text-xs mt-0.5', user.status === 'Online' ? 'text-emerald-500' : 'text-muted-foreground')}>
                              {user.status}
                            </p>
                          </div>
                          <MessageSquare className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                      {filteredContacts.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8">No contacts found.</p>
                      )}
                    </div>
                    <div className="p-3 border-t border-border/60 flex justify-around">
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Video className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Phone className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled><ScreenShare className="h-4 w-4" /></Button>
                    </div>
                  </>
                ) : (
                  <>
                    <SheetHeader className="p-3 border-b border-border/60 flex flex-row items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0 rounded-lg" onClick={() => setSelectedChatUser(null)}>
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-8 w-8 border border-border/50">
                          <AvatarImage src={selectedChatUser.avatarImage} alt={selectedChatUser.name} data-ai-hint={selectedChatUser.dataAiHint} />
                          <AvatarFallback className="text-xs">{selectedChatUser.avatarText}</AvatarFallback>
                        </Avatar>
                        <span className={cn(
                          'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-1.5 ring-background',
                          selectedChatUser.status === 'Online' ? 'bg-emerald-500' : 'bg-muted-foreground/40'
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <SheetTitle className="text-sm font-semibold leading-none">{selectedChatUser.name}</SheetTitle>
                        <p className={cn('text-xs mt-0.5', selectedChatUser.status === 'Online' ? 'text-emerald-500' : 'text-muted-foreground')}>
                          {selectedChatUser.status}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 ml-auto">
                        <Button variant="ghost" size="icon" className="h-7 w-7" disabled><Video className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" disabled><Phone className="h-3.5 w-3.5" /></Button>
                      </div>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-muted/20">
                      {selectedChatUser.messages.map(msg => (
                        <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'currentUser' ? "justify-end" : "justify-start")}>
                          {msg.sender === 'contact' && (
                            <Avatar className="h-6 w-6 border border-border/50 flex-shrink-0 self-start">
                              <AvatarImage src={selectedChatUser.avatarImage} alt={selectedChatUser.name} data-ai-hint={selectedChatUser.dataAiHint} />
                              <AvatarFallback className="text-xs">{selectedChatUser.avatarText}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={cn(
                            "max-w-[72%] px-3 py-2 rounded-xl text-sm shadow-sm",
                            msg.sender === 'currentUser'
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : "bg-card text-card-foreground border border-border/50 rounded-bl-sm"
                          )}>
                            <p>{msg.text}</p>
                            <p className={cn("text-xs mt-1 opacity-60", msg.sender === 'currentUser' ? "text-right" : "text-left")}>
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      {selectedChatUser.messages.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-10">No messages yet. Say hello! 👋</p>
                      )}
                    </div>
                    <div className="p-3 border-t border-border/60 bg-background">
                      <div className="flex items-end gap-2">
                        <Textarea
                          placeholder="Type a message..."
                          value={chatInputValue}
                          onChange={(e) => setChatInputValue(e.target.value)}
                          rows={1}
                          className="flex-1 resize-none min-h-[38px] max-h-[100px] text-sm rounded-xl border-border/60 bg-muted/40"
                          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!chatInputValue.trim()}
                          size="sm"
                          className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                <SheetFooter className="p-3 border-t border-border/60">
                  <SheetClose asChild>
                    <Button type="button" variant="outline" size="sm" className="w-full rounded-lg">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Divider */}
            <div className="w-px h-5 bg-border/60 mx-1" />

            <UserNav />
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          className="flex-1 p-4 sm:p-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </SidebarInset>
      </SidebarProvider>
    </MotionProvider>
  );
}
