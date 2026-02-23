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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const labourSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    name: z.string().min(2, 'Name is required'),
    trade: z.string().min(2, 'Trade is required'),
    sourceType: z.enum(['Contract', 'Supplier', 'Agency', 'Subcontractor', 'Direct']),
    contact: z.string().optional(),
    hourlyRate: z.number().min(0, 'Hourly rate must be >= 0'),
    status: z.enum(['Active', 'Inactive']),
    assignedProject: z.string().optional(),
});

type LabourFormValues = z.infer<typeof labourSchema>;

interface LabourFormProps {
    initialData?: any;
    onSave: (data: any) => void;
    trigger?: React.ReactNode;
}

export function LabourForm({ initialData, onSave, trigger }: LabourFormProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<LabourFormValues>({
        resolver: zodResolver(labourSchema),
        defaultValues: initialData || {
            id: '',
            name: '',
            trade: '',
            sourceType: 'Direct',
            contact: '',
            hourlyRate: 0,
            status: 'Active',
            assignedProject: '',
        },
    });

    const onSubmit = (values: LabourFormValues) => {
        onSave({ ...values });
        setOpen(false);
        if (!initialData) form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Add Labour</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Labour' : 'Register Labour'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update labour details.' : 'Add a labour resource. The worker may be from a contract, supplier, agency or subcontractor.'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Worker ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="LB-001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ramesh Kumar" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="trade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Trade / Role</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Carpenter / Labourer" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sourceType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Source</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select source" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {['Contract', 'Supplier', 'Agency', 'Subcontractor', 'Direct'].map((s) => (
                                                    <SelectItem key={s} value={s}>
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+91 98765 43210" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hourly Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value || '0'))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {['Active', 'Inactive'].map((s) => (
                                                    <SelectItem key={s} value={s}>
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="assignedProject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assigned Project (optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Project ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold">
                                {initialData ? 'Update Worker' : 'Add Worker'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
