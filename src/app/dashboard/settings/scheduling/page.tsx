
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Briefcase } from 'lucide-react';

export default function SchedulingSettingsPage() {
  const { toast } = useToast();
  const [nonWorkingDays, setNonWorkingDays] = useState('');
  const [workWeek, setWorkWeek] = useState<'mon-fri' | 'mon-sat' | 'custom'>('mon-fri');
  const [defaultHoursPerDay, setDefaultHoursPerDay] = useState<number>(8);
  const [timezone, setTimezone] = useState<string>('UTC');
  const [autoScheduleEnabled, setAutoScheduleEnabled] = useState(true);
  const [holidayCalendar, setHolidayCalendar] = useState<string>('');

  const handleSaveChanges = () => {
    // In a real app, persist these settings
    console.log("Scheduling Settings saved:", { nonWorkingDays, workWeek, defaultHoursPerDay, timezone, autoScheduleEnabled, holidayCalendar });
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
          <Label className="font-medium">Work Week</Label>
          <div className="flex items-center gap-2 mt-2">
            <Button variant={workWeek === 'mon-fri' ? 'default' : 'outline'} onClick={() => setWorkWeek('mon-fri')}>Mon–Fri</Button>
            <Button variant={workWeek === 'mon-sat' ? 'default' : 'outline'} onClick={() => setWorkWeek('mon-sat')}>Mon–Sat</Button>
            <Button variant={workWeek === 'custom' ? 'default' : 'outline'} onClick={() => setWorkWeek('custom')}>Custom</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <Label htmlFor="hoursPerDay" className="md:col-span-1 font-medium">Default Hours / Day</Label>
          <input id="hoursPerDay" type="number" min={1} max={24} value={defaultHoursPerDay} onChange={(e) => setDefaultHoursPerDay(Number(e.target.value))} className="md:col-span-2 rounded-md border px-3 py-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <Label htmlFor="timezone" className="md:col-span-1 font-medium">Timezone</Label>
          <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} className="md:col-span-2 rounded-md border px-3 py-2">
            <option value="UTC">UTC</option>
            <option value="Local">Local</option>
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>

        <Separator />

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
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <Label className="md:col-span-1 font-medium">Auto Scheduling</Label>
          <div className="md:col-span-2">
            <div className="flex items-center justify-between p-2 border rounded-md">
              <div>
                <div className="font-medium">Enable Auto-Scheduling</div>
                <div className="text-xs text-muted-foreground">Automatically calculate task dates based on dependencies and resource availability.</div>
              </div>
              <select value={String(autoScheduleEnabled)} onChange={(e) => setAutoScheduleEnabled(e.target.value === 'true')} className="px-2 py-1 border rounded-md">
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            </div>

            <div className="mt-3">
              <Label className="font-medium">Holiday Calendar (iCal/CSV)</Label>
              <input type="text" value={holidayCalendar} onChange={(e) => setHolidayCalendar(e.target.value)} placeholder="Paste a URL to an iCal or upload CSV later" className="w-full rounded-md border px-3 py-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Use a public or internal calendar URL to sync company holidays.</p>
            </div>
          </div>
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
