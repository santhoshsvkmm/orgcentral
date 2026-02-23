"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Budget = { id: string; name: string; total: number; spent: number; notes?: string };

export default function BudgetPage() {
  const [items, setItems] = useState<Budget[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [spent, setSpent] = useState<number>(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try { const saved = localStorage.getItem('app:budgets'); if (saved) setItems(JSON.parse(saved)); } catch (e) {}
  }, []);
  useEffect(() => { try { localStorage.setItem('app:budgets', JSON.stringify(items)); } catch (e) {} }, [items]);

  function reset() { setName(''); setTotal(0); setSpent(0); setNotes(''); setEditingIndex(null); }

  function save() {
    if (!name.trim()) return alert('Name required');
    const payload: Budget = { id: editingIndex !== null ? items[editingIndex].id : `b-${Date.now()}`, name: name.trim(), total, spent, notes: notes.trim() };
    if (editingIndex !== null) setItems(items.map((it, i) => i === editingIndex ? payload : it)); else setItems([payload, ...items]);
    reset();
  }

  function editAt(i: number) { const it = items[i]; setEditingIndex(i); setName(it.name); setTotal(it.total); setSpent(it.spent); setNotes(it.notes || ''); }
  function removeAt(i: number) { if (!confirm('Remove this budget?')) return; setItems(items.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label className="font-medium">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Budget name" />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="font-medium">Total Amount</Label>
                  <Input type="number" value={total} onChange={(e) => setTotal(Number(e.target.value || 0))} />
                </div>
                <div>
                  <Label className="font-medium">Spent</Label>
                  <Input type="number" value={spent} onChange={(e) => setSpent(Number(e.target.value || 0))} />
                </div>
              </div>
              <div className="mt-2">
                <Label className="font-medium">Notes</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={reset}>Reset</Button>
                <Button onClick={save} className="bg-primary">{editingIndex !== null ? 'Update' : 'Add Budget'}</Button>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Budgets ({items.length})</div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {items.map((b, i) => (
                  <div key={b.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground">Total: ${b.total} • Spent: ${b.spent} • Remaining: ${b.total - b.spent}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => editAt(i)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => removeAt(i)}>Delete</Button>
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
