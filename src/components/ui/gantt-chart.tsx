'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Input } from './input';
import { Switch } from './switch';
import { Label } from './label';
import { Slider } from './slider';
import { Calendar } from 'lucide-react';

// Define task data structure
interface Task {
  id: number;
  text: string;
  start_date: Date | string;
  end_date?: Date | string;
  duration?: number;
  progress: number;
  parent?: number;
  type?: string;       // Can be 'task' (default), 'project', 'milestone'
  priority?: string;   // 'Low', 'Medium', 'High', 'Critical'
  open?: boolean;      // Whether the task is expanded (for parent tasks)
  color?: string;      // Optional custom color
  textColor?: string;  // Optional text color
}

// Define link data structure
interface Link {
  id: number;
  source: number;
  target: number;
  type: string;
}

interface GanttChartProps {
  projectId: string;
  projectName: string;
}

export function GanttChart({ projectId, projectName }: GanttChartProps) {
  // Validate inputs
  if (!projectId) {
    console.warn('GanttChart: projectId is required');
  }
  const ganttContainer = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [sortBy, setSortBy] = useState('default');

  // Get sample data for the Gantt chart based on project ID
  // Use useMemo to avoid recalculating on every render
  const { tasks, links } = useMemo(() => {
    // Helper function to ensure consistent date formatting
    const formatDate = (dateStr: string): string => {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    };
    
    // Default tasks and links with proper date handling and milestones
    const defaultTasks: Task[] = [
      { id: 1, text: "Project Kickoff", start_date: formatDate("2023-10-01"), duration: 1, progress: 1, priority: "High", type: "milestone" },
      { id: 2, text: "Planning Phase", start_date: formatDate("2023-10-02"), duration: 10, progress: 0.8, priority: "High" },
      { id: 3, text: "Requirements Gathering", start_date: formatDate("2023-10-02"), duration: 5, progress: 1, parent: 2, priority: "Medium" },
      { id: 4, text: "Design Mockups", start_date: formatDate("2023-10-07"), duration: 5, progress: 0.6, parent: 2, priority: "Medium" },
      { id: 5, text: "Development Phase", start_date: formatDate("2023-10-12"), duration: 20, progress: 0.5, priority: "High" },
      { id: 6, text: "Frontend Development", start_date: formatDate("2023-10-12"), duration: 10, progress: 0.7, parent: 5, priority: "Medium" },
      { id: 7, text: "Backend Development", start_date: formatDate("2023-10-12"), duration: 15, progress: 0.5, parent: 5, priority: "High" },
      { id: 8, text: "Database Setup", start_date: formatDate("2023-10-12"), duration: 5, progress: 0.8, parent: 5, priority: "Low" },
      { id: 9, text: "API Integration", start_date: formatDate("2023-10-22"), duration: 5, progress: 0.2, parent: 5, priority: "Medium" },
      { id: 10, text: "Alpha Release", start_date: formatDate("2023-10-27"), duration: 0, progress: 0, priority: "Critical", type: "milestone" },
      { id: 11, text: "Testing Phase", start_date: formatDate("2023-10-28"), duration: 10, progress: 0.3, priority: "High" },
      { id: 12, text: "Unit Testing", start_date: formatDate("2023-10-28"), duration: 5, progress: 0.6, parent: 11, priority: "Medium" },
      { id: 13, text: "Integration Testing", start_date: formatDate("2023-11-02"), duration: 5, progress: 0, parent: 11, priority: "Medium" },
      { id: 14, text: "Beta Release", start_date: formatDate("2023-11-07"), duration: 0, progress: 0, priority: "Critical", type: "milestone" },
      { id: 15, text: "Deployment", start_date: formatDate("2023-11-08"), duration: 5, progress: 0, priority: "Critical" },
      { id: 16, text: "Documentation", start_date: formatDate("2023-11-13"), duration: 5, progress: 0, priority: "Low" },
      { id: 17, text: "Project Review", start_date: formatDate("2023-11-18"), duration: 3, progress: 0, priority: "Medium" },
      { id: 18, text: "Final Release", start_date: formatDate("2023-11-21"), duration: 0, progress: 0, priority: "Critical", type: "milestone" }
    ];
    
    const defaultLinks: Link[] = [
      { id: 1, source: 1, target: 2, type: "0" },
      { id: 2, source: 2, target: 5, type: "0" },
      { id: 3, source: 5, target: 10, type: "0" },
      { id: 4, source: 10, target: 11, type: "0" },
      { id: 5, source: 11, target: 14, type: "0" },
      { id: 6, source: 14, target: 15, type: "0" },
      { id: 7, source: 15, target: 16, type: "0" },
      { id: 8, source: 16, target: 17, type: "0" },
      { id: 9, source: 17, target: 18, type: "0" },
      { id: 10, source: 3, target: 4, type: "0" },
      { id: 11, source: 6, target: 9, type: "0" },
      { id: 12, source: 7, target: 9, type: "0" },
      { id: 13, source: 8, target: 9, type: "0" },
      { id: 14, source: 12, target: 13, type: "0" }
    ];
    
    // Project-specific data
    switch (projectId) {
      case "1": // Alpha Launch
        return {
          tasks: defaultTasks.map(task => {
            // Add 30 days to each date
            const taskDate = new Date(task.start_date);
            taskDate.setDate(taskDate.getDate() + 30);
            
            return {
              ...task,
              start_date: formatDate(taskDate.toISOString()),
              text: task.text.includes("Release") ? 
                task.text.replace("Release", "Launch") : task.text
            };
          }),
          links: defaultLinks
        };
        
      case "2": // Beta Platform Development
        return {
          tasks: defaultTasks.map(task => ({
            ...task,
            text: task.text.replace("Development", "Platform Development"),
            priority: task.priority === "Medium" ? "High" : task.priority
          })),
          links: defaultLinks
        };
        
      case "3": // Gamma Initiative Research
        const researchTasks: Task[] = [
          { id: 1, text: "Project Initiation", start_date: formatDate("2023-09-01"), duration: 0, progress: 1, priority: "Critical", type: "milestone" },
          { id: 2, text: "Research Phase", start_date: formatDate("2023-09-02"), duration: 15, progress: 0.9, priority: "High" },
          { id: 3, text: "Market Analysis", start_date: formatDate("2023-09-02"), duration: 7, progress: 1, parent: 2, priority: "High" },
          { id: 4, text: "Competitor Research", start_date: formatDate("2023-09-09"), duration: 8, progress: 0.8, parent: 2, priority: "Medium" },
          { id: 5, text: "Initial Findings", start_date: formatDate("2023-09-17"), duration: 0, progress: 1, priority: "Medium", type: "milestone" },
          { id: 6, text: "Development Planning", start_date: formatDate("2023-09-18"), duration: 10, progress: 0.6, priority: "High" },
          { id: 7, text: "Prototype Design", start_date: formatDate("2023-09-18"), duration: 5, progress: 1, parent: 6, priority: "Medium" },
          { id: 8, text: "Feasibility Study", start_date: formatDate("2023-09-23"), duration: 5, progress: 0.2, parent: 6, priority: "High" },
          { id: 9, text: "Prototype Complete", start_date: formatDate("2023-09-28"), duration: 0, progress: 0, priority: "Critical", type: "milestone" },
          { id: 10, text: "Stakeholder Review", start_date: formatDate("2023-09-29"), duration: 3, progress: 0, priority: "Critical" },
          { id: 11, text: "Final Report", start_date: formatDate("2023-10-02"), duration: 5, progress: 0, priority: "High" },
          { id: 12, text: "Research Complete", start_date: formatDate("2023-10-07"), duration: 0, progress: 0, priority: "Critical", type: "milestone" }
        ];
        
        const researchLinks: Link[] = [
          { id: 1, source: 1, target: 2, type: "0" },
          { id: 2, source: 2, target: 5, type: "0" },
          { id: 3, source: 5, target: 6, type: "0" },
          { id: 4, source: 6, target: 9, type: "0" },
          { id: 5, source: 9, target: 10, type: "0" },
          { id: 6, source: 10, target: 11, type: "0" },
          { id: 7, source: 11, target: 12, type: "0" },
          { id: 8, source: 3, target: 4, type: "0" },
          { id: 9, source: 7, target: 8, type: "0" }
        ];
        
        return { tasks: researchTasks, links: researchLinks };
        
      default:
        return { tasks: defaultTasks, links: defaultLinks };
    }
  }, [projectId]); // Only recalculate when projectId changes

  useEffect(() => {
    // Only run this effect in the browser
    if (typeof window !== 'undefined' && ganttContainer.current && !isInitialized) {
      // Dynamically import dhtmlxGantt
      const script = document.createElement('script');
      script.src = '/vendor/dhtmlx/codebase/dhtmlxgantt.js';
      script.async = true;
      script.onload = () => {
        // Access the global gantt object
        const gantt = (window as any).gantt;
        
        if (!gantt) {
          console.error('dhtmlxGantt library not loaded properly');
          setError('Gantt chart library failed to initialize. Please refresh the page to try again.');
          return;
        }

        // Initialize gantt with proper configuration to prevent expanding issues
        gantt.config.xml_date = "%Y-%m-%d";
        gantt.config.date_format = "%Y-%m-%d";
        
        // Disable autosize to prevent expanding issues
        gantt.config.autosize = false;
        
        // Set fixed height and enable vertical scrolling
        gantt.config.height = 550;
        
        // Control how tasks are displayed
        gantt.config.fit_tasks = false;
        gantt.config.show_progress = true;
        gantt.config.scale_height = 60;
        
        // Enable smart rendering for better performance with large datasets
        gantt.config.smart_rendering = true;
        
        // Set minimum and maximum display dates to prevent excessive scrolling
        const minDate = new Date(2023, 0, 1);  // Jan 1, 2023
        const maxDate = new Date(2024, 11, 31); // Dec 31, 2024
        gantt.config.start_date = minDate;
        gantt.config.end_date = maxDate;

        // Configure scales
        gantt.config.scales = [
          { unit: "month", step: 1, format: "%F, %Y" },
          { unit: "week", step: 1, format: "Week #%W" },
          { unit: "day", step: 1, format: "%d %M" }
        ];
        
        // Initialize zoom extension
        if (!gantt.ext) {
          gantt.ext = {};
        }
        
        gantt.ext.zoom = {
          init: function() {
            // Initialize zoom levels
            this.levels = [
              {
                name: "day",
                scale_height: 60,
                min_column_width: 30,
                scales: [
                  { unit: "day", step: 1, format: "%d %M" }
                ]
              },
              {
                name: "week",
                scale_height: 60,
                min_column_width: 50,
                scales: [
                  { unit: "week", step: 1, format: "Week #%W" },
                  { unit: "day", step: 1, format: "%d %M" }
                ]
              },
              {
                name: "month",
                scale_height: 60,
                min_column_width: 120,
                scales: [
                  { unit: "month", step: 1, format: "%F, %Y" },
                  { unit: "week", step: 1, format: "Week #%W" }
                ]
              },
              {
                name: "quarter",
                scale_height: 60,
                min_column_width: 90,
                scales: [
                  { unit: "month", step: 3, format: "Q%q" },
                  { unit: "month", step: 1, format: "%F" }
                ]
              },
              {
                name: "year",
                scale_height: 60,
                min_column_width: 30,
                scales: [
                  { unit: "year", step: 1, format: "%Y" },
                  { unit: "month", step: 1, format: "%F" }
                ]
              }
            ];
            
            this.currentLevel = 2; // Start with month view
          },
          
          zoomIn: function() {
            this.currentLevel--;
            if (this.currentLevel < 0) {
              this.currentLevel = 0;
            }
            this.setLevel(this.currentLevel);
          },
          
          zoomOut: function() {
            this.currentLevel++;
            if (this.currentLevel >= this.levels.length) {
              this.currentLevel = this.levels.length - 1;
            }
            this.setLevel(this.currentLevel);
          },
          
          setLevel: function(level) {
            const levelConfig = this.levels[level];
            
            if (levelConfig) {
              gantt.config.scale_height = levelConfig.scale_height;
              gantt.config.min_column_width = levelConfig.min_column_width;
              gantt.config.scales = levelConfig.scales;
              gantt.render();
            }
          }
        };
        
        // Initialize zoom
        gantt.ext.zoom.init();

        // Add task priority column
        gantt.config.columns = [
          { name: "text", label: "Task name", tree: true, width: 200 },
          { name: "start_date", label: "Start date", align: "center", width: 100 },
          { name: "duration", label: "Duration", align: "center", width: 60 },
          { name: "priority", label: "Priority", align: "center", width: 80 },
          { name: "progress", label: "Progress", align: "center", width: 80, template: function(obj: Task) {
            return Math.round(obj.progress * 100) + "%";
          }},
          { name: "add", width: 44 }
        ];

        // Task coloring based on priority
        gantt.templates.task_class = function(start, end, task) {
          let cssClass = "";
          
          switch (task.priority) {
            case "Critical": cssClass = "critical-task"; break;
            case "High": cssClass = "high-priority-task"; break;
            case "Medium": cssClass = "medium-priority-task"; break;
            case "Low": cssClass = "low-priority-task"; break;
          }
          
          // Add milestone class if task has zero duration
          if (task.duration === 0 || task.type === "milestone") {
            cssClass += " milestone-task";
          }
          
          return cssClass;
        };
        
        // Configure scroll settings
        gantt.config.scroll_size = 20; // Scrollbar size
        gantt.config.show_chart = true;
        gantt.config.show_grid = true;
        
        // Add event listeners for better scroll handling
        gantt.attachEvent("onGanttScroll", function(left, top) {
          // You can add custom scroll handling here if needed
          // For example, load more data when scrolling to the edge
        });
        
        // Add task tooltips for better UX
        gantt.templates.tooltip_text = function(start, end, task) {
          return `<b>Task:</b> ${task.text}<br/>
                  <b>Start date:</b> ${gantt.templates.tooltip_date_format(start)}<br/>
                  <b>End date:</b> ${gantt.templates.tooltip_date_format(end)}<br/>
                  <b>Duration:</b> ${task.duration} days<br/>
                  <b>Progress:</b> ${Math.round(task.progress * 100)}%<br/>
                  <b>Priority:</b> ${task.priority || "Normal"}`;
        };

        // Initialize gantt in the container
        gantt.init(ganttContainer.current);
        
        // Load data
        gantt.parse({ data: tasks, links: links });
        
        // Add custom CSS for task colors and scrolling
        const styleElement = document.createElement('style');
        styleElement.textContent = `
          /* Priority-based task styling */
          .critical-task .gantt_task_progress {
            background-color: #e74c3c;
          }
          .critical-task .gantt_task_line {
            background-color: #ff9e9e;
            border-color: #e74c3c;
          }
          .high-priority-task .gantt_task_progress {
            background-color: #f39c12;
          }
          .high-priority-task .gantt_task_line {
            background-color: #ffd7a2;
            border-color: #f39c12;
          }
          .medium-priority-task .gantt_task_progress {
            background-color: #3498db;
          }
          .medium-priority-task .gantt_task_line {
            background-color: #a2d5ff;
            border-color: #3498db;
          }
          .low-priority-task .gantt_task_progress {
            background-color: #2ecc71;
          }
          .low-priority-task .gantt_task_line {
            background-color: #a8f0c6;
            border-color: #2ecc71;
          }
          
          /* Milestone styling */
          .gantt_task_line.milestone-task {
            background-color: #9b59b6;
            border-color: #8e44ad;
            border-radius: 50%;
            width: 20px !important;
            height: 20px !important;
            transform: rotate(45deg);
            line-height: 20px;
          }
          
          .gantt_task_line.milestone-task .gantt_task_content {
            transform: rotate(-45deg);
            color: white;
            font-weight: bold;
            position: relative;
            top: -7px;
            left: -7px;
            height: 20px;
            width: 20px;
            padding: 0;
            line-height: 20px;
          }
          
          /* Scrollbar styling */
          .gantt_ver_scroll, .gantt_hor_scroll {
            background-color: #f8f9fa;
          }
          
          .gantt_ver_scroll > div, .gantt_hor_scroll > div {
            background-color: #cbd5e0;
            border-radius: 4px;
          }
          
          /* Improve container styling */
          .gantt-chart-container {
            position: relative;
            overflow: hidden;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          
          /* Tooltip styling */
          .gantt_tooltip {
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            border-radius: 4px;
            font-size: 12px;
            padding: 10px;
          }
        `;
        document.head.appendChild(styleElement);

        setIsInitialized(true);
      };
      
      script.onerror = (error) => {
        console.error('Error loading dhtmlxGantt:', error);
        setError('Failed to load Gantt chart library. Please check your internet connection and try again.');
      };
      
      document.body.appendChild(script);
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [ganttContainer, isInitialized]);

  // Apply filters and sorting when they change, or when project ID changes
  useEffect(() => {
    if (!isInitialized) return;
    
    const gantt = (window as any).gantt;
    if (!gantt) return;
    
    // Use the memoized tasks and links
    const currentTasks = tasks;
    const currentLinks = links;

    // Filter tasks
    gantt.clearAll();
    
    let filteredTasks = [...currentTasks];
    
    // Text filter
    if (filterText) {
      filteredTasks = filteredTasks.filter(task => 
        task.text.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    
    // Completed tasks filter
    if (!showCompleted) {
      filteredTasks = filteredTasks.filter(task => task.progress < 1);
    }
    
    // Sorting
    if (sortBy !== 'default') {
      filteredTasks.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.text.localeCompare(b.text);
          case 'start':
            return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
          case 'priority':
            const priorityOrder = { "Critical": 0, "High": 1, "Medium": 2, "Low": 3 };
            return (priorityOrder[a.priority as keyof typeof priorityOrder] || 4) - 
                   (priorityOrder[b.priority as keyof typeof priorityOrder] || 4);
          case 'progress':
            return b.progress - a.progress;
          default:
            return 0;
        }
      });
    }
    
    // Apply zoom level using our custom zoom extension
    if (gantt.ext && gantt.ext.zoom) {
      // Map slider value to zoom level (0-100 to 0-4)
      const zoomIndex = Math.min(4, Math.floor(zoomLevel / 20));
      gantt.ext.zoom.setLevel(zoomIndex);
    }
    
    // Load filtered data
    gantt.parse({ data: filteredTasks, links: currentLinks });
    
  }, [filterText, showCompleted, sortBy, zoomLevel, isInitialized, projectId]);

  const [error, setError] = useState<string | null>(null);

  // Error handling for initialization
  useEffect(() => {
    if (error) {
      console.error('Gantt chart error:', error);
    }
  }, [error]);

  if (error) {
    return (
      <div className="p-6 border border-red-300 bg-red-50 rounded-md">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Gantt Chart</h3>
        <p className="text-red-600">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Filter tasks..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-completed"
                checked={showCompleted}
                onCheckedChange={setShowCompleted}
              />
              <Label htmlFor="show-completed">Show Completed</Label>
            </div>
            
            <div className="w-[180px]">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="name">Task Name</SelectItem>
                  <SelectItem value="start">Start Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Zoom:</span>
              <Slider
                value={[zoomLevel]}
                min={0}
                max={100}
                step={20}
                onValueChange={(value) => setZoomLevel(value[0])}
                className="w-32"
              />
            </div>
            
            <div>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="gantt-chart-wrapper border rounded-md overflow-hidden">
        <div 
          ref={ganttContainer} 
          style={{ height: '550px', width: '100%' }}
          className="gantt-chart-container"
        />
        
        {/* Scroll controls */}
        <div className="flex justify-between p-2 bg-gray-50 border-t">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                const gantt = (window as any).gantt;
                if (gantt) {
                  const currentDate = gantt.getState().min_date;
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  gantt.showDate(newDate);
                }
              }}
            >
              ← Scroll Left
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                const gantt = (window as any).gantt;
                if (gantt) {
                  const currentDate = gantt.getState().min_date;
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  gantt.showDate(newDate);
                }
              }}
            >
              Scroll Right →
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                const gantt = (window as any).gantt;
                if (gantt) {
                  gantt.ext.zoom.zoomOut();
                }
              }}
            >
              Zoom Out
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                const gantt = (window as any).gantt;
                if (gantt) {
                  gantt.ext.zoom.zoomIn();
                }
              }}
            >
              Zoom In
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mt-2 flex flex-wrap justify-between">
        <div>
          <p>Tip: Click on tasks to see details. Drag tasks to reschedule.</p>
          <p>Use mouse wheel to scroll vertically, Shift+wheel to scroll horizontally.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 bg-[#ff9e9e] border border-[#e74c3c]"></span>
            Critical
          </span>
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 bg-[#ffd7a2] border border-[#f39c12]"></span>
            High
          </span>
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 bg-[#a2d5ff] border border-[#3498db]"></span>
            Medium
          </span>
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 bg-[#a8f0c6] border border-[#2ecc71]"></span>
            Low
          </span>
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 mr-1 bg-[#9b59b6] border border-[#8e44ad] rotate-45"></span>
            Milestone
          </span>
        </div>
      </div>
    </div>
  );
}