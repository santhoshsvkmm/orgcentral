'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import type { Claim } from '@/types/claim';

interface Milestone { id: string; name: string }
interface Task { id: string; title: string; milestoneId?: string }

interface ClaimFormProps {
  triggerButton: React.ReactNode;
  mode: 'create' | 'edit';
  initialData?: Claim;
  milestones?: Milestone[];
  tasks?: Task[];
  onSave: (claim: Omit<Claim, 'id' | 'createdAt' | 'updatedAt'> | Claim) => void;
}

export function ClaimForm({ triggerButton, mode, initialData, milestones = [], tasks = [], onSave }: ClaimFormProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [reference, setReference] = useState('');
  const [milestoneId, setMilestoneId] = useState<string | undefined>(undefined);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [amount, setAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        setReference(initialData.reference);
        setMilestoneId(initialData.milestoneId);
        setSelectedTaskIds(initialData.taskIds || []);
        setAmount(initialData.amount);
        setCurrency(initialData.currency || 'USD');
        setDescription(initialData.description || '');
      } else {
        setReference(`CL-${Date.now().toString().slice(-6)}`);
        setMilestoneId(undefined);
        setSelectedTaskIds([]);
        setAmount('');
        setCurrency('USD');
        setDescription('');
      }
    }
  }, [open, mode, initialData]);

  const tasksForMilestone = milestoneId ? tasks.filter(t => t.milestoneId === milestoneId) : tasks;

  const toggleTask = (taskId: string) => {
    setSelectedTaskIds(prev => prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reference.trim() || amount === '') {
      toast({ title: 'Missing fields', description: 'Please provide a reference and amount.', variant: 'destructive' });
      return;
    }

    const payload = {
      reference: reference.trim(),
      milestoneId: milestoneId || undefined,
      taskIds: selectedTaskIds,
      amount: Number(amount),
      currency,
      description: description || undefined,
      status: 'Draft' as Claim['status'],
    };

    if (mode === 'create') onSave(payload);
    else if (initialData) onSave({ ...initialData, ...payload } as Claim);

    toast({ title: mode === 'create' ? 'Claim Created' : 'Claim Updated', description: `Claim ${reference} saved.` });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Raise Claim' : 'Edit Claim'}</DialogTitle>
          <DialogDescription>{mode === 'create' ? 'Raise a claim against a milestone or specific tasks.' : 'Update claim details.'}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Reference</Label>
              <Input value={reference} onChange={e => setReference(e.target.value)} required />
            </div>
            <div>
              <Label>Amount</Label>
              <Input type="number" value={amount === '' ? '' : String(amount)} onChange={e => setAmount(e.target.value === '' ? '' : Number(e.target.value))} required />
            </div>
            <div>
              <Label>Currency</Label>
              <Input value={currency} onChange={e => setCurrency(e.target.value)} />
            </div>
            <div>
              <Label>Milestone (optional)</Label>
              <Select onValueChange={(v) => setMilestoneId(v || undefined)} defaultValue={milestoneId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select milestone or leave blank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">(No milestone - select tasks only)</SelectItem>
                  {milestones.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Tasks</Label>
            <div className="grid gap-2 mt-2">
              {tasksForMilestone.length === 0 ? (
                <div className="text-sm text-muted-foreground">No tasks available.</div>
              ) : tasksForMilestone.map(t => (
                <label key={t.id} className="flex items-center space-x-3">
                  <Checkbox checked={selectedTaskIds.includes(t.id)} onCheckedChange={() => toggleTask(t.id)} />
                  <span>{t.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" className="bg-primary hover:bg-primary/90">{mode === 'create' ? 'Create Claim' : 'Save Changes'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
