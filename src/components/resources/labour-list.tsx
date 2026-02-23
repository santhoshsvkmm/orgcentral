"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, User, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { LabourForm } from './labour-form';

interface LabourItem {
    id: string;
    name: string;
    trade: string;
    sourceType: string;
    contact?: string;
    hourlyRate: number;
    status: string;
}

interface LabourListProps {
    items: LabourItem[];
    onUpdate: (item: LabourItem) => void;
    onDelete?: (id: string) => void;
}

export function LabourList({ items, onUpdate, onDelete }: LabourListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
                <Card key={it.id} className="border-none shadow-md rounded-2xl overflow-hidden">
                    <CardHeader className="p-4 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-bold text-slate-800">{it.name}</CardTitle>
                                    <div className="text-xs text-slate-500">{it.id} • {it.trade}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Badge className={cn('text-[10px] font-black uppercase py-0.5', it.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600')}>
                                {it.status}
                            </Badge>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <LabourForm
                                        initialData={it}
                                        onSave={(updated) => onUpdate(updated)}
                                        trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>}
                                    />
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); onDelete?.(it.id); }} className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Phone className="h-4 w-4 text-slate-400" />
                            <span className="truncate">{it.contact || '—'}</span>
                        </div>
                        <div className="mt-3 text-sm text-slate-500 flex items-center justify-between">
                            <span>Source: <strong className="text-slate-700">{it.sourceType}</strong></span>
                            <span>Rate: <strong className="text-slate-700">₹{it.hourlyRate}</strong></span>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" asChild>
                            <Link href={`#`}>View History</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
