
'use client';

import { useState, useEffect, use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ArrowLeft, UploadCloud, Clock, FileVideo, Maximize2 } from 'lucide-react';

import CadViewer from '@/components/cad-viewer/cad-viewer';
import { cn } from '@/lib/utils';
import { DrawingVersion, DrawingData as Drawing } from '@/types/cad';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}



const placeholderModels: Drawing[] = [
  {
    id: 'model-001',
    name: 'Main Structure BIM',
    type: '3D',
    versions: [
      { version: '2.4', fileName: 'structure-v2.4-final.glb', fileUrl: '#', uploadedAt: new Date().toISOString(), fileType: 'glb' },
      { version: '2.3', fileName: 'structure-v2.3.glb', fileUrl: '#', uploadedAt: new Date(Date.now() - 86400000).toISOString(), fileType: 'glb' },
      { version: '1.0', fileName: 'structure-v1.glb', fileUrl: '#', uploadedAt: new Date(Date.now() - 604800000).toISOString(), fileType: 'glb' },
    ]
  },
  {
    id: 'model-002',
    name: 'HVAC System Layout',
    type: '3D',
    versions: [
      { version: '1.2', fileName: 'hvac-v1.2.glb', fileUrl: '#', uploadedAt: new Date().toISOString(), fileType: 'glb' },
      { version: '1.1', fileName: 'hvac-v1.1.glb', fileUrl: '#', uploadedAt: new Date(Date.now() - 432000000).toISOString(), fileType: 'glb' },
    ]
  }
];

export default function ModelViewerPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const [projectName, setProjectName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [models] = useState<Drawing[]>(placeholderModels);
  const [selectedModel, setSelectedModel] = useState<Drawing | null>(placeholderModels[0]);
  const [selectedVersion, setSelectedVersion] = useState<DrawingVersion | null>(placeholderModels[0].versions[0]);

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      getProjectNameById(projectId).then(name => {
        setProjectName(name);
        setIsLoading(false);
      });
    }
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto py-8">
      
      <PageTitle
        title={`3D Model Space: ${projectName || 'Project'}`}
        description="Interact with versioned High-fidelity 3D BIM models and digital twins."
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back Dashboard
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <Card className="shadow-lg border-white/10">
            <CardHeader className="pb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Available Models</CardHeader>
            <CardContent className="space-y-2">
              {models.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setSelectedModel(m); setSelectedVersion(m.versions[0]); }}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3",
                    selectedModel?.id === m.id ? "bg-indigo-600/10 border-indigo-500/30 text-indigo-700" : "bg-muted/30 border-transparent hover:bg-muted/50"
                  )}
                >
                  <div className={cn("p-2 rounded-lg", selectedModel?.id === m.id ? "bg-indigo-500 text-white" : "bg-slate-200 text-slate-500")}>
                    <Maximize2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight leading-none mb-1">{m.name}</p>
                    <p className="text-[10px] opacity-60 font-medium">{m.versions.length} versions tracked</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-white/10">
            <CardHeader className="pb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Version History</CardHeader>
            <CardContent className="space-y-1.5">
              {selectedModel?.versions.map((v, i) => (
                <button
                  key={v.version}
                  onClick={() => setSelectedVersion(v)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between border",
                    selectedVersion?.version === v.version ? "bg-indigo-600/5 border-indigo-500 text-indigo-700 font-bold" : "bg-transparent border-transparent hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 opacity-40" />
                    <span>Rev {v.version}</span>
                  </div>
                  {i === 0 && <span className="text-[8px] bg-emerald-500 text-white px-1 rounded uppercase font-bold">Stable</span>}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-white/10 bg-slate-900 text-white overflow-hidden group">
            <div className="p-4 relative z-10">
              <h4 className="text-sm font-bold mb-1">Upload New Model</h4>
              <p className="text-[10px] text-slate-400 mb-4">Support GLB, IFC, and BIM formats.</p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-xs h-9 gap-2">
                <UploadCloud className="h-4 w-4" /> Select Files
              </Button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <FileVideo className="h-12 w-12" />
            </div>
          </Card>
        </div>

        <Card className="lg:col-span-3 border-none bg-transparent shadow-none">
          <CadViewer
            projectId={projectId}
            selectedVersion={selectedVersion}
            drawingData={selectedModel ? { ...selectedModel, type: '3D' } : null}
            onVersionChange={(v) => setSelectedVersion(v)}
          />
        </Card>
      </div>
    </div>
  );
}
