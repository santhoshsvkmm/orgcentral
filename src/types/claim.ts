export type ClaimStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Paid';

export interface Claim {
  id: string;
  reference: string;
  milestoneId?: string; // optional milestone the claim is against
  taskIds: string[]; // task ids included in claim
  amount: number;
  currency?: string;
  description?: string;
  status: ClaimStatus;
  createdAt: string;
  updatedAt: string;
}
