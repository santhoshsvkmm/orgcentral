'use client';

import { PageTitle } from "@/components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubcontractorsLoading() {
  return (
    <>
      <PageTitle
        title="Subcontractor Management"
        description="Oversee and manage all subcontractors, their project involvements, and invitations."
      />
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full max-w-md" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}