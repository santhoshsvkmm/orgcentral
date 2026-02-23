
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, type FormEvent, useEffect } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Define a more specific User type, assuming UserList also uses this or a compatible one
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  jobDescription?: string;
  // Add other fields that might be part of userData
}

interface UserFormProps {
  triggerButton: React.ReactNode;
  mode: 'create' | 'edit';
  userData?: User; // Use the User type
  onSave: (user: User | (Omit<User, 'id' | 'avatar'> & { avatar?: string })) => void; // For create, id and avatar are generated
}

const predefinedRoles = ["Admin", "Project Manager", "Member", "Editor", "Viewer", "Contributor", "HR Manager", "Project Lead", "Support Staff", "Analyst"];

export function UserForm({ triggerButton, mode, userData, onSave }: UserFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [aiSuggestedRoles, setAiSuggestedRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const allAvailableRoles = Array.from(new Set([...predefinedRoles, ...aiSuggestedRoles]));


  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' && userData) {
            setName(userData.name);
            setEmail(userData.email);
            setSelectedRole(userData.role);
            setJobDescription(userData.jobDescription || '');
            setAiSuggestedRoles([]); // Clear AI suggestions on open, user can re-trigger
        } else { // Create mode or no userData
            setName('');
            setEmail('');
            setSelectedRole('');
            setJobDescription('');
            setAiSuggestedRoles([]);
        }
    }
  }, [isOpen, mode, userData]);


  const handleSuggestRoles = async () => {
    if (!jobDescription) {
      toast({ title: "Job Description Missing", description: "Please enter a job description to get suggestions.", variant: "destructive" });
      return;
    }
    setIsLoadingSuggestions(true);
    setAiSuggestedRoles([]);
    try {
      // Call server API route instead of importing server-only genkit directly
      const res = await fetch('/api/ai/suggest-user-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });
      const result = await res.json();
      setAiSuggestedRoles(result.suggestedRoles || []);
      if (!result.suggestedRoles || result.suggestedRoles.length === 0) {
        toast({ title: "No Suggestions", description: "AI could not suggest roles for this description." });
      } else {
         toast({ title: "Roles Suggested!", description: "AI has provided role suggestions." });
         if (!selectedRole && result.suggestedRoles.length > 0) {
           setSelectedRole(result.suggestedRoles[0]); // Auto-select the first suggestion if no role is selected
         }
      }
    } catch (error)
    {
      console.error("Error suggesting roles:", error);
      toast({ title: "Error", description: "Failed to suggest roles. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !selectedRole) {
        toast({ title: "Missing Fields", description: "Please fill in Name, Email, and select a Role.", variant: "destructive"});
        return;
    }

    const userPayload = {
        name: name.trim(),
        email: email.trim(),
        role: selectedRole,
        jobDescription: jobDescription.trim(),
        ...(mode === 'edit' && userData ? { id: userData.id, avatar: userData.avatar } : {}) // Include id and avatar for edit
    };

    onSave(userPayload as User | (Omit<User, 'id' | 'avatar'> & { avatar?: string }) );
    
    toast({ title: mode === 'create' ? "User Created" : "User Updated", description: `User ${name} has been ${mode === 'create' ? 'added' : 'updated'}.` });
    setIsOpen(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{mode === 'create' ? 'Add New User' : 'Edit User'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Fill in the details to add a new user.' : 'Update the user details.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="col-span-3" required />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="jobDescription" className="text-right pt-2">Job Description</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter job description for AI role suggestions..."
                className="col-span-3 min-h-[100px]"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <div/> 
                <Button type="button" onClick={handleSuggestRoles} disabled={isLoadingSuggestions} variant="outline" className="col-span-3">
                  {isLoadingSuggestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                  Suggest Roles with AI
                </Button>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Select name="role" value={selectedRole} onValueChange={setSelectedRole} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {allAvailableRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role}{aiSuggestedRoles.includes(role) && !predefinedRoles.includes(role) ? ' (AI)' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4 pt-4 border-t">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {mode === 'create' ? 'Add User' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
