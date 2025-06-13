
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Palette, Languages as LanguagesIcon, Moon, Sun, Laptop } from 'lucide-react'; // Added icons
import { useTheme } from 'next-themes';

export default function AppearanceSettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme, resolvedTheme } = useTheme(); // Use resolvedTheme to know the actual current theme when 'system' is selected

  // State for theme is now managed by next-themes
  const [language, setLanguage] = useState('en'); // Placeholder for language
  const [fontSize, setFontSize] = useState('medium'); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure component is mounted before using theme state to avoid hydration mismatch
  }, []);

  const handleSaveChanges = () => {
    // Theme is already persisted by next-themes
    // In a real app, persist language and fontSize settings
    console.log("Appearance Settings saved:", { selectedTheme: theme, language, fontSize });
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated.",
    });
  };

  if (!mounted) {
    // Render nothing or a skeleton loader until the component is mounted
    // This helps avoid hydration errors with next-themes
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
                <div className="h-10 bg-muted rounded-md animate-pulse"></div>
                <Separator />
                <div className="h-10 bg-muted rounded-md animate-pulse"></div>
                <Separator />
                <div className="h-10 bg-muted rounded-md animate-pulse"></div>
                <div className="flex justify-end pt-4">
                    <Button disabled className="min-w-[150px]">
                        <Save className="mr-2 h-4 w-4" />
                        Save Appearance
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
  }

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
        <div className="space-y-2">
          <Label className="font-medium">Theme</Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')} className="flex-1 justify-start">
                <Sun className="mr-2 h-4 w-4" /> Light
            </Button>
            <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')} className="flex-1 justify-start">
                <Moon className="mr-2 h-4 w-4" /> Dark
            </Button>
            <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')} className="flex-1 justify-start">
                <Laptop className="mr-2 h-4 w-4" /> System
            </Button>
          </div>
           <p className="text-xs text-muted-foreground mt-1">
            Current actual theme: <span className="font-semibold">{resolvedTheme}</span>
          </p>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <Label htmlFor="languagePreference" className="md:col-span-1 font-medium flex items-center">
            <LanguagesIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Language
          </Label>
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
              {/* Add more languages as needed */}
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
