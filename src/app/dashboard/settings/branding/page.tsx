
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Image as ImageIcon, UploadCloud } from 'lucide-react';
import Image from 'next/image'; // Next.js Image component

export default function BrandingSettingsPage() {
  const { toast } = useToast();

  const [logoPreview, setLogoPreview] = useState<string | null>('https://placehold.co/200x100.png?text=Your+Logo');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#4285F4'); // Default to current primary
  const [secondaryColor, setSecondaryColor] = useState('#FFA000'); // Default to current accent

  // In a real app, you would fetch current branding settings
  useEffect(() => {
    // Fetch current branding settings and populate the state
    // For now, using defaults
    // e.g., setPrimaryColor(fetchedSettings.primaryColor || '#4285F4');
  }, []);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoFile(null);
      // Revert to placeholder or fetched logo if selection is cleared
      setLogoPreview('https://placehold.co/200x100.png?text=Your+Logo'); 
    }
  };

  const handleSaveChanges = () => {
    // In a real app, persist these settings (upload logo, save colors)
    console.log("Branding Settings to save:", { logoFile, primaryColor, secondaryColor });
    if (logoFile) {
        console.log("Logo to upload:", logoFile.name);
        // Add actual logo upload logic here
    }
    toast({
      title: "Branding Settings Saved",
      description: "Your branding preferences have been updated.",
    });
    // Note: Applying these colors to the theme dynamically is a separate, more complex task.
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ImageIcon className="mr-2 h-5 w-5 text-primary" />
          Branding & Customization
        </CardTitle>
        <CardDescription>Manage your company logo and application theme colors.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div className="space-y-2">
          <Label htmlFor="companyLogo" className="text-base font-medium">Company Logo</Label>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-48 h-24 rounded-md border border-dashed flex items-center justify-center bg-muted overflow-hidden">
              {logoPreview ? (
                <Image src={logoPreview} alt="Logo preview" width={192} height={96} className="object-contain" data-ai-hint="company logo" />
              ) : (
                <UploadCloud className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <Input id="companyLogo" type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoChange} className="max-w-xs" />
          </div>
          <p className="text-xs text-muted-foreground">Recommended: PNG, JPG, or SVG. Max size: 2MB. Aspect ratio: ~2:1.</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="primaryColor" className="text-base font-medium">Primary Color</Label>
          <div className="flex items-center gap-3 max-w-xs">
            <Input 
              id="primaryColor" 
              type="color" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)} 
              className="w-16 h-10 p-1" 
            />
            <Input 
              type="text" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)} 
              placeholder="#RRGGBB"
              className="flex-grow"
            />
          </div>
          <p className="text-xs text-muted-foreground">Used for main interactive elements, buttons, and highlights.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryColor" className="text-base font-medium">Accent Color</Label>
           <div className="flex items-center gap-3 max-w-xs">
            <Input 
              id="secondaryColor" 
              type="color" 
              value={secondaryColor} 
              onChange={(e) => setSecondaryColor(e.target.value)} 
              className="w-16 h-10 p-1" 
            />
            <Input 
                type="text" 
                value={secondaryColor} 
                onChange={(e) => setSecondaryColor(e.target.value)} 
                placeholder="#RRGGBB"
                className="flex-grow"
            />
          </div>
          <p className="text-xs text-muted-foreground">Used for secondary actions, accents, or to differentiate elements.</p>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 min-w-[150px]">
            <Save className="mr-2 h-4 w-4" />
            Save Branding
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
