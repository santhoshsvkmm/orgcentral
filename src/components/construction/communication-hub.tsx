'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Send, 
  Phone,
  Video,
  FileText,
  Paperclip,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  Pin,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'system';
  attachments?: {
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
  projectId?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'project' | 'team' | 'direct' | 'announcement';
  participants: number;
  unreadCount: number;
  lastMessage?: Message;
  isOnline?: boolean;
  projectId?: string;
}

interface CommunicationHubProps {
  channels: ChatChannel[];
  messages: Message[];
  currentChannelId?: string;
  onChannelSelect?: (channelId: string) => void;
  onSendMessage?: (channelId: string, content: string, attachments?: File[]) => void;
  className?: string;
}

const priorityConfig = {
  low: { color: 'bg-gray-100 text-gray-800', label: 'Low' },
  normal: { color: 'bg-blue-100 text-blue-800', label: 'Normal' },
  high: { color: 'bg-orange-100 text-orange-800', label: 'High' },
  urgent: { color: 'bg-red-100 text-red-800', label: 'Urgent' }
};

const channelTypeConfig = {
  project: { icon: FileText, color: 'text-blue-500' },
  team: { icon: Users, color: 'text-green-500' },
  direct: { icon: MessageSquare, color: 'text-purple-500' },
  announcement: { icon: Pin, color: 'text-orange-500' }
};

export function CommunicationHub({ 
  channels, 
  messages, 
  currentChannelId,
  onChannelSelect,
  onSendMessage,
  className = '' 
}: CommunicationHubProps) {
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentChannel = channels.find(c => c.id === currentChannelId);
  const channelMessages = messages.filter(m => 
    currentChannelId ? m.projectId === currentChannelId : true
  );

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentChannelId) return;
    
    onSendMessage?.(currentChannelId, newMessage);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px] ${className}`}>
      {/* Channels Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Channels
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="space-y-1 max-h-[480px] overflow-y-auto">
            {filteredChannels.map((channel) => {
              const typeInfo = channelTypeConfig[channel.type];
              const TypeIcon = typeInfo.icon;
              const isActive = channel.id === currentChannelId;

              return (
                <div
                  key={channel.id}
                  className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                    isActive ? 'bg-primary/10 border-r-2 border-primary' : ''
                  }`}
                  onClick={() => onChannelSelect?.(channel.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full bg-muted ${typeInfo.color}`}>
                      <TypeIcon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate">{channel.name}</h4>
                        {channel.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {channel.unreadCount > 9 ? '9+' : channel.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{channel.participants} members</span>
                        {channel.isOnline && (
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full" />
                            <span>Online</span>
                          </div>
                        )}
                      </div>
                      {channel.lastMessage && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {channel.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-3 flex flex-col">
        {currentChannel ? (
          <>
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-muted ${channelTypeConfig[currentChannel.type].color}`}>
                    {React.createElement(channelTypeConfig[currentChannel.type].icon, { className: "h-4 w-4" })}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{currentChannel.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {currentChannel.participants} participants
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {channelMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No messages yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              ) : (
                channelMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.senderAvatar} />
                        <AvatarFallback className="text-xs">
                          {message.senderName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{message.senderName}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.priority !== 'normal' && (
                            <Badge variant="outline" className={priorityConfig[message.priority].color}>
                              {priorityConfig[message.priority].label}
                            </Badge>
                          )}
                          {message.status === 'read' && (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm">{message.content}</p>
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Paperclip className="h-3 w-3" />
                                  <span>{attachment.name}</span>
                                  <span>({attachment.size})</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={2}
                  className="resize-none"
                />
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Select a channel</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a channel from the sidebar to start chatting
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// Sample data
export const sampleChannels: ChatChannel[] = [
  {
    id: 'project-alpha',
    name: 'Residential Tower A',
    type: 'project',
    participants: 12,
    unreadCount: 3,
    isOnline: true,
    projectId: 'project-alpha',
    lastMessage: {
      id: 'msg-1',
      senderId: 'user-1',
      senderName: 'John Smith',
      content: 'Foundation work completed ahead of schedule',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'text',
      priority: 'normal'
    }
  },
  {
    id: 'team-construction',
    name: 'Construction Team',
    type: 'team',
    participants: 8,
    unreadCount: 0,
    isOnline: true,
    lastMessage: {
      id: 'msg-2',
      senderId: 'user-2',
      senderName: 'Maria Garcia',
      content: 'Safety meeting scheduled for tomorrow 9 AM',
      timestamp: '2024-01-15T13:15:00Z',
      type: 'text',
      priority: 'high'
    }
  },
  {
    id: 'announcements',
    name: 'Company Announcements',
    type: 'announcement',
    participants: 45,
    unreadCount: 1,
    lastMessage: {
      id: 'msg-3',
      senderId: 'system',
      senderName: 'System',
      content: 'New safety protocols have been updated',
      timestamp: '2024-01-15T10:00:00Z',
      type: 'system',
      priority: 'urgent'
    }
  }
];

export const sampleMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'user-1',
    senderName: 'John Smith',
    senderAvatar: 'https://placehold.co/32x32.png?text=JS',
    content: 'Foundation work completed ahead of schedule. Ready to move to next phase.',
    timestamp: '2024-01-15T14:30:00Z',
    type: 'text',
    priority: 'normal',
    status: 'read',
    projectId: 'project-alpha'
  },
  {
    id: 'msg-2',
    senderId: 'user-2',
    senderName: 'Maria Garcia',
    senderAvatar: 'https://placehold.co/32x32.png?text=MG',
    content: 'Great work team! The concrete quality looks excellent. Uploading inspection photos.',
    timestamp: '2024-01-15T14:45:00Z',
    type: 'text',
    priority: 'normal',
    status: 'delivered',
    projectId: 'project-alpha',
    attachments: [
      { name: 'foundation_inspection.jpg', type: 'image', size: '2.4 MB', url: '#' },
      { name: 'quality_report.pdf', type: 'document', size: '1.1 MB', url: '#' }
    ]
  },
  {
    id: 'msg-3',
    senderId: 'user-3',
    senderName: 'David Chen',
    senderAvatar: 'https://placehold.co/32x32.png?text=DC',
    content: 'Weather forecast shows rain next week. Should we adjust the concrete pour schedule?',
    timestamp: '2024-01-15T15:00:00Z',
    type: 'text',
    priority: 'high',
    status: 'sent',
    projectId: 'project-alpha'
  }
];
