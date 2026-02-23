"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, List } from 'lucide-react';

export default function DataTypesSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage material master data (units, SKU, cost, suppliers).</p>
            <div className="flex gap-2">
              <Link href="/dashboard/settings/data-types/materials">
                <Button className="flex items-center"><List className="mr-2 h-4 w-4" /> Manage Materials</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Labour Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Define skill categories, levels and certification requirements.</p>
            <Link href="/dashboard/settings/data-types/labour-skills">
              <Button className="flex items-center"><List className="mr-2 h-4 w-4" /> Manage Skills</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Track equipment types, hourly rates and maintenance cycles.</p>
            <Link href="/dashboard/settings/data-types/equipment">
              <Button className="flex items-center"><PlusCircle className="mr-2 h-4 w-4" /> Manage Equipment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">Select a category to view and manage detailed master data. All changes are stored locally for this prototype and can be wired to an API.</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Import / Export</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Bulk import or export master data (CSV/JSON) to populate materials, skills, and equipment.</p>
            <div className="flex gap-2">
              <Button onClick={() => alert('Exporting data (prototype)...')}>Export</Button>
              <Button variant="outline" onClick={() => alert('Open import dialog (prototype)')}>Import</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Control how long master records are retained before archiving.</p>
            <select className="rounded-md border px-3 py-2">
              <option>Retain indefinitely</option>
              <option>Archive after 1 year</option>
              <option>Archive after 3 years</option>
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Configure syncing with external systems (ERP, procurement) to keep masters consistent.</p>
            <Button onClick={() => alert('Configure sync (prototype)')}>Configure Sync</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
