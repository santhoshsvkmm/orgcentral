
'use client';

import { use, useState, useMemo } from 'react';
import { PageTitle } from '@/components/page-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Search as SearchIcon, Plus } from 'lucide-react';
import { SoftwareForm } from '@/components/resources/software-form';
import { SoftwareList } from '@/components/resources/software-list';
import { useToast } from '@/hooks/use-toast';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

type SoftwareItem = {
  id: string;
  name: string;
  vendor?: string;
  licenseKey?: string;
  seats?: number;
  expiryDate?: string;
  status?: string;
  notes?: string;
};

export default function SoftwarePage(props: Readonly<{ params: Promise<{ id: string }> }>) {
  const params = use(props.params);
  const projectId = params.id;
  const projectName = use(getProjectNameById(projectId));

  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [software, setSoftware] = useState<SoftwareItem[]>([
    { id: 'SW-001', name: 'Autodesk Revit', vendor: 'Autodesk', seats: 12, expiryDate: '2026-12-31', status: 'Active' },
    { id: 'SW-002', name: 'Bluebeam Revu', vendor: 'Bluebeam', seats: 5, expiryDate: '2025-08-15', status: 'Active' },
    { id: 'SW-003', name: 'Procore', vendor: 'Procore', seats: 20, expiryDate: '2026-03-01', status: 'Trial' },
  ]);

  const filtered = useMemo(() => software.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.id.toLowerCase().includes(query.toLowerCase())), [software, query]);

  return (
    <>
      <PageTitle
        title={`Software & Licenses: ${projectName}`}
        description="Manage software licenses and tools used by the project team."
        actions={
          <div className="flex gap-2">
            <SoftwareForm
        onSave={(s) => {
          setSoftware(prev => [{ ...(s as SoftwareItem) }, ...prev]);
                toast({ title: 'Software added', description: `${s.name} (${s.id}) added to project.` });
              }}
              trigger={<Button className="bg-amber-500 hover:bg-amber-600 shadow-md"><Plus className="mr-2 h-4 w-4" />Add Software</Button>}
            />
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project Details
              </Link>
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search software by name or id..." className="pl-9 w-full rounded-xl border bg-white border-slate-200 h-10" />
          </div>
        </div>

        <SoftwareList
          items={filtered}
          onEdit={(updated) => {
            setSoftware(prev => prev.map(p => p.id === updated.id ? { ...p, ...updated } : p));
            toast({ title: 'Software updated', description: `${updated.name} updated.` });
          }}
          onDelete={(id) => {
            setSoftware(prev => prev.filter(p => p.id !== id));
            toast({ title: 'Software removed', description: `${id} deleted.` });
          }}
        />
      </div>
    </>
  );
}
