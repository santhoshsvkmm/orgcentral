
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, PlusCircle, Mailbox } from "lucide-react";

export default function ProjectNotificationTemplatesPage() {
  // Mock data for templates in this category
  const mockProjectTemplates = [
    { id: 'task-assigned-en', name: 'New Task Assignment (EN)', subject: 'You have a new task in OrgCentral', language: 'English', event: 'Task Assigned' },
    { id: 'task-update-en', name: 'Task Updated (EN)', subject: 'Task details have changed', language: 'English', event: 'Task Updated' },
    { id: 'rfi-response-en', name: 'RFI Response Received (EN)', subject: 'Response to your RFI', language: 'English', event: 'RFI Responded' },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <BellRing className="mr-2 h-5 w-5 text-primary" />
          Project Notification Templates
        </h2>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"> 
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Template 
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Templates for Project-Related Events</CardTitle>
          <CardDescription>Configure emails for project updates, task assignments, RFI notifications, milestone changes, and other project-specific communications.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="project email templates list placeholder">
            <Mailbox className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Project Templates Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
              Here you'll manage templates for notifications like 'New Task Assigned', 'Task Due Soon', 'Project Status Changed', 'RFI Submitted/Responded', etc., with multilingual support.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
