export type MilestoneStatus = 'Planned' | 'In Progress' | 'Completed' | 'Delayed' | 'At Risk';

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  dueDate: string; // ISO date string
  status: MilestoneStatus;
  completionPercentage: number; // 0-100
  dependencies?: string[]; // IDs of milestones that this milestone depends on
  responsiblePerson?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}