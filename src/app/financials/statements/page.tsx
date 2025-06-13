
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

export default function FinancialStatementsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <ScrollText className="mr-2 h-5 w-5 text-primary" />
          Financial Statements
        </h2>
        {/* Add actions like "Generate Report" button here */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Statements (P&L, Balance Sheet, Cash Flow)</CardTitle>
          <CardDescription>Generate and view key financial statements for your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="financial reports placeholder">
            <ScrollText className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Financial Statements Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">
              Profit & Loss, Balance Sheet, Cash Flow statements, and other financial reports will be generated here.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
