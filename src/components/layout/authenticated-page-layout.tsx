
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
import { Settings, MessageSquare, Users, Video, Phone, ScreenShare, Search as SearchIcon, Bell, Languages, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  avatarText: string; // Changed from avatar to avatarText
  avatarImage?: string; // Optional image URL
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
    alert(`Global search for "${globalSearchTerm}" would be initiated here, searching across projects, tasks, users, etc.`);
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
    
    // Also update the selectedChatUser state to reflect the new message immediately
    setSelectedChatUser(prevUser => prevUser ? { ...prevUser, messages: [...prevUser.messages, newMessage] } : null);
    
    setChatInputValue('');
  };
  
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar 
        side="left" 
        variant="sidebar" 
        collapsible="icon" 
        className="border-r bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 shadow-sm"
      >
        <SidebarHeader className="flex h-16 items-center border-b border-slate-200/60 px-4 lg:px-6 bg-white/50">
          <Logo className="[&>span]:hidden group-data-[state=expanded]:[&>span]:inline"/>
        </SidebarHeader>
        <SidebarContent className="p-3">
          <div className="space-y-1">
            <AppSidebarContent /> 
          </div>
        </SidebarContent>
        <SidebarFooter className="border-t border-slate-200/60 p-3 bg-white/30">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start hover:bg-slate-200/50" asChild>
              <Link href="/dashboard/settings"> 
                <Settings className="mr-2 h-4 w-4" />
                <span className="group-data-[state=collapsed]:hidden">Settings</span>
              </Link>
            </Button>
            <div className="group-data-[state=collapsed]:hidden">
              <div className="px-2 py-3 text-xs text-slate-600 border-t border-slate-200/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">OrgCentral v3.0</span>
                  <span className="text-slate-500">© 2024</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Construction management platform powered by AI
                </p>
              </div>
            </div>
          </div>
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

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggleButton />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5" />
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparatorNotifications />
                <DropdownMenuItem onSelect={() => console.log('Language selected: English')}>English</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Language selected: Español')}>Español</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Language selected: Français')}>Français</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Language selected: Deutsch')}>Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
              <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
                {!selectedChatUser ? (
                  <>
                    <SheetHeader className="p-4 pb-2 border-b">
                      <SheetTitle>Chat & Collaboration</SheetTitle>
                      <SheetDescription>Connect with your team in real-time.</SheetDescription>
                    </SheetHeader>
                    <div className="p-4">
                      <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search contacts..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2">
                      {filteredContacts.map(user => (
                        <div 
                          key={user.id} 
                          className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                          onClick={() => handleSelectChatUser(user)}
                        >
                          <Avatar className="h-9 w-9 border">
                            <AvatarImage src={user.avatarImage} alt={user.name} data-ai-hint={user.dataAiHint} />
                            <AvatarFallback>{user.avatarText}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className={`text-xs ${user.status === 'Online' ? 'text-green-500' : 'text-muted-foreground'}`}>{user.status}</p>
                          </div>
                        </div>
                      ))}
                       {filteredContacts.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No contacts found.</p>
                      )}
                    </div>
                    <Separator />
                     <div className="p-4 space-y-3">
                        <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded-md min-h-[100px] flex flex-col justify-center items-center">
                            <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="font-semibold">Select a contact to start chatting.</p>
                        </div>
                        <div className="flex justify-around pt-2">
                            <Button variant="outline" size="icon" disabled><Video className="h-5 w-5"/></Button>
                            <Button variant="outline" size="icon" disabled><Phone className="h-5 w-5"/></Button>
                            <Button variant="outline" size="icon" disabled><ScreenShare className="h-5 w-5"/></Button>
                        </div>
                    </div>
                  </>
                ) : (
                  <>
                    <SheetHeader className="p-3 border-b flex flex-row items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedChatUser(null)}>
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={selectedChatUser.avatarImage} alt={selectedChatUser.name} data-ai-hint={selectedChatUser.dataAiHint} />
                        <AvatarFallback>{selectedChatUser.avatarText}</AvatarFallback>
                      </Avatar>
                      <div>
                        <SheetTitle className="text-base">{selectedChatUser.name}</SheetTitle>
                        <p className={`text-xs ${selectedChatUser.status === 'Online' ? 'text-green-500' : 'text-muted-foreground'}`}>
                          {selectedChatUser.status}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Video className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Phone className="h-5 w-5"/></Button>
                      </div>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                      {selectedChatUser.messages.map(msg => (
                        <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'currentUser' ? "justify-end" : "justify-start")}>
                          {msg.sender === 'contact' && (
                            <Avatar className="h-7 w-7 border self-start">
                                <AvatarImage src={selectedChatUser.avatarImage} alt={selectedChatUser.name} data-ai-hint={selectedChatUser.dataAiHint}/>
                                <AvatarFallback>{selectedChatUser.avatarText}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={cn("max-w-[70%] p-2.5 rounded-lg shadow-sm", 
                            msg.sender === 'currentUser' ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none"
                          )}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={cn("text-xs mt-1", msg.sender === 'currentUser' ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left")}>{msg.timestamp}</p>
                          </div>
                           {msg.sender === 'currentUser' && (
                             <Avatar className="h-7 w-7 border self-start">
                                <AvatarImage src="https://placehold.co/40x40.png?text=ME" alt="Current User" data-ai-hint="user avatar"/>
                                <AvatarFallback>ME</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                       {selectedChatUser.messages.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-10">No messages yet. Say hello!</p>
                      )}
                    </div>
                    <div className="p-3 border-t bg-background">
                      <div className="flex items-start gap-2">
                        <Textarea 
                          placeholder="Type a message..." 
                          value={chatInputValue}
                          onChange={(e) => setChatInputValue(e.target.value)}
                          rows={1}
                          className="flex-1 resize-none min-h-[40px] max-h-[120px]"
                          onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage();}}}
                        />
                        <Button onClick={handleSendMessage} disabled={!chatInputValue.trim()}>Send</Button>
                      </div>
                    </div>
                  </>
                )}
                <SheetFooter className="p-3 border-t mt-auto">
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

