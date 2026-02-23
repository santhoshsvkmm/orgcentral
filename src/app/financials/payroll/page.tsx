"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Payroll = { id: string; employee: string; period: string; gross: number; deductions: number; tax: number; net?: number };

export default function PayrollPage() {
  const [items, setItems] = useState<Payroll[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [employee, setEmployee] = useState('');
  const [period, setPeriod] = useState('');
  const [gross, setGross] = useState<number>(0);
  const [deductions, setDeductions] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  useEffect(() => { try { const saved = localStorage.getItem('app:payroll'); if (saved) setItems(JSON.parse(saved)); } catch (e) {} }, []);
  useEffect(() => { try { localStorage.setItem('app:payroll', JSON.stringify(items)); } catch (e) {} }, [items]);

  function reset() { setEmployee(''); setPeriod(''); setGross(0); setDeductions(0); setTax(0); setEditingIndex(null); }

  function save() {
    if (!employee.trim()) return alert('Employee required');
    const net = Math.max(0, gross - deductions - tax);
    const payload: Payroll = { id: editingIndex !== null ? items[editingIndex].id : `pr-${Date.now()}`, employee: employee.trim(), period: period || 'Current', gross, deductions, tax, net };
    if (editingIndex !== null) setItems(items.map((it, i) => i === editingIndex ? payload : it)); else setItems([payload, ...items]);
    reset();
  }

  function editAt(i: number) { const it = items[i]; setEditingIndex(i); setEmployee(it.employee); setPeriod(it.period); setGross(it.gross); setDeductions(it.deductions); setTax(it.tax); }
  function removeAt(i: number) { if (!confirm('Remove this payroll record?')) return; setItems(items.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payroll</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label className="font-medium">Employee</Label>
              <Input value={employee} onChange={(e) => setEmployee(e.target.value)} />
              <div className="mt-2">
                <Label className="font-medium">Period</Label>
                <Input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="e.g., 2025-01" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Input type="number" value={gross} onChange={(e) => setGross(Number(e.target.value || 0))} placeholder="Gross" />
                <Input type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value || 0))} placeholder="Deductions" />
                <Input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value || 0))} placeholder="Tax" />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={reset}>Reset</Button>
                <Button onClick={save} className="bg-primary">{editingIndex !== null ? 'Update' : 'Add Payroll'}</Button>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Recent Payroll ({items.length})</div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {items.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{p.employee} • {p.period}</div>
                      <div className="text-xs text-muted-foreground">Gross: ${p.gross} • Net: ${p.net}</div>
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

