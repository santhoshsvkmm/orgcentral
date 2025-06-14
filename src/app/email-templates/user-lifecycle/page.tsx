
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, PlusCircle, Mailbox } from "lucide-react";

export default function UserLifecycleTemplatesPage() {
  // Mock data for templates in this category - replace with actual data fetching
  const mockUserTemplates = [
    { id: 'user-create-en', name: 'New User Welcome (EN)', subject: 'Welcome to OrgCentral!', language: 'English', event: 'User Created' },
    { id: 'user-update-en', name: 'Profile Updated (EN)', subject: 'Your OrgCentral Profile Was Updated', language: 'English', event: 'User Updated' },
    { id: 'user-deactivate-en', name: 'Account Deactivated (EN)', subject: 'Your OrgCentral Account Has Been Deactivated', language: 'English', event: 'User Deactivated' },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <UserCog className="mr-2 h-5 w-5 text-primary" />
          User Lifecycle Templates
        </h2>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"> 
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Template 
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Templates for User Account Events</CardTitle>
          <CardDescription>Manage email templates for user creation, updates, deactivation, password resets, and other account-related communications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="user email templates list placeholder">
            <Mailbox className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">User Templates Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
              A list of user lifecycle email templates will be displayed here. You'll be able to edit content, subject lines, and manage translations for each template (e.g., Welcome Email, Password Reset, Account Deactivation).
            </p>
          </div>
          {/*
            Future DataTable implementation:
            <DataTable columns={templateColumns} data={mockUserTemplates} ... />
          */}
        </CardContent>
      </Card>
    </>
  );
}
