
'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, use, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Image as ImageIconLucide, UploadCloud, FileText, Download, Clock } from 'lucide-react'; // Renamed Image to ImageIconLucide, added icons for drawing tools
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image'; // Imported Next.js Image
import { cn } from '@/lib/utils';
import CadViewer from '@/components/cad-viewer/cad-viewer';
import { DrawingVersion, DrawingData as Drawing } from '@/types/cad';



type DrawingType =
  | 'architectural'
  | 'structural'
  | 'mechanical'
  | 'electrical'
  | 'plumbing'
  | 'shop-drawings'
  | 'detail-drawings'
  | 'isometric-axonometric'
  | 'presentation-drawings'
  | 'as-built';

const drawingTypeLabels: Record<DrawingType, string> = {
  'architectural': 'Architectural Drawings',
  'structural': 'Structural Drawings',
  'mechanical': 'Mechanical Drawings',
  'electrical': 'Electrical Drawings',
  'plumbing': 'Plumbing Drawings',
  'shop-drawings': 'Shop Drawings',
  'detail-drawings': 'Detail Drawings',
  'isometric-axonometric': 'Isometric/Axonometric Drawings',
  'presentation-drawings': 'Presentation Drawings',
  'as-built': 'As-Built Drawings',
};


// Placeholder data for drawings
const placeholderDrawingsData: Record<DrawingType, Drawing[]> = {
  architectural: [
    {
      id: 'arch-001',
      name: 'Anteen Floor Plan',
      type: '2D',
      versions: [{
        version: '1.0',
        fileUrl: '/anteen.dwg',
        fileName: 'anteen.dwg',
        uploadedAt: new Date().toISOString(),
        fileType: 'dwg'
      }]
    },
    {
      id: 'arch-002',
      name: 'Elevations - North and South',
      type: '2D',
      versions: [{
        version: '1.0',
        fileUrl: '#',
        fileName: 'arch-002-v1.0.pdf',
        uploadedAt: new Date().toISOString(),
        fileType: 'pdf'
      }]
    },
  ],
  structural: [
    {
      id: 'stru-001',
      name: 'Foundation Plan',
      type: '2D',
      versions: [{
        version: '1.2',
        fileUrl: '#',
        fileName: 'stru-001-v1.2.pdf',
        uploadedAt: new Date().toISOString(),
        fileType: 'pdf'
      }]
    },
  ],
  mechanical: [],
  electrical: [],
  plumbing: [],
  'shop-drawings': [],
  'detail-drawings': [
    {
      id: 'detail-001',
      name: 'Window Detail Section A',
      type: '2D',
      versions: [{
        version: '1.0',
        fileUrl: '#',
        fileName: 'window-detail-A-v1.pdf',
        uploadedAt: new Date().toISOString(),
        fileType: 'pdf'
      }]
    }
  ],
  'isometric-axonometric': [
    {
      id: 'iso-001',
      name: 'Overall Building Axo',
      type: '2D',
      versions: [{
        version: 'Draft 2',
        fileUrl: '#',
        fileName: 'building-axo-draft2.png',
        uploadedAt: new Date().toISOString(),
        fileType: 'png'
      }]
    }
  ],
  'presentation-drawings': [
    {
      id: 'pres-001',
      name: 'Site Plan Render',
      type: '2D',
      versions: [{
        version: 'Final',
        fileUrl: '#',
        fileName: 'site-plan-render.jpg',
        uploadedAt: new Date().toISOString(),
        fileType: 'jpg'
      }]
    }
  ],
  'as-built': [
    {
      id: 'asbuilt-001',
      name: 'Plumbing Riser Diagram',
      type: '2D',
      versions: [{
        version: '1.0',
        fileUrl: '#',
        fileName: 'plumbing-riser-asbuilt.dxf',
        uploadedAt: new Date().toISOString(),
        fileType: 'dxf'
      }]
    }
  ],
};



// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

export default function DrawingsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = params.id as string;
  const drawingType = (searchParams.get('type') as DrawingType | null) || 'architectural';

  const [projectName, setProjectName] = useState<string>('');
  const [isLoadingProjectName, setIsLoadingProjectName] = useState(true);

  const [drawings, setDrawings] = useState<Drawing[]>(placeholderDrawingsData[drawingType] || []);
  const [newDrawingName, setNewDrawingName] = useState('');
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(drawings[0] || null);
  const [selectedVersion, setSelectedVersion] = useState<DrawingVersion | null>(drawings[0]?.versions[0] || null);

  const [newDrawingFile, setNewDrawingFile] = useState<File | null>(null);
  const [newVersionFile, setNewVersionFile] = useState<File | null>(null);
  const [uploadingDrawingId, setUploadingDrawingId] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      setIsLoadingProjectName(true);
      getProjectNameById(projectId).then(name => {
        setProjectName(name);
        setIsLoadingProjectName(false);
      });
    }
  }, [projectId]);

  useEffect(() => {
    const list = placeholderDrawingsData[drawingType] || [];
    setDrawings(list);
    setNewDrawingName('');
    setNewDrawingFile(null);
    if (list.length > 0) {
      setSelectedDrawing(list[0]);
      setSelectedVersion(list[0].versions[0]);
    }
  }, [drawingType]);


  const handleUploadNewVersion = (drawingId: string) => {
    if (!newVersionFile) {
      alert('Please select a file for the new version.');
      return;
    }

    // Simulate upload and update
    setDrawings(prevDrawings => prevDrawings.map(d => {
      if (d.id === drawingId) {
        const newVersionNumber = (parseFloat(d.versions[0]?.version || '0') + 0.1).toFixed(1);
        const newVer: DrawingVersion = {
          version: newVersionNumber,
          fileUrl: URL.createObjectURL(newVersionFile),
          fileName: newVersionFile.name,
          uploadedAt: new Date().toISOString(),
          fileType: newVersionFile.name.split('.').pop()?.toLowerCase() as DrawingVersion['fileType'] || 'pdf'
        };
        const updated = {
          ...d,
          versions: [newVer, ...d.versions]
        };
        if (selectedDrawing?.id === drawingId) {
          setSelectedDrawing(updated);
          setSelectedVersion(newVer);
        }
        return updated;
      }
      return d;
    }));
    setNewVersionFile(null);
    setUploadingDrawingId(null);
  };

  const handleUploadNewDrawing = () => {
    if (newDrawingName && newDrawingFile) {
      const newDrawing: Drawing = {
        id: `${drawingType}-${Date.now()}`,
        name: newDrawingName,
        type: '2D',
        versions: [{ version: '1.0', fileUrl: URL.createObjectURL(newDrawingFile), fileName: newDrawingFile.name, uploadedAt: new Date().toISOString(), fileType: newDrawingFile.name.split('.').pop()?.toLowerCase() as DrawingVersion['fileType'] || 'pdf' }]
      };
      setDrawings(prev => [newDrawing, ...prev]);
      setSelectedDrawing(newDrawing);
      setSelectedVersion(newDrawing.versions[0]);

      if (!placeholderDrawingsData[drawingType]) {
        placeholderDrawingsData[drawingType] = [];
      }
      placeholderDrawingsData[drawingType].unshift(newDrawing);

      setNewDrawingName('');
      setNewDrawingFile(null);
    } else {
      alert('Please provide a drawing name and select a file.');
    }
  };

  const handleViewDrawingVersion = (drawing: Drawing, version: DrawingVersion) => {
    setSelectedDrawing(drawing);
    setSelectedVersion(version);
  };

  if (isLoadingProjectName) {
    return (
      <div className="container mx-auto py-8">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full mb-6" />
        <Skeleton className="h-20 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const currentDrawingTypeLabel = drawingTypeLabels[drawingType] || 'Drawings';

  return (
    <div className="space-y-6 container mx-auto py-8 pb-12">

      <PageTitle
        title={`${currentDrawingTypeLabel}: ${projectName}`}
        description={`View, annotate, and manage ${currentDrawingTypeLabel.toLowerCase()} iterations and revisions.`}
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 border-none bg-transparent shadow-none">
          <CadViewer
            projectId={projectId}
            selectedVersion={selectedVersion}
            drawingData={selectedDrawing ? { ...selectedDrawing, type: '2D' } : null}
            onVersionChange={(v) => setSelectedVersion(v)}
          />
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 italic">
                <Clock className="h-4 w-4 text-indigo-500" />
                Version Control
              </CardTitle>
              <CardDescription className="text-xs">Quickly switch between saved revisions.</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDrawing ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Selected: {selectedDrawing.name}</p>
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {selectedDrawing.versions.map((v) => (
                      <button
                        key={v.version}
                        onClick={() => setSelectedVersion(v)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-xs transition-all border",
                          selectedVersion?.version === v.version
                            ? "bg-indigo-600/10 border-indigo-500/50 text-indigo-700 font-bold"
                            : "bg-muted/50 border-transparent hover:border-muted-foreground/20 text-muted-foreground"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <span>Version {v.version}</span>
                          <span className="text-[9px] opacity-60">{new Date(v.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-muted-foreground italic">Select a drawing to see versions</div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-white/10 bg-indigo-600/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <UploadCloud className="h-4 w-4 text-indigo-600" />
                Upload Revision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground" htmlFor="up-file">Select File</Label>
                <Input
                  id="up-file"
                  type="file"
                  className="h-8 text-xs bg-white"
                  onChange={(e) => { setNewVersionFile(e.target.files ? e.target.files[0] : null); setUploadingDrawingId(selectedDrawing?.id || null); }}
                />
              </div>
              <Button
                onClick={() => handleUploadNewVersion(selectedDrawing?.id || '')}
                disabled={!newVersionFile || !selectedDrawing}
                className="w-full h-8 bg-indigo-600 text-xs font-bold"
              >
                Push Version {selectedDrawing ? (parseFloat(selectedDrawing.versions[0].version) + 0.1).toFixed(1) : ''}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
