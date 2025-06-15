
'use client';

import { PageTitle } from "@/components/page-title";
import { SubcontractorList } from "@/components/subcontractors/subcontractor-list";
import type { Subcontractor } from "@/types/subcontractor";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { SubcontractorForm } from "@/components/subcontractors/subcontractor-form";
import { Button } from "@/components/ui/button";

// Mock data - in a real app, this would be fetched from an API
const getInitialMockSubcontractors = (): Subcontractor[] => {
  const now = Date.now();
  return [
    {
      id: "sub-1",
      name: "Sparky Electricians Co.",
      contactPerson: "Eleanor Spark",
      email: "contact@sparky.com",
      phone: "555-0101",
      trade: "Electrical",
      address: "123 Volt Ave, ElectriCity, EC 54321",
      mappedProjects: [
        { id: "map-1-1", projectId: "1", projectName: "Alpha Launch", projectSpecificEmail: "alpha.sparky@example.com", suppliedServices: ["Labour", "Material"], invitationStatus: "Accepted", invitationSentAt: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString() },
        { id: "map-1-2", projectId: "2", projectName: "Beta Platform", projectSpecificEmail: "beta.sparky@example.com", suppliedServices: ["Labour"], invitationStatus: "Pending", invitationSentAt: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString() },
      ],
      createdAt: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "sub-2",
      name: "Plumb Perfect Inc.",
      contactPerson: "Piper Plumb",
      email: "info@plumbperfect.com",
      phone: "555-0202",
      trade: "Plumbing",
      address: "456 Drain St, Water Town, WT 67890",
      mappedProjects: [
        { id: "map-2-1", projectId: "1", projectName: "Alpha Launch", projectSpecificEmail: "alpha.plumb@example.com", suppliedServices: ["Material", "Equipment"], invitationStatus: "Not Sent" },
      ],
      createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

export default function SubcontractorsPage() {
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>(() => getInitialMockSubcontractors());

  const handleAddSubcontractor = (newSubcontractorData: Omit<Subcontractor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const subcontractorWithId: Subcontractor = {
      ...newSubcontractorData,
      id: `sub-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      // Ensure new project mappings have default invitation status
      mappedProjects: newSubcontractorData.mappedProjects.map(mp => ({
        ...mp,
        id: mp.id.startsWith('map-temp-') ? `map-${Date.now()}-${Math.random().toString(16).slice(2,6)}` : mp.id, // Assign real ID
        invitationStatus: mp.invitationStatus || "Not Sent",
      })),
      createdAt: now,
      updatedAt: now,
    };
    setSubcontractors(prev => [subcontractorWithId, ...prev]);
  };

  const handleUpdateSubcontractor = (updatedSubcontractor: Subcontractor) => {
    setSubcontractors(prev =>
      prev.map(s => (s.id === updatedSubcontractor.id 
        ? { 
            ...updatedSubcontractor, 
            // Ensure mapped projects retain their IDs or get new ones if temporary
            mappedProjects: updatedSubcontractor.mappedProjects.map(mp => ({
                ...mp,
                id: mp.id.startsWith('map-temp-') ? `map-${Date.now()}-${Math.random().toString(16).slice(2,6)}` : mp.id,
                invitationStatus: mp.invitationStatus || "Not Sent", // Ensure status exists
            })),
            updatedAt: new Date().toISOString() 
          } 
        : s))
    );
  };

  const handleDeleteSubcontractor = (subcontractorId: string) => {
    setSubcontractors(prev => prev.filter(s => s.id !== subcontractorId));
  };

  return (
    <>
      <PageTitle
        title="Subcontractor Management"
        description="Oversee and manage all subcontractors, their project involvements, and invitations."
        actions={
          <SubcontractorForm
            mode="create"
            onSave={handleAddSubcontractor}
            triggerButton={
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Subcontractor
              </Button>
            }
          />
        }
      />
      <SubcontractorList
        subcontractors={subcontractors}
        onUpdateSubcontractor={handleUpdateSubcontractor}
        onDeleteSubcontractor={handleDeleteSubcontractor}
      />
    </>
  );
}
