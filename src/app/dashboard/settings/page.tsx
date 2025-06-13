
'use client';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    emailNewTasks: true,
    emailProjectUpdates: false,
    pushDesktop: true,
  });
  const [theme, setTheme] = useState('system'); // 'light', 'dark', 'system'
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = () => {
    // In a real app, you would persist these settings (e.g., to localStorage or a backend)
    console.log("Settings saved:", { notifications, theme, language, fontSize });
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <>
      <PageTitle
        title="Application Settings"
        description="Customize your application experience and preferences."
      />
      <div className="space-y-8 max-w-3xl mx-auto">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
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
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Appearance & Accessibility</CardTitle>
            <CardDescription>Customize the look, feel, and accessibility of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label htmlFor="themePreference" className="md:col-span-1 font-medium">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="themePreference" className="md:col-span-2">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <Separator />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label htmlFor="languagePreference" className="md:col-span-1 font-medium">Language</Label>
               <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="languagePreference" className="md:col-span-2">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (US)</SelectItem>
                  <SelectItem value="en-gb">English (UK)</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label htmlFor="fontSizePreference" className="md:col-span-1 font-medium">Font Size</Label>
               <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger id="fontSizePreference" className="md:col-span-2">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium (Default)</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 min-w-[150px]">
            <Save className="mr-2 h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </div>
    </>
  );
}
