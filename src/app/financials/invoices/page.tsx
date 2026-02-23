"use client";

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type InvoiceItem = {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
  discountType?: 'none' | 'percent' | 'fixed';
  discountValue?: number; // percent or fixed amount
  taxRate?: number; // percent
  free?: boolean;
};

type Invoice = {
  id: string;
  number: string;
  date: string;
  dueDate?: string;
  client: string;
  items: InvoiceItem[];
  notes?: string;
  paid?: boolean;
};

function computeTotals(items: InvoiceItem[]) {
  const subTotal = items.reduce((s, it) => s + (it.free ? 0 : it.qty * it.unitPrice), 0);
  const discount = items.reduce((s, it) => {
    if (it.free) return s;
    const base = it.qty * it.unitPrice;
    if (it.discountType === 'percent') return s + (base * ((it.discountValue || 0) / 100));
    if (it.discountType === 'fixed') return s + (it.discountValue || 0);
    return s;
  }, 0);
  const taxable = Math.max(0, subTotal - discount);
  const tax = items.reduce((s, it) => {
    if (it.free) return s;
    const base = it.qty * it.unitPrice;
    const itemDiscount = it.discountType === 'percent' ? (base * ((it.discountValue || 0) / 100)) : (it.discountType === 'fixed' ? (it.discountValue || 0) : 0);
    const baseAfterDiscount = Math.max(0, base - itemDiscount);
    return s + ((it.taxRate || 0) / 100) * baseAfterDiscount;
  }, 0);
  const total = taxable + tax;
  return { subTotal, discount, tax, total };
}

export default function InvoicesPage() {
  const [list, setList] = useState<Invoice[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [number, setNumber] = useState('INV-');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState('');
  const [client, setClient] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);

  useEffect(() => { try { const saved = localStorage.getItem('app:invoices'); if (saved) setList(JSON.parse(saved)); } catch (e) {} }, []);
  useEffect(() => { try { localStorage.setItem('app:invoices', JSON.stringify(list)); } catch (e) {} }, [list]);

  const totals = useMemo(() => computeTotals(items), [items]);

  function addItem() {
    setItems([{ id: `it-${Date.now()}`, description: '', qty: 1, unitPrice: 0, discountType: 'none', discountValue: 0, taxRate: 0, free: false }, ...items]);
  }

  function updateItem(idx: number, patch: Partial<InvoiceItem>) { setItems(items.map((it, i) => i === idx ? { ...it, ...patch } : it)); }
  function removeItem(idx: number) { setItems(items.filter((_, i) => i !== idx)); }

  function reset() { setNumber('INV-'); setDate(new Date().toISOString().slice(0, 10)); setDueDate(''); setClient(''); setNotes(''); setItems([]); setEditingIndex(null); }

  function save() {
    if (!client.trim()) return alert('Client required');
    const payload: Invoice = { id: editingIndex !== null ? list[editingIndex].id : `inv-${Date.now()}`, number: number || `INV-${Date.now()}`, date, dueDate, client: client.trim(), items, notes: notes.trim(), paid: false };
    if (editingIndex !== null) setList(list.map((it, i) => i === editingIndex ? payload : it)); else setList([payload, ...list]);
    reset();
  }

  function editAt(i: number) { const it = list[i]; setEditingIndex(i); setNumber(it.number); setDate(it.date); setDueDate(it.dueDate || ''); setClient(it.client); setNotes(it.notes || ''); setItems(it.items || []); }
  function removeAt(i: number) { if (!confirm('Remove this invoice?')) return; setList(list.filter((_, idx) => idx !== i)); }
  function markPaid(i: number) { setList(list.map((it, idx) => idx === i ? { ...it, paid: true } : it)); }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label className="font-medium">Invoice Number</Label>
              <Input value={number} onChange={(e) => setNumber(e.target.value)} />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="font-medium">Date</Label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                  <Label className="font-medium">Due Date</Label>
                  <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>
              <div className="mt-2">
                <Label className="font-medium">Client</Label>
                <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client name" />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">Items</Label>
                  <Button onClick={addItem}>Add Item</Button>
                </div>
                <div className="space-y-2 mt-2">
                  {items.map((it, idx) => (
                    <div key={it.id} className="p-2 border rounded">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                        <Input className="md:col-span-3" placeholder="Description" value={it.description} onChange={(e) => updateItem(idx, { description: e.target.value })} />
                        <Input type="number" className="w-full" value={it.qty} onChange={(e) => updateItem(idx, { qty: Number(e.target.value || 0) })} />
                        <Input type="number" className="w-full" value={it.unitPrice} onChange={(e) => updateItem(idx, { unitPrice: Number(e.target.value || 0) })} />
                        <select value={it.discountType} onChange={(e) => updateItem(idx, { discountType: e.target.value as any })} className="rounded-md border px-2 py-1">
                          <option value="none">No Discount</option>
                          <option value="percent">% Discount</option>
                          <option value="fixed">Fixed</option>
                        </select>
                        <Input type="number" value={it.discountValue || 0} onChange={(e) => updateItem(idx, { discountValue: Number(e.target.value || 0) })} placeholder="Discount" />
                        <Input type="number" value={it.taxRate || 0} onChange={(e) => updateItem(idx, { taxRate: Number(e.target.value || 0) })} placeholder="Tax %" />
                        <div className="flex gap-2 mt-2">
                          <Button variant="ghost" size="sm" onClick={() => removeItem(idx)}>Remove</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <Label className="font-medium">Notes</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>

              <div className="flex gap-2 justify-between items-center mt-4">
                <div>
                  <div className="text-sm text-muted-foreground">Subtotal: ${totals.subTotal.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Discount: -${totals.discount.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Tax: +${totals.tax.toFixed(2)}</div>
                  <div className="font-medium">Total: ${totals.total.toFixed(2)}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={reset}>Reset</Button>
                  <Button onClick={save} className="bg-primary">{editingIndex !== null ? 'Update Invoice' : 'Create Invoice'}</Button>
                </div>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Invoices ({list.length})</div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {list.map((inv, i) => (
                  <div key={inv.id} className="p-2 border rounded flex items-center justify-between">
                    <div>
                      <div className="font-medium">{inv.number} • {inv.client}</div>
                      <div className="text-xs text-muted-foreground">{inv.date} {inv.paid ? '• Paid' : ''}</div>
                    </div>
                    <div className="flex gap-2">
                      {!inv.paid && <Button size="sm" onClick={() => markPaid(i)}>Mark Paid</Button>}
                      <Button size="sm" variant="ghost" onClick={() => editAt(i)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => removeAt(i)}>Delete</Button>
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
