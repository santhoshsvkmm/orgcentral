
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, MailOpen } from "lucide-react"; // Using LayoutGrid consistent with layout.tsx

export default function EmailTemplatesOverviewPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <LayoutGrid className="mr-2 h-5 w-5 text-primary" />
          Email Templates Overview
        </h2>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Welcome to Email Template Management</CardTitle>
          <CardDescription>
            This module allows you to configure and personalize emails sent by OrgCentral for different events.
            Navigate using the menu above to manage specific template categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="email module overview">
            <MailOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Email Template Hub</p>
            <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
              Select a category from the navigation bar to view, create, or edit templates for user lifecycle events, project notifications, or general system communications.
            </p>
             <p className="text-xs text-muted-foreground mt-2">
              Future enhancements will include multilingual support and advanced template editing tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
