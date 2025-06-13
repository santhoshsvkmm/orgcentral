
export type SuppliedService = "Material" | "Labour" | "Equipment";
export type InvitationStatus = "Not Sent" | "Pending" | "Accepted" | "Declined";

export interface SubcontractorProjectMapping {
  id: string; // Unique ID for the mapping itself
  projectId: string;
  projectName: string;
  projectSpecificEmail: string;
  suppliedServices: SuppliedService[];
  invitationStatus: InvitationStatus;
  invitationSentAt?: string; // ISO date string
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
