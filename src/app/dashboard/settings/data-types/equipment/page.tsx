"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, Edit } from 'lucide-react';

type Equipment = {
  id: string;
  name: string;
  model?: string;
  category?: string;
  hourlyRate?: number;
  maintenanceIntervalDays?: number;
  notes?: string;
};

export default function EquipmentPage() {
  const [list, setList] = useState<Equipment[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState('General');
  const [hourlyRate, setHourlyRate] = useState<number | undefined>(undefined);
  const [maintenanceIntervalDays, setMaintenanceIntervalDays] = useState<number | undefined>(30);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app:equipment');
      if (saved) setList(JSON.parse(saved));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to read equipment from localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('app:equipment', JSON.stringify(list));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to write equipment to localStorage', e);
    }
  }, [list]);

  function resetForm() {
    setName(''); setModel(''); setCategory('General'); setHourlyRate(undefined); setMaintenanceIntervalDays(30); setNotes(''); setEditingIndex(null);
  }

  function handleSave() {
    if (!name.trim()) return alert('Name required');
    const payload: Equipment = { id: editingIndex !== null ? list[editingIndex].id : `eq-${Date.now()}`, name: name.trim(), model: model.trim(), category: category.trim(), hourlyRate: hourlyRate || 0, maintenanceIntervalDays: maintenanceIntervalDays || 0, notes: notes.trim() };
    if (editingIndex !== null) setList(list.map((it, i) => i === editingIndex ? payload : it)); else setList([payload, ...list]);
    resetForm();
  }

  function editAt(idx: number) { const it = list[idx]; setEditingIndex(idx); setName(it.name); setModel(it.model || ''); setCategory(it.category || 'General'); setHourlyRate(it.hourlyRate); setMaintenanceIntervalDays(it.maintenanceIntervalDays); setNotes(it.notes || ''); }

  function removeAt(idx: number) { if (!confirm('Remove this equipment?')) { return; } setList(list.filter((_, i) => i !== idx)); }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Equipment Master</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label className="font-medium">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Equipment name" />

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="font-medium">Model</Label>
                  <Input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model/Type" />
                </div>
                <div>
                  <Label className="font-medium">Category</Label>
                  <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="font-medium">Hourly Rate</Label>
                  <Input type="number" value={hourlyRate ?? ''} onChange={(e) => setHourlyRate(Number(e.target.value || 0))} />
                </div>
                <div>
                  <Label className="font-medium">Maintenance Interval (days)</Label>
                  <Input type="number" value={maintenanceIntervalDays ?? ''} onChange={(e) => setMaintenanceIntervalDays(Number(e.target.value || 0))} />
                </div>
              </div>

              <div className="mt-2">
                <Label className="font-medium">Notes</Label>
                <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" />
              </div>

              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={resetForm}>Reset</Button>
                <Button onClick={handleSave} className="bg-primary">{editingIndex !== null ? 'Update' : 'Add Equipment'}</Button>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Equipment ({list.length})</div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {list.map((e, i) => (
                  <div key={e.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{e.name}</div>
                      <div className="text-xs text-muted-foreground">{e.model} • {e.category} • ${e.hourlyRate}/hr</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => editAt(i)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeAt(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
