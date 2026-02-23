"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Shield } from 'lucide-react';

export default function SecuritySettingsPage(){
  const [require2FA, setRequire2FA] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState('min-8');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5 text-primary"/>Security</CardTitle>
          <CardDescription>Configure security defaults for the organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <div className="font-medium">Require Two-Factor Authentication</div>
                  <div className="text-xs text-muted-foreground">Force 2FA for all users upon next login.</div>
                </div>
                <select value={String(require2FA)} onChange={(e) => setRequire2FA(e.target.value === 'true')} className="px-2 py-1 border rounded-md">
                  <option value="false">Off</option>
                  <option value="true">On</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <div className="font-medium">Password Policy</div>
                  <div className="text-xs text-muted-foreground">Set organization-wide password complexity rules.</div>
                </div>
                <select value={passwordPolicy} onChange={(e) => setPasswordPolicy(e.target.value)} className="px-2 py-1 border rounded-md">
                  <option value="min-8">Minimum 8 characters</option>
                  <option value="min-12">Minimum 12 characters</option>
                  <option value="complex">Minimum 12, require symbols & numbers</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => alert('Security settings saved (prototype)')}>Save Security Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
