'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Placeholder data for drawings
const placeholderDrawings = {
  architectural: [
    { id: 'arch-001', name: 'Floor Plan - Ground Floor', versions: [{ version: '1.0', file: '/path/to/arch-001-v1.pdf' }, { version: '1.1', file: '/path/to/arch-001-v1.1.pdf' }] },
    { id: 'arch-002', name: 'Elevations - North and South', versions: [{ version: '1.0', file: '/path/to/arch-002-v1.pdf' }] },
  ],
  structural: [
    { id: 'stru-001', name: 'Foundation Plan', versions: [{ version: '1.0', file: '/path/to/stru-001-v1.pdf' }, { version: '1.2', file: '/path/to/stru-001-v1.2.pdf' }] },
  ],
  // Add more drawing types and placeholder data as needed
  mechanical: [],
  electrical: [],
  plumbing: [],
  'shop drawing': [],
  'as-built': [],
  'presentation drawings': [],
  'detail drawings': [],
  'isometric/axonometric': [],
};

const DrawingsPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = params.id as string;
  const drawingType = searchParams.get('type') as keyof typeof placeholderDrawings || 'architectural';

  const drawings = placeholderDrawings[drawingType] || [];

  const [newDrawingName, setNewDrawingName] = useState('');
  const [newDrawingFile, setNewDrawingFile] = useState<File | null>(null);

  const handleUploadNewVersion = (drawingId: string) => {
    // Implement upload logic here
    console.log(`Uploading new version for drawing ${drawingId}`);
    // You would typically use a file upload API here
  };

  const handleUploadNewDrawing = () => {
    if (newDrawingName && newDrawingFile) {
      // Implement new drawing upload logic here
      console.log(`Uploading new drawing: ${newDrawingName}`);
      console.log('File:', newDrawingFile);
      // You would typically use a file upload API here
      setNewDrawingName('');
      setNewDrawingFile(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">{drawingType} Drawings</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload New Drawing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="drawingName">Drawing Name</Label>
              <Input id="drawingName" value={newDrawingName} onChange={(e) => setNewDrawingName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="drawingFile">Drawing File</Label>
              <Input id="drawingFile" type="file" onChange={(e) => setNewDrawingFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <Button onClick={handleUploadNewDrawing} disabled={!newDrawingName || !newDrawingFile}>Upload Drawing</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {drawings.length === 0 ? (
          <p>No drawings found for this type.</p>
        ) : (
          drawings.map((drawing) => (
            <Card key={drawing.id}>
              <CardHeader>
                <CardTitle>{drawing.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Versions:</h3>
                <ul className="list-disc pl-5 mb-4">
                  {drawing.versions.map((version) => (
                    <li key={version.version} className="flex justify-between items-center">
                      <span>Version {version.version}</span>
                      <a href={version.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
                    </li>
                  ))}
                </ul>
                <div className="grid gap-2">
                  <Label htmlFor={`newVersion-${drawing.id}`}>Upload New Version</Label>
                  <div className="flex gap-2">
                    <Input id={`newVersion-${drawing.id}`} type="file" onChange={(e) => console.log('File selected for version upload:', e.target.files?.[0])} />
                    <Button onClick={() => handleUploadNewVersion(drawing.id)}>Upload</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DrawingsPage;