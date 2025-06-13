
'use client';

import type { RFI, RFIMessage, RFIAttachment, RfiStatus } from '@/types/rfi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Paperclip, Send, CalendarDays, User, Tag, AlertTriangle, CheckCircle, Clock, Edit2, FileText, Download, Trash2 } from "lucide-react";
import { useState, FormEvent, useRef, useEffect } from "react";
import { formatDate } from "@/lib/date-utils";
import { RfiMessageItem } from './rfi-message-item';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface RfiDetailProps {
  rfi: RFI;
  onRfiUpdate: (updatedRfi: RFI) => void; // To update parent state after adding messages/attachments
}

const rfiStatuses: RfiStatus[] = ["Open", "In Progress", "Needs Clarification", "Closed"];

export function RfiDetail({ rfi: initialRfi, onRfiUpdate }: RfiDetailProps) {
  const [rfi, setRfi] = useState<RFI>(initialRfi);
  const [newMessage, setNewMessage] = useState('');
  const [newStatus, setNewStatus] = useState<RfiStatus>(initialRfi.status);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setRfi(initialRfi);
    setNewStatus(initialRfi.status);
  }, [initialRfi]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [rfi.messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: RFIMessage = {
      id: `msg-${Date.now()}`,
      rfiId: rfi.id,
      senderId: 'current-user-id', // Replace with actual current user ID
      senderName: 'Demo User', // Replace with actual current user name
      senderAvatarUrl: 'https://placehold.co/40x40.png?text=DU',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    const updatedRfi = { ...rfi, messages: [...rfi.messages, message] };
    setRfi(updatedRfi);
    onRfiUpdate(updatedRfi); // Propagate change to parent
    setNewMessage('');
    toast({ title: "Message Sent", description: "Your message has been added to the RFI." });
  };
  
  const handleStatusChange = (status: RfiStatus) => {
    setNewStatus(status);
  };

  const handleSaveStatus = () => {
    if (newStatus === rfi.status) {
      setIsEditingStatus(false);
      return;
    }
    const updatedRfi = { ...rfi, status: newStatus, updatedAt: new Date().toISOString() };
    setRfi(updatedRfi);
    onRfiUpdate(updatedRfi);
    setIsEditingStatus(false);
    toast({ title: "RFI Status Updated", description: `Status changed to ${newStatus}.` });
  };


  const getPriorityIcon = (priority: RFI['priority']) => {
    if (priority === "High") return <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />;
    if (priority === "Medium") return <Clock className="h-4 w-4 text-yellow-500 mr-1" />;
    return <CheckCircle className="h-4 w-4 text-green-500 mr-1" />; // Low
  };

  const getStatusColorClass = (status: RfiStatus): string => {
    switch (status) {
      case "Open": return "bg-blue-500";
      case "In Progress": return "bg-yellow-500";
      case "Needs Clarification": return "bg-orange-500";
      case "Closed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };
  
  // Mock function for file upload, in real app this would involve an API call
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newAttachment: RFIAttachment = {
        id: `att-${Date.now()}`,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file), // Temporary URL for local preview
        fileType: file.type,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Demo User', // Replace with actual user
      };
      
      const updatedRfi = { ...rfi, attachments: [...rfi.attachments, newAttachment] };
      setRfi(updatedRfi);
      onRfiUpdate(updatedRfi);
      toast({ title: "File Attached", description: `${file.name} has been attached.` });
    }
  };

  const handleDeleteAttachment = (attachmentId: string) => {
     const updatedRfi = { ...rfi, attachments: rfi.attachments.filter(att => att.id !== attachmentId) };
     setRfi(updatedRfi);
     onRfiUpdate(updatedRfi);
     toast({ title: "Attachment Removed", variant: "destructive" });
  };


  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* RFI Info Column */}
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Status</span>
              {!isEditingStatus ? (
                 <Button variant="ghost" size="sm" onClick={() => setIsEditingStatus(true)} className="text-xs">
                    <Edit2 className="h-3 w-3 mr-1" /> Edit
                </Button>
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isEditingStatus ? (
              <Badge className={`text-white text-sm px-3 py-1 ${getStatusColorClass(rfi.status)}`}>
                {rfi.status}
              </Badge>
            ) : (
              <div className="flex items-center gap-2">
                <Select value={newStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="flex-grow">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        {rfiStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button size="sm" onClick={handleSaveStatus}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => { setIsEditingStatus(false); setNewStatus(rfi.status);}}>Cancel</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center">
              {getPriorityIcon(rfi.priority)}
              <strong>Priority:</strong><span className="ml-2">{rfi.priority}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <strong>Raised by:</strong><span className="ml-2">{rfi.raisedByUserName}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <strong>Assigned to:</strong><span className="ml-2">{rfi.assignedToUserName || 'Unassigned'}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              <strong>Created:</strong><span className="ml-2">{formatDate(rfi.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              <strong>Updated:</strong><span className="ml-2">{formatDate(rfi.updatedAt)}</span>
            </div>
            {rfi.dueDate && (
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <strong>Due Date:</strong><span className="ml-2">{formatDate(rfi.dueDate)}</span>
              </div>
            )}
            {rfi.tags && rfi.tags.length > 0 && (
              <div className="flex items-start">
                <Tag className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <strong className="mt-0.5">Tags:</strong>
                <div className="ml-2 flex flex-wrap gap-1">
                  {rfi.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{rfi.description}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Attachments</CardTitle>
            <label htmlFor="file-upload-rfi" className="cursor-pointer">
              <Button variant="outline" size="sm" as="span">
                <Paperclip className="h-4 w-4 mr-2" /> Add File
              </Button>
            </label>
            <Input id="file-upload-rfi" type="file" className="hidden" onChange={handleFileUpload} />
          </CardHeader>
          <CardContent>
            {rfi.attachments.length > 0 ? (
              <ul className="space-y-2">
                {rfi.attachments.map(att => (
                  <li key={att.id} className="text-sm flex items-center justify-between p-2 border rounded-md hover:bg-muted/50">
                    <div className="flex items-center">
                       <FileText className="h-5 w-5 mr-2 text-primary" />
                       <div>
                        <a href={att.fileUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">{att.fileName}</a>
                        <div className="text-xs text-muted-foreground">
                            {att.fileSize ? `${att.fileSize} - ` : ''}
                            Uploaded by {att.uploadedBy} on {formatDate(att.uploadedAt, 'MMM d, yyyy HH:mm')}
                        </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" asChild className="h-7 w-7">
                            <a href={att.fileUrl} download={att.fileName} title="Download"> <Download className="h-4 w-4"/></a>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDeleteAttachment(att.id)} title="Delete">
                            <Trash2 className="h-4 w-4"/>
                        </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No attachments for this RFI.</p>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Discussion Column */}
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Discussion</CardTitle>
            <CardDescription>Follow the conversation and add your comments.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto space-y-4 p-4 bg-muted/30 rounded-b-md">
            {rfi.messages.length > 0 ? (
              rfi.messages.map(msg => <RfiMessageItem key={msg.id} message={msg} />)
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No messages yet. Start the discussion!</p>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full items-start space-x-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow min-h-[60px] resize-none"
                rows={2}
              />
              {/* Placeholder for attachment button in message */}
              {/* <Button type="button" variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button> */}
              <Button type="submit" size="lg" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" /> Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
