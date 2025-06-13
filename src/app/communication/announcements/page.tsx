
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from "lucide-react";
import Image from 'next/image';

export default function AnnouncementsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Megaphone className="mr-2 h-5 w-5 text-primary" />
          Company Announcements
        </h2>
        {/* Add actions like "Create Announcement" button here */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
          <CardDescription>Broadcast important news, updates, and information to the organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-0 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed overflow-hidden">
             <Image 
              src="https://images.unsplash.com/photo-1505875800042-d85395a31692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Announcements concept" 
              width={1200} 
              height={800} 
              className="w-full h-full object-cover"
              data-ai-hint="megaphone announcement"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
