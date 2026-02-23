'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ScanLine,
    ArrowUpRight,
    ArrowDownLeft,
    Search,
    Package,
    History,
    AlertCircle,
    CheckCircle2,
    Settings,
    MoreHorizontal,
    Plus,
    Minus,
    ShoppingCart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_INVENTORY = [
    { id: 'mat-1', name: 'Portland Cement', stock: 150, unit: 'bags', minStock: 50, category: 'Binding', price: 12.50 },
    { id: 'mat-2', name: 'Steel Rebar 12mm', stock: 45, unit: 'units', minStock: 100, category: 'Structural', price: 8.00 },
    { id: 'mat-3', name: 'Sand (Coarse)', stock: 12, unit: 'tons', minStock: 5, category: 'Aggregates', price: 45.00 },
    { id: 'mat-4', name: 'Bricks (Red)', stock: 5000, unit: 'units', minStock: 1000, category: 'Masonry', price: 0.50 },
    { id: 'mat-5', name: 'Gravel', stock: 80, unit: 'tons', minStock: 20, category: 'Aggregates', price: 35.00 },
    { id: 'mat-6', name: 'PVC Pipe 4"', stock: 40, unit: 'lengths', minStock: 50, category: 'Plumbing', price: 15.00 },
];

const MOCK_RECENT_TRANSACTIONS = [
    { id: 'tx-1', type: 'IN', material: 'Portland Cement', qty: 100, user: 'John M.', time: '14:32', status: 'verified', batchNumber: 'BATCH-001', taskId: '', contactPerson: 'Supplier A' },
    { id: 'tx-2', type: 'OUT', material: 'Steel Rebar 12mm', qty: 20, user: 'Sarah W.', time: '12:15', status: 'verified', batchNumber: 'BATCH-SR-99', taskId: 'task-102', contactPerson: 'Mark (Foreman)' },
    { id: 'tx-3', type: 'IN', material: 'Sand (Coarse)', qty: 5, user: 'Mike J.', time: '09:45', status: 'verified', batchNumber: 'REC-098', taskId: '', contactPerson: 'Local Depot' },
    { id: 'tx-4', type: 'OUT', material: 'Bricks (Red)', qty: 500, user: 'Alex D.', time: '08:30', status: 'pending', batchNumber: 'BATCH-BR-01', taskId: 'task-104', contactPerson: 'Project Manager' },
];

const MOCK_TASKS = [
    { id: 'task-101', name: 'Foundation Pouring' },
    { id: 'task-102', name: 'Reinforcement Steel Work' },
    { id: 'task-103', name: 'Columns & Beams' },
    { id: 'task-104', name: 'Wall Construction' }
];

interface CartItem {
    id: string;
    name: string;
    qty: number;
    type: 'IN' | 'OUT';
    batchNumber: string;
    taskId: string;
    contactPerson: string;
}

export default function MaterialPosInterface({ warehouseName }: { warehouseName: string }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'in' | 'out'>('overview');
    const [cart, setCart] = useState<CartItem[]>([]);

    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [actionItem, setActionItem] = useState<{ item: any, type: 'IN' | 'OUT' } | null>(null);
    const [actionForm, setActionForm] = useState({ qty: 1, batchNumber: '', taskId: '', contactPerson: '' });
    const [ledgerModalOpen, setLedgerModalOpen] = useState(false);

    const filteredInventory = MOCK_INVENTORY.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleQuickAction = (item: any, type: 'IN' | 'OUT') => {
        setActionItem({ item, type });
        setActionForm({ qty: 1, batchNumber: '', taskId: '', contactPerson: '' });
        setActionModalOpen(true);
    };

    const confirmAction = () => {
        if (!actionItem) return;
        if (actionItem.type === 'OUT' && !actionForm.taskId) {
            alert("A task is mandatory for checkout.");
            return;
        }

        const existingItemIndex = cart.findIndex(c => c.id === actionItem.item.id && c.type === actionItem.type && c.batchNumber === actionForm.batchNumber && c.taskId === actionForm.taskId);

        if (existingItemIndex >= 0) {
            const newCart = [...cart];
            newCart[existingItemIndex].qty += actionForm.qty;
            setCart(newCart);
        } else {
            setCart([...cart, {
                id: actionItem.item.id,
                name: actionItem.item.name,
                type: actionItem.type,
                qty: actionForm.qty,
                batchNumber: actionForm.batchNumber,
                taskId: actionForm.taskId,
                contactPerson: actionForm.contactPerson
            }]);
        }
        setActionModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md overflow-hidden rounded-3xl group">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Capacity</p>
                            <p className="text-3xl font-black text-slate-800">4,281 <span className="text-sm font-bold text-slate-400">units</span></p>
                        </div>
                        <div className="p-4 bg-indigo-50 text-indigo-500 rounded-2xl group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                            <Package className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md overflow-hidden rounded-3xl group">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Low Stock Alerts</p>
                            <p className="text-3xl font-black text-rose-600">2 <span className="text-sm font-bold text-rose-400">items</span></p>
                        </div>
                        <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-sm">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md overflow-hidden rounded-3xl group">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Today's Flow</p>
                            <div className="flex gap-3">
                                <p className="text-2xl font-black text-emerald-500">+105</p>
                                <p className="text-2xl font-black text-rose-500">-520</p>
                            </div>
                        </div>
                        <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                            <History className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:col-span-2 lg:w-2/3 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex p-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100">
                            {['overview', 'in', 'out'].map((tab) => (
                                <Button
                                    key={tab}
                                    variant="ghost"
                                    className={cn(
                                        "rounded-xl px-6 h-10 font-bold capitalize transition-all",
                                        activeTab === tab
                                            ? tab === 'in' ? "bg-emerald-500 text-white shadow-md hover:bg-emerald-600 hover:text-white" :
                                                tab === 'out' ? "bg-rose-500 text-white shadow-md hover:bg-rose-600 hover:text-white" :
                                                    "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:text-white"
                                            : "text-slate-500 hover:bg-slate-100"
                                    )}
                                    // @ts-ignore
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === 'in' && <ArrowDownLeft className="mr-2 h-4 w-4" />}
                                    {tab === 'out' && <ArrowUpRight className="mr-2 h-4 w-4" />}
                                    {tab === 'overview' && 'All Inventory'}
                                    {tab !== 'overview' && `Check ${tab}`}
                                </Button>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or category..."
                                className="pl-10 h-10 rounded-xl bg-white/60 backdrop-blur-sm border-white/20 focus:bg-white transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AnimatePresence>
                            {filteredInventory.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                                >
                                    <Card className={cn(
                                        "border border-slate-100 shadow-sm rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all bg-white relative group",
                                        item.stock < item.minStock && "border-rose-100"
                                    )}>
                                        <CardHeader className="pb-3 px-5 pt-5">
                                            <div className="flex justify-between items-start mb-1">
                                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-wider text-slate-400 border-none bg-slate-50 px-2 py-0.5 rounded-lg">
                                                    {item.category}
                                                </Badge>
                                                {item.stock < item.minStock && (
                                                    <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none text-[9px] font-black uppercase py-0.5 px-2">
                                                        Low Stock
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardTitle className="text-lg font-bold text-slate-800 leading-tight pr-6">{item.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="px-5 pb-5 space-y-4">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-3xl font-black text-slate-800 tracking-tight leading-none">{item.stock}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Current {item.unit}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-slate-600">{item.minStock}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Min Threshold</p>
                                                </div>
                                            </div>
                                            <Progress
                                                value={Math.min((item.stock / (item.minStock * 2)) * 100, 100)}
                                                className="h-2 rounded-full bg-slate-100"
                                                indicatorClassName={item.stock < item.minStock ? "bg-rose-500" : "bg-emerald-500"}
                                            />

                                            {/* Action layer that appears based on active tab */}
                                            {activeTab !== 'overview' && (
                                                <div className="pt-2 border-t border-slate-100 mt-4 flex gap-2">
                                                    <Button
                                                        className={cn(
                                                            "flex-1 font-bold h-10 rounded-xl transition-all shadow-none",
                                                            activeTab === 'in' ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20" :
                                                                "bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/20"
                                                        )}
                                                        onClick={() => handleQuickAction(item, activeTab === 'in' ? 'IN' : 'OUT')}
                                                    >
                                                        {activeTab === 'in' ? <Plus className="h-4 w-4 mr-1" /> : <Minus className="h-4 w-4 mr-1" />}
                                                        Quick {activeTab === 'in' ? 'Add' : 'Remove'}
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="lg:col-span-1 lg:w-1/3 space-y-6">
                    {/* Scanner Terminal */}
                    <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-slate-900 relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
                        <CardHeader className="pb-4 border-b border-navbar/30 relative z-10 px-6 pt-6">
                            <CardTitle className="text-sm font-bold flex items-center justify-between text-white">
                                <div className="flex items-center gap-2">
                                    <ScanLine className="h-4 w-4 text-indigo-400" />
                                    Scanner Terminal
                                </div>
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 relative z-10">
                            <div className="aspect-[4/3] bg-black/50 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-6 border-2 border-indigo-500/30 rounded-2xl animate-[pulse_3s_ease-in-out_infinite]" />
                                {/* Scanning Laser */}
                                <div className="absolute inset-x-8 top-0 h-0.5 bg-indigo-500 shadow-[0_0_8px_2px_rgba(99,102,241,0.5)] animate-[scan_2s_ease-in-out_infinite]" />
                                <ScanLine className="h-16 w-16 text-indigo-500/20 mb-4" />
                                <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-black">Awaiting Tag...</p>

                                <style jsx>{`
                                    @keyframes scan {
                                        0% { top: 10%; opacity: 0; }
                                        10% { opacity: 1; }
                                        90% { opacity: 1; }
                                        100% { top: 90%; opacity: 0; }
                                    }
                                `}</style>
                            </div>
                            <div className="p-5 bg-white/5 backdrop-blur-md">
                                <Input
                                    placeholder="Manual Entry / Barcode..."
                                    className="bg-black/20 border-white/10 text-sm h-12 rounded-xl text-white placeholder:text-white/30 focus:border-indigo-500/50"
                                />
                                {cart.length > 0 && (
                                    <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-xs font-bold text-indigo-300">Staged Actions ({cart.length})</p>
                                            <Button size="sm" variant="ghost" className="h-6 text-[10px] text-white hover:bg-white/10" onClick={() => setCart([])}>Clear</Button>
                                        </div>
                                        <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold h-10 rounded-lg">
                                            Commit Changes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline Log */}
                    <Card className="border-none shadow-xl rounded-3xl bg-white/60 backdrop-blur-md">
                        <CardHeader className="pb-3 px-6 pt-6">
                            <CardTitle className="text-sm font-bold flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <History className="h-4 w-4 text-indigo-600" />
                                    Transaction Ledger
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-4 w-4" /></Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 space-y-4">
                            {MOCK_RECENT_TRANSACTIONS.map((tx, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={tx.id}
                                    className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-sm group hover:border-indigo-100 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={cn(
                                            "mt-0.5 h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                            tx.type === 'IN' ? "bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600" : "bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600"
                                        )}>
                                            {tx.type === 'IN' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 leading-tight">{tx.material}</p>
                                            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 font-medium">
                                                <span>{tx.user}</span>
                                                <span>•</span>
                                                <span>{tx.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-2">
                                        <p className={cn(
                                            "text-sm font-black",
                                            tx.type === 'IN' ? "text-emerald-600" : "text-rose-600"
                                        )}>
                                            {tx.type === 'IN' ? '+' : '-'}{tx.qty}
                                        </p>
                                        <Badge className={cn("mt-1 text-[8px] uppercase tracking-widest border-none px-1.5 py-0",
                                            tx.status === 'verified' ? 'bg-slate-100 text-slate-500 hover:bg-slate-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                                        )}>
                                            {tx.batchNumber || 'NO BATCH'}
                                        </Badge>
                                    </div>
                                </motion.div>
                            ))}
                            <Button variant="ghost" className="w-full text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-10 rounded-xl mt-2" onClick={() => setLedgerModalOpen(true)}>
                                View Full Ledger <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Quick Action Modal */}
            <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className={cn("flex items-center gap-2", actionItem?.type === 'IN' ? 'text-emerald-600' : 'text-rose-600')}>
                            {actionItem?.type === 'IN' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                            {actionItem?.type === 'IN' ? 'Check In Material' : 'Check Out Material'}
                        </DialogTitle>
                        <DialogDescription>
                            Configure transaction for <strong className="text-slate-800">{actionItem?.item.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Quantity ({actionItem?.item.unit})</Label>
                                <Input type="number" value={actionForm.qty} onChange={(e) => setActionForm({ ...actionForm, qty: parseInt(e.target.value) || 1 })} min={1} />
                            </div>
                            <div className="space-y-2">
                                <Label>Batch Number</Label>
                                <Input placeholder="Optional BATCH-XXX" value={actionForm.batchNumber} onChange={(e) => setActionForm({ ...actionForm, batchNumber: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{actionItem?.type === 'OUT' ? 'Linked Task (Required)' : 'Linked Task (Optional)'}</Label>
                            <Select value={actionForm.taskId} onValueChange={(v) => setActionForm({ ...actionForm, taskId: v })}>
                                <SelectTrigger className={cn(actionItem?.type === 'OUT' && !actionForm.taskId && "border-rose-300 ring-rose-300")}>
                                    <SelectValue placeholder="Select a project task" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MOCK_TASKS.map(t => (
                                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Contact Person / Requested By</Label>
                            <Input placeholder="e.g. Project Manager, Foreman..." value={actionForm.contactPerson} onChange={(e) => setActionForm({ ...actionForm, contactPerson: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setActionModalOpen(false)}>Cancel</Button>
                        <Button
                            className={cn(actionItem?.type === 'IN' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700')}
                            onClick={confirmAction}
                        >
                            Stage to Cart
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Full Ledger Modal */}
            <Dialog open={ledgerModalOpen} onOpenChange={setLedgerModalOpen}>
                <DialogContent className="sm:max-w-[700px] bg-slate-50 border-none p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                            <History className="h-5 w-5 text-indigo-600" />
                            Full POS Transaction Ledger
                        </DialogTitle>
                        <DialogDescription>
                            Detailed record of all material inflows and outflows, including batch numbers and task associations.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                        {MOCK_RECENT_TRANSACTIONS.map((tx) => (
                            <Card key={tx.id} className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden hover:border-indigo-100 transition-colors">
                                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "mt-1 h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                            tx.type === 'IN' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                        )}>
                                            {tx.type === 'IN' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 w-full">
                                                <p className="text-sm font-bold text-slate-800">{tx.material}</p>
                                                {tx.batchNumber && <Badge variant="secondary" className="text-[9px] h-4 bg-slate-100 text-slate-600 border-none">{tx.batchNumber}</Badge>}
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-xs text-slate-500">
                                                <div className="flex items-center gap-1.5"><ShoppingCart className="h-3 w-3 text-slate-400" /> User: <span className="font-bold text-slate-700">{tx.user}</span></div>
                                                <div className="flex items-center gap-1.5"><AlertCircle className="h-3 w-3 text-slate-400" /> Contact: <span className="font-bold text-slate-700">{tx.contactPerson || 'N/A'}</span></div>
                                                <div className="flex items-center gap-1.5"><Settings className="h-3 w-3 text-slate-400" /> Task: <span className="font-bold text-slate-700">{tx.taskId || 'General'}</span></div>
                                                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-slate-400" /> Status: <span className="font-bold text-slate-700 uppercase tracking-wider">{tx.status}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-left sm:text-right shrink-0 bg-slate-50 sm:bg-transparent w-full sm:w-auto p-3 sm:p-0 rounded-xl">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{tx.time}</p>
                                        <p className={cn(
                                            "text-2xl font-black",
                                            tx.type === 'IN' ? "text-emerald-600" : "text-rose-600"
                                        )}>
                                            {tx.type === 'IN' ? '+' : '-'}{tx.qty}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
