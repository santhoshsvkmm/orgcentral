'use client';

import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component

// Define a basic Task interface (adjust based on your actual task structure)
interface Task {
  id: string;
  title: string;
  status: string; // e.g., 'To Do', 'In Progress', 'Done'
  priority?: 'High' | 'Medium' | 'Low';
  // Add other relevant task properties
}

interface BacklogProps {
  backlogTasks: Task[];
  droppableId: string; // To make the Droppable ID configurable,
  error:any;
}

export function Backlog({ backlogTasks, droppableId }: BacklogProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Backlog</CardTitle>
      </CardHeader>
      <CardContent>
        <Droppable droppableId={droppableId} type="task">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-[100px] p-2 rounded-md transition-colors ${
                snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {backlogTasks.length === 0 && (
                <p className="text-center text-muted-foreground">Backlog is empty.</p>
              )}
              {backlogTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-3 mb-2 rounded-md bg-card border shadow-sm cursor-grab transition-transform ${
                        snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-medium">{task.title}</h5>
                        {task.priority && <Badge variant="secondary">{task.priority}</Badge>}
                      </div>
                      {/* Add more task details here if needed */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
}