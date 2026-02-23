"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit } from 'lucide-react';

type Skill = {
  id: string;
  name: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  certification?: string;
  notes?: string;
};

export default function LabourSkillsPage() {
  const [list, setList] = useState<Skill[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [level, setLevel] = useState<Skill['level']>('Intermediate');
  const [certification, setCertification] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app:labour-skills');
      if (saved) setList(JSON.parse(saved));
    } catch (e) {
      // ignore localStorage errors but log for debugging
      // eslint-disable-next-line no-console
      console.error('Failed to read labour-skills from localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('app:labour-skills', JSON.stringify(list));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to write labour-skills to localStorage', e);
    }
  }, [list]);

  function resetForm() { setEditingIndex(null); setName(''); setCategory('General'); setLevel('Intermediate'); setCertification(''); setNotes(''); }

  function handleSave() {
    if (!name.trim()) return alert('Name required');
    const payload: Skill = { id: editingIndex !== null ? list[editingIndex].id : `skill-${Date.now()}`, name: name.trim(), category: category.trim(), level, certification: certification.trim(), notes: notes.trim() };
    if (editingIndex !== null) setList(list.map((it, i) => i === editingIndex ? payload : it)); else setList([payload, ...list]);
    resetForm();
  }

  function editAt(idx: number) { const it = list[idx]; setEditingIndex(idx); setName(it.name); setCategory(it.category || 'General'); setLevel(it.level || 'Intermediate'); setCertification(it.certification || ''); setNotes(it.notes || ''); }
  function removeAt(idx: number) {
    if (!confirm('Remove this skill?')) {
      return;
    }
    setList(list.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Labour Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label className="font-medium">Skill name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Masonry" />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="font-medium">Category</Label>
                  <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div>
                  <Label className="font-medium">Level</Label>
                  <Select onValueChange={(v) => setLevel(v as Skill['level'])}>
                    <SelectTrigger>
                      <SelectValue placeholder={level} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-2">
                <Label className="font-medium">Certification</Label>
                <Input value={certification} onChange={(e) => setCertification(e.target.value)} placeholder="Optional certification" />
              </div>
              <div className="mt-2">
                <Label className="font-medium">Notes</Label>
                <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={resetForm}>Reset</Button>
                <Button onClick={handleSave} className="bg-primary">{editingIndex !== null ? 'Update' : 'Add Skill'}</Button>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Skills ({list.length})</div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {list.map((s, i) => (
                  <div key={s.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.category} • {s.level} • {s.certification}</div>
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
