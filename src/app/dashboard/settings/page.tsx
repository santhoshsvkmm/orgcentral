
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Mail } from 'lucide-react'; // Changed Bell to Mail

export default function EmailNotificationSettingsPage() {
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    emailNewTasks: true,
    emailProjectUpdates: false,
    // Desktop push notifications removed as per request to focus on email
  });

  // Adjust key type to match the new state
  const handleNotificationChange = (key: keyof Pick<typeof notifications, 'emailNewTasks' | 'emailProjectUpdates'>) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = () => {
    // In a real app, persist these settings
    console.log("Email Notification Settings saved:", { notifications });
    toast({
      title: "Email Notification Settings Saved",
      description: "Your email notification preferences have been updated.",
    });
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-primary" /> {/* Changed Bell to Mail icon */}
            Email Notification Preferences
          </CardTitle>
          <CardDescription>Manage how you receive email notifications from the application.</CardDescription>
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
          
           <div className="flex justify-end pt-4">
            <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 min-w-[150px]">
              <Save className="mr-2 h-4 w-4" />
              Save Email Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

