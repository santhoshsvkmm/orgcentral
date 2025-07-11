// src/lib/twoDViewer.ts
import * as DXFParser from 'dxf-parser';

interface TwoDViewerInstance {
  loadDrawing: (url: string) => Promise<void>;
  dispose: () => void;
  zoomIn: () => void; // Conceptual zoom in
  zoomOut: () => void; // Conceptual zoom out
  pan: (dx: number, dy: number) => void; // Conceptual pan
  // Add methods for zoom, pan, layer toggling etc.
  onSelectionChanged?: (object: any | null) => void;
}

export const initTwoDViewer = (container: HTMLDivElement, options?: any): TwoDViewerInstance => {
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2D rendering context for canvas');
  }

  let panX = 0;
  let panY = 0;
  let zoom = 1;

  const resizeCanvas = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear on resize
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas(); // Initial resize

  let dxfData: any = null; // Store parsed DXF data
  let selectionCallback: ((object: any | null) => void) | undefined;

  const renderDxf = () => {
    if (!ctx || !dxfData) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.save(); // Save current state

    // Apply pan and zoom transformations
    ctx.translate(canvas.width / 2 + panX, canvas.height / 2 + panY);
    ctx.scale(zoom, zoom);
    // Conceptual rendering logic for DXF entities
    // NOTE: This rendering is highly simplified. A robust DXF viewer requires handling many more entity types, layers, colors, line types, blocks, text styles, dimensions, etc. Consider using a dedicated library for production use.
    // This is a simplified example and would need significant expansion
    // to handle all DXF entity types, layers, colors, line types, etc.
    dxfData.entities.forEach((entity: any) => {
      switch (entity.type) {
        case 'LINE':
          ctx.beginPath();
          ctx.moveTo(entity.start.x, entity.start.y);
          ctx.lineTo(entity.end.x, entity.end.y);
          ctx.stroke();
          break;
        case 'CIRCLE':
          ctx.beginPath();
          ctx.arc(entity.x, entity.y, entity.r, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        // Add more entity types (ARC, LWPOLYLINE, TEXT, etc.)
        default:
          // console.warn('Unsupported DXF entity type:', entity.type);
          break;
      }
    });

    // Basic transformation to fit drawing to canvas
    // This would involve calculating bounding box and scaling
    // For simplicity, this example assumes content fits or scales automatically.
  };


  // --- Event handling for selection (conceptual) ---
  const onCanvasClick = (event: MouseEvent) => {
      if (!dxfData) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Conceptual hit-testing: iterate through entities and check if click is within bounds
      // This is complex for actual CAD and would likely be handled by a proper library
      const clickedEntity = dxfData.entities.find((entity: any) => {
        // Very basic example: check if click is near a line segment
        if (entity.type === 'LINE') {
            const dist = Math.abs((entity.end.y - entity.start.y) * x - (entity.end.x - entity.start.x) * y + entity.end.x * entity.start.y - entity.end.y * entity.start.x) /
                         Math.sqrt(Math.pow(entity.end.y - entity.start.y, 2) + Math.pow(entity.end.x - entity.start.x, 2));
            return dist < 5; // Within 5 pixels of the line
        }
        return false;
      });

      if (selectionCallback) {
          selectionCallback(clickedEntity || null);
      }
  };
  canvas.addEventListener('click', onCanvasClick);


  return {
    loadDrawing: async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dxfContent = await response.text();
        const parser = new DXFParser();
        dxfData = parser.parse(dxfContent);
        console.log('Parsed DXF data:', dxfData);
        renderDxf(); // Render after parsing
      } catch (error) {
        console.error('Error loading or parsing DXF:', error);
        throw error;
      }
    },
    dispose: () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', onCanvasClick);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      console.log('2D viewer disposed.');
    },
    set onSelectionChanged(callback: ((object: any | null) => void) | undefined) {
      selectionCallback = callback;
    }
  };
};
import * as DXFParser from 'dxf-parser';

interface TwoDViewerInstance {
  loadDrawing: (url: string) => Promise<void>;
  dispose: () => void;
  // Add methods for zoom, pan, layer toggling etc.
  onSelectionChanged?: (object: any | null) => void;
}

export const initTwoDViewer = (container: HTMLDivElement, options?: any): TwoDViewerInstance => {
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2D rendering context for canvas');
  }

  const resizeCanvas = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear on resize
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas(); // Initial resize

  let dxfData: any = null; // Store parsed DXF data
  let selectionCallback: ((object: any | null) => void) | undefined;

  const renderDxf = () => {
    if (!ctx || !dxfData) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // Conceptual rendering logic for DXF entities
    // This is a simplified example and would need significant expansion
    // to handle all DXF entity types, layers, colors, line types, etc.
    dxfData.entities.forEach((entity: any) => {
      switch (entity.type) {
        case 'LINE':
          ctx.beginPath();
          ctx.moveTo(entity.start.x, entity.start.y);
          ctx.lineTo(entity.end.x, entity.end.y);
          ctx.stroke();
          break;
        case 'CIRCLE':
          ctx.beginPath();
          ctx.arc(entity.x, entity.y, entity.r, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        // Add more entity types (ARC, LWPOLYLINE, TEXT, etc.)
        default:
          // console.warn('Unsupported DXF entity type:', entity.type);
          break;
      }
    });

    // Basic transformation to fit drawing to canvas
    // This would involve calculating bounding box and scaling
    // For simplicity, this example assumes content fits or scales automatically.
  };


  // --- Event handling for selection (conceptual) ---
  const onCanvasClick = (event: MouseEvent) => {
      if (!dxfData) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Conceptual hit-testing: iterate through entities and check if click is within bounds
      // This is complex for actual CAD and would likely be handled by a proper library
      const clickedEntity = dxfData.entities.find((entity: any) => {
        // Very basic example: check if click is near a line segment
        if (entity.type === 'LINE') {
            const dist = Math.abs((entity.end.y - entity.start.y) * x - (entity.end.x - entity.start.x) * y + entity.end.x * entity.start.y - entity.end.y * entity.start.x) /
                         Math.sqrt(Math.pow(entity.end.y - entity.start.y, 2) + Math.pow(entity.end.x - entity.start.x, 2));
            return dist < 5; // Within 5 pixels of the line
        }
        return false;
      });

      if (selectionCallback) {
          selectionCallback(clickedEntity || null);
      }
  };
  canvas.addEventListener('click', onCanvasClick);


  return {
    loadDrawing: async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dxfContent = await response.text();
        const parser = new DXFParser();
        dxfData = parser.parse(dxfContent);
        console.log('Parsed DXF data:', dxfData);
        renderDxf(); // Render after parsing
      } catch (error) {
        console.error('Error loading or parsing DXF:', error);
        throw error;
      }
    },
    dispose: () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', onCanvasClick);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      console.log('2D viewer disposed.');
    },
    set onSelectionChanged(callback: ((object: any | null) => void) | undefined) {
      selectionCallback = callback;
    }
  };
};

import * as DXFParser from 'dxf-parser';

interface TwoDViewerInstance {
  loadDrawing: (url: string) => Promise<void>;
  dispose: () => void;
  // Add methods for zoom, pan, layer toggling etc.
  onSelectionChanged?: (object: any | null) => void;
}

export const initTwoDViewer = (container: HTMLDivElement, options?: any): TwoDViewerInstance => {
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2D rendering context for canvas');
  }

  const resizeCanvas = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear on resize
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas(); // Initial resize

  let dxfData: any = null; // Store parsed DXF data
  let selectionCallback: ((object: any | null) => void) | undefined;

  const renderDxf = () => {
    if (!ctx || !dxfData) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // Conceptual rendering logic for DXF entities
    // This is a simplified example and would need significant expansion
    // to handle all DXF entity types, layers, colors, line types, etc.
    dxfData.entities.forEach((entity: any) => {
      switch (entity.type) {
        case 'LINE':
          ctx.beginPath();
          ctx.moveTo(entity.start.x, entity.start.y);
          ctx.lineTo(entity.end.x, entity.end.y);
          ctx.stroke();
          break;
        case 'CIRCLE':
          ctx.beginPath();
          ctx.arc(entity.x, entity.y, entity.r, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        // Add more entity types (ARC, LWPOLYLINE, TEXT, etc.)
        default:
          // console.warn('Unsupported DXF entity type:', entity.type);
          break;
      }
    });
    ctx.restore(); // Restore to original state

    };


  // --- Event handling for selection (conceptual) ---
  const onCanvasClick = (event: MouseEvent) => {
      if (!dxfData) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Conceptual hit-testing: iterate through entities and check if click is within bounds
      // NOTE: Hit-testing for complex DXF entities in canvas is non-trivial. A production-ready viewer would need a more sophisticated approach, possibly involving rendering to an offscreen buffer or using a spatial index.

      // This is complex for actual CAD and would likely be handled by a proper library
      const clickedEntity = dxfData.entities.find((entity: any) => {
        // Very basic example: check if click is near a line segment
        if (entity.type === 'LINE') {
            const dist = Math.abs((entity.end.y - entity.start.y) * x - (entity.end.x - entity.start.x) * y + entity.end.x * entity.start.y - entity.end.y * entity.start.x) /
                         Math.sqrt(Math.pow(entity.end.y - entity.start.y, 2) + Math.pow(entity.end.x - entity.start.x, 2));
            return dist < 5; // Within 5 pixels of the line
        }
        return false;
      });

      if (selectionCallback) {
          selectionCallback(clickedEntity || null);
      }
  };
  canvas.addEventListener('click', onCanvasClick);

  // Conceptual Zoom and Pan methods
  const zoomIn = () => {
    zoom *= 1.1; // Increase zoom by 10%
    renderDxf();
  };

  const zoomOut = () => {
    zoom /= 1.1; // Decrease zoom by 10%
    renderDxf();
  };

  // dx and dy are in canvas coordinates
  const pan = (dx: number, dy: number) => {
      // Adjust pan based on current zoom level
    panX += dx / zoom;
    panY += dy / zoom;
    renderDxf();
  };


  return {
    loadDrawing: async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dxfContent = await response.text();
        const parser = new DXFParser();
        dxfData = parser.parse(dxfContent);
        console.log('Parsed DXF data:', dxfData);
        renderDxf(); // Render after parsing
      } catch (error) {
        console.error('Error loading or parsing DXF:', error);
        throw error;
      }
    },
    dispose: () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', onCanvasClick);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      console.log('2D viewer disposed.');
    },
    zoomIn,
    zoomOut,
    pan,
    set onSelectionChanged(callback: ((object: any | null) => void) | undefined) {
      selectionCallback = callback;
    }
  };
};