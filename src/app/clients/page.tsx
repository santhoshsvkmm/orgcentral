
'use client';

import { PageTitle } from "@/components/page-title";
import { ClientList } from "@/components/clients/client-list";
import type { Client } from "@/types/client";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ClientForm } from "@/components/clients/client-form";
import { Button } from "@/components/ui/button";

// Mock data - in a real app, this would be fetched from an API
const initialMockClients: Client[] = [
  {
    id: "client-1",
    name: "Innovate Corp.",
    contactPerson: "Charles Innovate",
    email: "charles@innovatecorp.com",
    phone: "555-0505",
    industry: "Technology",
    address: "1 Tech Park, Silicon Valley, CA 94000",
    mappedProjects: [
      { id: "clmap-1-1", projectId: "1", projectName: "Alpha Launch Platform", projectSpecificEmail: "alpha.client@innovatecorp.com", engagementDetails: "Full platform development for Alpha Launch.", invitationStatus: "Accepted", invitationSentAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "client-2",
    name: "GreenBuild Constructions",
    contactPerson: "Grace Green",
    email: "grace@greenbuild.com",
    phone: "555-0606",
    industry: "Real Estate Development",
    address: "25 Eco Drive, Evergreen City, EV 12345",
    mappedProjects: [
       { id: "clmap-2-1", projectId: "2", projectName: "Beta Eco Tower", projectSpecificEmail: "beta.client@greenbuild.com", engagementDetails: "Construction of the Beta Eco Tower residential complex.", invitationStatus: "Pending", invitationSentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialMockClients);

  const handleAddClient = (newClientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const clientWithId: Client = {
      ...newClientData,
      id: `client-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      mappedProjects: newClientData.mappedProjects.map(mp => ({
        ...mp,
        id: mp.id.startsWith('map-temp-') ? `clmap-${Date.now()}-${Math.random().toString(16).slice(2,6)}` : mp.id,
        invitationStatus: mp.invitationStatus || "Not Sent",
      })),
      createdAt: now,
      updatedAt: now,
    };
    setClients(prev => [clientWithId, ...prev]);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(prev =>
      prev.map(c => (c.id === updatedClient.id 
        ? { 
            ...updatedClient, 
            mappedProjects: updatedClient.mappedProjects.map(mp => ({
                ...mp,
                id: mp.id.startsWith('map-temp-') ? `clmap-${Date.now()}-${Math.random().toString(16).slice(2,6)}` : mp.id,
                invitationStatus: mp.invitationStatus || "Not Sent",
            })),
            updatedAt: new Date().toISOString() 
          } 
        : c))
    );
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
  };

  return (
    <>
      <PageTitle
        title="Client Management"
        description="Manage client relationships, company details, and their project engagements."
        actions={
          <ClientForm
            mode="create"
            onSave={handleAddClient}
            triggerButton={
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Client
              </Button>
            }
          />
        }
      />
      <ClientList
        clients={clients}
        onUpdateClient={handleUpdateClient}
        onDeleteClient={handleDeleteClient}
      />
    </>
  );
}
