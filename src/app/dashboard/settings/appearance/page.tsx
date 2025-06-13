
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Palette } from 'lucide-react';

export default function AppearanceSettingsPage() {
  const { toast } = useToast();

  const [theme, setTheme] = useState('system'); 
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('medium'); 

  const handleSaveChanges = () => {
    // In a real app, persist these settings
    console.log("Appearance Settings saved:", { theme, language, fontSize });
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated.",
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="mr-2 h-5 w-5 text-primary" />
          Appearance & Accessibility
        </CardTitle>
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
        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 min-w-[150px]">
            <Save className="mr-2 h-4 w-4" />
            Save Appearance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
