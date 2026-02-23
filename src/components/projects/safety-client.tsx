"use client";

import React, { useState } from 'react';
import { IncidentForm } from '@/components/construction/incident-form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function SafetyClient({ initialIncidents = [], projectId, renderTriggerOnly = false }: { initialIncidents?: any[]; projectId: string; renderTriggerOnly?: boolean }) {
  const [incidentList, setIncidentList] = useState(initialIncidents);
  const { toast } = useToast();

  const handleSaveIncident = (incident: any) => {
    const exists = incidentList.some(i => i.id === incident.id);
    setIncidentList(exists ? incidentList.map(i => i.id === incident.id ? incident : i) : [...incidentList, incident]);
    toast({ title: "Incident Report Saved", description: `Incident ${incident.id} has been recorded.` });
  };

  const handleDeleteIncident = (incidentId: string) => {
    setIncidentList(incidentList.filter(i => i.id !== incidentId));
    toast({ title: "Report Removed", description: "The incident report has been deleted.", variant: "destructive" });
  };

  // If requested by parent to only render the trigger (for PageTitle actions)
  if (renderTriggerOnly) {
    return (
      <IncidentForm
        onSave={handleSaveIncident}
        trigger={
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Plus className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {incidentList.map((incident) => (
          <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors group">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-indigo-900">{incident.id}</h3>
                <Badge variant={incident.severity === 'Critical' || incident.severity === 'High' ? 'destructive' : incident.severity === 'Medium' ? 'default' : 'secondary'}>
                  {incident.severity}
                </Badge>
                <Badge variant={incident.status === 'Resolved' || incident.status === 'Closed' ? 'default' : incident.status === 'Open' ? 'destructive' : 'secondary'}>
                  {incident.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">{incident.desc}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1">{incident.type}</div>
                <div className="flex items-center gap-1">{incident.location}</div>
                <div className="flex items-center gap-1">{incident.date}</div>
                <div className="flex items-center gap-1">{incident.reporter}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 group-hover:text-slate-600">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <IncidentForm
                    initialData={incident}
                    onSave={handleSaveIncident}
                    trigger={
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Report
                      </DropdownMenuItem>
                    }
                  />
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Report
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete incident report?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteIncident(incident.id)}
                          className="bg-destructive hover:bg-destructive/90 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
