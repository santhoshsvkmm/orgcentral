
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Bell } from 'lucide-react';

export default function NotificationSettingsPage() {
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    emailNewTasks: true,
    emailProjectUpdates: false,
    pushDesktop: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = () => {
    // In a real app, persist these settings
    console.log("Notification Settings saved:", { notifications });
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Manage how you receive notifications from the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <Label htmlFor="emailNewTasks" className="flex flex-col space-y-1 cursor-pointer flex-grow">
              <span>Email for new tasks</span>
              <span className="font-normal leading-snug text-muted-foreground text-sm">
                Receive an email when you are assigned a new task or mentioned.
              </span>
            </Label>
            <Switch
              id="emailNewTasks"
              checked={notifications.emailNewTasks}
              onCheckedChange={() => handleNotificationChange('emailNewTasks')}
              aria-labelledby="emailNewTasksLabel"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <Label htmlFor="emailProjectUpdates" className="flex flex-col space-y-1 cursor-pointer flex-grow">
              <span>Email for project updates</span>
              <span className="font-normal leading-snug text-muted-foreground text-sm">
                Get email summaries of key project activities and milestones.
              </span>
            </Label>
            <Switch
              id="emailProjectUpdates"
              checked={notifications.emailProjectUpdates}
              onCheckedChange={() => handleNotificationChange('emailProjectUpdates')}
              aria-labelledby="emailProjectUpdatesLabel"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <Label htmlFor="pushDesktop" className="flex flex-col space-y-1 cursor-pointer flex-grow">
              <span>Desktop push notifications</span>
              <span className="font-normal leading-snug text-muted-foreground text-sm">
                Receive real-time push notifications on your desktop (if supported).
              </span>
            </Label>
            <Switch
              id="pushDesktop"
              checked={notifications.pushDesktop}
              onCheckedChange={() => handleNotificationChange('pushDesktop')}
              aria-labelledby="pushDesktopLabel"
            />
          </div>
           <div className="flex justify-end pt-4">
            <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 min-w-[150px]">
              <Save className="mr-2 h-4 w-4" />
              Save Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
