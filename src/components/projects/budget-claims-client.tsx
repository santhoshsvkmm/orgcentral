"use client";

import React, { useState } from 'react';
import { ClaimForm } from '@/components/financial/claim-form';
import { ClaimList } from '@/components/financial/claim-list';
import type { Claim } from '@/types/claim';
import { Button } from '@/components/ui/button';

interface Milestone { id: string; name: string }
interface Task { id: string; title: string; milestoneId?: string }

export default function BudgetClaimsClient({ milestones = [], tasks = [] }: { milestones?: Milestone[]; tasks?: Task[] }) {
  const [claims, setClaims] = useState<Claim[]>([]);

  const handleAddClaim = (payload: any) => {
    const now = new Date().toISOString();
    const newClaim: Claim = {
      id: `claim-${Date.now()}-${Math.random().toString(16).slice(2,6)}`,
      reference: payload.reference || `CL-${Date.now().toString().slice(-6)}`,
      milestoneId: payload.milestoneId,
      taskIds: payload.taskIds || [],
      amount: Number(payload.amount) || 0,
      currency: payload.currency || 'USD',
      description: payload.description,
      status: payload.status || 'Draft',
      createdAt: now,
      updatedAt: now,
    };
    setClaims(prev => [newClaim, ...prev]);
  };

  const handleUpdateClaim = (updated: Claim | Omit<Claim, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!('id' in updated)) {
      // Received an update payload without an id; ignore or handle as needed.
      console.warn('handleUpdateClaim called with payload missing id; ignoring.');
      return;
    }
    const updatedClaim: Claim = { ...updated, updatedAt: new Date().toISOString() } as Claim;
    setClaims(prev => prev.map(c => c.id === updatedClaim.id ? updatedClaim : c));
  };

  const handleDeleteClaim = (id: string) => {
    setClaims(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <div className="mb-4">
        <ClaimForm
          mode="create"
          milestones={milestones}
          tasks={tasks}
          onSave={handleAddClaim}
          triggerButton={<Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Raise Claim</Button>}
        />
      </div>
      <ClaimList
        claims={claims}
        milestones={Object.fromEntries(milestones.map(m => [m.id, m.name]))}
        tasks={Object.fromEntries(tasks.map(t => [t.id, t.title]))}
        onUpdate={handleUpdateClaim}
        onDelete={handleDeleteClaim}
      />
    </div>
  );
}
