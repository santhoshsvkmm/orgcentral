
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function PerformanceReviewsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Star className="mr-2 h-5 w-5 text-primary" />
          Performance Reviews
        </h2>
        {/* Add actions like "Start New Review Cycle" button here */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Employee Performance Evaluation</CardTitle>
          <CardDescription>Conduct, track, and manage employee performance reviews and feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="performance review list placeholder">
            <Star className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Performance Reviews Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">
              System for setting goals, conducting reviews, and storing performance history will be here.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
