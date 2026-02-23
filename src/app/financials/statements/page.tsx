"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Statement = { id: string; from: string; to: string; totalInvoices: number; totalExpenses: number; totalPayroll: number; generatedAt: string };

export default function StatementsPage() {
  const [statements, setStatements] = useState<Statement[]>([]);

  useEffect(() => { try { const saved = localStorage.getItem('app:statements'); if (saved) setStatements(JSON.parse(saved)); } catch (e) {} }, []);
  useEffect(() => { try { localStorage.setItem('app:statements', JSON.stringify(statements)); } catch (e) {} }, [statements]);

  function generate(from: string, to: string) {
    // read invoices, expenses, payroll from localStorage and reduce
    const invoices = JSON.parse(localStorage.getItem('app:invoices') || '[]') as any[];
    const expenses = JSON.parse(localStorage.getItem('app:expenses') || '[]') as any[];
    const payroll = JSON.parse(localStorage.getItem('app:payroll') || '[]') as any[];

    // simple date filtering (inclusive)
    const fromTs = new Date(from).getTime();
    const toTs = new Date(to).getTime();

    const invInRange = invoices.filter(i => { const d = new Date(i.date).getTime(); return d >= fromTs && d <= toTs; });
    const expInRange = expenses.filter(e => { const d = new Date(e.date).getTime(); return d >= fromTs && d <= toTs; });
    const payrollInRange = payroll.filter(p => { /* payroll period string may not be a date; include all */ return true; });

    let totalInvoices = 0;
    for (const inv of invInRange) {
      if (!inv.items || !Array.isArray(inv.items)) continue;
      let invTotal = 0;
      for (const it of inv.items) {
        if (it.free) continue;
        const base = (it.qty || 0) * (it.unitPrice || 0);
        let itemDiscount = 0;
        if (it.discountType === 'percent') itemDiscount = base * ((it.discountValue || 0) / 100);
        else if (it.discountType === 'fixed') itemDiscount = (it.discountValue || 0);
        const baseAfter = Math.max(0, base - itemDiscount);
        const itemTax = ((it.taxRate || 0) / 100) * baseAfter;
        invTotal += baseAfter + itemTax;
      }
      totalInvoices += invTotal;
    }

    const totalExpenses = expInRange.reduce((s, e) => s + (e.amount || 0), 0);
    const totalPayroll = payrollInRange.reduce((s, p) => s + (p.net || 0), 0);

    const stmt: Statement = { id: `st-${Date.now()}`, from, to, totalInvoices, totalExpenses, totalPayroll, generatedAt: new Date().toISOString() };
    setStatements([stmt, ...statements]);
  }

  function removeAt(i: number) { if (!confirm('Remove this statement?')) return; setStatements(statements.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Statements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label className="font-medium">From</Label>
              <input id="stmtFrom" type="date" defaultValue={new Date().toISOString().slice(0,10)} className="rounded-md border px-2 py-1" />
            </div>
            <div>
              <Label className="font-medium">To</Label>
              <input id="stmtTo" type="date" defaultValue={new Date().toISOString().slice(0,10)} className="rounded-md border px-2 py-1" />
            </div>
            <div>
              <Button onClick={() => {
                const from = (document.getElementById('stmtFrom') as HTMLInputElement).value;
                const to = (document.getElementById('stmtTo') as HTMLInputElement).value;
                if (!from || !to) return alert('Select from and to dates');
                generate(from, to);
              }}>Generate Statement</Button>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {statements.map((s, i) => (
              <div key={s.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.from} → {s.to}</div>
                  <div className="text-xs text-muted-foreground">Invoices: ${s.totalInvoices.toFixed(2)} • Expenses: ${s.totalExpenses.toFixed(2)} • Payroll: ${s.totalPayroll.toFixed(2)}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => alert(JSON.stringify(s, null, 2))}>View</Button>
                  <Button size="sm" variant="destructive" onClick={() => removeAt(i)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

