'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

// Define a simple Sprint interface (assuming this is defined elsewhere or you can redefine here if needed)
interface Sprint {
  id: string;
  name: string;
  goal?: string;
  startDate: string;
  endDate: string;
  status: 'Future' | 'Current' | 'Completed';
}

interface SprintItemProps {
  sprint: Sprint;
  // Add handlers for Edit and Delete actions later
  // onEdit: (sprintId: string) => void;
  // onDelete: (sprintId: string) => void;
}

export function SprintItem({ sprint }: SprintItemProps) {
  // You might manage open/closed state here if not managed by the parent Accordion
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem value={sprint.id}>
      <AccordionTrigger>
        <div className="flex justify-between items-center w-full pr-6"> {/* Added pr-6 for padding to avoid text being under arrow */}
          <h4 className="text-md font-medium">
            {sprint.name} ({sprint.status})
          </h4>
          {/* You can add a visual indicator for status here */}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="p-4 border-t space-y-2">
          {sprint.goal && (
            <p className="text-sm text-muted-foreground">Goal: {sprint.goal}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Dates: {format(new Date(sprint.startDate), 'PPP')} -{' '}
            {format(new Date(sprint.endDate), 'PPP')}
          </p>
          {/* Placeholder for Tasks related to this sprint */}
          <div className="mt-4 p-4 bg-muted rounded-md">
            <p className="text-sm font-semibold text-foreground">
              Tasks in this Sprint:
            </p>
            <p className="text-sm text-muted-foreground">
              (Placeholder for list of tasks or Kanban view for this sprint)
            </p>
          </div>
          {/* Placeholder Action Buttons */}
          <div className="mt-4 space-x-2">
            <Button variant="outline" size="sm" onClick={() => alert(`Edit ${sprint.name}`)}> {/* Replace with actual edit handler */}
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => alert(`Delete ${sprint.name}`)}> {/* Replace with actual delete handler */}
              Delete
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}