'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { suggestUserRole } from "@/ai/flows/suggest-user-role"; // Assuming this path is correct
import { useState, type FormEvent } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface UserFormProps {
  triggerButton: React.ReactNode;
  mode: 'create' | 'edit';
  userData?: any; // Define a proper user type later
}

export function UserForm({ triggerButton, mode, userData }: UserFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState(userData?.jobDescription || '');
  const [suggestedRoles, setSuggestedRoles] = useState<string[]>(userData?.suggestedRoles || []);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedRole, setSelectedRole] = useState(userData?.role || '');
  const { toast } = useToast();

  const handleSuggestRoles = async () => {
    if (!jobDescription) {
      toast({ title: "Job Description Missing", description: "Please enter a job description to get suggestions.", variant: "destructive" });
      return;
    }
    setIsLoadingSuggestions(true);
    setSuggestedRoles([]); // Clear previous suggestions
    try {
      const result = await suggestUserRole({ jobDescription });
      setSuggestedRoles(result.suggestedRoles);
      if (result.suggestedRoles.length === 0) {
        toast({ title: "No Suggestions", description: "AI could not suggest roles for this description." });
      } else {
         toast({ title: "Roles Suggested!", description: "AI has provided role suggestions." });
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
    // Handle form submission logic here
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name');
    const email = formData.get('email');
    // Use selectedRole state
    console.log({ name, email, role: selectedRole, jobDescription });
    toast({ title: mode === 'create' ? "User Created" : "User Updated", description: `User ${name} has been ${mode === 'create' ? 'added' : 'updated'}.` });
    setIsOpen(false); // Close dialog on submit
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" defaultValue={userData?.name || ""} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={userData?.email || ""} className="col-span-3" required />
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
                <div/> {/* Empty cell for alignment */}
                <Button type="button" onClick={handleSuggestRoles} disabled={isLoadingSuggestions} variant="outline" className="col-span-3">
                  {isLoadingSuggestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                  Suggest Roles with AI
                </Button>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Select name="role" value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {/* Predefined roles + AI suggested roles */}
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  {suggestedRoles.map(role => (
                    <SelectItem key={role} value={role.toLowerCase().replace(/\s+/g, '-')}>
                      {role} (AI)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
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
