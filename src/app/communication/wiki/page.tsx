
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Image from 'next/image';

export default function WikiPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          Internal Wiki / Knowledge Base
        </h2>
        {/* Add actions like "Create New Page" or "Edit Article" button here */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>A central repository for company documentation, guides, policies, and shared knowledge.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-0 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Knowledge base concept with books" 
              width={1200} 
              height={800} 
              className="w-full h-full object-cover"
              data-ai-hint="knowledge books"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
