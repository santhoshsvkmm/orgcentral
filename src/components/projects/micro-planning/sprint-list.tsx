'use client';

import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Sprint } from '@/app/projects/[id]/planning/micro-planning/page';
import { Accordion } from '@/components/ui/accordion';
import { SprintItem } from './sprint-item'; // Import the SprintItem component

interface SprintListProps {
  sprints: Sprint[];
  isLoadingSprints: boolean;
  sprintsError: string | null;
  droppableId: string; // ID for the droppable area
}

export function SprintList({ sprints, isLoadingSprints, sprintsError, droppableId }: SprintListProps) {
  // State to manage which accordion item is open (single open at a time)
  const [openSprintId, setOpenSprintId] = useState<string | undefined>(undefined);

  return (
    // Wrap with DragDropContext is in the parent page component
    <Accordion type="single" collapsible value={openSprintId} onValueChange={setOpenSprintId} className="w-full">
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4" // Add some spacing between sprint items
          >
            {isLoadingSprints && <p>Loading sprints...</p>}
            {sprintsError && <p className="text-red-500">Error: {sprintsError}</p>}

            {!isLoadingSprints && !sprintsError && sprints.length === 0 && (
              <p className="text-muted-foreground">No sprints found for this project.</p>
            )}

            {!isLoadingSprints && !sprintsError && sprints.length > 0 && (
              sprints.map((sprint, index) => (
                <SprintItem key={sprint.id} sprint={sprint} index={index} />
              ))
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Accordion>
  );
}