'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ZoomIn,
  ZoomOut,
  Hand,
  Rotate3d,
  Ruler,
  Layers,
  Info,
  Maximize,
  ChevronRight,
  ChevronLeft,
  Settings,
  Download,
  Share2,
  Clock
} from 'lucide-react';
import { initTwoDViewer } from '@/lib/twoDViewer';
import { cn } from '@/lib/utils';
import { DrawingVersion, DrawingData } from '@/types/cad';

interface CadViewerProps {
  projectId: string;
  selectedVersion: DrawingVersion | null;
  drawingData?: DrawingData | null;
  onVersionChange?: (version: DrawingVersion) => void;
}

const CadViewer: React.FC<CadViewerProps> = ({ projectId, selectedVersion, drawingData, onVersionChange }) => {
  const twoDViewerRef = useRef<HTMLDivElement>(null);
  const threeDViewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'properties' | 'layers' | 'versions'>('properties');

  const [currentTwoDViewerInstance, setCurrentTwoDViewerInstance] = useState<any>(null);
  const [currentThreeDViewerInstance, setCurrentThreeDViewerInstance] = useState<any>(null);

  const [activeTool, setActiveTool] = useState<string>('select');
  const [selectedObject, setSelectedObject] = useState<any>(null);

  useEffect(() => {
    if (!selectedVersion) return;

    setIsLoading(true);
    // Simulation of loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedVersion]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative w-full h-[700px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col group">
      {/* Header / Top Bar */}
      <div className="absolute top-0 inset-x-0 h-14 bg-slate-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-30 transition-all group-hover:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Maximize className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight leading-none mb-1">
              {selectedVersion?.fileName || 'No File Selected'}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] h-4 py-0 px-1 border-slate-700 bg-slate-800 text-slate-400">
                V{selectedVersion?.version || '0.0'}
              </Badge>
              <span className="text-[10px] text-slate-500 font-medium">
                {selectedVersion ? `Updated ${new Date(selectedVersion.uploadedAt).toLocaleDateString()}` : '--'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
            <Download className="h-4 w-4" />
          </Button>
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex relative mt-14">
        {/* Left Toolbar - High End Floating Style */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl z-40 shadow-2xl">
          <div className="flex flex-col gap-1 border-b border-white/10 pb-2">
            <ToolbarButton icon={<Hand className="h-4 w-4" />} active={activeTool === 'pan'} onClick={() => setActiveTool('pan')} label="Pan" />
            <ToolbarButton icon={<Rotate3d className="h-4 w-4" />} active={activeTool === 'orbit'} onClick={() => setActiveTool('orbit')} label="Orbit" />
            <ToolbarButton icon={<Maximize className="h-4 w-4" />} active={activeTool === 'select'} onClick={() => setActiveTool('select')} label="Select" />
          </div>
          <div className="flex flex-col gap-1 border-b border-white/10 py-2">
            <ToolbarButton icon={<ZoomIn className="h-4 w-4" />} onClick={() => { }} label="Zoom In" />
            <ToolbarButton icon={<ZoomOut className="h-4 w-4" />} onClick={() => { }} label="Zoom Out" />
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <ToolbarButton icon={<Ruler className="h-4 w-4" />} active={activeTool === 'measure'} onClick={() => setActiveTool('measure')} label="Measure" />
            <ToolbarButton icon={<Layers className="h-4 w-4" />} active={activeTab === 'layers'} onClick={() => { setActiveTab('layers'); setIsSidebarOpen(true); }} label="Layers" />
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/50 backdrop-blur-sm z-20">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
              <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em]">Initializing Engine</p>
            </div>
          )}

          <div ref={drawingData?.type === '3D' ? threeDViewerRef : twoDViewerRef} className="w-full h-full" />

          {/* Viewport Overlay Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full z-10 shadow-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 border-r border-white/10">3D Visualization</span>
            <div className="flex items-center gap-4 text-[10px] font-medium text-slate-300">
              <span>FPS: 60</span>
              <span>MEM: 124MB</span>
              <span>VER: 4.2.0</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Retractable Info Panel */}
        <div
          className={cn(
            "h-full bg-slate-900 border-l border-white/10 transition-all duration-300 relative z-30",
            isSidebarOpen ? "w-80" : "w-0 overflow-hidden"
          )}
        >
          <div className="w-80 h-full flex flex-col pt-4">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full h-full flex flex-col">
              <div className="px-4 mb-4">
                <TabsList className="bg-slate-800 border border-white/5 w-full h-8 p-1">
                  <TabsTrigger value="properties" className="flex-1 text-[10px] uppercase font-bold tracking-wider data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Properties</TabsTrigger>
                  <TabsTrigger value="layers" className="flex-1 text-[10px] uppercase font-bold tracking-wider data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Layers</TabsTrigger>
                  <TabsTrigger value="versions" className="flex-1 text-[10px] uppercase font-bold tracking-wider data-[state=active]:bg-indigo-600 data-[state=active]:text-white">History</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                <TabsContent value="properties" className="m-0 space-y-4">
                  <div className="space-y-4">
                    <PropertySection title="General Information">
                      <PropertyItem label="Object ID" value={selectedObject?.id || "OC-92842"} />
                      <PropertyItem label="Status" value="Verified" status="success" />
                      <PropertyItem label="Type" value={drawingData?.type || "2D Component"} />
                      <PropertyItem label="Material" value="S355 Steel" />
                    </PropertySection>

                    <PropertySection title="Measurements">
                      <PropertyItem label="Width" value="1,240 mm" />
                      <PropertyItem label="Height" value="2,800 mm" />
                      <PropertyItem label="Depth" value="450 mm" />
                      <PropertyItem label="Volume" value="1.56 m³" />
                    </PropertySection>
                  </div>
                </TabsContent>

                <TabsContent value="layers" className="m-0 space-y-2">
                  {['Dimensions', 'Annotation', 'Primary Mesh', 'Collision', 'Wireframe'].map(layer => (
                    <div key={layer} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-white/5 group hover:bg-slate-800 transition-colors">
                      <span className="text-xs font-medium text-slate-300">{layer}</span>
                      <div className="w-8 h-4 bg-indigo-600 rounded-full cursor-pointer relative">
                        <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="versions" className="m-0 space-y-3">
                  {drawingData?.versions.map((v, i) => (
                    <div
                      key={v.version}
                      onClick={() => onVersionChange?.(v)}
                      className={cn(
                        "p-3 rounded-xl border transition-all cursor-pointer group",
                        selectedVersion?.version === v.version
                          ? "bg-indigo-600/10 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                          : "bg-slate-800/30 border-white/5 hover:border-slate-600"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn("text-xs font-bold uppercase tracking-wider", selectedVersion?.version === v.version ? "text-indigo-400" : "text-slate-400")}>
                          Version {v.version}
                        </span>
                        {i === 0 && <Badge className="text-[9px] bg-emerald-500/20 text-emerald-400 border-none">Current</Badge>}
                      </div>
                      <p className="text-[11px] text-slate-300 font-medium truncate mb-2">{v.fileName}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(v.uploadedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-12 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors z-40 group/btn shadow-xl"
        >
          {isSidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover/btn:opacity-10 rounded-full transition-opacity" />
        </button>
      </div>
    </div>
  );
};

const ToolbarButton = ({ icon, active, onClick, label }: { icon: React.ReactNode, active?: boolean, onClick: () => void, label: string }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-10 h-10 flex items-center justify-center rounded-xl transition-all relative group/item",
      active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40" : "text-slate-400 hover:bg-white/10 hover:text-white"
    )}
  >
    {icon}
    <div className="absolute left-14 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-50 shadow-xl border border-white/10">
      {label}
    </div>
  </button>
);

const PropertySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-2">
    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">{title}</h4>
    <div className="bg-slate-800/40 border border-white/5 rounded-xl overflow-hidden">
      {children}
    </div>
  </div>
);

const PropertyItem = ({ label, value, status }: { label: string, value: string, status?: 'success' | 'warning' | 'error' }) => (
  <div className="flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
    <span className="text-[11px] text-slate-400 font-medium">{label}</span>
    <div className="flex items-center gap-2">
      {status === 'success' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
      <span className="text-[11px] text-white font-bold">{value}</span>
    </div>
  </div>
);

export default CadViewer;
