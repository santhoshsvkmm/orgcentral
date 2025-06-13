
'use client';

import { useState, FormEvent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Define application modules and their specific permissions
const appModulesAndPermissions = {
  dashboard: { label: 'Dashboard', actions: { view: 'View Dashboard' } },
  projects: { label: 'Projects', actions: { view: 'View Projects', create: 'Create Projects', edit: 'Edit Projects', delete: 'Delete Projects', manageTasks: 'Manage Tasks' } },
  users: { label: 'User Management', actions: { view: 'View Users', create: 'Create Users', edit: 'Edit Users', delete: 'Delete Users', manageRoles: 'Manage Roles' } },
  hr: { label: 'HR Management', actions: { viewDirectory: 'View Employee Directory', manageLeave: 'Manage Leave', manageReviews: 'Manage Performance Reviews', manageRecruitment: 'Manage Recruitment' } },
  financials: { label: 'Financials', actions: { viewOverview: 'View Overview', manageBudgets: 'Manage Budgets', manageExpenses: 'Manage Expenses', manageInvoicing: 'Manage Invoicing', managePayroll: 'Manage Payroll', viewStatements: 'View Statements' } },
  sales: { label: 'Sales & CRM', actions: { viewOverview: 'View Overview', manageLeads: 'Manage Leads', manageAccounts: 'Manage Accounts', manageOpportunities: 'Manage Opportunities', viewPipeline: 'View Pipeline' } },
  reports: { label: 'Reports & Analytics', actions: { viewOverview: 'View Overview', buildCustom: 'Build Custom Reports', viewKPIs: 'View KPIs', viewResourceUtil: 'View Resource Utilization', viewProjectProfit: 'View Project Profitability' } },
  communication: { label: 'Communication', actions: { manageAnnouncements: 'Manage Announcements', manageWiki: 'Manage Wiki', viewCalendar: 'View Org Calendar', useChat: 'Use Chat' } },
  fileStorage: { label: 'File Storage', actions: { view: 'View Files', upload: 'Upload Files', manage: 'Manage Files & Folders' } },
  auditLogs: { label: 'Audit Logs', actions: { view: 'View Audit Logs' } },
  settings: { label: 'Application Settings', actions: { manageAppearance: 'Manage Appearance', manageNotifications: 'Manage Notifications', manageBranding: 'Manage Branding' } },
  // Add other modules like Subcontractors, Consultants, Clients if needed
  subcontractors: { label: 'Subcontractors', actions: { view: 'View Subcontractors', manage: 'Manage Subcontractors'} },
  consultants: { label: 'Consultants', actions: { view: 'View Consultants', manage: 'Manage Consultants'} },
  clients: { label: 'Clients', actions: { view: 'View Clients', manage: 'Manage Clients'} },
};

type ModuleKey = keyof typeof appModulesAndPermissions;
type ActionKey<M extends ModuleKey> = keyof (typeof appModulesAndPermissions)[M]['actions'];

export type PermissionSet = {
  [M in ModuleKey]?: {
    [A in ActionKey<M>]?: boolean;
  };
};

export type Role = {
  id: string;
  name: string;
  permissions: PermissionSet;
};

const generateInitialPermissions = (allTrue: boolean = false): PermissionSet => {
  const permissions: PermissionSet = {};
  for (const moduleKey in appModulesAndPermissions) {
    permissions[moduleKey as ModuleKey] = {};
    for (const actionKey in appModulesAndPermissions[moduleKey as ModuleKey].actions) {
      (permissions[moduleKey as ModuleKey] as any)[actionKey as ActionKey<ModuleKey>] = allTrue;
    }
  }
  return permissions;
};

const mockRoles: Role[] = [
  { id: '1', name: 'Admin', permissions: generateInitialPermissions(true) }, // Admin has all permissions
  {
    id: '2', name: 'Project Manager', permissions: {
      ...generateInitialPermissions(),
      dashboard: { view: true },
      projects: { view: true, create: true, edit: true, manageTasks: true },
      users: { view: true },
      hr: { viewDirectory: true },
      fileStorage: { view: true, upload: true, manage: true },
      communication: { useChat: true, viewCalendar: true },
    }
  },
  {
    id: '3', name: 'Member', permissions: {
      ...generateInitialPermissions(),
      dashboard: { view: true },
      projects: { view: true },
      fileStorage: { view: true, upload: true },
      communication: { useChat: true },
    }
  },
];

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState('');
  const [currentPermissions, setCurrentPermissions] = useState<PermissionSet>(generateInitialPermissions());
  const { toast } = useToast();

  const openDialogForCreate = () => {
    setEditingRole(null);
    setRoleName('');
    setCurrentPermissions(generateInitialPermissions());
    setIsAddEditDialogOpen(true);
  };

  const openDialogForEdit = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.name);
    // Deep copy permissions to avoid modifying original state directly
    const initialPerms = JSON.parse(JSON.stringify(generateInitialPermissions()));
    for (const moduleKey in role.permissions) {
        if (initialPerms[moduleKey as ModuleKey]) { // Check if module exists in our appModules definition
            for (const actionKey in role.permissions[moduleKey as ModuleKey]) {
                if ((initialPerms[moduleKey as ModuleKey] as any).hasOwnProperty(actionKey)) { // Check if action exists
                    (initialPerms[moduleKey as ModuleKey] as any)[actionKey as string] = (role.permissions[moduleKey as ModuleKey] as any)![actionKey as string];
                }
            }
        }
    }
    setCurrentPermissions(initialPerms);
    setIsAddEditDialogOpen(true);
  };

  const handlePermissionChange = (moduleKey: ModuleKey, actionKey: ActionKey<ModuleKey>, checked: boolean) => {
    setCurrentPermissions(prev => {
      const newPermissions = JSON.parse(JSON.stringify(prev)); // Deep copy
      if (!newPermissions[moduleKey]) {
        newPermissions[moduleKey] = {};
      }
      (newPermissions[moduleKey] as any)[actionKey] = checked;
      return newPermissions;
    });
  };

  const handleSaveRole = (event: FormEvent) => {
    event.preventDefault();
    if (!roleName.trim()) {
      toast({ title: "Role Name Required", description: "Please enter a name for the role.", variant: "destructive" });
      return;
    }

    if (editingRole) {
      // Update existing role
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, name: roleName.trim(), permissions: currentPermissions } : r));
      toast({ title: "Role Updated", description: `Role "${roleName.trim()}" has been updated.` });
    } else {
      // Add new role
      const newRole: Role = {
        id: `role-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,
        name: roleName.trim(),
        permissions: currentPermissions,
      };
      setRoles([newRole, ...roles]);
      toast({ title: "Role Created", description: `Role "${roleName.trim()}" has been created.` });
    }
    setIsAddEditDialogOpen(false);
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string, roleNameText: string) => {
    setRoles(roles.filter(r => r.id !== roleId));
    toast({ title: "Role Deleted", description: `Role "${roleNameText}" has been deleted.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">Manage Roles & Permissions</h2>
        <Button onClick={openDialogForCreate}>Add New Role</Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Existing Roles</CardTitle>
          <CardDescription>View, edit, or delete existing roles and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDialogForEdit(role)}>Edit</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" disabled={role.name === 'Admin'}>Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the "{role.name}" role.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteRole(role.id, role.name)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-headline">{editingRole ? 'Edit Role & Permissions' : 'Add New Role & Permissions'}</DialogTitle>
            <DialogDescription>
              {editingRole ? `Modify the name and permissions for the "${editingRole.name}" role.` : 'Define the name and permissions for the new role.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveRole}>
            <div className="grid gap-6 py-4">
              <div>
                <Label htmlFor="roleName" className="text-base">Role Name</Label>
                <Input
                  id="roleName"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="mt-1"
                  required
                  disabled={editingRole?.name === 'Admin'}
                />
                {editingRole?.name === 'Admin' && <p className="text-xs text-muted-foreground mt-1">The 'Admin' role name cannot be changed.</p>}
              </div>
              
              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Permissions</h3>
                <ScrollArea className="h-[50vh] pr-3 border rounded-md p-4">
                  <div className="space-y-6">
                    {Object.entries(appModulesAndPermissions).map(([moduleKey, moduleDef]) => (
                      <div key={moduleKey}>
                        <h4 className="font-semibold text-md mb-3 pb-1 border-b">{moduleDef.label}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                          {Object.entries(moduleDef.actions).map(([actionKey, actionLabel]) => (
                            <div key={`${moduleKey}-${actionKey}`} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${moduleKey}-${actionKey}`}
                                checked={!!currentPermissions[moduleKey as ModuleKey]?.[actionKey as ActionKey<ModuleKey>]}
                                onCheckedChange={(checked) => handlePermissionChange(moduleKey as ModuleKey, actionKey as ActionKey<ModuleKey>, !!checked)}
                                disabled={editingRole?.name === 'Admin'}
                              />
                              <Label htmlFor={`${moduleKey}-${actionKey}`} className="font-normal text-sm">
                                {actionLabel}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                 {editingRole?.name === 'Admin' && <p className="text-xs text-muted-foreground mt-2">Admin role always has all permissions. They cannot be modified.</p>}
              </div>
            </div>
            <DialogFooter className="pt-6 border-t mt-4">
               <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
               </DialogClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {editingRole ? 'Save Changes' : 'Create Role'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
