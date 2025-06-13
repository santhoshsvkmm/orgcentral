
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, type FormEvent, useEffect } from "react";
import type { Warehouse } from "@/types/warehouse";

interface WarehouseFormProps {
  triggerButton: React.ReactNode;
  mode: 'create' | 'edit';
  projectId: string;
  warehouseData?: Warehouse;
  onSave: (warehouse: Warehouse) => void;
}

export function WarehouseForm({ triggerButton, mode, projectId, warehouseData, onSave }: WarehouseFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState('');

  const resetFormFields = (data?: Warehouse) => {
    setName(data?.name || '');
    setLocation(data?.location || '');
    setCapacity(data?.capacity);
    setNotes(data?.notes || '');
  };

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && warehouseData) {
        resetFormFields(warehouseData);
      } else {
        resetFormFields(); 
      }
    }
  }, [warehouseData, mode, isOpen]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    if (!name.trim()) {
        toast({ title: "Warehouse Name Required", description: "Please enter a name for the warehouse.", variant: "destructive" });
        return;
    }

    const now = new Date().toISOString();
    const newOrUpdatedWarehouse: Warehouse = {
      id: mode === 'create' ? `wh-${Date.now()}-${Math.random().toString(16).slice(2,8)}` : warehouseData!.id,
      projectId: projectId,
      name: name.trim(),
      location: location.trim() || undefined,
      capacity: capacity ? Number(capacity) : undefined,
      notes: notes.trim() || undefined,
      createdAt: mode === 'create' ? now : warehouseData!.createdAt,
      updatedAt: now,
    };

    onSave(newOrUpdatedWarehouse);
    toast({ title: mode === 'create' ? "Warehouse Created" : "Warehouse Updated", description: `Warehouse "${newOrUpdatedWarehouse.name}" has been saved.` });
    setIsOpen(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{mode === 'create' ? 'Create New Warehouse' : 'Edit Warehouse'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Fill in the details to create a new warehouse.' : 'Update the warehouse details.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="warehouseName" className="text-right">Name</Label>
              <Input id="warehouseName" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="warehouseLocation" className="text-right">Location</Label>
              <Input id="warehouseLocation" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" placeholder="e.g., Site A, Sector 2" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="warehouseCapacity" className="text-right">Capacity</Label>
              <Input 
                id="warehouseCapacity" 
                type="number" 
                value={capacity === undefined ? '' : capacity} 
                onChange={(e) => setCapacity(e.target.value ? parseInt(e.target.value) : undefined)} 
                className="col-span-3" 
                placeholder="e.g., 100 (sqm or units)" 
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="warehouseNotes" className="text-right pt-2">Notes</Label>
              <Textarea
                id="warehouseNotes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific notes about this warehouse..."
                className="col-span-3 min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter className="pt-4 border-t mt-2">
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {mode === 'create' ? 'Create Warehouse' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
