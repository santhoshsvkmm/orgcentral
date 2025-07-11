'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

// Import your viewer initialization functions
import { initThreeDViewer } from '@/lib/threeDViewer';
// Assume you have a type for your drawing data (replace with your actual type)
interface DrawingData {
  type: '2D' | '3D';
  fileUrl: string;
  // other relevant properties
}

interface CadViewerProps {
  projectId: string;
  drawingData: DrawingData | null; // Data for the drawing/model to display
}

const CadViewer: React.FC<CadViewerProps> = ({ projectId, drawingData }) => {
  const twoDViewerRef = useRef<HTMLDivElement>(null);
  const threeDViewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State to hold the viewer instances
  const [currentTwoDViewerInstance, setCurrentTwoDViewerInstance] = useState<ReturnType<typeof initTwoDViewer> | null>(null);
  const [currentThreeDViewerInstance, setCurrentThreeDViewerInstance] = useState<ReturnType<typeof initThreeDViewer> | null>(null);


  // State for managing active tools, layers, selected objects, etc.
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [visibleLayers, setVisibleLayers] = useState<string[]>([]);
  const [selectedObject, setSelectedObject] = useState<any>(null);


  // Callback for handling object selection from viewers
  const handleObjectSelected = useCallback((obj: any) => {
    setSelectedObject(obj);
  }, []);

  useEffect(() => {
    if (!drawingData) {
      setIsLoading(false);
      setError(null); // Clear any previous errors
      // Dispose of any existing viewers if no drawing data is provided
      currentTwoDViewerInstance?.dispose();
      setCurrentTwoDViewerInstance(null);
      currentThreeDViewerInstance?.dispose();
      setCurrentThreeDViewerInstance(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Cleanup function for this effect run
    let cleanupFunctions: (() => void)[] = [];

    if (twoDViewerRef.current && drawingData.type === '2D') {
      // --- Initialize DXF Viewer for 2D Panel ---
      // 1. Ensure you have imported YourDxfViewer from your npm package above.
      // 2. Get the reference to the 2D viewer div: twoDViewerRef.current
      // 3. Initialize the DXF viewer. The initialization method depends on the package.
      // Example (conceptual, replace with actual API):
      // currentViewerInstance = new YourDxfViewer(twoDViewerRef.current, { options: {} });
      // -------------------------------------------
    // const threeDViewer = initThreeDViewer(threeDViewerRef.current, { options });
    // Or for a unified viewer:
    // const viewer = initForgeViewer(twoDViewerRef.current, { options }); // Use one ref for combined view
    }

    // Add event listeners for viewer events (e.g., selection, loaded)
    // viewer.addEventListener('selectionChanged', (event) => {
    //   setSelectedObject(event.selection);
    // });
    // ---------------------------------------------

    // --- Placeholder for Loading Data ---
    // Load the drawing data into the initialized viewer(s) here.
    // This will depend on how your chosen library handles data loading.
    // It might involve providing a file URL or a specific data format.
    // Example (conceptual):
    if (twoDViewerRef.current && drawingData.type === '2D') {
      // --- Load DXF File into 2D Viewer ---
      // Use the API of your DXF viewer instance to load the file.
      // This might involve a URL or the file content itself... Or not.
      // Example (conceptual, replace with actual API):
      // currentViewerInstance.loadDrawing(drawingData.fileUrl);
    // } else if (drawingData.type === '3D') {
    //   threeDViewer.loadModel(drawingData.fileUrl);
    // }
    // Or for a unified viewer (e.g., Forge, loading a translated model):
    // viewer.loadDocumentNode(drawingData.documentNode);

    // Handle loading success and errors
    // viewer.addEventListener('geometryLoaded', () => setIsLoading(false));
    // viewer.addEventListener('loadingError', (err) => {
    //   setError('Failed to load drawing: ' + err.message);
    //   setIsLoading(false);
    // });

    // ------------------------------------

    // --- Placeholder for Cleanup ---
    // Return a cleanup function to dispose of the viewer instances when the component unmounts.
    // This is crucial to prevent memory leaks, especially for canvas/WebGL based viewers.
    // return () => {
    //   twoDViewerInstance?.dispose(); // Call dispose method on your 2D viewer instance
    //   // threeDViewerInstance?.dispose(); // Dispose of 3D viewer if it exists
    // };
    // Or for a unified viewer:
    // return () => { /* unified viewer cleanup */
    //   viewer.finish();
    // };
    // -------------------------------

  }}, [drawingData, handleObjectSelected]); // Depend on drawingData and the memoized callback

  // --- Toolbar and Controls ---
  // Render buttons, sliders, etc. here to control the viewer.
  // These will call methods on your viewer instance(s).
  const renderToolbar = () => (
    <div className="bg-gray-100 p-2 flex space-x-2">
      {drawingData?.type === '3D' && (
        <>
          <Button onClick={() => {
            // Example: Call a method on the 3D viewer instance for zooming
            if (currentThreeDViewerInstance) {
              currentThreeDViewerInstance.camera.zoom *= 1.2;
              currentThreeDViewerInstance.camera.updateProjectionMatrix();
              currentThreeDViewerInstance.renderer.render(currentThreeDViewerInstance.scene, currentThreeDViewerInstance.camera);
            }
          }} size="sm">Zoom In (3D)</Button>
          <Button onClick={() => {
            if (currentThreeDViewerInstance) {
              currentThreeDViewerInstance.camera.zoom /= 1.2;
              currentThreeDViewerInstance.camera.updateProjectionMatrix();
              currentThreeDViewerInstance.renderer.render(currentThreeDViewerInstance.scene, currentThreeDViewerInstance.camera);
            }
          }} size="sm">Zoom Out (3D)</Button>
          <Button onClick={() => { /* activate pan tool */ setActiveTool('pan'); }} size="sm">Pan</Button>
          <Button onClick={() => { /* activate orbit tool */ setActiveTool('orbit'); }} size="sm">Orbit</Button>
        </>
      )}
      {drawingData?.type === '2D' && (
         <>
          <Button onClick={() => {
            // Implement 2D zoom logic here using currentTwoDViewerInstance API
            console.log("2D Zoom In clicked");
          }} size="sm">Zoom In (2D)</Button>
          <Button onClick={() => {
            // Implement 2D zoom logic here using currentTwoDViewerInstance API
            console.log("2D Zoom Out clicked");
          }} size="sm">Zoom Out (2D)</Button>
          <Button onClick={() => { /* activate 2D pan tool */ setActiveTool('2d-pan'); }} size="sm">Pan (2D)</Button>
         </>
      )}
      <Button onClick={() => { /* call zoom out on viewer */ }} size="sm">Zoom Out</Button>
      <Button onClick={() => { /* activate pan tool */ setActiveTool('pan'); }} size="sm">Pan</Button>
      <Button onClick={() => { /* activate orbit tool */ setActiveTool('orbit'); }} size="sm">Orbit</Button>
      {/* Add more tools: Measure, Annotate, Select, Layer toggle, Sectioning, etc. */}
    </div>
  );
  // -------------------------------------------

  // --- Placeholder for Information/Properties Panel ---
  // Display details of the selected object here.
  const renderInfoPanel = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Object Properties</CardTitle>
        <CardDescription>Details of the selected drawing element or model component.</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedObject ? (
          <div>
            {/* Display properties from selectedObject */}
            <p>ID: {selectedObject.id || 'N/A'}</p>
            <p>Name: {selectedObject.name || 'N/A'}</p>
            <p>Type: {selectedObject.type || 'N/A'}</p>
            {/* For Three.js, selectedObject is a THREE.Object3D */}
            {selectedObject.position && (
              <p>Position: X:{selectedObject.position.x.toFixed(2)}, Y:{selectedObject.position.y.toFixed(2)}, Z:{selectedObject.position.z.toFixed(2)}</p>
            )}
            {/* For DXF entities, properties would be different */}
            {selectedObject.start && selectedObject.end && (
              <p>Line from ({selectedObject.start.x.toFixed(2)}, {selectedObject.start.y.toFixed(2)}) to ({selectedObject.end.x.toFixed(2)}, {selectedObject.end.y.toFixed(2)})</p>
            )}
            {/* Add more properties as needed */}
            <pre>{JSON.stringify(selectedObject, null, 2)}</pre>
          </div>
        ) : (
          <p className="text-muted-foreground">Select an object in the viewer to see its properties.</p>
        )}
      </CardContent>
    </Card>
  );
  // ---------------------------------------------------

  return (
    <Card className="shadow-md h-[calc(100vh-200px)] flex flex-col"> {/* Adjust height as needed */}
      <CardHeader>
        <CardTitle>{drawingData ? `Viewing: ${drawingData.fileUrl.split('/').pop()}` : 'CAD Viewer'}</CardTitle>
        <CardDescription>Interactive viewer for 2D drawings and 3D models.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4">
         {/* Toolbar Area */}
         {renderToolbar()}

        {isLoading && (
          <div className="flex-grow flex items-center justify-center">
            <p>Loading drawing...</p> {/* Replace with a spinner if you have one */}
          </div>
        )}

        {error && (
          <div className="flex-grow flex items-center justify-center text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* Main Viewer Area - Split Panel */}
        {(!isLoading && !error) && (
           <PanelGroup direction="horizontal" className="flex-grow"> {/* Adjust defaultSize based on desired split */}
             <Panel defaultSize={drawingData?.type === '2D' ? 100 : 50} minSize={20}>
               <div ref={twoDViewerRef} className="w-full h-full bg-gray-200 relative">
                 {/* The 2D CAD viewer will render inside this div */}
                 {(!drawingData || drawingData.type !== '2D') && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      2D Viewer Placeholder (Load a 2D drawing)
                    </div>
                 )}
               </div>
             </Panel>
             <PanelResizeHandle className="w-2 bg-gray-300 hover:bg-gray-400 transition-colors cursor-ew-resize" /> {/* Resizer handle */}
             <Panel defaultSize={drawingData?.type === '3D' ? 100 : 50} minSize={20}>
               <div ref={threeDViewerRef} className="w-full h-full bg-gray-300 relative">
                 {/* The 3D CAD viewer will render inside this div */}
                 {!drawingData || drawingData.type !== '3D' && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      3D Viewer Placeholder (Load a 3D model)
                    </div>
                 )}
               </div>
             </Panel>
           </PanelGroup>
        )}

        {/* Information/Properties Panel Area */}
        {renderInfoPanel()}

      </CardContent>
    </Card>
  );
};

export default CadViewer;