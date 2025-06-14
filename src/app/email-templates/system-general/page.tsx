
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings2, PlusCircle, Mailbox } from "lucide-react";

export default function SystemGeneralTemplatesPage() {
  // Mock data
  const mockSystemTemplates = [
    { id: 'system-announcement-en', name: 'General Announcement (EN)', subject: 'Important Update from OrgCentral', language: 'English', event: 'System Announcement' },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Settings2 className="mr-2 h-5 w-5 text-primary" />
          System & General Templates
        </h2>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"> 
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Template 
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Templates for System & General Communications</CardTitle>
          <CardDescription>Manage general system notifications, administrative alerts, marketing emails (if applicable), and other non-user/project specific templates.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="general email templates list placeholder">
            <Mailbox className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">General Templates Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
              Manage templates for system-wide announcements, administrative messages, or other general communications. This area will also support multilingual content.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
