"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const softwareSchema = z.object({
  id: z.string().min(1, 'ID required'),
  name: z.string().min(2, 'Name required'),
  vendor: z.string().optional(),
  licenseKey: z.string().optional(),
  seats: z.number().min(0).optional(),
  expiryDate: z.string().optional(),
  status: z.enum(['Active', 'Expired', 'Trial']).default('Active'),
  notes: z.string().optional(),
});

type SoftwareFormValues = z.infer<typeof softwareSchema>;

interface SoftwareFormProps {
  initialData?: Partial<SoftwareFormValues>;
  onSave: (data: SoftwareFormValues) => void;
  trigger?: React.ReactNode;
}

export function SoftwareForm({ initialData, onSave, trigger }: SoftwareFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<SoftwareFormValues>({
    resolver: zodResolver(softwareSchema),
    defaultValues: {
      id: initialData?.id || '',
      name: initialData?.name || '',
      vendor: initialData?.vendor || '',
      licenseKey: initialData?.licenseKey || '',
      seats: initialData?.seats || 0,
      expiryDate: initialData?.expiryDate || '',
      status: (initialData?.status as any) || 'Active',
      notes: initialData?.notes || '',
    },
  });

  const onSubmit = (values: SoftwareFormValues) => {
    onSave(values);
    setOpen(false);
    if (!initialData) form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || <Button variant="outline">Add Software</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Software' : 'Register Software'}</DialogTitle>
          <DialogDescription>{initialData ? 'Update software details' : 'Add a software asset and license information'}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="id" render={({ field }) => (
                <FormItem>
                  <FormLabel>Software ID</FormLabel>
                  <FormControl>
                    <Input placeholder="SW-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Autodesk Revit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="vendor" render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor</FormLabel>
                  <FormControl>
                    <Input placeholder="Autodesk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="licenseKey" render={({ field }) => (
                <FormItem>
                  <FormLabel>License Key</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXX-XXXX-XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField control={form.control} name="seats" render={({ field }) => (
                <FormItem>
                  <FormLabel>Seats</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value || '0'))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="expiryDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Any notes about subscription or assignment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <DialogFooter>
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white">{initialData ? 'Update' : 'Add Software'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
