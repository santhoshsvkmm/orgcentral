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
import { Textarea } from '@/components/ui/textarea';

const incidentSchema = z.object({
    id: z.string().min(2, 'ID is required'),
    type: z.string().min(2, 'Type is required'),
    severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
    status: z.enum(['Open', 'In Investigation', 'Resolved', 'Closed']),
    date: z.string().min(10, 'Date is required'),
    desc: z.string().min(5, 'Description is required'),
    location: z.string().min(2, 'Location is required'),
    reporter: z.string().min(2, 'Reporter name is required'),
});

type IncidentFormValues = z.infer<typeof incidentSchema>;

interface IncidentFormProps {
    initialData?: any;
    onSave: (data: any) => void;
    trigger?: React.ReactNode;
}

export function IncidentForm({ initialData, onSave, trigger }: IncidentFormProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<IncidentFormValues>({
        resolver: zodResolver(incidentSchema),
        defaultValues: initialData || {
            id: '',
            type: '',
            severity: 'Medium',
            status: 'Open',
            date: new Date().toISOString().split('T')[0],
            desc: '',
            location: '',
            reporter: '',
        },
    });

    const onSubmit = (values: IncidentFormValues) => {
        onSave({ ...values });
        setOpen(false);
        if (!initialData) form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Report Incident</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Incident Report' : 'New Incident Report'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update the details of the reported incident.' : 'Provide accurate details about the safety incident being reported.'}
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
                                        <FormLabel>Incident ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="INC-2024-001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Incident Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Equipment Failure" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="severity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Severity</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select severity" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {['Critical', 'High', 'Medium', 'Low'].map((sev) => (
                                                    <SelectItem key={sev} value={sev}>
                                                        {sev}
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
                                                {['Open', 'In Investigation', 'Resolved', 'Closed'].map((status) => (
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
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="North Wing, Level 2" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="reporter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reported By</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sarah Connor" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="desc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe the incident in detail..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <Button type="submit" className="bg-rose-600 hover:bg-rose-700 w-full">
                                {initialData ? 'Update Incident Report' : 'Submit Incident Report'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
