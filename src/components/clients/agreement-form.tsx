'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, type FormEvent } from "react";
import type { Agreement } from "@/types/agreement";
// note: lightweight agreement form; no date formatting util required here

interface AgreementFormProps {
  triggerButton: React.ReactNode;
  mode: 'create' | 'edit';
  agreementData?: Agreement;
  onSave: (agreement: Omit<Agreement, 'id' | 'createdAt' | 'updatedAt'> | Agreement) => void;
}

export function AgreementForm({ triggerButton, mode, agreementData, onSave }: AgreementFormProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [referenceNumber, setReferenceNumber] = useState('');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState<Agreement['status']>('Draft');
  const [documents, setDocuments] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && agreementData) {
        setReferenceNumber(agreementData.referenceNumber || '');
        setTitle(agreementData.title || '');
        setStartDate(agreementData.startDate || '');
        setEndDate(agreementData.endDate || '');
        setValue(agreementData.value ?? '');
        setCurrency(agreementData.currency || 'USD');
        setStatus(agreementData.status || 'Draft');
        setDocuments((agreementData.documents || []).join(', '));
        setNotes(agreementData.notes || '');
      } else {
        setReferenceNumber(`AGR-${Date.now().toString().slice(-6)}`);
        setTitle('');
        setStartDate('');
        setEndDate('');
        setValue('');
        setCurrency('USD');
        setStatus('Draft');
        setDocuments('');
        setNotes('');
      }
    }
  }, [isOpen, mode, agreementData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!referenceNumber.trim() || !title.trim()) {
      toast({ title: 'Missing Fields', description: 'Please enter reference number and title.', variant: 'destructive' });
      return;
    }

    const payload = {
      referenceNumber: referenceNumber.trim(),
      title: title.trim(),
      partyType: agreementData ? agreementData.partyType : 'Client',
      partyId: agreementData ? agreementData.partyId : '',
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      value: value === '' ? undefined : Number(value),
      currency: currency || undefined,
      status,
      documents: documents ? documents.split(',').map(d => d.trim()).filter(Boolean) : [],
      notes: notes || undefined,
    } as Omit<Agreement, 'id' | 'createdAt' | 'updatedAt'>;

    if (mode === 'create') {
      onSave(payload);
    } else if (agreementData) {
      onSave({ ...agreementData, ...payload } as Agreement);
    }

    toast({ title: mode === 'create' ? 'Agreement Created' : 'Agreement Updated', description: `Agreement "${title}" saved.` });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">{mode === 'create' ? 'Add New Agreement' : 'Edit Agreement'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Create a client agreement or contract record.' : `Update agreement ${agreementData?.referenceNumber}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Reference Number</Label>
                <Input value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} required />
              </div>
              <div>
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div>
                <Label>Value</Label>
                <Input type="number" value={value === '' ? '' : String(value)} onChange={(e) => setValue(e.target.value === '' ? '' : Number(e.target.value))} />
              </div>
              <div>
                <Label>Currency</Label>
                <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
              </div>
              <div>
                <Label>Status</Label>
                <Select onValueChange={(v) => setStatus(v as Agreement['status'])} defaultValue={status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Documents (comma-separated URLs)</Label>
              <Input value={documents} onChange={(e) => setDocuments(e.target.value)} placeholder="https://... , https://..." />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" className="bg-primary hover:bg-primary/90">{mode === 'create' ? 'Create Agreement' : 'Save Changes'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
