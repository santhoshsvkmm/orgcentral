'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User as UserIcon, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function UserNav() {
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUserName("Demo User");
    setUserEmail("demo@orgcentral.com");
    setIsLoaded(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full ring-2 ring-transparent hover:ring-primary/30 transition-all"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://placehold.co/100x100.png"
              alt={userName}
              data-ai-hint="user avatar"
            />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xs font-semibold">
              {isLoaded ? userName?.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-0">
          <div className="flex items-center gap-3 px-3 py-3 border-b border-border/60">
            <Avatar className="h-9 w-9 flex-shrink-0">
              <AvatarImage src="https://placehold.co/100x100.png" alt={userName} data-ai-hint="user avatar" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xs font-semibold">
                {userName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold leading-none truncate">{userName}</p>
                <BadgeCheck className="h-3.5 w-3.5 text-indigo-500 flex-shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{userEmail}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <div className="py-1">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login" className="flex items-center gap-2.5 px-3 py-2 text-sm text-destructive cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
