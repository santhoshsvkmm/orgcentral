
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { PlusCircle, ShoppingCart, Calendar as CalendarIcon, Package, User, Link as LinkIcon } from 'lucide-react';

interface AddMaterialFormProps {
  onAddMaterial?: (material: any) => void;
}

const MOCK_TASKS = [
  { id: 'task-101', name: 'Foundation Pouring' },
  { id: 'task-102', name: 'Site Clearing' },
  { id: 'task-103', name: 'Electrical Rough-in' },
  { id: 'task-104', name: 'Interior Partitioning' },
  { id: 'task-105', name: 'HVAC Installation' },
];

export default function AddMaterialForm({ onAddMaterial }: AddMaterialFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specifications: '',
    quantity: '',
    unit: 'units',
    supplier: '',
    estimatedCost: '',
    deliveryDate: '',
    priority: 'Medium',
    taskId: '',
    requestedBy: 'Current User',
    location: 'Main Bay',
    procurementType: 'Supplier',
    batchNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddMaterial) {
      onAddMaterial({
        ...formData,
        id: `mat-${Date.now()}`,
        status: 'Requested',
        createdAt: new Date().toISOString()
      });
    }
    setOpen(false);
    // Reset form
    setFormData({
      name: '',
      specifications: '',
      quantity: '',
      unit: 'units',
      supplier: '',
      estimatedCost: '',
      deliveryDate: '',
      priority: 'Medium',
      taskId: '',
      requestedBy: 'Current User',
      location: 'Main Bay',
      procurementType: 'Supplier',
      batchNumber: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Procurement Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-none shadow-2xl p-0 overflow-hidden rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-indigo-600 p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                New Procurement Request
              </DialogTitle>
              <DialogDescription className="text-indigo-100">
                Detailed material request for project inventory and task assignment.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="name" className="text-xs font-bold uppercase text-slate-500">Material Name</Label>
              <Input
                id="name"
                placeholder="e.g. Portland Cement, Steel Rebar..."
                required
                className="bg-slate-50 border-slate-200"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="specs" className="text-xs font-bold uppercase text-slate-500">Specifications / Notes</Label>
              <Textarea
                id="specs"
                placeholder="Grade, dimensions, special handling..."
                className="bg-slate-50 border-slate-200 min-h-[50px]"
                value={formData.specifications}
                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="qty" className="text-xs font-bold uppercase text-slate-500">Quantity</Label>
              <div className="flex gap-2">
                <Input
                  id="qty"
                  type="number"
                  placeholder="0"
                  required
                  className="bg-slate-50 border-slate-200"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
                <Select value={formData.unit} onValueChange={(v) => setFormData({ ...formData, unit: v })}>
                  <SelectTrigger className="w-[100px] bg-slate-50 border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="units">Units</SelectItem>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="m">Meters</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cost" className="text-xs font-bold uppercase text-slate-500">Est. Unit Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                placeholder="0.00"
                className="bg-slate-50 border-slate-200"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-slate-500">Linked Project Task</Label>
              <Select value={formData.taskId} onValueChange={(v) => setFormData({ ...formData, taskId: v })}>
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-3.5 w-3.5 text-indigo-500" />
                    <SelectValue placeholder="Select a task..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {MOCK_TASKS.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-xs font-bold uppercase text-slate-500">Required Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="date"
                  type="date"
                  className="pl-9 bg-slate-50 border-slate-200"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-slate-500">Procurement Type</Label>
              <Select value={(formData as any).procurementType || 'Supplier'} onValueChange={(v) => setFormData({ ...formData, procurementType: v } as any)}>
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Direct Purchase">Direct Purchase</SelectItem>
                  <SelectItem value="Supplier">Supplier</SelectItem>
                  <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="supplier" className="text-xs font-bold uppercase text-slate-500">
                {(formData as any).procurementType === 'Direct Purchase' ? 'Store / Vendor Name' : (formData as any).procurementType === 'Subcontractor' ? 'Subcontractor Name' : 'Supplier Name'}
              </Label>
              <Input
                id="supplier"
                placeholder="e.g. BuildMart Inc."
                className="bg-slate-50 border-slate-200"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="batchNumber" className="text-xs font-bold uppercase text-slate-500">Batch Number</Label>
              <Input
                id="batchNumber"
                placeholder="e.g. BATCH-001"
                className="bg-slate-50 border-slate-200"
                value={(formData as any).batchNumber || ''}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value } as any)}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-slate-500">Priority</Label>
              <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">🔴 High Priority</SelectItem>
                  <SelectItem value="Medium">🟡 Medium Priority</SelectItem>
                  <SelectItem value="Low">🟢 Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          <DialogFooter className="p-6 bg-slate-50 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}