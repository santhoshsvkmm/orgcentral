"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Users, ShieldCheck } from 'lucide-react';

type Role = { id: string; name: string; description?: string; permissions: string[] };

const defaultRoles: Role[] = [
  { id: 'admin', name: 'Administrator', description: 'Full access to all modules', permissions: ['*'] },
  { id: 'manager', name: 'Manager', description: 'Manage projects and teams', permissions: ['projects:read','projects:write','users:read'] },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access', permissions: ['projects:read','reports:read'] },
];

export default function PermissionsSettingsPage(){
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>(() => {
    try { const raw = localStorage.getItem('app:roles'); return raw ? JSON.parse(raw) : defaultRoles; } catch { return defaultRoles; }
  });

  useEffect(() => {
    try { localStorage.setItem('app:roles', JSON.stringify(roles)); } catch {}
  }, [roles]);

  const addRole = () => {
    const name = prompt('Role name');
    if (!name) return;
    setRoles(r => [{ id: `role-${Date.now()}`, name, description: '', permissions: [] }, ...r]);
  };

  const removeRole = (id: string) => {
    if (!confirm('Remove this role?')) return;
    setRoles(r => r.filter(x => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-primary"/>Permissions & Roles</CardTitle>
          <CardDescription>Manage roles and assign permissions to control access across the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button onClick={addRole}>Add Role</Button>
          </div>

          <div className="space-y-3">
            {roles.map(role => (
              <div key={role.id} className="p-3 border rounded-md flex items-start justify-between">
                <div>
                  <div className="font-medium">{role.name}</div>
                  <div className="text-sm text-muted-foreground">{role.description || 'No description'}</div>
                  <div className="text-xs text-muted-foreground mt-2">Permissions: {role.permissions.join(', ') || 'None'}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={() => { const p = prompt('Enter permission (e.g., projects:write)'); if (p) setRoles(rs => rs.map(r => r.id===role.id ? {...r, permissions: Array.from(new Set([...r.permissions, p]))} : r)); }}>Add Permission</Button>
                  <Button variant="destructive" size="sm" onClick={() => removeRole(role.id)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
