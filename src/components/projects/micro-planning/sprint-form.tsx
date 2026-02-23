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

const sprintSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    status: z.enum(['active', 'planned', 'completed']),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    goal: z.string().optional(),
});

type SprintFormValues = z.infer<typeof sprintSchema>;

interface SprintFormProps {
    initialData?: any;
    onSave: (data: any) => void;
    trigger?: React.ReactNode;
}

export function SprintForm({ initialData, onSave, trigger }: SprintFormProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<SprintFormValues>({
        resolver: zodResolver(sprintSchema),
        defaultValues: initialData || {
            name: '',
            status: 'planned',
            startDate: '',
            endDate: '',
            goal: '',
        },
    });

    const onSubmit = (values: SprintFormValues) => {
        onSave({
            ...values,
            id: initialData?.id || Math.random().toString(36).substr(2, 9),
            tasks: initialData?.tasks || []
        });
        setOpen(false);
        if (!initialData) form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Create Sprint</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Sprint' : 'Create New Sprint'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update the details of your sprint.' : 'Plan a new sprint by defining its dates and goals.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sprint Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sprint 3 - Core Implementation" {...field} />
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
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="planned">Planned</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="goal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sprint Goal</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Complete all foundation tasks..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                                {initialData ? 'Update Sprint' : 'Create Sprint'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
