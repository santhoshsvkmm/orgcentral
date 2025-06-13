
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function WorkExperiencePage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-primary" />
            Work Experience
        </h2>
        {/* Add actions like "Add Work Experience" button here if needed */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Professional History</CardTitle>
          <CardDescription>Showcase your previous roles and responsibilities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="work experience list placeholder">
            <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Work Experience Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Your previous job titles, companies, and accomplishments will be listed here.</p>
            {/* Placeholder for listing work experience */}
            {/* Example: <Button>Add Experience</Button> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
