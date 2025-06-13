
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react"; // Using a distinct alias

export default function EmployeeDirectoryPage() {
  return (
    <>
      {/* The PageTitle and navigation tabs are in hr/layout.tsx */}
      {/* This page specifically renders the content for Employee Directory */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <UsersIcon className="mr-2 h-5 w-5 text-primary" />
          Employee Directory
        </h2>
        {/* Add actions like "Add Employee" button here if needed */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Directory Management</CardTitle>
          <CardDescription>View, search, and manage employee profiles and contact information.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="employee list placeholder">
            <UsersIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Employee Directory Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">A list or grid of employee profiles will be displayed here.</p>
            {/* Placeholder for employee list, search, filters, etc. */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
