
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, type FormEvent, useEffect } from "react";
import { format, parseISO } from 'date-fns';

export type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed" | "Cancelled";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  dueDate?: string; // Store as YYYY-MM-DD
  teamSize?: number;
}

interface ProjectFormProps {
  triggerButton: React.ReactNode;
  mode: 'create' | 'edit';
  projectData?: Project;
  onSave: (project: Project) => void;
}

const projectStatuses: ProjectStatus[] = ["Planning", "In Progress", "On Hold", "Completed", "Cancelled"];

export function ProjectForm({ triggerButton, mode, projectData, onSave }: ProjectFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('Planning');

  useEffect(() => {
    if (mode === 'edit' && projectData) {
      setName(projectData.name || '');
      setDescription(projectData.description || '');
      setDueDate(projectData.dueDate ? projectData.dueDate : '');
      setStatus(projectData.status || 'Planning');
    } else {
      // Defaults for create mode or if projectData is not available
      setName('');
      setDescription('');
      setDueDate('');
      setStatus('Planning');
    }
  }, [projectData, mode, isOpen]); // Re-run if dialog opens to reset/populate form

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    if (!name.trim()) {
        toast({ title: "Project Name Required", description: "Please enter a name for the project.", variant: "destructive" });
        return;
    }

    const newOrUpdatedProject: Project = {
      id: mode === 'create' ? Date.now().toString() : projectData!.id,
      name: name.trim(),
      description: description.trim(),
      dueDate: dueDate,
      status: status,
      teamSize: projectData?.teamSize // Preserve teamSize if editing, undefined for new
    };

    onSave(newOrUpdatedProject);
    toast({ title: mode === 'create' ? "Project Created" : "Project Updated", description: `Project "${newOrUpdatedProject.name}" has been ${mode === 'create' ? 'added' : 'updated'}.` });
    setIsOpen(false); // Close dialog on submit
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) { // Reset form when closing if not submitting
            if (mode === 'edit' && projectData) {
                setName(projectData.name || '');
                setDescription(projectData.description || '');
                setDueDate(projectData.dueDate ? projectData.dueDate : '');
                setStatus(projectData.status || 'Planning');
            } else {
                setName('');
                setDescription('');
                setDueDate('');
                setStatus('Planning');
            }
        }
    }}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{mode === 'create' ? 'Create New Project' : 'Edit Project'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Fill in the details to create a new project.' : 'Update the project details.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">Name</Label>
              <Input id="projectName" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="projectDescription" className="text-right pt-2">Description</Label>
              <Textarea
                id="projectDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description..."
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectDueDate" className="text-right">Due Date</Label>
              <Input id="projectDueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectStatus" className="text-right">Status</Label>
              <Select value={status} onValueChange={(value: ProjectStatus) => setStatus(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {projectStatuses.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
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
              {mode === 'create' ? 'Create Project' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
