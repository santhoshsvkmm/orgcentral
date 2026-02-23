export interface DrawingVersion {
    version: string;
    fileUrl: string;
    fileName: string;
    uploadedAt: string;
    fileType: 'pdf' | 'png' | 'jpg' | 'svg' | 'dxf' | 'dwg' | 'glb';
}

export interface DrawingData {
    id: string;
    name: string;
    type: '2D' | '3D';
    versions: DrawingVersion[];
}
