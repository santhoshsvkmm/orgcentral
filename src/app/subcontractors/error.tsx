'use client';

import { PageTitle } from "@/components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function SubcontractorsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Subcontractors page error:', error);
  }, [error]);

  return (
    <>
      <PageTitle
        title="Subcontractor Management"
        description="Oversee and manage all subcontractors, their project involvements, and invitations."
      />
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center py-10">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">Something went wrong!</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              We encountered an error while loading the subcontractors page. Please try again or contact support if the problem persists.
            </p>
            <Button onClick={reset} className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}