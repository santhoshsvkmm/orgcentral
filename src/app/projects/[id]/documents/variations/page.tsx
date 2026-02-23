
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    GitCommit,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle2,
    Clock,
    DollarSign,
    Calendar,
    Plus,
    ArrowRight,
    Filter,
    Eye,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (id === "1") return "Alpha Launch";
    if (id === "2") return "Beta Platform Development";
    return `Project (ID: ${id})`;
}

interface Variation {
    id: string;
    ref: string;
    title: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Draft';
    costImpact: number;
    scheduleImpact: number; // in days
    requester: string;
    date: string;
}

export default function VariationsPage() {
    const params = useParams();
    const projectId = params.id as string;

    const [projectName, setProjectName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const [variations, setVariations] = useState<Variation[]>([
        { id: '1', ref: 'VO-001', title: 'Additional HVAC Ductwork in Server Room', status: 'Approved', costImpact: 4500, scheduleImpact: 3, requester: 'Mike Johnson', date: '2026-02-10' },
        { id: '2', ref: 'VO-002', title: 'Upgrade to Fire-Rated Glass for Lobby', status: 'Pending', costImpact: 12800, scheduleImpact: 5, requester: 'Jane Smith', date: '2026-02-18' },
        { id: '3', ref: 'VO-003', title: 'Landscape Revision - Phase 2 North', status: 'Draft', costImpact: -2100, scheduleImpact: 0, requester: 'John Doe', date: '2026-02-21' },
        { id: '4', ref: 'VO-004', title: 'Revised Electrical Layout for Conference Wing', status: 'Approved', costImpact: 8200, scheduleImpact: 2, requester: 'Mike Johnson', date: '2026-01-25' },
        { id: '5', ref: 'VO-005', title: 'Structural Reinforcement for Rooftop AC', status: 'Rejected', costImpact: 15000, scheduleImpact: 7, requester: 'Jane Smith', date: '2026-02-05' },
    ]);

    useEffect(() => {
        if (projectId) {
            setIsLoading(true);
            getProjectNameById(projectId).then(name => {
                setProjectName(name);
                setIsLoading(false);
            });
        }
    }, [projectId]);

    const totalCostImpact = variations
        .filter(v => v.status === 'Approved')
        .reduce((sum, v) => sum + v.costImpact, 0);

    const pendingCount = variations.filter(v => v.status === 'Pending').length;

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 space-y-6">
                <Skeleton className="h-10 w-3/4 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6 container mx-auto py-8 pb-12">
            
            <PageTitle
                title={`Variations: ${projectName}`}
                description="Track and manage project change orders, cost impacts, and schedule revisions."
                actions={
                    <div className="flex gap-2">
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Propose Variation
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={`/projects/${projectId}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-lg bg-emerald-600 text-white overflow-hidden relative">
                    <TrendingUp className="absolute -right-4 -bottom-4 h-24 w-24 text-emerald-500/20 rotate-12" />
                    <CardHeader className="pb-2">
                        <CardDescription className="text-emerald-100/80 font-medium uppercase tracking-wider text-[10px]">Approved Cost Impact</CardDescription>
                        <CardTitle className="text-2xl font-bold flex items-center gap-1">
                            <DollarSign className="h-5 w-5" />
                            {totalCostImpact.toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-emerald-100/70">From {variations.filter(v => v.status === 'Approved').length} approved variations.</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-indigo-600 text-white overflow-hidden relative">
                    <Clock className="absolute -right-4 -bottom-4 h-24 w-24 text-indigo-500/20 -rotate-12" />
                    <CardHeader className="pb-2">
                        <CardDescription className="text-indigo-100/80 font-medium uppercase tracking-wider text-[10px]">Pending Approval</CardDescription>
                        <CardTitle className="text-2xl font-bold flex items-center gap-1">
                            <AlertTriangle className="h-5 w-5" />
                            {pendingCount}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-indigo-100/70">Requires immediate review from Project Sponsor.</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-slate-900 text-white overflow-hidden relative">
                    <Calendar className="absolute -right-4 -bottom-4 h-24 w-24 text-slate-800/50 rotate-6" />
                    <CardHeader className="pb-2">
                        <CardDescription className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Schedule Impact</CardDescription>
                        <CardTitle className="text-2xl font-bold flex items-center gap-1">
                            <TrendingUp className="h-5 w-5 text-rose-400" />
                            +{variations.filter(v => v.status === 'Approved').reduce((sum, v) => sum + v.scheduleImpact, 0)} Days
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-slate-400">Total delay added to the critical path.</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-xl bg-white">
                <CardHeader className="border-b bg-slate-50/50 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <GitCommit className="h-4 w-4 text-indigo-600" />
                            </div>
                            <CardTitle className="text-lg">Variation Log</CardTitle>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 text-xs font-medium border-slate-200">
                            <Filter className="mr-2 h-3.5 w-3.5 text-slate-400" />
                            Filter Log
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-4 px-6 text-left font-bold text-slate-500 uppercase tracking-wider text-[10px]">Ref #</th>
                                <th className="py-4 px-6 text-left font-bold text-slate-500 uppercase tracking-wider text-[10px]">Description</th>
                                <th className="py-4 px-6 text-center font-bold text-slate-500 uppercase tracking-wider text-[10px]">Status</th>
                                <th className="py-4 px-6 text-right font-bold text-slate-500 uppercase tracking-wider text-[10px]">Impact</th>
                                <th className="py-4 px-6 text-right font-bold text-slate-500 uppercase tracking-wider text-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {variations.map((v) => (
                                <tr key={v.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-mono text-xs font-bold text-indigo-600">{v.ref}</td>
                                    <td className="py-4 px-6">
                                        <div>
                                            <p className="font-bold text-slate-700 leading-snug">{v.title}</p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                    <FileText className="h-3 w-3" /> {v.requester}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" /> {new Date(v.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "text-[10px] px-2 py-0 border",
                                                v.status === 'Approved' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                                    v.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                        v.status === 'Rejected' ? "bg-rose-50 text-rose-700 border-rose-100" :
                                                            "bg-slate-50 text-slate-700 border-slate-200"
                                            )}
                                        >
                                            {v.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className={cn(
                                                "font-bold text-xs",
                                                v.costImpact > 0 ? "text-rose-600" : v.costImpact < 0 ? "text-emerald-600" : "text-slate-500"
                                            )}>
                                                {v.costImpact > 0 ? '+' : ''}{v.costImpact.toLocaleString()}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {v.scheduleImpact === 0 ? 'No delay' : `${v.scheduleImpact > 0 ? '+' : ''}${v.scheduleImpact} Days`}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Button variant="ghost" size="sm" className="h-8 text-[10px] text-indigo-600 hover:bg-indigo-50">
                                            View <Eye className="ml-1.5 h-3 w-3" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
                <CardFooter className="py-4 bg-slate-50/50 border-t flex justify-between items-center text-[10px] text-muted-foreground px-6">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Variations within budget: 92%
                        </span>
                    </div>
                    <Button variant="link" size="sm" className="text-[10px] text-indigo-600 h-auto p-0">
                        Export VO Summary (PDF) <ArrowRight className="ml-1 h-2 w-2" />
                    </Button>
                </CardFooter>
            </Card>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-amber-900 leading-tight">Variation Approval Required</h4>
                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                        Variation VO-002 has a high cost impact and is on the critical path. Please review and approve to avoid further delays.
                    </p>
                </div>
            </div>
        </div>
    );
}
