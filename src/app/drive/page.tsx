
'use client';

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FolderPlus, Folder as FolderIcon, FileText as FileIcon, HardDrive, Search } from "lucide-react"; // Added Search
import { useState, useMemo } from "react";
import { Progress } from "@/components/ui/progress"; // Assuming Progress is used

// Mock file/folder structure
interface FileSystemItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string; // for files, e.g., '1.2MB', '300KB'
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
  { id: 'file-3', name: 'Large Video File.mp4', type: 'file', size: '150.5MB', lastModified: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
];

// Helper to parse size string (e.g., '1.2MB', '300KB') to bytes
const parseSizeToBytes = (sizeStr?: string): number => {
  if (!sizeStr) return 0;
  const match = sizeStr.match(/([\d.]+)([KMGT]?B)/i);
  if (!match) return 0;

  const size = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  switch (unit) {
    case 'KB': return size * 1024;
    case 'MB': return size * 1024 * 1024;
    case 'GB': return size * 1024 * 1024 * 1024;
    case 'TB': return size * 1024 * 1024 * 1024 * 1024;
    default: return size; // Assume bytes if no unit or 'B'
  }
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};


export default function DrivePage() {
  const [currentPath, setCurrentPath] = useState<string[]>([]); // Array of folder names for breadcrumbs
  const [filterText, setFilterText] = useState<string>(''); // State for filter text
  const [items, setItems] = useState<FileSystemItem[]>(initialFileSystem); // Keep items state if navigation is planned

  const totalSpaceGB = 15; // 15 GB total storage
  const totalSpaceBytes = totalSpaceGB * 1024 * 1024 * 1024;

  const usedSpaceBytes = useMemo(() => {
    let totalBytes = 0;
    function calculateUsedSpaceRecursive(currentItems: FileSystemItem[]) {
      currentItems.forEach(item => {
        if (item.type === 'file') {
          totalBytes += parseSizeToBytes(item.size);
        } else if (item.children) {
          calculateUsedSpaceRecursive(item.children);
        }
      });
    }
    calculateUsedSpaceRecursive(initialFileSystem); 
    return totalBytes;
  }, []); 

  const usedSpacePercentage = (usedSpaceBytes / totalSpaceBytes) * 100;

  const handleCreateFolder = () => {
    alert("Create Folder functionality would be implemented here.");
  };

  // Filtered items based on filterText
  const filteredDisplayItems = useMemo(() => {
    if (!filterText.trim()) {
      return items; // 'items' currently holds initialFileSystem or current folder content (if navigation was implemented)
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [items, filterText]);

  const renderItem = (item: FileSystemItem) => (
    <div key={item.id} className="flex items-center p-3 border-b hover:bg-muted/50 cursor-pointer rounded-md transition-colors">
      {item.type === 'folder' ? <FolderIcon className="h-5 w-5 mr-3 text-primary" /> : <FileIcon className="h-5 w-5 mr-3 text-muted-foreground" />}
      <span className="flex-1 font-medium">{item.name}</span>
      {item.type === 'file' && item.size && <span className="text-sm text-muted-foreground mr-4">{item.size}</span>}
      {item.lastModified && <span className="text-sm text-muted-foreground hidden md:inline-block">{new Date(item.lastModified).toLocaleDateString()}</span>}
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
      <Card className="shadow-md mb-6">
        <CardHeader>
            <CardTitle className="flex items-center"><HardDrive className="mr-2 h-5 w-5 text-primary"/>Storage Overview</CardTitle>
            <CardDescription>Your current storage usage.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-2">
                <Progress value={usedSpacePercentage} className="w-full h-3" />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatBytes(usedSpaceBytes)} used</span>
                <span>{formatBytes(totalSpaceBytes)} total</span>
            </div>
             {usedSpacePercentage > 90 && (
                 <p className="text-xs text-destructive mt-2">Warning: Storage is almost full.</p>
             )}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>My Drive</CardTitle>
          <CardDescription>
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

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter files and folders by name..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-10"
            />
          </div>

          <div className="border rounded-lg">
            <div className="flex items-center p-3 border-b bg-muted/50 font-semibold text-sm">
              <span className="flex-1 ml-8">Name</span>
              <span className="mr-4 hidden md:inline-block">Size</span>
              <span className="hidden md:inline-block">Last Modified</span>
            </div>
            {filteredDisplayItems.length > 0 ? (
              filteredDisplayItems.map(item => renderItem(item))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                {filterText ? "No items match your filter." : "This folder is empty."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
