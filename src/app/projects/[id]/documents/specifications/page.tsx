
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ListOrdered,
  Search,
  Filter,
  Download,
  FileText,
  MoreVertical,
  Plus,
  ArrowRight,
  HardDrive,
  FileCheck,
  AlertCircle
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

interface SpecItem {
  id: string;
  code: string;
  title: string;
  category: string;
  version: string;
  status: 'Current' | 'Draft' | 'Archived' | 'Required';
  lastModified: string;
  size: string;
}

const SPEC_CATEGORIES = ['General', 'Civil & Structural', 'Mechanical', 'Electrical', 'Plumbing', 'Finishes', 'Landscaping'];

export default function SpecificationsPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [projectName, setProjectName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [specs, setSpecs] = useState<SpecItem[]>([
    { id: '1', code: '01 00 00', title: 'General Requirements', category: 'General', version: '2.1', status: 'Current', lastModified: '2026-02-01', size: '2.4 MB' },
    { id: '2', code: '03 30 00', title: 'Cast-in-Place Concrete', category: 'Civil & Structural', version: '1.0', status: 'Current', lastModified: '2025-12-15', size: '5.1 MB' },
    { id: '3', code: '23 00 00', title: 'HVAC General Requirements', category: 'Mechanical', version: 'Draft 4', status: 'Draft', lastModified: '2026-02-18', size: '1.8 MB' },
    { id: '4', code: '26 05 00', title: 'Common Work Results for Electrical', category: 'Electrical', version: '1.2', status: 'Current', lastModified: '2026-01-10', size: '3.2 MB' },
    { id: '5', code: '09 90 00', title: 'Painting and Coating', category: 'Finishes', version: 'Required', status: 'Required', lastModified: '-', size: '-' },
    { id: '6', code: '01 33 00', title: 'Submittal Procedures', category: 'General', version: '3.0', status: 'Current', lastModified: '2026-02-12', size: '1.1 MB' },
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

  const filteredSpecs = specs.filter(spec => {
    const matchesSearch = spec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.code.includes(searchQuery);
    const matchesCategory = selectedCategory ? spec.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-20 w-full mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto py-8 pb-12">
      
      <PageTitle
        title={`Specifications: ${projectName}`}
        description="Technical requirements, CSI codes, and material standards."
        actions={
          <div className="flex gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Specification
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-none shadow-md overflow-hidden bg-slate-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-sm transition-colors border-l-2",
                    selectedCategory === null ? "bg-white border-indigo-600 font-bold text-indigo-600" : "border-transparent hover:bg-white/50 text-slate-600"
                  )}
                >
                  All Specifications
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full">{specs.length}</span>
                </button>
                {SPEC_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 text-sm transition-colors border-l-2",
                      selectedCategory === cat ? "bg-white border-indigo-600 font-bold text-indigo-600" : "border-transparent hover:bg-white/50 text-slate-600"
                    )}
                  >
                    {cat}
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full">
                      {specs.filter(s => s.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-indigo-600 text-white">
            <CardContent className="p-6 space-y-4">
              <div className="h-10 w-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                <FileCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg leading-tight text-white">Requirement Compliance</h4>
                <p className="text-xs text-indigo-100/70">85% of core specs are verified and current for this phase.</p>
              </div>
              <div className="h-2 bg-indigo-800/50 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-300 w-[85%]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by code or title..."
                    className="pl-9 bg-slate-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 text-xs">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Current
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-100 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Draft
                  </Badge>
                  <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-100 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Required
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50/50 border-b">
                      <th className="py-4 px-6 text-left font-bold text-slate-500 uppercase tracking-wider text-[10px]">CSI Code</th>
                      <th className="py-4 px-6 text-left font-bold text-slate-500 uppercase tracking-wider text-[10px]">Specification Title</th>
                      <th className="py-4 px-6 text-center font-bold text-slate-500 uppercase tracking-wider text-[10px]">Version</th>
                      <th className="py-4 px-6 text-center font-bold text-slate-500 uppercase tracking-wider text-[10px]">Status</th>
                      <th className="py-4 px-6 text-right font-bold text-slate-500 uppercase tracking-wider text-[10px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredSpecs.length > 0 ? filteredSpecs.map((spec) => (
                      <tr key={spec.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-mono text-xs font-bold text-slate-400">{spec.code}</td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-bold text-slate-700">{spec.title}</p>
                            <p className="text-[10px] text-muted-foreground">{spec.category}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center text-xs text-slate-500">v{spec.version}</td>
                        <td className="py-4 px-6 text-center">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] px-2 py-0",
                              spec.status === 'Current' ? "bg-emerald-100 text-emerald-800" :
                                spec.status === 'Draft' ? "bg-amber-100 text-amber-800" :
                                  spec.status === 'Required' ? "bg-rose-100 text-rose-800 border-rose-200" :
                                    "bg-slate-100 text-slate-800"
                            )}
                          >
                            {spec.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {spec.status === 'Required' ? (
                            <Button variant="ghost" size="sm" className="h-8 text-[10px] text-indigo-600">
                              Upload <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          ) : (
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="py-12 text-center">
                          <div className="flex flex-col items-center">
                            <AlertCircle className="h-8 w-8 text-slate-200 mb-2" />
                            <p className="text-slate-400 italic">No specifications found matching your criteria.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="py-4 bg-slate-50/50 border-t flex justify-between items-center text-[10px] text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" /> Storage Used: 14.8 MB
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" /> 6 Documents Total
                </span>
              </div>
              <div>Last Batch Sync: 2 hours ago</div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-none shadow-sm bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest text-slate-400">Next Review</h5>
                  <p className="text-lg font-bold">28 Feb 2026</p>
                </div>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Phase End</Badge>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white border border-slate-100">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest text-slate-400">Total CSI Codes</h5>
                  <p className="text-lg font-bold text-slate-800">12 Sections</p>
                </div>
                <ListOrdered className="h-6 w-6 text-indigo-400" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
