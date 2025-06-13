
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Image as ImageIcon, UploadCloud } from 'lucide-react';
import Image from 'next/image'; // Next.js Image component
import { Separator } from '@/components/ui/separator';

export default function BrandingSettingsPage() {
  const { toast } = useToast();

  const [logoLightPreview, setLogoLightPreview] = useState<string | null>('https://placehold.co/200x100.png?text=Light+Logo');
  const [logoLightFile, setLogoLightFile] = useState<File | null>(null);
  const [logoDarkPreview, setLogoDarkPreview] = useState<string | null>('https://placehold.co/200x100.png?text=Dark+Logo&bg=333333&text=FFFFFF');
  const [logoDarkFile, setLogoDarkFile] = useState<File | null>(null);

  const [primaryColor, setPrimaryColor] = useState('#4285F4'); 
  const [secondaryColor, setSecondaryColor] = useState('#FFA000'); 

  useEffect(() => {
    // Fetch current branding settings and populate the state
  }, []);

  const handleLogoLightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoLightFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoLightPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoLightFile(null);
      setLogoLightPreview('https://placehold.co/200x100.png?text=Light+Logo'); 
    }
  };

  const handleLogoDarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoDarkFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoDarkPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoDarkFile(null);
      setLogoDarkPreview('https://placehold.co/200x100.png?text=Dark+Logo&bg=333333&text=FFFFFF'); 
    }
  };

  const handleSaveChanges = () => {
    console.log("Branding Settings to save:", { logoLightFile, logoDarkFile, primaryColor, secondaryColor });
    if (logoLightFile) {
        console.log("Light mode logo to upload:", logoLightFile.name);
    }
    if (logoDarkFile) {
        console.log("Dark mode logo to upload:", logoDarkFile.name);
    }
    toast({
      title: "Branding Settings Saved",
      description: "Your branding preferences have been updated.",
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ImageIcon className="mr-2 h-5 w-5 text-primary" />
          Branding & Customization
        </CardTitle>
        <CardDescription>Manage your company logos and application theme colors.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div className="space-y-2">
          <Label htmlFor="companyLogoLight" className="text-base font-medium">Light Mode Logo</Label>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-48 h-24 rounded-md border border-dashed flex items-center justify-center bg-muted overflow-hidden">
              {logoLightPreview ? (
                <Image src={logoLightPreview} alt="Light mode logo preview" width={192} height={96} className="object-contain" data-ai-hint="company logo light" />
              ) : (
                <UploadCloud className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <Input id="companyLogoLight" type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoLightChange} className="max-w-xs" />
          </div>
          <p className="text-xs text-muted-foreground">Visible when light theme is active. Recommended: PNG, JPG, or SVG. Max size: 2MB. Aspect ratio: ~2:1.</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="companyLogoDark" className="text-base font-medium">Dark Mode Logo</Label>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-48 h-24 rounded-md border border-dashed flex items-center justify-center bg-slate-700 overflow-hidden">
              {logoDarkPreview ? (
                <Image src={logoDarkPreview} alt="Dark mode logo preview" width={192} height={96} className="object-contain" data-ai-hint="company logo dark" />
              ) : (
                <UploadCloud className="h-10 w-10 text-slate-400" />
              )}
            </div>
            <Input id="companyLogoDark" type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoDarkChange} className="max-w-xs" />
          </div>
          <p className="text-xs text-muted-foreground">Visible when dark theme is active. Ensure good contrast on dark backgrounds.</p>
        </div>

        <Separator />
        
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
