
export type RfiStatus = "Open" | "In Progress" | "Needs Clarification" | "Closed";

export interface RFIAttachment {
  id: string;
  fileName: string;
  fileUrl: string; // In a real app, this might be a signed URL or an API endpoint
  fileType?: string;
  fileSize?: string;
  uploadedAt: string; // ISO date string
  uploadedBy: string;
}

export interface RFIMessage {
  id: string;
  rfiId: string;
  senderId: string; // User ID
  senderName: string;
  senderAvatarUrl?: string;
  text: string;
  timestamp: string; // ISO date string
  attachments?: RFIAttachment[];
  isInternalNote?: boolean; // Optional: for messages only visible to internal team
}

export interface RFI {
  id: string;
  projectId: string;
  rfiNumber: string; // e.g., RFI-001
  title: string;
  description: string;
  status: RfiStatus;
  priority: "Low" | "Medium" | "High";
  raisedByUserId: string; // User ID of creator
  raisedByUserName: string;
  assignedToUserId?: string; // User ID of assignee
  assignedToUserName?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  dueDate?: string; // Optional due date
  resolution?: string; // Optional resolution text when closed
  closedAt?: string; // Optional
  tags?: string[];
  messages: RFIMessage[];
  attachments: RFIAttachment[]; // Attachments directly to the RFI itself, not just messages
}
