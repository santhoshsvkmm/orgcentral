
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { Edit3, Save, UserCircle } from 'lucide-react'; // Added UserCircle
import { useToast } from '@/hooks/use-toast';

export default function PersonalInformationPage() {
  const { toast } = useToast();
  // Mock user data, in a real app, fetch this
  const [user, setUser] = useState({
    name: 'Demo User',
    email: 'demo@orgcentral.com',
    role: 'Administrator', // Role display might be moved or kept as read-only info
    bio: 'Experienced project manager with a knack for leading cross-functional teams to deliver high-quality software solutions. Passionate about agile methodologies and continuous improvement.',
    avatarUrl: 'https://placehold.co/128x128.png',
    phone: 'N/A',
    address: 'N/A',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData); 
    setIsEditing(false);
    toast({
      title: 'Personal Information Updated',
      description: 'Your personal details have been successfully saved.',
    });
  };

  const handleCancelEdit = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <>
      {/* PageTitle is now in the layout, specific title/actions can be here if needed */}
      {/* For example, a sub-title or actions specific to "Personal Information" */}
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <UserCircle className="mr-2 h-5 w-5 text-primary" />
          Personal Details
        </h2>
        {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button onClick={handleCancelEdit} variant="outline">
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Personal Info
            </Button>
          )}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="items-center text-center p-6">
              <Avatar className="h-32 w-32 mb-4 border-2 border-primary shadow-lg">
                <AvatarImage src={isEditing ? formData.avatarUrl : user.avatarUrl} alt={formData.name} data-ai-hint="user portrait" />
                <AvatarFallback className="text-3xl">{formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-headline">{isEditing ? formData.name : user.name}</CardTitle>
              <CardDescription>{user.role}</CardDescription> {/* Display role if relevant here */}
            </CardHeader>
            {isEditing && (
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                   <Label htmlFor="avatarUrl">Avatar URL</Label>
                   <Input name="avatarUrl" id="avatarUrl" value={formData.avatarUrl} onChange={handleInputChange} placeholder="https://example.com/avatar.png" />
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="p-6">
              <CardTitle>Contact & Basic Information</CardTitle>
              <CardDescription>Manage your contact details and basic personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <Label htmlFor="name" className="font-semibold">Full Name</Label>
                {isEditing ? (
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1" />
                ) : (
                  <p className="text-foreground mt-1 text-base">{user.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="font-semibold">Email Address</Label>
                 {isEditing ? (
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="mt-1" />
                ) : (
                  <p className="text-foreground mt-1 text-base">{user.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="font-semibold">Phone Number</Label>
                {isEditing ? (
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1" placeholder="e.g., +1 555-123-4567"/>
                ) : (
                  <p className="text-muted-foreground mt-1 text-base">{user.phone}</p>
                )}
              </div>
               <div>
                <Label htmlFor="address" className="font-semibold">Address</Label>
                {isEditing ? (
                  <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 min-h-[80px]" placeholder="e.g., 123 Main St, Anytown, USA" />
                ) : (
                  <p className="text-muted-foreground mt-1 whitespace-pre-line text-base">{user.address}</p>
                )}
              </div>
              <div>
                <Label htmlFor="bio" className="font-semibold">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="mt-1 min-h-[120px]"
                    placeholder="Tell us a little about yourself..."
                  />
                ) : (
                  <p className="text-muted-foreground mt-1 whitespace-pre-line text-base">{user.bio || 'No bio provided.'}</p>
                )}
              </div>
              <div>
                <Label htmlFor="role" className="font-semibold">Current Role</Label>
                <p className="text-muted-foreground mt-1 text-base">{user.role} (Managed by administrators)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
