export type TaskStatus = 'Backlog' | 'To Do' | 'In Progress' | 'Review' | 'Done' | 'Blocked';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string; // ISO date string
  startDate?: string; // ISO date string
  estimatedHours?: number;
  actualHours?: number;
  completionPercentage: number; // 0-100
  tags?: string[];
  parentTaskId?: string; // For subtasks
  milestoneId?: string; // Associated milestone
  dependencies?: string[]; // IDs of tasks that this task depends on
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  availability: number; // Percentage of availability (0-100)
  skills: string[];
  costRate?: number; // Cost per hour
  email?: string;
  phone?: string;
}

export interface ResourceAllocation {
  id: string;
  resourceId: string;
  taskId: string;
  allocationPercentage: number; // Percentage of resource time allocated to this task (0-100)
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  hoursPerDay?: number;
}