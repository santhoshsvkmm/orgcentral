export type AgreementStatus = 'Draft' | 'Active' | 'Expired' | 'Terminated';

export interface Agreement {
  id: string;
  referenceNumber: string;
  title: string;
  partyType: 'Client' | 'Vendor' | 'Subcontractor' | 'Supplier';
  partyId: string; // id of the client/vendor/etc.
  startDate?: string;
  endDate?: string;
  value?: number;
  currency?: string;
  status: AgreementStatus;
  documents?: string[]; // URLs or filenames (frontend mock)
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
