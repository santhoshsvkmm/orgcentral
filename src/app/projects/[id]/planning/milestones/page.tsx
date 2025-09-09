'use client';

import { useState, useEffect, use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ArrowLeft, Target, PlusCircle, Pencil, Trash2 } from 'lucide-react'; // Added Pencil and Trash2 icons
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Added Alert for better error display

// Mock data and functions - replace with actual API calls
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  if (id === "3") return "Gamma Initiative Research";
  return `Project (ID: ${id})`;
}

interface Milestone {
  id: string;
  name: string;
  description?: string;
  targetDate: string; // Using string for simplicity, consider Date object
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  // tasks: string[]; // Future enhancement: array of task IDs
}

async function getMilestonesByProjectId(projectId: string): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  // Mock data
  if (projectId === "1") {
    return [
      { id: 'm1', name: 'Define Project Scope', description: 'Finalize the project boundaries and deliverables.', targetDate: '2023-10-15', priority: 'High', status: 'Completed' },
      { id: 'm2', name: 'Complete Design Phase', description: 'Approve all design mockups and specifications.', targetDate: '2023-11-01', priority: 'High', status: 'In Progress' },
      { id: 'm3', name: 'Develop Core Features', description: 'Build and test the essential functionalities.', targetDate: '2024-01-15', priority: 'Medium', status: 'Not Started' },
    ];
  }
  return []; // No milestones for other projects in mock
}

export default function MilestonesPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const [projectName, setProjectName] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial project name fetch
  const [milestonesLoading, setMilestonesLoading] = useState(false); // Loading state for milestones fetch
  const [milestonesError, setMilestonesError] = useState<string | null>(null);
  const [projectNameError, setProjectNameError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ name: '', description: '', targetDate: '', priority: 'Medium' as 'High' | 'Medium' | 'Low' });
  const [isCreatingMilestone, setIsCreatingMilestone] = useState(false);
  const [createMilestoneError, setCreateMilestoneError] = useState<string | null>(null);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      // Fetch Project Name
      setIsLoading(true);
      setProjectNameError(null); // Clear previous error
      try {
        const name = await getProjectNameById(projectId);
        setProjectName(name);
      } catch (error) {
        console.error('Failed to fetch project name:', error);
        setProjectNameError('Failed to load project name.');
      } finally {
        setIsLoading(false);
      }

      // Fetch Milestones
      setMilestonesLoading(true);
      setMilestonesError(null); // Clear previous errors
      try {
        const data = await getMilestonesByProjectId(projectId);
        setMilestones(data);
      } catch (error) {
        console.error('Failed to fetch milestones:', error);
        setMilestones([]);
        setMilestonesError('Failed to load milestones.');
      } finally {
        setMilestonesLoading(false);
      }
    };

    if (projectId) {
      fetchData();
    } else {
      setProjectName(null);
      setProjectNameError(null);
      setIsLoading(false);
      setMilestones([]);
      setMilestonesLoading(false);
      setMilestonesError(null);
    }
  }, [projectId]);

  const handleCreateMilestone = async () => {
    if (!newMilestone.name || !newMilestone.targetDate) {
      setCreateMilestoneError('Please fill in Name and Target Date.');
      return;
    }

    setIsCreatingMilestone(true);
    setCreateMilestoneError(null); // Clear previous error

    try {
      // Simulate API call to create milestone
      await new Promise(resolve => setTimeout(resolve, 1000));
      const createdMilestone: Milestone = {
        ...newMilestone,
        id: `m${milestones.length + 1}`, // Mock ID
        status: 'Not Started'
      };
      setMilestones([...milestones, createdMilestone]);
      setNewMilestone({ name: '', description: '', targetDate: '', priority: 'Medium' }); // Reset form
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error('Failed to create milestone:', error);
      setCreateMilestoneError('Failed to create milestone. Please try again.');
    } finally {
      setIsCreatingMilestone(false);
    }
  };

  const handleAccordionClick = (milestoneId: string) => {
    setOpenAccordionId(openAccordionId === milestoneId ? null : milestoneId);
  };

  // Show loading skeleton only on initial load if project name is not yet fetched
  if (isLoading && !projectName) {
    return (
      <>
        <div className="mb-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Card className="shadow-md">
          <CardHeader>
            <Skeleton className="h-6 w-1/3 mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-72 w-full" />
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageTitle
        title={`Project Milestones: ${projectName || (projectId ? `Project ${projectId}` : 'Project')}`}
        description="Track key project milestones, their target dates, and completion status."
        actions={
          <Button variant="outline" asChild disabled={!projectId}>
            <Link href={projectId ? `/projects/${projectId}` : '/projects'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {projectId ? 'Project Details' : 'Projects'}
            </Link>
          </Button>
        }
      />

      {/* Display Project Name Error */}
      {projectNameError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{projectNameError}</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary" />
            Milestone Tracking
          </CardTitle>
          <CardDescription>
            This area is designated for displaying and managing project milestones.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <Button onClick={() => { setIsModalOpen(true); setCreateMilestoneError(null); }} className="mb-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Milestone
          </Button>

          {/* Display Milestones Loading State */}
          {milestonesLoading && (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {/* Display Milestones Error State */}
          {!milestonesLoading && milestonesError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{milestonesError}</AlertDescription>
            </Alert>
          )}

          {/* Display Milestones Table (conditionally rendered based on loading/error) */}
          {!milestonesLoading && !milestonesError && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead>Task Mapping (Placeholder)</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {milestones.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No milestones found for this project.
                    </TableCell>
                  </TableRow>
                ) : (
                  milestones.map(milestone => (
                    <TableRow key={milestone.id}>
                      <TableCell colSpan={5} className="p-0">
                        <Accordion type="single" collapsible value={openAccordionId || ''} onValueChange={(value) => setOpenAccordionId(value)}>
                          <AccordionItem value={milestone.id} className="border-none">
                            <AccordionTrigger className="hover:no-underline px-4 py-2 text-sm">
                              <div className="grid grid-cols-5 gap-4 w-full items-center">
                                <div className="col-span-1 text-left font-medium">{milestone.name}</div>
                                <div className="col-span-1 text-left">{milestone.targetDate ? format(new Date(milestone.targetDate), 'PPP') : 'N/A'}</div>
                                <div className="col-span-1 text-left text-muted-foreground">N/A</div> {/* Placeholder for Task Mapping */}
                                <div className="col-span-1 text-left">{milestone.priority}</div>
                                <div className="col-span-1 text-right">
                                  {/* Action buttons (Edit, Delete) will go here */}
                                  <Button variant="outline" size="sm" className="mr-2" onClick={(e) => {
                                    e.stopPropagation(); // Prevent accordion from toggling
                                    console.log('Edit milestone:', milestone.id);
                                    // Implement edit logic here (e.g., open edit modal)
                                  }}>
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={(e) => {
                                    e.stopPropagation(); // Prevent accordion from toggling
                                    console.log('Delete milestone:', milestone.id);
                                    // Implement delete logic here (e.g., show confirmation dialog, make API call)
                                  }}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-2 text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900">
                              <strong>Description:</strong> {milestone.description || 'No description provided.'}
                              {/* Add more detailed information here */}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

          <p className="text-sm text-muted-foreground mt-4">
            Future enhancements could include a visual timeline of milestones, progress indicators, and integration with task completion.
          </p>
        </CardContent>
      </Card>

      {/* Create Milestone Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Milestone</DialogTitle>
            <DialogDescription>
              Fill in the details for the new project milestone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Display Create Milestone Error */}
            {createMilestoneError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{createMilestoneError}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newMilestone.name}
                onChange={(e) => setNewMilestone({ ...newMilestone, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="targetDate" className="text-right">
                Target Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal",
                      !newMilestone.targetDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newMilestone.targetDate ? format(new Date(newMilestone.targetDate), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {/* Calendar component will go here */}
                  {/* Example using react-day-picker: */}
                  {/* <Calendar
                    mode="single"
                    selected={newMilestone.targetDate ? new Date(newMilestone.targetDate) : undefined}
                    onSelect={(date) => setNewMilestone({ ...newMilestone, targetDate: date?.toISOString() || '' })}
                    initialFocus
                  /> */}
                  <p className="p-4 text-sm text-muted-foreground">Calendar component placeholder</p>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select onValueChange={(value) => setNewMilestone({ ...newMilestone, priority: value as 'High' | 'Medium' | 'Low' })} defaultValue={newMilestone.priority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taskMapping" className="text-right">
                Task Mapping
              </Label>
              <div id="taskMapping" className="col-span-3 text-sm text-muted-foreground">
                Multi-select for tasks will be added here later.
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateMilestone} disabled={isCreatingMilestone}>
              {isCreatingMilestone ? 'Creating...' : 'Create Milestone'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
