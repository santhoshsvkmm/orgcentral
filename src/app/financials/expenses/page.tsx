"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Expense = { id: string; date: string; payee: string; amount: number; category?: string; notes?: string };

export default function ExpensesPage() {
  const [items, setItems] = useState<Expense[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [date, setDate] = useState<string>('');
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState('General');
  const [notes, setNotes] = useState('');

  useEffect(() => { try { const saved = localStorage.getItem('app:expenses'); if (saved) setItems(JSON.parse(saved)); } catch (e) {} }, []);
  useEffect(() => { try { localStorage.setItem('app:expenses', JSON.stringify(items)); } catch (e) {} }, [items]);

  function reset() { setDate(''); setPayee(''); setAmount(0); setCategory('General'); setNotes(''); setEditingIndex(null); }

  function save() {
    if (!payee.trim()) return alert('Payee required');
    const payload: Expense = { id: editingIndex !== null ? items[editingIndex].id : `ex-${Date.now()}`, date: date || new Date().toISOString().slice(0, 10), payee: payee.trim(), amount, category: category.trim(), notes: notes.trim() };
    if (editingIndex !== null) setItems(items.map((it, i) => i === editingIndex ? payload : it)); else setItems([payload, ...items]);
    reset();
  }

  function editAt(i: number) { const it = items[i]; setEditingIndex(i); setDate(it.date); setPayee(it.payee); setAmount(it.amount); setCategory(it.category || 'General'); setNotes(it.notes || ''); }
  function removeAt(i: number) { if (!confirm('Remove this expense?')) return; setItems(items.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label className="font-medium">Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <div className="mt-2">
                <Label className="font-medium">Payee</Label>
                <Input value={payee} onChange={(e) => setPayee(e.target.value)} placeholder="Payee" />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="font-medium">Amount</Label>
                  <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value || 0))} />
                </div>
                <div>
                  <Label className="font-medium">Category</Label>
                  <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
              </div>
              <div className="mt-2">
                <Label className="font-medium">Notes</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={reset}>Reset</Button>
                <Button onClick={save} className="bg-primary">{editingIndex !== null ? 'Update' : 'Add Expense'}</Button>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Recent Expenses ({items.length})</div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {items.map((e, i) => (
                  <div key={e.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{e.payee} • ${e.amount}</div>
                      <div className="text-xs text-muted-foreground">{e.date} • {e.category}</div>
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

