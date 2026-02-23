"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type CountryConfig = {
  countryCode: string;
  countryName: string;
  taxRate: number; // percentage
  discountRate: number; // percentage
};

const defaultCountries: CountryConfig[] = [
  { countryCode: 'US', countryName: 'United States', taxRate: 10, discountRate: 0 },
  { countryCode: 'IN', countryName: 'India', taxRate: 18, discountRate: 0 },
  { countryCode: 'AE', countryName: 'UAE', taxRate: 5, discountRate: 0 },
];

export default function BillingSettingsPage() {
  const [configs, setConfigs] = useState<CountryConfig[]>(defaultCountries);
  const [selectedCode, setSelectedCode] = useState('US');
  const [taxRate, setTaxRate] = useState<number>(10);
  const [discountRate, setDiscountRate] = useState<number>(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app:countryConfigs');
      if (saved) setConfigs(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const cur = configs.find(c => c.countryCode === selectedCode);
    if (cur) {
      setTaxRate(cur.taxRate);
      setDiscountRate(cur.discountRate);
    }
  }, [selectedCode, configs]);

  const handleSave = () => {
    const newConfigs = configs.map(c => c.countryCode === selectedCode ? { ...c, taxRate, discountRate } : c);
    setConfigs(newConfigs);
    try { localStorage.setItem('app:countryConfigs', JSON.stringify(newConfigs)); } catch (e) {}
    alert('Billing settings saved (prototype)');
  };

  const handleAddCountry = () => {
    const code = prompt('Enter country code (e.g., CA)');
    const name = prompt('Enter country name (e.g., Canada)');
    if (!code || !name) return;
    const next = [...configs, { countryCode: code.toUpperCase(), countryName: name, taxRate: 0, discountRate: 0 }];
    setConfigs(next);
    try { localStorage.setItem('app:countryConfigs', JSON.stringify(next)); } catch (e) {}
    setSelectedCode(code.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing & Tax Settings</CardTitle>
          <CardDescription>Configure country-specific tax and discount rates used by the financial modules.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <Label className="md:col-span-1">Country</Label>
            <select className="md:col-span-2 rounded-md border px-3 py-2" value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
              {configs.map(c => (
                <option key={c.countryCode} value={c.countryCode}>{c.countryCode} — {c.countryName}</option>
              ))}
            </select>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <Label className="md:col-span-1">Tax Rate (%)</Label>
            <Input type="number" className="md:col-span-2" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-4">
            <Label className="md:col-span-1">Tax Calculation Mode</Label>
            <select className="md:col-span-2 rounded-md border px-3 py-2" defaultValue="exclusive">
              <option value="exclusive">Tax Exclusive (add on top)</option>
              <option value="inclusive">Tax Inclusive (included in prices)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-4">
            <Label className="md:col-span-1">Invoice Terms (days)</Label>
            <Input type="number" className="md:col-span-2" defaultValue={30} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-4">
            <Label className="md:col-span-1">Discount Rate (%)</Label>
            <Input type="number" className="md:col-span-2" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} />
          </div>

          <div className="flex gap-2 justify-end mt-6">
            <Button variant="outline" onClick={handleAddCountry}>Add Country</Button>
            <Button onClick={handleSave} className="bg-primary">Save Billing Settings</Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">Note: This is a prototype implementation that stores settings in localStorage. I can wire these values to server-side config or a database and expose them to the invoicing and tax calculation flows.</div>
    </div>
  );
}
