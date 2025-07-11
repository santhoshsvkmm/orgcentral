
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ClipboardList } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock function to get project name - in a real app, fetch this or pass via props
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}


export default function MeetingNotesPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  
  const projectName = use(getProjectNameById(projectId));


  return (
    <>
      <PageTitle
        title={`Meeting Notes: ${projectName}`}
        description="Log and organize meeting minutes, decisions, and action items for the project."
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project Details
            </Link>
          </Button>
        }
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="mr-2 h-5 w-5 text-primary" />
            Meeting Minutes & Notes
          </CardTitle>
          <CardDescription>
            This area is for documenting all project-related meeting discussions, decisions made, and action items assigned.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Meeting Notes Section */}
 <div className="space-y-4">
 <h3 className="text-lg font-semibold">Add New Meeting Note</h3>
 <div className="grid gap-2">
 <Label htmlFor="meetingDate">Date</Label>
 <Input id="meetingDate" type="date" />
 </div>
 <div className="grid gap-2">
 <Label htmlFor="meetingTopic">Topic</Label>
 <Input id="meetingTopic" type="text" placeholder="Meeting Topic" />
 </div>
 <div className="grid gap-2">
 <Label htmlFor="meetingNotes">Notes</Label>
 {/* Replace with a Rich Text Editor later */}
 <textarea
 id="meetingNotes"
 className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
 placeholder="Enter meeting notes here..."
 ></textarea>
 </div>
 <Button>Save Meeting Note</Button>
 </div>

 {/* Previous Meeting Notes Section */}
 <div className="space-y-4 mt-8">
 <h3 className="text-lg font-semibold">Previous Meeting Notes</h3>
 <div className="p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-48 border border-dashed">
 <p className="text-sm text-muted-foreground">Previous meeting notes will be listed here.</p>
 </div>
 </div>
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-md">
            <p className="font-semibold text-purple-700">Note on Meeting Notes Management:</p>
            <p className="text-sm text-purple-600 mt-1">
             Effective meeting note management would include features for creating notes with rich text, assigning action items to users, setting due dates, and tracking completion.
            </p>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-72 border border-dashed" data-ai-hint="meeting minutes records">
            <ClipboardList className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Meeting Notes Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">A chronological list or organized repository of meeting notes will be available here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include templates for meeting agendas and minutes, automated reminders for action items, and integration with project tasks.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
