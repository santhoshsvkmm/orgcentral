
export type InvitationStatus = "Not Sent" | "Pending" | "Accepted" | "Declined";

export interface ConsultantProjectMapping {
  id: string; // Unique ID for the mapping itself
  projectId: string;
  projectName: string;
  projectSpecificEmail: string;
  servicesProvided: string; // Text area for detailed description of services
  invitationStatus: InvitationStatus;
  invitationSentAt?: string; // ISO date string
}

export interface Consultant {
  id: string;
  name: string; // Can be individual or company name
  contactPerson: string;
  email: string; // General email
  phone: string;
  specialty: string; // e.g., Structural Engineer, Architect, Legal Advisor
  address?: string;
  mappedProjects: ConsultantProjectMapping[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
