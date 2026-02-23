"use client";

import { useState, useMemo } from 'react';
import { PageTitle } from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { LabourForm } from '@/components/resources/labour-form';
import { LabourList } from '@/components/resources/labour-list';
import { useToast } from '@/hooks/use-toast';

const MOCK_LABOUR = [
    { id: 'LB-001', name: 'Ramesh Kumar', trade: 'Carpenter', sourceType: 'Subcontractor', contact: '+91 98765 43210', hourlyRate: 250, status: 'Active' },
    { id: 'LB-002', name: 'Sana Begum', trade: 'Mason', sourceType: 'Agency', contact: '+91 91234 56789', hourlyRate: 220, status: 'Active' },
    { id: 'LB-003', name: 'Arjun Patel', trade: 'Labourer', sourceType: 'Direct', contact: '+91 99876 54321', hourlyRate: 150, status: 'Inactive' },
    { id: 'LB-004', name: 'AB Contract', trade: 'Team', sourceType: 'Contract', contact: '', hourlyRate: 0, status: 'Active' },
];

export default function LabourPage() {
    const [labour, setLabour] = useState(MOCK_LABOUR);
    const [search, setSearch] = useState('');
    const [filterSource, setFilterSource] = useState<'All' | string>('All');
    const { toast } = useToast();

    const filtered = useMemo(() => {
        return labour.filter(l => {
            const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase());
            const matchesSource = filterSource === 'All' ? true : l.sourceType === filterSource;
            return matchesSearch && matchesSource;
        });
    }, [labour, search, filterSource]);

    return (
        <div className="space-y-6 container mx-auto py-8">
            <PageTitle
                title="Labour Management"
                description="Manage labour resources — they can be from contracts, suppliers, agencies or subcontractors."
                actions={
                    <div className="flex gap-2">
                        <LabourForm
                            onSave={(newItem) => {
                                setLabour((prev) => [newItem, ...prev]);
                                toast({ title: 'Labour added', description: `${newItem.name} (${newItem.id}) added.` });
                            }}
                            trigger={<Button className="bg-amber-500 hover:bg-amber-600 shadow-md"><Plus className="mr-2 h-4 w-4" />Add Worker</Button>}
                        />
                    </div>
                }
            />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input className="pl-9 rounded-xl" placeholder="Search by name or id..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="w-full md:w-60">
                    <Select onValueChange={(v) => setFilterSource(v || 'All')} defaultValue="All">
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Sources</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Supplier">Supplier</SelectItem>
                            <SelectItem value="Agency">Agency</SelectItem>
                            <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                            <SelectItem value="Direct">Direct</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <LabourList
                    items={filtered}
                    onUpdate={(updated) => {
                        setLabour((prev) => prev.map(p => p.id === updated.id ? { ...p, ...updated } : p));
                        toast({ title: 'Labour updated', description: `${updated.name} (${updated.id}) updated.` });
                    }}
                    onDelete={(id) => {
                        setLabour((prev) => prev.filter(p => p.id !== id));
                        toast({ title: 'Labour removed', description: `${id} deleted.` });
                    }}
                />
            </div>
        </div>
    );
}
