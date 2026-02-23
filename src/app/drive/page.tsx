
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FolderPlus, Folder as FolderIcon, FileText as FileIcon, HardDrive, Search, UploadCloud, Trash2, ChevronRight, ChevronLeft, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types -------------------------------------------------
type FileSystemItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: string;
  sizeBytes?: number;
  lastModified?: string;
  children?: FileSystemItem[];
};

// --- Initial demo data -----------------------------------
const initialFileSystem: FileSystemItem[] = [
  {
    id: "folder-1",
    name: "Project Documents",
    type: "folder",
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    children: [
      { id: "file-1-1", name: "Project Plan.docx", type: "file", size: "1.2MB", sizeBytes: 1.2 * 1024 * 1024, lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      {
        id: "folder-1-1",
        name: "Blueprints",
        type: "folder",
        lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        children: [{ id: "file-1-1-1", name: "FloorPlan_Rev2.pdf", type: "file", size: "5.3MB", sizeBytes: 5.3 * 1024 * 1024, lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }],
      },
    ],
  },
  { id: "folder-2", name: "Client Communications", type: "folder", lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), children: [] },
  { id: "file-1", name: "Company Policies.pdf", type: "file", size: "300KB", sizeBytes: 300 * 1024, lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "file-2", name: "Team Meeting Notes.md", type: "file", size: "15KB", sizeBytes: 15 * 1024, lastModified: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
  { id: "file-3", name: "Large Video File.mp4", type: "file", size: "150.5MB", sizeBytes: 150.5 * 1024 * 1024, lastModified: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
];

const LOCAL_KEY = "orgcentral:drive:items";
const TOTAL_SPACE_GB = 15;

// --- Helpers ------------------------------------------------
const formatBytes = (bytes = 0, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const generateId = (prefix = "id") => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

function findFolderByPath(root: FileSystemItem[], path: string[]): FileSystemItem[] {
  if (!path.length) return root;
  let current: FileSystemItem[] = root;
  for (const id of path) {
    const found = current.find((c) => c.id === id && c.type === "folder");
    if (!found || !found.children) return [];
    current = found.children;
  }
  return current;
}

// --- Component ---------------------------------------------
export default function DrivePage() {
  const [items, setItems] = useState<FileSystemItem[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? (JSON.parse(raw) as FileSystemItem[]) : initialFileSystem;
    } catch (e) {
      return initialFileSystem;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const [path, setPath] = useState<string[]>([]); // holds folder ids
  const [filterText, setFilterText] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<"name" | "size" | "modified">("name");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [previewItem, setPreviewItem] = useState<FileSystemItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentFolderItems = useMemo(() => findFolderByPath(items, path), [items, path]);

  const totalSpaceBytes = TOTAL_SPACE_GB * 1024 * 1024 * 1024;
  const usedSpaceBytes = useMemo(() => {
    let total = 0;
    function walk(list: FileSystemItem[]) {
      for (const it of list) {
        if (it.type === "file") total += it.sizeBytes || 0;
        if (it.children) walk(it.children);
      }
    }
    walk(items);
    return total;
  }, [items]);

  const usedPercentage = (usedSpaceBytes / totalSpaceBytes) * 100;

  // --- Actions ------------------------------------------------
  const openFolder = (id: string) => setPath((p) => [...p, id]);
  const navigateToPathIndex = (index: number) => setPath((p) => p.slice(0, index + 1));
  const goUp = () => setPath((p) => p.slice(0, -1));

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const folder: FileSystemItem = { id: generateId("folder"), name: newFolderName.trim(), type: "folder", lastModified: new Date().toISOString(), children: [] };
    if (!path.length) {
      setItems((s) => [folder, ...s]);
    } else {
      // insert into nested folder
      const newTree = JSON.parse(JSON.stringify(items)) as FileSystemItem[];
      let node = newTree;
      for (const pid of path) {
        const found = node.find((n: any) => n.id === pid);
        if (!found) return;
        if (!found.children) found.children = [];
        node = found.children;
      }
      node.unshift(folder);
      setItems(newTree);
    }
    setNewFolderName("");
    setCreateFolderOpen(false);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || !files.length) return;
    const toAdd: FileSystemItem[] = [];
    for (const f of Array.from(files)) {
      const sizeBytes = f.size;
      const sizeLabel = formatBytes(sizeBytes);
      toAdd.push({ id: generateId("file"), name: f.name, type: "file", size: sizeLabel, sizeBytes, lastModified: new Date(f.lastModified || Date.now()).toISOString() });
    }

    if (!path.length) {
      setItems((s) => [...toAdd, ...s]);
    } else {
      const newTree = JSON.parse(JSON.stringify(items)) as FileSystemItem[];
      let node = newTree;
      for (const pid of path) {
        const found = node.find((n: any) => n.id === pid);
        if (!found) return;
        if (!found.children) found.children = [];
        node = found.children;
      }
      node.unshift(...toAdd);
      setItems(newTree);
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedIds.length) return;
    function removeIds(list: FileSystemItem[]): FileSystemItem[] {
      return list.filter((i) => !selectedIds.includes(i.id)).map((i) => ({ ...i, children: i.children ? removeIds(i.children) : undefined }));
    }
    const newTree = removeIds(items);
    setItems(newTree);
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const filteredItems = useMemo(() => {
    let list = currentFolderItems.slice();
    if (filterText.trim()) list = list.filter((i) => i.name.toLowerCase().includes(filterText.toLowerCase()));
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "size") list.sort((a, b) => (b.sizeBytes || 0) - (a.sizeBytes || 0));
    if (sortBy === "modified") list.sort((a, b) => (new Date(b.lastModified || 0).getTime()) - (new Date(a.lastModified || 0).getTime()));
    return list;
  }, [currentFolderItems, filterText, sortBy]);

  // --- Render helpers ----------------------------------------
  const Breadcrumbs = () => {
    const names: { id: string; name: string }[] = [];
    let nodeList = items;
    for (const id of path) {
      const found = nodeList.find((n) => n.id === id);
      if (!found) break;
      names.push({ id: found.id, name: found.name });
      nodeList = found.children || [];
    }

    return (
      <div className="flex items-center text-sm gap-2">
        <Button variant="ghost" size="sm" onClick={() => setPath([])} className={cn(!path.length && "opacity-60")}>Root</Button>
        {names.map((n, i) => (
          <span key={n.id} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <button onClick={() => navigateToPathIndex(i)} className="text-sm text-muted-foreground hover:underline">{n.name}</button>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <PageTitle
        title="File Storage"
        description="Manage your documents, folders, and shared files."
        actions={
          <div className="flex items-center gap-2">
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
            <Button onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="mr-2 h-4 w-4" /> Upload
            </Button>
            <Button onClick={() => setCreateFolderOpen(true)} variant="ghost">
              <FolderPlus className="mr-2 h-4 w-4" /> New Folder
            </Button>
          </div>
        }
      />

      <Card className="shadow-md mb-6">
        <CardHeader>
          <CardTitle className="flex items-center"><HardDrive className="mr-2 h-5 w-5 text-primary"/>Storage Overview</CardTitle>
          <CardDescription>Your current storage usage.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <Progress value={Math.min(100, usedPercentage)} className="w-full h-3" />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatBytes(usedSpaceBytes)} used</span>
            <span>{formatBytes(totalSpaceBytes)} total</span>
          </div>
          {usedPercentage > 90 && (
            <p className="text-xs text-destructive mt-2">Warning: Storage is almost full.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle>My Drive</CardTitle>
              <CardDescription>
                <Breadcrumbs />
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <Input placeholder="Quick search..." className="w-64" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-2 py-1 border rounded-md text-sm">
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="modified">Last modified</option>
              </select>
              <Button variant={view === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setView('list')}>List</Button>
              <Button variant={view === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setView('grid')}>Grid</Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 border-l-4 border-amber-500 bg-amber-50 rounded-md text-amber-700">
            <p className="font-semibold">Note:</p>
            <p className="text-sm">This Drive UI stores metadata locally (demo). File upload does not store file bytes on the server in this prototype.</p>
          </div>

          <div className="border rounded-lg">
            <div className="flex items-center p-3 border-b bg-muted/50 font-semibold text-sm">
              <div className="flex items-center gap-2 w-64">
                <input type="checkbox" className="mr-2" checked={selectedIds.length === currentFolderItems.length && currentFolderItems.length>0} onChange={(e) => {
                  if (e.target.checked) setSelectedIds(currentFolderItems.map(i => i.id)); else setSelectedIds([]);
                }} />
                <span>Name</span>
              </div>
              <div className="flex-1 hidden md:block">&nbsp;</div>
              <div className="mr-4 hidden md:block">Size</div>
              <div className="hidden md:block">Last Modified</div>
            </div>

            {filteredItems.length > 0 ? (
              view === 'list' ? (
                filteredItems.map(item => (
                  <div key={item.id} className="flex items-center p-3 border-b hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2 w-64">
                      <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                      {item.type === 'folder' ? <FolderIcon className="h-5 w-5 mr-2 text-primary" /> : <FileIcon className="h-5 w-5 mr-2 text-muted-foreground" />}
                      <button onClick={() => item.type === 'folder' ? openFolder(item.id) : setPreviewItem(item)} className="text-left font-medium truncate">{item.name}</button>
                    </div>
                    <div className="flex-1 hidden md:block"></div>
                    <div className="mr-4 hidden md:block">{item.type === 'file' ? item.size : ''}</div>
                    <div className="hidden md:block">{item.lastModified ? new Date(item.lastModified).toLocaleString() : ''}</div>
                  </div>
                ))
              ) : (
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className="border rounded p-3 flex flex-col" onDoubleClick={() => item.type === 'folder' ? openFolder(item.id) : setPreviewItem(item)}>
                      <div className="flex items-center gap-2 mb-2">
                        {item.type === 'folder' ? <FolderIcon className="h-6 w-6 text-primary" /> : <FileIcon className="h-6 w-6 text-muted-foreground" />}
                        <div className="font-medium truncate">{item.name}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-auto">{item.type === 'file' ? item.size : `${item.children?.length ?? 0} items`}</div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="p-6 text-center text-muted-foreground">{filterText ? "No items match your filter." : "This folder is empty."}</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create folder dialog */}
      <Dialog open={createFolderOpen} onOpenChange={setCreateFolderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
          </DialogHeader>
          <div className="pt-2">
            <Input placeholder="Folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setCreateFolderOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateFolder}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview dialog */}
      <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{previewItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">Type: {previewItem?.type}</p>
            {previewItem?.type === 'file' && (
              <>
                <p className="text-sm text-muted-foreground">Size: {previewItem?.size}</p>
                <p className="text-sm text-muted-foreground">Modified: {previewItem?.lastModified ? new Date(previewItem.lastModified).toLocaleString() : '-'}</p>
              </>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setPreviewItem(null)}>Close</Button>
            <Button onClick={() => { /* placeholder for download */ alert('Download simulated'); }}>Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
