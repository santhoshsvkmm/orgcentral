'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CreateSprintModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newSprint: {
    name: string;
    goal: string;
    startDate: string;
    endDate: string;
  };
  setNewSprint: (sprint: {
    name: string;
    goal: string;
    startDate: string;
    endDate: string;
  }) => void;
  onCreateSprint: () => void;
  isCreatingSprint: boolean;
}

export function CreateSprintModal({
  isOpen,
  onOpenChange,
  newSprint,
  setNewSprint,
  onCreateSprint,
  isCreatingSprint,
}: CreateSprintModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Sprint</DialogTitle>
          <DialogDescription>Fill in the details for the new sprint.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newSprint.name}
              onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal (Optional)
            </Label>
            <Textarea
              id="goal"
              value={newSprint.goal}
              onChange={(e) => setNewSprint({ ...newSprint, goal: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            {/* Placeholder for Date Picker */}
            <Input
              id="startDate"
              type="date"
              value={newSprint.startDate}
              onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            {/* Placeholder for Date Picker */}
            <Input
              id="endDate"
              type="date"
              value={newSprint.endDate}
              onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onCreateSprint} disabled={isCreatingSprint}>
            {isCreatingSprint ? 'Creating...' : 'Create Sprint'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}