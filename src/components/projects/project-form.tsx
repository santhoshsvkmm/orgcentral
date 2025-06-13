
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState, type FormEvent, useEffect } from "react";

export type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed" | "Cancelled";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate?: string; // Store as YYYY-MM-DD
  dueDate?: string; // Store as YYYY-MM-DD
  teamSize?: number;
  geoLocation?: string;
  activateMicroScheduling?: boolean;
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
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('Planning');
  const [teamSize, setTeamSize] = useState<number | undefined>(undefined);
  const [geoLocation, setGeoLocation] = useState('');
  const [activateMicroScheduling, setActivateMicroScheduling] = useState(false);

  const resetFormFields = (data?: Project) => {
    setName(data?.name || '');
    setDescription(data?.description || '');
    setStartDate(data?.startDate || '');
    setDueDate(data?.dueDate || '');
    setStatus(data?.status || 'Planning');
    setTeamSize(data?.teamSize);
    setGeoLocation(data?.geoLocation || '');
    setActivateMicroScheduling(data?.activateMicroScheduling || false);
  };

  useEffect(() => {
    if (isOpen) { // Only reset/populate form when dialog is opened
        if (mode === 'edit' && projectData) {
            resetFormFields(projectData);
        } else {
            resetFormFields(); // Reset for create mode
        }
    }
  }, [projectData, mode, isOpen]);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    if (!name.trim()) {
        toast({ title: "Project Name Required", description: "Please enter a name for the project.", variant: "destructive" });
        return;
    }
    if (startDate && dueDate && new Date(startDate) > new Date(dueDate)) {
        toast({ title: "Invalid Dates", description: "Start date cannot be after due date.", variant: "destructive" });
        return;
    }

    const newOrUpdatedProject: Project = {
      id: mode === 'create' ? Date.now().toString() : projectData!.id,
      name: name.trim(),
      description: description.trim(),
      startDate: startDate,
      dueDate: dueDate,
      status: status,
      teamSize: teamSize ? Number(teamSize) : undefined,
      geoLocation: geoLocation.trim(),
      activateMicroScheduling: activateMicroScheduling,
    };

    onSave(newOrUpdatedProject);
    toast({ title: mode === 'create' ? "Project Created" : "Project Updated", description: `Project "${newOrUpdatedProject.name}" has been ${mode === 'create' ? 'added' : 'updated'}.` });
    setIsOpen(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
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
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
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
                className="col-span-3 min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectStartDate" className="text-right">Start Date</Label>
              <Input id="projectStartDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="col-span-3" />
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
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teamSize" className="text-right">Team Size</Label>
              <Input id="teamSize" type="number" value={teamSize === undefined ? '' : teamSize} onChange={(e) => setTeamSize(e.target.value ? parseInt(e.target.value) : undefined)} className="col-span-3" placeholder="e.g., 5" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="geoLocation" className="text-right">Geo-location</Label>
              <Input id="geoLocation" value={geoLocation} onChange={(e) => setGeoLocation(e.target.value)} className="col-span-3" placeholder="e.g., City, Country or Lat, Long" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="microScheduling" className="text-right">Micro Scheduling</Label>
               <div className="col-span-3 flex items-center">
                 <Switch
                    id="microScheduling"
                    checked={activateMicroScheduling}
                    onCheckedChange={setActivateMicroScheduling}
                    aria-labelledby="microScheduling-label"
                  />
                  <span id="microScheduling-label" className="text-sm text-muted-foreground ml-2">
                    {activateMicroScheduling ? 'Activated' : 'Deactivated'}
                  </span>
               </div>
            </div>
          </div>
          <DialogFooter className="pt-4">
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
