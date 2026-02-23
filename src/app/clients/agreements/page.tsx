'use client';

import { PageTitle } from '@/components/page-title';
import { AgreementList } from '@/components/clients/agreement-list';
import { AgreementForm } from '@/components/clients/agreement-form';
import type { Agreement } from '@/types/agreement';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const getInitialMockAgreements = (): Agreement[] => [
  {
    id: 'agr-1',
    referenceNumber: 'AGR-0001',
    title: 'Master Services Agreement - Innovate Corp',
    partyType: 'Client',
    partyId: 'client-1',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
    value: 250000,
    currency: 'USD',
    status: 'Active',
    documents: [],
    notes: 'Standard MSA covering software and services.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function ClientAgreementsPage() {
  const [agreements, setAgreements] = useState<Agreement[]>(() => getInitialMockAgreements());
  const searchParams = useSearchParams();
  const clientId = searchParams?.get('clientId') || undefined;

  // clients map placeholder: in a real app we would fetch client names from API or context
  const clientsMap = useMemo(() => ({ 'client-1': 'Innovate Corp.', 'client-2': 'GreenBuild Constructions' } as Record<string,string>), []);

  const handleAddAgreement = (newAgreementData: Omit<Agreement, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newAgreement: Agreement = {
      ...newAgreementData,
      id: `agr-${Date.now()}-${Math.random().toString(16).slice(2,6)}`,
      createdAt: now,
      updatedAt: now,
    } as Agreement;
    setAgreements(prev => [newAgreement, ...prev]);
  };

  const handleUpdateAgreement = (updated: Agreement) => {
    setAgreements(prev => prev.map(a => a.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : a));
  };

  const handleDeleteAgreement = (id: string) => {
    setAgreements(prev => prev.filter(a => a.id !== id));
  };

  const filtered = clientId ? agreements.filter(a => a.partyType === 'Client' && a.partyId === clientId) : agreements;

  return (
    <>
      <PageTitle
        title={clientId ? 'Client Agreements' : 'Agreements'}
        description={clientId ? `Agreements for client ${clientsMap[clientId ?? ''] || clientId}` : 'Manage agreements and contracts for clients, vendors, subcontractors and suppliers.'}
        actions={
          <AgreementForm
            mode="create"
            onSave={handleAddAgreement}
            triggerButton={<Button className="bg-accent hover:bg-accent/90 text-accent-foreground"><PlusCircle className="mr-2 h-4 w-4" /> Add Agreement</Button>}
          />
        }
      />

      <AgreementList
        agreements={filtered}
        clientsMap={clientsMap}
        onUpdateAgreement={handleUpdateAgreement}
        onDeleteAgreement={handleDeleteAgreement}
      />
    </>
  );
}
