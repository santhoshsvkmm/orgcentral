
export type InvitationStatus = "Not Sent" | "Pending" | "Accepted" | "Declined"; // Reusing for consistency

export interface ClientProjectMapping {
  id: string; // Unique ID for the mapping itself
  projectId: string;
  projectName: string;
  projectSpecificEmail: string; // Email for primary contact for this project
  engagementDetails: string; // Text area for scope, key deliverables, etc.
  invitationStatus: InvitationStatus; // "Invitation" here might mean "Onboarding Invite"
  invitationSentAt?: string; // ISO date string
}

export interface Client {
  id: string;
  name: string; // Company Name or Individual Client Name
  contactPerson: string;
  email: string; // General email
  phone: string;
  industry?: string; // e.g., Real Estate, Tech, Government
  address?: string;
  mappedProjects: ClientProjectMapping[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
