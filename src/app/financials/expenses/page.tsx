
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptLong } from "lucide-react";

export default function ExpensesPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <ReceiptLong className="mr-2 h-5 w-5 text-primary" />
          Expense Tracking
        </h2>
        {/* Add actions like "Log Expense" button here */}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>Record, categorize, and track all organizational and project expenses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="expense list placeholder">
            <ReceiptLong className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-foreground">Expense Tracking Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1">
              Features for logging expenses, attaching receipts, and expense reporting will be here.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
