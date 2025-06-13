
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Briefcase } from 'lucide-react';

export default function SchedulingSettingsPage() {
  const { toast } = useToast();
  const [nonWorkingDays, setNonWorkingDays] = useState('');

  const handleSaveChanges = () => {
    // In a real app, persist these settings
    console.log("Scheduling Settings saved:", { nonWorkingDays });
    toast({
      title: "Scheduling Settings Saved",
      description: "Your scheduling preferences have been updated.",
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-primary" />
            Scheduling Settings
        </CardTitle>
        <CardDescription>Configure non-working days for project planning.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="nonWorkingDays">Company Non-Working Days</Label>
          <Textarea
            id="nonWorkingDays"
            value={nonWorkingDays}
            onChange={(e) => setNonWorkingDays(e.target.value)}
            placeholder="Enter dates in YYYY-MM-DD format, separated by commas (e.g., 2024-12-25, 2025-01-01)"
            className="mt-1 min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            These dates will be excluded from working day calculations across projects.
          </p>
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 min-w-[150px]">
            <Save className="mr-2 h-4 w-4" />
            Save Scheduling
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
