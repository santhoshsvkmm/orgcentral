
'use client';

import { PageTitle } from "@/components/page-title";
import { ConsultantList } from "@/components/consultants/consultant-list";
import type { Consultant } from "@/types/consultant";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ConsultantForm } from "@/components/consultants/consultant-form";
import { Button } from "@/components/ui/button";

// Mock data - in a real app, this would be fetched from an API
const initialMockConsultants: Consultant[] = [
  {
    id: "consult-1",
    name: "ArchDesign Innovations",
    contactPerson: "Arthur Design",
    email: "contact@archdesign.com",
    phone: "555-0303",
    specialty: "Architectural Design",
    address: "789 Blueprint Blvd, Design District, DD 13579",
    mappedProjects: [
      { id: "cmap-1-1", projectId: "1", projectName: "Alpha Launch - Phase 1", projectSpecificEmail: "alpha.arch@example.com", servicesProvided: "Initial architectural planning and schematics.", invitationStatus: "Accepted", invitationSentAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "consult-2",
    name: "Structura Engineering Ltd.",
    contactPerson: "Sarah Structure",
    email: "info@structura.eng",
    phone: "555-0404",
    specialty: "Structural Engineering",
    address: "101 Beam Way, Foundation City, FC 24680",
    mappedProjects: [
       { id: "cmap-2-1", projectId: "2", projectName: "Beta Platform - Office Build", projectSpecificEmail: "beta.struct@example.com", servicesProvided: "Structural analysis and design for new office wing.", invitationStatus: "Pending", invitationSentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function ConsultantsPage() {
  const [consultants, setConsultants] = useState<Consultant[]>(initialMockConsultants);

  const handleAddConsultant = (newConsultantData: Omit<Consultant, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const consultantWithId: Consultant = {
      ...newConsultantData,
      id: `consult-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      mappedProjects: newConsultantData.mappedProjects.map(mp => ({
        ...mp,
        id: mp.id.startsWith('map-temp-') ? `cmap-${Date.now()}-${Math.random().toString(16).slice(2,6)}` : mp.id,
        invitationStatus: mp.invitationStatus || "Not Sent",
      })),
      createdAt: now,
      updatedAt: now,
    };
    setConsultants(prev => [consultantWithId, ...prev]);
  };

  const handleUpdateConsultant = (updatedConsultant: Consultant) => {
    setConsultants(prev =>
      prev.map(c => (c.id === updatedConsultant.id 
        ? { 
            ...updatedConsultant, 
            mappedProjects: updatedConsultant.mappedProjects.map(mp => ({
                ...mp,
                id: mp.id.startsWith('map-temp-') ? `cmap-${Date.now()}-${Math.random().toString(16).slice(2,6)}` : mp.id,
                invitationStatus: mp.invitationStatus || "Not Sent",
            })),
            updatedAt: new Date().toISOString() 
          } 
        : c))
    );
  };

  const handleDeleteConsultant = (consultantId: string) => {
    setConsultants(prev => prev.filter(c => c.id !== consultantId));
  };

  return (
    <>
      <PageTitle
        title="Consultant Management"
        description="Oversee and manage all consultants, their specialties, and project involvements."
        actions={
          <ConsultantForm
            mode="create"
            onSave={handleAddConsultant}
            triggerButton={
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Consultant
              </Button>
            }
          />
        }
      />
      <ConsultantList
        consultants={consultants}
        onUpdateConsultant={handleUpdateConsultant}
        onDeleteConsultant={handleDeleteConsultant}
      />
    </>
  );
}
