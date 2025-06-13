
'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, use, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Image as ImageIcon, Edit3, UploadCloud, FileText, Download, MessageSquarePlus } from 'lucide-react'; // Added MessageSquarePlus
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface DrawingVersion {
  version: string;
  fileUrl: string; // In a real app, this might be a signed URL
  fileName: string;
  uploadedAt: string; // ISO Date string
}

interface Drawing {
  id: string;
  name: string;
  versions: DrawingVersion[];
}

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
    { id: 'arch-001', name: 'Floor Plan - Ground Floor', versions: [{ version: '1.1', fileUrl: '#', fileName: 'arch-001-v1.1.pdf', uploadedAt: new Date().toISOString() }] },
    { id: 'arch-002', name: 'Elevations - North and South', versions: [{ version: '1.0', fileUrl: '#', fileName: 'arch-002-v1.0.pdf', uploadedAt: new Date().toISOString() }] },
  ],
  structural: [
    { id: 'stru-001', name: 'Foundation Plan', versions: [{ version: '1.2', fileUrl: '#', fileName: 'stru-001-v1.2.pdf', uploadedAt: new Date().toISOString() }] },
  ],
  mechanical: [],
  electrical: [],
  plumbing: [],
  'shop-drawings': [],
  'detail-drawings': [{id: 'detail-001', name: 'Window Detail Section A', versions: [{version: '1.0', fileUrl: '#', fileName: 'window-detail-A-v1.pdf', uploadedAt: new Date().toISOString()}]}],
  'isometric-axonometric': [{id: 'iso-001', name: 'Overall Building Axo', versions: [{version: 'Draft 2', fileUrl: '#', fileName: 'building-axo-draft2.png', uploadedAt: new Date().toISOString()}]}],
  'presentation-drawings': [],
  'as-built': [],
};

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
    setDrawings(placeholderDrawingsData[drawingType] || []);
    setNewDrawingName('');
    setNewDrawingFile(null);
  }, [drawingType]);


  const handleUploadNewVersion = (drawingId: string) => {
    if (!newVersionFile) {
      alert('Please select a file for the new version.');
      return;
    }
    console.log(`Uploading new version for drawing ${drawingId}:`, newVersionFile.name);
    // Simulate upload and update
    setDrawings(prevDrawings => prevDrawings.map(d => {
      if (d.id === drawingId) {
        const newVersionNumber = (parseFloat(d.versions[0]?.version || '0') + 0.1).toFixed(1);
        return {
          ...d,
          versions: [{ version: newVersionNumber, fileUrl: URL.createObjectURL(newVersionFile), fileName: newVersionFile.name, uploadedAt: new Date().toISOString() }, ...d.versions]
        };
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
        versions: [{ version: '1.0', fileUrl: URL.createObjectURL(newDrawingFile), fileName: newDrawingFile.name, uploadedAt: new Date().toISOString() }]
      };
      setDrawings(prev => [newDrawing, ...prev]);
      // Update the main placeholder data (for demo purposes)
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
    <div className="container mx-auto py-8">
      <PageTitle
        title={`${currentDrawingTypeLabel}: ${projectName}`}
        description={`Manage, view, annotate, and potentially edit ${currentDrawingTypeLabel.toLowerCase()} for this project.`}
        actions={
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project Details
            </Link>
          </Button>
        }
      />

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="mr-2 h-5 w-5 text-primary" />
            2D Drawing Space & Annotation
          </CardTitle>
          <CardDescription>
            This area is designated for viewing, managing, annotating, and potentially editing 2D drawings (e.g., blueprints, schematics).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-teal-500 bg-teal-50 rounded-md">
            <p className="font-semibold text-teal-700">Note on 2D Drawing Capabilities:</p>
            <p className="text-sm text-teal-600 mt-1">
              For advanced 2D drawing viewing, annotation, and editing (e.g., DXF, DWG files, or creating markups), integration with specialized JavaScript libraries such as <strong>Fabric.js</strong>, <strong>Konva.js</strong>, or connection to dedicated CAD APIs/services would be necessary.
            </p>
          </div>
          
          <div className="mt-6 p-8 bg-muted rounded-lg flex flex-col items-center justify-center h-96 border border-dashed" data-ai-hint="2d drawing editor annotation canvas">
            <div className="flex items-center justify-center mb-4">
                <ImageIcon className="h-16 w-16 text-muted-foreground" />
                <MessageSquarePlus className="h-10 w-10 text-muted-foreground opacity-70 relative -ml-6 -mt-6" />
            </div>
            <p className="text-xl font-semibold text-foreground">2D Drawing Viewer, Editor & Annotator Placeholder</p>
            <p className="text-sm text-muted-foreground mt-1 text-center">An interactive canvas for viewing, marking up, editing, and annotating 2D drawings would appear here.</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include layer management, measurement tools, collaborative annotations, version comparison, and robust annotation tools.
          </p>
        </CardContent>
      </Card>


      <Card className="mb-6 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UploadCloud className="mr-2 h-5 w-5 text-primary" />
            Upload New {currentDrawingTypeLabel.replace(' Drawings',' Drawing')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3 items-end">
            <div className="grid gap-1.5">
              <Label htmlFor="drawingName">Drawing Name/Title</Label>
              <Input id="drawingName" value={newDrawingName} onChange={(e) => setNewDrawingName(e.target.value)} placeholder="e.g., Ground Floor Plan"/>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="drawingFile">Drawing File</Label>
              <Input id="drawingFile" type="file" onChange={(e) => setNewDrawingFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <Button onClick={handleUploadNewDrawing} disabled={!newDrawingName || !newDrawingFile} className="w-full sm:w-auto">
                <UploadCloud className="mr-2 h-4 w-4"/> Upload Drawing
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {drawings.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent className="pt-6 text-center text-muted-foreground">
                No {currentDrawingTypeLabel.toLowerCase()} found for this project.
            </CardContent>
          </Card>
        ) : (
          drawings.map((drawing) => (
            <Card key={drawing.id} className="shadow-sm">
              <CardHeader>
                <CardTitle>{drawing.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-md font-semibold mb-2 text-muted-foreground">Versions:</h3>
                <ul className="space-y-2 mb-4">
                  {drawing.versions.map((version) => (
                    <li key={version.version} className="flex justify-between items-center p-2 border rounded-md hover:bg-muted/30">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <div>
                            <span className="font-medium">Version {version.version}</span> - {version.fileName}
                            <p className="text-xs text-muted-foreground">Uploaded: {new Date(version.uploadedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={version.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-3 w-3 mr-1.5"/> View/Download
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
                <div className="grid gap-2">
                  <Label htmlFor={`newVersion-${drawing.id}`} className="text-sm font-medium">Upload New Version:</Label>
                  <div className="flex gap-2 items-center">
                    <Input id={`newVersion-${drawing.id}`} type="file" className="flex-grow" onChange={(e) => {setNewVersionFile(e.target.files ? e.target.files[0] : null); setUploadingDrawingId(drawing.id);}} />
                    <Button onClick={() => handleUploadNewVersion(drawing.id)} disabled={!newVersionFile || uploadingDrawingId !== drawing.id} size="sm">Upload</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
