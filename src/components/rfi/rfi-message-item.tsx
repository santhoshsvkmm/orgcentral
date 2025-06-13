
'use client';

import type { RFIMessage, RFIAttachment } from '@/types/rfi';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/date-utils";
import { cn } from '@/lib/utils';
import { FileText, Download } from 'lucide-react';

interface RfiMessageItemProps {
  message: RFIMessage;
  // Assuming a way to identify the current user for message alignment
  // currentUserId?: string; 
}

export function RfiMessageItem({ message }: RfiMessageItemProps) {
  const isCurrentUser = message.senderId === 'current-user-id'; // Placeholder for actual current user check

  return (
    <div className={cn("flex items-start gap-3", isCurrentUser ? "justify-end" : "justify-start")}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={message.senderAvatarUrl || `https://placehold.co/40x40.png?text=${message.senderName.substring(0,2).toUpperCase()}`} alt={message.senderName} data-ai-hint="user avatar" />
          <AvatarFallback>{message.senderName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[70%]")}>
        <Card className={cn("rounded-lg shadow-sm", 
            isCurrentUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
        )}>
          <CardContent className="p-3">
            {!isCurrentUser && <p className="text-xs font-medium mb-1">{message.senderName}</p>}
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-1 border-t pt-2 border-[hsla(var(--card-foreground),0.2)]">
                {message.attachments.map(att => (
                  <a 
                    key={att.id} 
                    href={att.fileUrl} 
                    download={att.fileName}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={cn(
                        "text-xs flex items-center gap-1.5 p-1.5 rounded hover:bg-[hsla(var(--card-foreground),0.1)]",
                        isCurrentUser ? "text-primary-foreground/90" : "text-muted-foreground hover:text-foreground"
                    )}
                    title={`Download ${att.fileName}`}
                  >
                    <FileText className="h-3.5 w-3.5" /> 
                    {att.fileName} 
                    {att.fileSize && <span className="text-xs opacity-80">({att.fileSize})</span>}
                    <Download className="h-3.5 w-3.5 ml-auto" />
                  </a>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <p className={cn("text-xs text-muted-foreground mt-1", isCurrentUser ? "text-right" : "text-left")}>
          {formatDate(message.timestamp, "MMM d, yyyy HH:mm")}
        </p>
      </div>
      {isCurrentUser && (
         <Avatar className="h-8 w-8 border">
           <AvatarImage src={message.senderAvatarUrl || `https://placehold.co/40x40.png?text=${message.senderName.substring(0,2).toUpperCase()}`} alt={message.senderName} data-ai-hint="user avatar" />
           <AvatarFallback>{message.senderName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
