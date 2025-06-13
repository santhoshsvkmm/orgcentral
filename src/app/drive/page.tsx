
'use client';

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderPlus, Folder as FolderIcon, FileText as FileIcon } from "lucide-react";
import { useState } from "react";

// Mock file/folder structure
interface FileSystemItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string; // for files
  lastModified?: string; // ISO string
  children?: FileSystemItem[]; // for folders
}

const initialFileSystem: FileSystemItem[] = [
  { id: 'folder-1', name: 'Project Documents', type: 'folder', lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), children: [
    { id: 'file-1-1', name: 'Project Plan.docx', type: 'file', size: '1.2MB', lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'folder-1-1', name: 'Blueprints', type: 'folder', lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), children: [
       { id: 'file-1-1-1', name: 'FloorPlan_Rev2.pdf', type: 'file', size: '5.3MB', lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ]},
  ]},
  { id: 'folder-2', name: 'Client Communications', type: 'folder', lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), children: [] },
  { id: 'file-1', name: 'Company Policies.pdf', type: 'file', size: '300KB', lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'file-2', name: 'Team Meeting Notes.md', type: 'file', size: '15KB', lastModified: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
];


export default function DrivePage() {
  const [currentPath, setCurrentPath] = useState<string[]>([]); // Array of folder names for breadcrumbs
  const [items, setItems] = useState<FileSystemItem[]>(initialFileSystem);

  // In a real app, navigation and CRUD operations would be complex.
  // This is a very simplified display.

  const handleCreateFolder = () => {
    // Non-functional placeholder for now
    alert("Create Folder functionality would be implemented here.");
  };

  const renderItem = (item: FileSystemItem) => (
    <div key={item.id} className="flex items-center p-3 border-b hover:bg-muted/50 cursor-pointer rounded-md transition-colors">
      {item.type === 'folder' ? <FolderIcon className="h-5 w-5 mr-3 text-primary" /> : <FileIcon className="h-5 w-5 mr-3 text-muted-foreground" />}
      <span className="flex-1 font-medium">{item.name}</span>
      {item.type === 'file' && item.size && <span className="text-sm text-muted-foreground mr-4">{item.size}</span>}
      {item.lastModified && <span className="text-sm text-muted-foreground hidden md:inline-block">{new Date(item.lastModified).toLocaleDateString()}</span>}
      {/* Placeholder for actions (more options, delete, rename etc.) */}
    </div>
  );

  return (
    <>
      <PageTitle
        title="File Storage"
        description="Manage your documents, folders, and shared files."
        actions={
          <Button onClick={handleCreateFolder} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <FolderPlus className="mr-2 h-4 w-4" /> Create Folder
          </Button>
        }
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>My Drive</CardTitle>
          <CardDescription>
            {/* Breadcrumbs would go here: Root / {currentPath.join(' / ')} */}
            Current Path: Root {currentPath.length > 0 ? `/ ${currentPath.join(' / ')}` : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 border-l-4 border-amber-500 bg-amber-50 rounded-md text-amber-700">
            <p className="font-semibold">Feature Under Development:</p>
            <p className="text-sm">
              This is a UI placeholder for a file storage system. Actual file uploads, downloads, folder navigation, sharing, and other Google Drive-like functionalities require significant backend development and are not yet implemented.
            </p>
          </div>

          <div className="border rounded-lg">
            <div className="flex items-center p-3 border-b bg-muted/50 font-semibold text-sm">
              <span className="flex-1 ml-8">Name</span>
              <span className="mr-4 hidden md:inline-block">Size</span>
              <span className="hidden md:inline-block">Last Modified</span>
            </div>
            {items.length > 0 ? (
              items.map(item => renderItem(item))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                This folder is empty.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
