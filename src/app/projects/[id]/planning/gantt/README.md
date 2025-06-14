# Gantt Chart Component

This component provides an interactive Gantt chart for project planning and scheduling using the dhtmlxGantt library.

## Features

- **Interactive Timeline**: Visualize tasks, durations, dependencies, and progress
- **Filtering**: Filter tasks by name or completion status
- **Sorting**: Sort tasks by name, start date, priority, or progress
- **Zooming**: Adjust the timeline scale from days to quarters
- **Task Prioritization**: Color-coded tasks based on priority levels
- **Progress Tracking**: Visual representation of task completion percentage
- **Task Dependencies**: Visualize task relationships and dependencies

## Usage

The Gantt chart component is implemented in the project planning section and can be accessed at:
`/projects/[id]/planning/gantt`

### Filter Bar Features

The filter bar at the top of the Gantt chart provides several options:

1. **Text Filter**: Filter tasks by name or description
2. **Show/Hide Completed**: Toggle visibility of completed tasks
3. **Sorting Options**: Sort tasks by different criteria
4. **Zoom Level**: Adjust the timeline scale
5. **Export**: Print or export the current Gantt chart view

### Task Interaction

- Click on a task to see its details
- Drag tasks to reschedule them
- Adjust task duration by dragging the task edges
- Create dependencies by connecting tasks

## Implementation Details

The Gantt chart is implemented using:

- dhtmlxGantt library (Professional Edition)
- React for component structure and state management
- ShadCN UI components for the filter bar and controls

## Data Structure

Tasks in the Gantt chart follow this structure:

```typescript
interface Task {
  id: number;
  text: string;
  start_date: Date | string;
  duration?: number;
  progress: number;
  parent?: number;
  priority?: string;
}
```

Task dependencies (links) follow this structure:

```typescript
interface Link {
  id: number;
  source: number;
  target: number;
  type: string;
}
```

## Customization

The Gantt chart can be customized by modifying:

- Task colors based on priority
- Timeline scale and zoom levels
- Columns displayed in the grid
- Filter and sort options

For more advanced customization, refer to the dhtmlxGantt documentation.