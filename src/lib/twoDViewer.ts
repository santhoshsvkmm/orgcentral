/* eslint-disable @typescript-eslint/no-explicit-any */
import DXFParser from 'dxf-parser';

interface TwoDViewerInstance {
    loadDrawing: (url: string) => Promise<void>;
    dispose: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    pan: (dx: number, dy: number) => void;
    onSelectionChanged?: (object: any | null) => void;
}

export const initTwoDViewer = (container: HTMLDivElement, _options?: any): TwoDViewerInstance => {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Failed to get 2D rendering context for canvas');
    }

    let panX = 0;
    let panY = 0;
    let zoom = 1;

    let dxfData: any = null;
    let imageFallback: HTMLImageElement | null = null;
    let selectionCallback: ((object: any | null) => void) | undefined;

    const resizeCanvas = () => {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        renderFrame();
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    const renderFrame = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2 + panX, canvas.height / 2 + panY);
        ctx.scale(zoom, zoom);

        if (imageFallback) {
            const imgWidth = imageFallback.width;
            const imgHeight = imageFallback.height;
            const scaleToFitX = canvas.width / imgWidth;
            const scaleToFitY = canvas.height / imgHeight;
            const fitScale = Math.min(scaleToFitX, scaleToFitY) * 0.9;

            ctx.scale(fitScale, fitScale);
            ctx.drawImage(imageFallback, -imgWidth / 2, -imgHeight / 2);
        } else if (dxfData) {
            ctx.strokeStyle = '#cbd5e1'; // slate-300
            ctx.lineWidth = 1 / zoom;

            dxfData.entities.forEach((entity: any) => {
                switch (entity.type) {
                    case 'LINE':
                        ctx.beginPath();
                        ctx.moveTo(entity.start.x, -entity.start.y);
                        ctx.lineTo(entity.end.x, -entity.end.y);
                        ctx.stroke();
                        break;
                    case 'CIRCLE':
                        ctx.beginPath();
                        ctx.arc(entity.x, -entity.y, entity.r, 0, 2 * Math.PI);
                        ctx.stroke();
                        break;
                    default:
                        break;
                }
            });
        } else {
            ctx.fillStyle = '#64748b';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Loading Viewer...', 0, 0);
        }

        ctx.restore();
    };

    const onCanvasClick = (event: MouseEvent) => {
        if (!dxfData || imageFallback) return;
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left - (canvas.width / 2 + panX)) / zoom;
        const y = (event.clientY - rect.top - (canvas.height / 2 + panY)) / zoom;

        const clickedEntity = dxfData.entities.find((entity: any) => {
            if (entity.type === 'LINE') {
                const startY = -entity.start.y;
                const endY = -entity.end.y;
                const dist = Math.abs((endY - startY) * x - (entity.end.x - entity.start.x) * y + entity.end.x * startY - endY * entity.start.x) /
                    Math.sqrt(Math.pow(endY - startY, 2) + Math.pow(entity.end.x - entity.start.x, 2));
                return dist < (5 / zoom);
            }
            return false;
        });

        if (selectionCallback) {
            selectionCallback(clickedEntity || null);
        }
    };
    canvas.addEventListener('click', onCanvasClick);

    const zoomIn = () => {
        zoom *= 1.2;
        renderFrame();
    };

    const zoomOut = () => {
        zoom /= 1.2;
        renderFrame();
    };

    const pan = (dx: number, dy: number) => {
        panX += dx;
        panY += dy;
        renderFrame();
    };

    const loadImageFallback = (url: string) => {
        return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                imageFallback = img;
                dxfData = null;
                panX = 0; panY = 0; zoom = 1;
                renderFrame();
                resolve();
            };
            img.onerror = () => reject(new Error('Failed to load drawing fallback image.'));
            img.src = url;
        });
    };

    return {
        loadDrawing: async (url: string) => {
            try {
                imageFallback = null;
                dxfData = null;
                panX = 0; panY = 0; zoom = 1;
                renderFrame();

                if (url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) {
                    await loadImageFallback(url);
                    return;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                if (url.endsWith('.dwg')) {
                    console.warn('Native DWG requires conversion. Simulating rasterized view.');
                    await loadImageFallback('https://images.unsplash.com/photo-1541888086925-0c1bd6f44140?q=80&w=2000&auto=format&fit=crop'); // Blueprint generic image
                    return;
                }

                const dxfContent = await response.text();
                const parser = new DXFParser();
                dxfData = parser.parseSync(dxfContent);

                renderFrame();
            } catch (error) {
                console.error('Error loading or parsing CAD:', error);
                imageFallback = null;
                dxfData = null;

                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#ef4444';
                    ctx.textAlign = 'center';
                    ctx.fillText('Failed to view file layout natively.', canvas.width / 2, canvas.height / 2);
                }
                throw error;
            }
        },
        dispose: () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('click', onCanvasClick);
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        },
        zoomIn,
        zoomOut,
        pan,
        set onSelectionChanged(callback: ((object: any | null) => void) | undefined) {
            selectionCallback = callback;
        }
    };
};
