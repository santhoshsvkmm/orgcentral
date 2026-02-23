'use client';

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

const equipmentSchema = z.object({
    id: z.string().min(2, 'ID is required'),
    name: z.string().min(2, 'Name is required'),
    type: z.string().min(2, 'Type is required'),
    status: z.enum(['Active', 'Maintenance', 'Available', 'Offline']),
    location: z.string().min(2, 'Location is required'),
    operator: z.string().optional(),
    dailyRate: z.number().min(0, 'Daily rate must be a positive number'),
    condition: z.enum(['Excellent', 'Good', 'Fair', 'Poor']),
    fuelLevel: z.number().min(0).max(100),
});

type EquipmentFormValues = z.infer<typeof equipmentSchema>;

interface EquipmentFormProps {
    initialData?: any;
    onSave: (data: any) => void;
    trigger?: React.ReactNode;
}

export function EquipmentForm({ initialData, onSave, trigger }: EquipmentFormProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<EquipmentFormValues>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: initialData || {
            id: '',
            name: '',
            type: '',
            status: 'Available',
            location: '',
            operator: 'Unassigned',
            dailyRate: 0,
            condition: 'Good',
            fuelLevel: 100,
        },
    });

    const onSubmit = (values: EquipmentFormValues) => {
        onSave({
            ...values,
            nextMaintenance: initialData?.nextMaintenance || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            hoursUsed: initialData?.hoursUsed || 0,
            lastMaintenance: initialData?.lastMaintenance || new Date().toISOString().split('T')[0]
        });
        setOpen(false);
        if (!initialData) form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Register Equipment</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Equipment' : 'Register New Equipment'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update the details of the machinery.' : 'Enter the details of the new equipment to be registered in the fleet.'}
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
                                        <FormLabel>Equipment ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="EQ-001" {...field} />
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
                                            <Input placeholder="Caterpillar 320" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Heavy Machinery" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                                {['Active', 'Maintenance', 'Available', 'Offline'].map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Site A - Sector 1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="operator"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Operator</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dailyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Daily Rate ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="condition"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Condition</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select condition" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {['Excellent', 'Good', 'Fair', 'Poor'].map((cond) => (
                                                    <SelectItem key={cond} value={cond}>
                                                        {cond}
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
                                name="fuelLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fuel Level (%)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold">
                                {initialData ? 'Update Machine' : 'Register Machine'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
