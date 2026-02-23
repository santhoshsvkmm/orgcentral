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

const weatherSchema = z.object({
    date: z.string().min(10, 'Date is required'),
    condition: z.enum(['Sunny', 'Cloudy', 'Rainy', 'Stormy', 'Windy']),
    temp: z.number().min(-50).max(60),
    humidity: z.number().min(0).max(100),
    windSpeed: z.number().min(0),
    impact: z.enum(['None', 'Minimal', 'Moderate', 'Significant', 'Work Stoppage']),
    notes: z.string().optional(),
});

type WeatherFormValues = z.infer<typeof weatherSchema>;

interface WeatherFormProps {
    initialData?: any;
    onSave: (data: any) => void;
    trigger?: React.ReactNode;
}

export function WeatherForm({ initialData, onSave, trigger }: WeatherFormProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<WeatherFormValues>({
        resolver: zodResolver(weatherSchema),
        defaultValues: initialData || {
            date: new Date().toISOString().split('T')[0],
            condition: 'Sunny',
            temp: 25,
            humidity: 50,
            windSpeed: 10,
            impact: 'None',
            notes: '',
        },
    });

    const onSubmit = (values: WeatherFormValues) => {
        onSave({ ...values, id: initialData?.id || Math.random().toString(36).substr(2, 9) });
        setOpen(false);
        if (!initialData) form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Log Weather</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Weather Log' : 'New Weather Log'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update the weather conditions recorded.' : 'Record the daily weather conditions and their impact on construction activities.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
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
                                                {['Sunny', 'Cloudy', 'Rainy', 'Stormy', 'Windy'].map((cond) => (
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
                                name="temp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Temperature (°C)</FormLabel>
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
                                name="humidity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Humidity (%)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="windSpeed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wind Speed (km/h)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="impact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activity Impact</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Impact level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {['None', 'Minimal', 'Moderate', 'Significant', 'Work Stoppage'].map((lvl) => (
                                                <SelectItem key={lvl} value={lvl}>
                                                    {lvl}
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
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Specific delays or precautions taken..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full text-white font-bold">
                                {initialData ? 'Update Record' : 'Record Weather'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
