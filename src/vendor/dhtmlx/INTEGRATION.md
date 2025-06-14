# dhtmlxGantt Integration Guide

This document provides instructions for integrating the dhtmlxGantt library with the OrgCentral project.

## Overview

dhtmlxGantt is a JavaScript Gantt chart library that provides interactive project scheduling and management capabilities. The library is used in OrgCentral for visualizing project timelines, tasks, and dependencies.

## Files and Structure

The dhtmlxGantt library is located in the `src/vendor/dhtmlx` directory with the following structure:

```
src/vendor/dhtmlx/
├── codebase/
│   ├── dhtmlxgantt.js       # Main JavaScript library
│   ├── dhtmlxgantt.css      # Main CSS file
│   ├── skins/               # Theme skins
│   └── sources/             # Source files
├── license.txt              # License information
├── package.json             # Package metadata
└── readme.txt               # Library documentation
```

## Integration Steps

1. **CSS Integration**:
   - The CSS file is loaded dynamically when the Gantt chart component is mounted
   - A copy of the CSS file is also placed in the public directory for direct access

2. **JavaScript Integration**:
   - The JavaScript library is imported dynamically in the GanttChart component
   - This ensures the library is only loaded when needed

3. **Component Usage**:
   - The `GanttChart` component in `src/components/ui/gantt-chart.tsx` provides a React wrapper
   - This component handles initialization, data loading, and UI interactions

## Usage Example

```tsx
import { GanttChart } from '@/components/ui/gantt-chart';

export default function ProjectPlanningPage() {
  return (
    <div>
      <h1>Project Timeline</h1>
      <GanttChart projectId="project-1" projectName="Office Renovation" />
    </div>
  );
}
```

## Features Implemented

The Gantt chart implementation includes:

1. **Task Management**:
   - Create, update, and delete tasks
   - Set task durations, dates, and dependencies
   - Track task progress

2. **Timeline Visualization**:
   - Multiple timeline scales (days, weeks, months, quarters)
   - Adjustable zoom levels
   - Task coloring based on priority or status

3. **Filtering and Sorting**:
   - Filter tasks by text, completion status
   - Sort tasks by various criteria
   - Toggle visibility of task groups

4. **User Interaction**:
   - Drag-and-drop task scheduling
   - Resize tasks to change duration
   - Create dependencies between tasks

## Customization

The Gantt chart can be customized by modifying:

1. **Appearance**:
   - CSS styles for tasks, links, and grid
   - Color schemes based on task properties
   - Timeline scale formatting

2. **Behavior**:
   - Task validation rules
   - Drag-and-drop constraints
   - Data processing and formatting

3. **Features**:
   - Enable/disable specific functionality
   - Add custom columns or data fields
   - Implement custom event handlers

## License Considerations

dhtmlxGantt is a commercial library that requires a valid license for production use. The current implementation uses dhtmlxGantt Professional Edition v7.0.11.

Ensure that your organization has the appropriate license before deploying to production.

## Resources

- [dhtmlxGantt Documentation](https://docs.dhtmlx.com/gantt/)
- [API Reference](https://docs.dhtmlx.com/gantt/api__refs__gantt.html)
- [Samples](https://docs.dhtmlx.com/gantt/samples/)