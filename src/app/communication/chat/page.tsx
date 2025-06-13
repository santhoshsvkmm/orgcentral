
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, PanelRightOpen } from "lucide-react";

export default function ChatInfoPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-primary" />
          Chat & Real-time Collaboration
        </h2>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Team Chat Functionality</CardTitle>
          <CardDescription>Access real-time chat, direct messaging, and collaboration tools.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="chat system info">
            <PanelRightOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Chat Panel Available</p>
            <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
              The team chat panel can be accessed by clicking the <MessageCircle className="inline-block h-4 w-4 mx-1"/> icon in the top navigation bar.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This panel provides access to direct messages and team collaboration features.
            </p>
          </div>
           <div className="mt-6 p-4 border-l-4 border-sky-500 bg-sky-50 rounded-md">
            <p className="font-semibold text-sky-700">Future Enhancements for Chat:</p>
            <ul className="list-disc list-inside text-sm text-sky-600 mt-1 space-y-1">
              <li>Dedicated chat channels for projects or teams.</li>
              <li>File sharing within chats.</li>
              <li>Threaded conversations.</li>
              <li>Integration with notifications for mentions and new messages.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
