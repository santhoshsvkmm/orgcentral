
export interface Warehouse {
  id: string;
  projectId: string;
  name: string;
  location?: string;
  capacity?: number; // e.g., in square meters or units
  notes?: string;
  currentStock: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
