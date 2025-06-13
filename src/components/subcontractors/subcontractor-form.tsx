
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState, type FormEvent, useEffect } from "react";
import type { Subcontractor, SubcontractorProjectMapping, SuppliedService } from "@/types/subcontractor";
import { PlusCircle, Trash2, AlertTriangle } from "lucide-react";
import { Separator } from "../ui/separator";

interface SubcontractorFormProps {
  triggerButton: React.ReactNode;
  mode: 'create' | 'edit';
  subcontractorData?: Subcontractor;
  onSave: (subcontractor: Omit<Subcontractor, 'id' | 'createdAt' | 'updatedAt'> | Subcontractor) => void;
}

const allServiceTypes: SuppliedService[] = ["Material", "Labour", "Equipment"];

export function SubcontractorForm({ triggerButton, mode, subcontractorData, onSave }: SubcontractorFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Subcontractor fields
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [trade, setTrade] = useState('');
  const [address, setAddress] = useState('');
  const [mappedProjects, setMappedProjects] = useState<SubcontractorProjectMapping[]>([]);

  const resetFormFields = (data?: Subcontractor) => {
    setName(data?.name || '');
    setContactPerson(data?.contactPerson || '');
    setEmail(data?.email || '');
    setPhone(data?.phone || '');
    setTrade(data?.trade || '');
    setAddress(data?.address || '');
    setMappedProjects(data?.mappedProjects ? JSON.parse(JSON.stringify(data.mappedProjects)) : []); // Deep copy
  };

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && subcontractorData) {
        resetFormFields(subcontractorData);
      } else {
        resetFormFields();
      }
    }
  }, [subcontractorData, mode, isOpen]);

  const handleAddProjectMapping = () => {
    setMappedProjects([
      ...mappedProjects,
      {
        id: `map-temp-${Date.now()}`, // Temporary ID for new mapping
        projectId: '',
        projectName: '',
        projectSpecificEmail: '',
        projectSpecificPassword: '',
        suppliedServices: [],
      },
    ]);
  };

  const handleRemoveProjectMapping = (index: number) => {
    setMappedProjects(mappedProjects.filter((_, i) => i !== index));
  };

  const handleProjectMappingChange = (index: number, field: keyof SubcontractorProjectMapping, value: any) => {
    const newMappedProjects = [...mappedProjects];
    (newMappedProjects[index] as any)[field] = value;
    setMappedProjects(newMappedProjects);
  };

  const handleServiceTypeChange = (projectIndex: number, service: SuppliedService, checked: boolean) => {
    const newMappedProjects = [...mappedProjects];
    const currentServices = newMappedProjects[projectIndex].suppliedServices;
    if (checked) {
      if (!currentServices.includes(service)) {
        newMappedProjects[projectIndex].suppliedServices = [...currentServices, service];
      }
    } else {
      newMappedProjects[projectIndex].suppliedServices = currentServices.filter(s => s !== service);
    }
    setMappedProjects(newMappedProjects);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !contactPerson.trim() || !email.trim() || !trade.trim()) {
      toast({ title: "Missing Fields", description: "Please fill in Name, Contact Person, Email, and Trade.", variant: "destructive" });
      return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        toast({ title: "Invalid Email", description: "Please enter a valid general email address.", variant: "destructive"});
        return;
    }
    
    // Validate project specific emails if any
    for (const project of mappedProjects) {
        if (project.projectSpecificEmail && !/\S+@\S+\.\S+/.test(project.projectSpecificEmail)) {
            toast({ title: "Invalid Project Email", description: `Please enter a valid email for project: ${project.projectName || 'Unnamed Project'}.`, variant: "destructive"});
            return;
        }
         if (!project.projectName.trim() && (project.projectSpecificEmail || project.projectSpecificPassword || project.suppliedServices.length > 0)) {
            toast({ title: "Missing Project Name", description: `Please provide a name for the project mapping with email/password/services.`, variant: "destructive"});
            return;
        }
    }


    const payload = {
      name: name.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim(),
      phone: phone.trim(),
      trade: trade.trim(),
      address: address.trim(),
      mappedProjects: mappedProjects.filter(p => p.projectName.trim() !== ''), // Only save mappings with a project name
    };

    if (mode === 'create') {
      onSave(payload as Omit<Subcontractor, 'id' | 'createdAt' | 'updatedAt'>);
    } else if (subcontractorData) {
      onSave({ ...subcontractorData, ...payload } as Subcontractor);
    }

    toast({ title: mode === 'create' ? "Subcontractor Created" : "Subcontractor Updated", description: `Subcontractor "${name}" has been saved.` });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl"> {/* Increased width */}
        <DialogHeader>
          <DialogTitle className="font-headline">{mode === 'create' ? 'Add New Subcontractor' : 'Edit Subcontractor'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Fill in the details for the new subcontractor.' : 'Update the subcontractor details.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-3">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subName">Company Name</Label>
                <Input id="subName" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="subContactPerson">Contact Person</Label>
                <Input id="subContactPerson" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="subEmail">Email (General)</Label>
                <Input id="subEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="subPhone">Phone</Label>
                <Input id="subPhone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="subTrade">Trade/Specialty</Label>
                <Input id="subTrade" value={trade} onChange={(e) => setTrade(e.target.value)} placeholder="e.g., Electrical, Plumbing, HVAC" required />
              </div>
               <div>
                <Label htmlFor="subAddress">Address</Label>
                <Textarea id="subAddress" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Company address" />
              </div>
            </div>

            <Separator className="my-2" />

            {/* Project Mappings */}
            <div>
              <h3 className="text-lg font-medium mb-3">Project Mappings</h3>
              {mappedProjects.map((project, index) => (
                <div key={project.id || `project-${index}`} className="p-4 border rounded-md mb-4 space-y-3 bg-muted/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-md">Project Mapping #{index + 1}</h4>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveProjectMapping(index)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`projName-${index}`}>Project Name</Label>
                      <Input id={`projName-${index}`} value={project.projectName} onChange={(e) => handleProjectMappingChange(index, 'projectName', e.target.value)} placeholder="e.g., Alpha Launch Site A" />
                    </div>
                    <div>
                      <Label htmlFor={`projId-${index}`}>Project ID (Optional)</Label>
                      <Input id={`projId-${index}`} value={project.projectId} onChange={(e) => handleProjectMappingChange(index, 'projectId', e.target.value)} placeholder="Internal Project ID" />
                    </div>
                    <div>
                      <Label htmlFor={`projEmail-${index}`}>Project Specific Email</Label>
                      <Input id={`projEmail-${index}`} type="email" value={project.projectSpecificEmail} onChange={(e) => handleProjectMappingChange(index, 'projectSpecificEmail', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor={`projPass-${index}`}>Project Specific Password</Label>
                      <Input id={`projPass-${index}`} type="password" value={project.projectSpecificPassword || ''} onChange={(e) => handleProjectMappingChange(index, 'projectSpecificPassword', e.target.value)} />
                       <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" /> Store hashed passwords in a real app.
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="block mb-1.5">Supplied Services</Label>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {allServiceTypes.map(service => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={`service-${index}-${service}`}
                            checked={project.suppliedServices.includes(service)}
                            onCheckedChange={(checked) => handleServiceTypeChange(index, service, !!checked)}
                          />
                          <Label htmlFor={`service-${index}-${service}`} className="font-normal text-sm">{service}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddProjectMapping} className="mt-2">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Project Mapping
              </Button>
            </div>
          </div>
          <DialogFooter className="pt-6 border-t mt-4">
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {mode === 'create' ? 'Create Subcontractor' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
