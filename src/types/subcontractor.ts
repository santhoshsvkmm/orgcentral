
export type SuppliedService = "Material" | "Labour" | "Equipment";

export interface SubcontractorProjectMapping {
  id: string; // Unique ID for the mapping itself
  projectId: string;
  projectName: string;
  projectSpecificEmail: string;
  projectSpecificPassword?: string; // Password for this project-specific access
  suppliedServices: SuppliedService[];
}

export interface Subcontractor {
  id: string;
  name: string; // Company Name
  contactPerson: string;
  email: string; // General company email
  phone: string;
  trade: string; // e.g., Electrical, Plumbing, HVAC
  address?: string;
  mappedProjects: SubcontractorProjectMapping[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
