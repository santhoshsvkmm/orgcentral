"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface SoftwareItem {
  id: string;
  name: string;
  vendor?: string;
  seats?: number;
  expiryDate?: string;
  status?: string;
}

interface SoftwareListProps {
  items: SoftwareItem[];
  onEdit: (item: SoftwareItem) => void;
  onDelete?: (id: string) => void;
}

export function SoftwareList({ items, onEdit, onDelete }: SoftwareListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((s) => (
        <Card key={s.id} className="shadow-sm rounded-2xl">
          <CardHeader className="p-4 flex justify-between items-start">
            <div>
              <CardTitle className="text-sm font-bold">{s.name}</CardTitle>
              <div className="text-xs text-slate-500">{s.id} • {s.vendor || '—'}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="text-[10px] font-black uppercase py-0.5">{s.status || 'Active'}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => onEdit(s)}>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={(e) => { e.preventDefault(); onDelete?.(s.id); }} className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-sm text-slate-600">Seats: <strong className="text-slate-800">{s.seats ?? '—'}</strong></div>
            <div className="text-sm text-slate-600 mt-2">Expiry: <strong className="text-slate-800">{s.expiryDate || '—'}</strong></div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild>
              <Link href="#">Assign Users</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
