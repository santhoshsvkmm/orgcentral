"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Trash2, Edit } from 'lucide-react';

type Material = {
  id: string;
  name: string;
  sku?: string;
  unit?: string;
  costPerUnit?: number;
  supplier?: string;
  notes?: string;
};

export default function MaterialsPage() {
  const [list, setList] = useState<Material[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [unit, setUnit] = useState('');
  const [costPerUnit, setCostPerUnit] = useState<number | undefined>(undefined);
  const [supplier, setSupplier] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app:materials');
      if (saved) setList(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('app:materials', JSON.stringify(list)); } catch (e) {}
  }, [list]);

  function resetForm() {
    setName(''); setSku(''); setUnit(''); setCostPerUnit(undefined); setSupplier(''); setNotes(''); setEditingIndex(null);
  }

  function handleSave() {
    if (!name.trim()) return alert('Name required');
    const payload: Material = { id: editingIndex !== null ? list[editingIndex].id : `mat-${Date.now()}`, name: name.trim(), sku: sku.trim(), unit: unit.trim(), costPerUnit: costPerUnit || 0, supplier: supplier.trim(), notes: notes.trim() };
    if (editingIndex !== null) {
      setList(list.map((it, idx) => idx === editingIndex ? payload : it));
    } else {
      setList([payload, ...list]);
    }
    resetForm();
  }

  function editAt(idx: number) {
    const it = list[idx];
    setEditingIndex(idx);
    setName(it.name); setSku(it.sku || ''); setUnit(it.unit || ''); setCostPerUnit(it.costPerUnit); setSupplier(it.supplier || ''); setNotes(it.notes || '');
  }

  function removeAt(idx: number) {
    if (!confirm('Remove this material?')) return;
    setList(list.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Materials Master</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label className="font-medium">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Material name" />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="font-medium">SKU</Label>
                  <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU" />
                </div>
                <div>
                  <Label className="font-medium">Unit</Label>
                  <Input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g., m3, kg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="font-medium">Cost per Unit</Label>
                  <Input type="number" value={costPerUnit ?? ''} onChange={(e) => setCostPerUnit(Number(e.target.value || 0))} />
                </div>
                <div>
                  <Label className="font-medium">Supplier</Label>
                  <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Supplier name" />
                </div>
              </div>
              <div className="mt-2">
                <Label className="font-medium">Notes</Label>
                <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={resetForm}>Reset</Button>
                <Button onClick={handleSave} className="bg-primary">{editingIndex !== null ? 'Update' : 'Add Material'}</Button>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Materials ({list.length})</div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {list.map((m, i) => (
                  <div key={m.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.sku} • {m.unit} • ${m.costPerUnit}</div>
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
