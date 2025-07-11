'use client';

import { useState, useEffect, use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, FolderKanbanIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
// import { format } from 'date-fns'; // Date formatting is now handled in SprintItem
import { Separator } from '@/components/ui/separator';
import { Backlog } from '@/components/projects/micro-planning/backlog';

import { CreateSprintModal } from '@/components/projects/micro-planning/create-sprint-modal';

import { SprintList } from '@/components/projects/micro-planning/sprint-list';
// Define a simple Sprint interface
interface Sprint {
  id: string;
  name: string;
  goal?: string;
  startDate: string;
  endDate: string;
  status: 'Future' | 'Current' | 'Completed';
}

// Define a simple Task interface
interface Task {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done'; // Example statuses
  // Add other task properties as needed (e.g., description, assignee, priority)
  // Add sprintId if the task is assigned to a sprint
  sprintId?: string;
}

// Mock data and functions - replace with actual API calls
async function getSprintsByProjectId(projectId: string): Promise<Sprint[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  // Mock data
  if (projectId === "1") {
    return [
      { id: 's1', name: 'Sprint 1', goal: 'Complete core user authentication.', startDate: '2023-10-01', endDate: '2023-10-15', status: 'Completed' },
      { id: 's2', name: 'Sprint 2', goal: 'Develop user dashboard features.', startDate: '2023-10-16', endDate: '2023-10-30', status: 'Current' },
      { id: 's3', name: 'Sprint 3', goal: 'Implement project creation flow.', startDate: '2023-11-01', endDate: '2023-11-15', status: 'Future' },
    ];
  }
  return []; // No sprints for other projects in mock
}

// Mock data and functions for backlog tasks - replace with actual API calls
async function getBacklogTasksByProjectId(projectId: string): Promise<Task[]> {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
  // Mock data
  if (projectId === "1") {
    return [
      { id: 't1', title: 'Implement user login feature', status: 'To Do' },
      { id: 't2', title: 'Design database schema', status: 'To Do' },
    ];
  }
  return []; // No backlog tasks for other projects in mock
}

export default function MicroPlanningPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const router = useRouter();

  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [isLoadingSprints, setIsLoadingSprints] = useState(true);
  const [sprintsError, setSprintsError] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [backlogTasks, setBacklogTasks] = useState<Task[]>([]);
  const [isLoadingBacklogTasks, setIsLoadingBacklogTasks] = useState(true);
  const [backlogTasksError, setBacklogTasksError] = useState<string | null>(null);

  const [newSprint, setNewSprint] = useState({ name: '', goal: '', startDate: '', endDate: '' });
  const [isCreatingSprint, setIsCreatingSprint] = useState(false);

  useEffect(() => {
    const fetchSprints = async () => {
      setIsLoadingSprints(true);
      setSprintsError(null);
      try {
        const data = await getSprintsByProjectId(projectId);
        setSprints(data);
      } catch (error) {
        console.error('Failed to fetch sprints:', error);
        setSprintsError('Failed to load sprints.');
      } finally {
        setIsLoadingSprints(false);
      }
    };

    const fetchBacklogTasks = async () => {
      setIsLoadingBacklogTasks(true);
      setBacklogTasksError(null);
      try {
        const data = await getBacklogTasksByProjectId(projectId);
        setBacklogTasks(data);
      } catch (error) {
        console.error('Failed to fetch backlog tasks:', error);
        setBacklogTasksError('Failed to load backlog tasks.');
      } finally {
        setIsLoadingBacklogTasks(false);
      }
    };
    if (projectId) {
      fetchSprints();
      fetchBacklogTasks();
    }
  }, [projectId]);

  const handleCreateSprint = async () => {
    if (!newSprint.name || !newSprint.startDate || !newSprint.endDate) {
      // Basic validation
      alert('Please fill in name, start date, and end date.');
      return;
    }

    setIsCreatingSprint(true);
    // Simulate API call to create sprint
    await new Promise(resolve => setTimeout(resolve, 1000));
    const createdSprint: Sprint = {
      ...newSprint,
      id: `s${sprints.length + 1}`, // Mock ID
      status: 'Future', // New sprints start as Future
    };

    setSprints([...sprints, createdSprint]);
    setNewSprint({ name: '', goal: '', startDate: '', endDate: '' });
    setIsCreateModalOpen(false);
    setIsCreatingSprint(false);
  };

  const handleDragEnd = (result: DropResult) => {
    console.log('Drag ended:', result);
    // Implement logic here to update task/sprint assignment in state and backend
 };

  return (
    <>
      <PageTitle
        title={`Micro Planning for Project ${projectId}`}
        description="Plan and manage sprints and tasks at a granular level."
      />
      <Button onClick={() => router.back()} className="mb-4">
        Back
      </Button>
      <DragDropContext onDragEnd={handleDragEnd}>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Micro Planning Details</CardTitle>
          <CardDescription>Plan and track your project's sprints and associated tasks.</CardDescription>
        <CardContent className="space-y-6">
          {/* Wrap with DragDropContext */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Sprints</h3>
              <Button onClick={() => setIsCreateModalOpen(true)} size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Sprint
              </Button>
            </div>
            {/* Use the extracted SprintList component */}{" "}
            <SprintList sprints={sprints} isLoading={isLoadingSprints} error={sprintsError} />

            <div className="flex justify-between items-center mt-6">
              <h3 className="text-lg font-semibold">Backlog Tasks</h3>
            </div>
            {/* Use the extracted Backlog component */}
            <Backlog backlogTasks={backlogTasks} isLoading={isLoadingBacklogTasks} error={backlogTasksError} />

        </CardContent>
        </CardHeader> {/* This CardHeader seems misplaced based on the original structure */}
      </Card>
      </DragDropContext> {/* Ensure DragDropContext wraps the draggable areas */}


      <CreateSprintModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        newSprint={newSprint}
        setNewSprint={setNewSprint}
        onCreateSprint={handleCreateSprint}
        isCreatingSprint={isCreatingSprint}
      />
    </>
  );
}
