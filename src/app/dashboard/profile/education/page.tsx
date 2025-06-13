
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function EducationPage() {
  return (
    <>
      {/* PageTitle is now in the layout, specific title/actions can be here if needed */}
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-xl font-semibold text-foreground flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-primary" />
            Educational Background
        </h2>
        {/* Add actions like "Add Education Record" button here if needed */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Education History</CardTitle>
          <CardDescription>Manage your educational qualifications and achievements.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="education list placeholder">
            <GraduationCap className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Education Records Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">Your degrees, certifications, and other educational details will be listed here.</p>
            {/* Placeholder for listing education records */}
            {/* Example: <Button>Add Education</Button> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
