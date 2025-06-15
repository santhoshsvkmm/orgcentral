'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Edit, MoreHorizontal, Trash2, Flag, Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Milestone, MilestoneStatus } from "@/types/milestone";
import { formatDate } from "@/lib/date-utils";

// Mock data for milestones
const initialMilestones: Milestone[] = [
  {
    id: "m1",
    projectId: "1",
    name: "Project Kickoff",
    description: "Initial project kickoff meeting with all stakeholders",
    dueDate: "2024-10-01",
    status: "Completed",
    completionPercentage: 100,
    responsiblePerson: "John Doe",
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "m2",
    projectId: "1",
    name: "Requirements Finalization",
    description: "Complete all requirements gathering and documentation",
    dueDate: "2024-10-15",
    status: "Completed",
    completionPercentage: 100,
    responsiblePerson: "Jane Smith",
    createdAt: "2024-09-15",
    updatedAt: "2024-10-15"
  },
  {
    id: "m3",
    projectId: "1",
    name: "Design Approval",
    description: "Get final approval on all design documents",
    dueDate: "2024-11-01",
    status: "In Progress",
    completionPercentage: 75,
    responsiblePerson: "Alice Johnson",
    dependencies: ["m2"],
    createdAt: "2024-09-15",
    updatedAt: "2024-10-20"
  },
  {
    id: "m4",
    projectId: "1",
    name: "Alpha Release",
    description: "First release for internal testing",
    dueDate: "2024-12-01",
    status: "Planned",
    completionPercentage: 0,
    responsiblePerson: "Bob Brown",
    dependencies: ["m3"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "m5",
    projectId: "1",
    name: "Beta Release",
    description: "Release for client testing",
    dueDate: "2024-12-15",
    status: "Planned",
    completionPercentage: 0,
    responsiblePerson: "Charlie Davis",
    dependencies: ["m4"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  },
  {
    id: "m6",
    projectId: "1",
    name: "Final Delivery",
    description: "Project completion and handover",
    dueDate: "2025-01-15",
    status: "Planned",
    completionPercentage: 0,
    responsiblePerson: "David Wilson",
    dependencies: ["m5"],
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15"
  }
];

interface MilestoneListProps {
  projectId: string;
}

export function MilestoneList({ projectId }: MilestoneListProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<MilestoneStatus>("Planned");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [dependencies, setDependencies] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching milestones for the project
    console.log("Fetching milestones for project:", projectId);
    const projectMilestones = initialMilestones.filter(m => m.projectId === projectId);
    setMilestones(projectMilestones);
  }, [projectId]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setDueDate("");
    setStatus("Planned");
    setCompletionPercentage(0);
    setResponsiblePerson("");
    setDependencies([]);
    setEditingMilestone(null);
  };

  const handleOpenDialog = (milestone?: Milestone) => {
    resetForm();
    if (milestone) {
      setEditingMilestone(milestone);
      setName(milestone.name);
      setDescription(milestone.description || "");
      setDueDate(milestone.dueDate);
      setStatus(milestone.status as MilestoneStatus);
      setCompletionPercentage(milestone.completionPercentage);
      setResponsiblePerson(milestone.responsiblePerson || "");
      setDependencies(milestone.dependencies || []);
    }
    setIsDialogOpen(true);
  };

  const handleSaveMilestone = () => {
    if (!name.trim() || !dueDate) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newMilestone: Milestone = {
      id: editingMilestone ? editingMilestone.id : `m${Date.now()}`,
      projectId,
      name: name.trim(),
      description: description.trim() || undefined,
      dueDate,
      status,
      completionPercentage,
      responsiblePerson: responsiblePerson.trim() || undefined,
      dependencies: dependencies.length > 0 ? dependencies : undefined,
      createdAt: editingMilestone ? editingMilestone.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingMilestone) {
      // Update existing milestone
      setMilestones(prev => prev.map(m => m.id === editingMilestone.id ? newMilestone : m));
      toast({
        title: "Milestone Updated",
        description: `Milestone "${name}" has been updated.`
      });
    } else {
      // Add new milestone
      setMilestones(prev => [...prev, newMilestone]);
      toast({
        title: "Milestone Created",
        description: `Milestone "${name}" has been created.`
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
    toast({
      title: "Milestone Deleted",
      description: "The milestone has been deleted."
    });
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case "Completed":
        return <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/50">{status}</Badge>;
      case "In Progress":
        return <Badge variant="default">{status}</Badge>;
      case "Planned":
        return <Badge variant="outline">{status}</Badge>;
      case "Delayed":
        return <Badge variant="destructive">{status}</Badge>;
      case "At Risk":
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700 border-yellow-500/50">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-sm mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Milestones</CardTitle>
          <CardDescription>Track project milestones and their status.</CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" /> Add Milestone
        </Button>
      </CardHeader>
      <CardContent>
        {milestones.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <Flag className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No milestones found for this project.</p>
            <p className="text-sm">Get started by adding a milestone.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Responsible</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {milestones.map((milestone) => (
                  <TableRow key={milestone.id}>
                    <TableCell className="font-medium">
                      <div>{milestone.name}</div>
                      {milestone.description && (
                        <div className="text-xs text-muted-foreground mt-1">{milestone.description}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {formatDate(milestone.dueDate, "MMM d, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(milestone.status as MilestoneStatus)}</TableCell>
                    <TableCell>
                      <div className="w-32">
                        <Progress value={milestone.completionPercentage} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1 text-right">{milestone.completionPercentage}%</div>
                      </div>
                    </TableCell>
                    <TableCell>{milestone.responsiblePerson || "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleOpenDialog(milestone)}>
                            <Edit className="mr-2 h-4 w-4" />Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteMilestone(milestone.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Milestone Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingMilestone ? "Edit Milestone" : "Add New Milestone"}</DialogTitle>
              <DialogDescription>
                {editingMilestone ? "Update the milestone details." : "Fill in the details for the new milestone."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="milestoneName">Milestone Name</Label>
                  <Input
                    id="milestoneName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Project Kickoff"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="milestoneDescription">Description (Optional)</Label>
                  <Textarea
                    id="milestoneDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this milestone"
                    rows={3}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="milestoneDueDate">Due Date</Label>
                  <Input
                    id="milestoneDueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="milestoneStatus">Status</Label>
                  <Select value={status} onValueChange={(value) => setStatus(value as MilestoneStatus)}>
                    <SelectTrigger id="milestoneStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                      <SelectItem value="At Risk">At Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="milestoneCompletion">Completion Percentage: {completionPercentage}%</Label>
                <Slider
                  id="milestoneCompletion"
                  value={[completionPercentage]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => setCompletionPercentage(value[0])}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="milestoneResponsible">Responsible Person (Optional)</Label>
                <Input
                  id="milestoneResponsible"
                  value={responsiblePerson}
                  onChange={(e) => setResponsiblePerson(e.target.value)}
                  placeholder="e.g., John Doe"
                />
              </div>
              {/* Dependencies would typically be a multi-select component, simplified here */}
              <div>
                <Label htmlFor="milestoneDependencies">Dependencies (Optional)</Label>
                <Select
                  value={dependencies[0] || ""}
                  onValueChange={(value) => setDependencies(value ? [value] : [])}
                >
                  <SelectTrigger id="milestoneDependencies">
                    <SelectValue placeholder="Select a dependency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {milestones
                      .filter(m => m.id !== editingMilestone?.id)
                      .map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  This milestone will start after the selected milestone is completed.
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveMilestone}>
                {editingMilestone ? "Save Changes" : "Create Milestone"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}