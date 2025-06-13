
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
import { GripHorizontal, CheckSquare, XSquare } from 'lucide-react';

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
    const initialPerms = JSON.parse(JSON.stringify(generateInitialPermissions()));
    for (const moduleKey in role.permissions) {
        if (initialPerms[moduleKey as ModuleKey]) { 
            for (const actionKey in role.permissions[moduleKey as ModuleKey]) {
                if ((initialPerms[moduleKey as ModuleKey] as any).hasOwnProperty(actionKey)) { 
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
      const newPermissions = JSON.parse(JSON.stringify(prev)); 
      if (!newPermissions[moduleKey]) {
        newPermissions[moduleKey] = {};
      }
      (newPermissions[moduleKey] as any)[actionKey] = checked;
      return newPermissions;
    });
  };

  const handleGlobalSelectAll = () => {
    if (editingRole?.name === 'Admin') return;
    setCurrentPermissions(generateInitialPermissions(true));
  };

  const handleGlobalDeselectAll = () => {
    if (editingRole?.name === 'Admin') return;
    setCurrentPermissions(generateInitialPermissions(false));
  };

  const handleModuleSelectAll = (moduleKeyToUpdate: ModuleKey) => {
    if (editingRole?.name === 'Admin') return;
    setCurrentPermissions(prev => {
        const newPermissions = JSON.parse(JSON.stringify(prev));
        if (newPermissions[moduleKeyToUpdate] && appModulesAndPermissions[moduleKeyToUpdate]) {
            for (const actionKey in appModulesAndPermissions[moduleKeyToUpdate].actions) {
                (newPermissions[moduleKeyToUpdate] as any)[actionKey] = true;
            }
        }
        return newPermissions;
    });
  };

  const handleModuleDeselectAll = (moduleKeyToUpdate: ModuleKey) => {
    if (editingRole?.name === 'Admin') return;
    setCurrentPermissions(prev => {
        const newPermissions = JSON.parse(JSON.stringify(prev));
        if (newPermissions[moduleKeyToUpdate] && appModulesAndPermissions[moduleKeyToUpdate]) {
            for (const actionKey in appModulesAndPermissions[moduleKeyToUpdate].actions) {
                (newPermissions[moduleKeyToUpdate] as any)[actionKey] = false;
            }
        }
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
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, name: roleName.trim(), permissions: currentPermissions } : r));
      toast({ title: "Role Updated", description: `Role "${roleName.trim()}" has been updated.` });
    } else {
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
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Permissions</h3>
                    <div className="space-x-2">
                        <Button type="button" variant="outline" size="sm" onClick={handleGlobalSelectAll} disabled={editingRole?.name === 'Admin'}>
                           <CheckSquare className="mr-2 h-3 w-3"/> Select All
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={handleGlobalDeselectAll} disabled={editingRole?.name === 'Admin'}>
                           <XSquare className="mr-2 h-3 w-3"/> Deselect All
                        </Button>
                    </div>
                </div>
                <ScrollArea className="h-[50vh] pr-3 border rounded-md p-4">
                  <div className="space-y-6">
                    {Object.entries(appModulesAndPermissions).map(([moduleKey, moduleDef]) => (
                      <div key={moduleKey}>
                        <div className="flex justify-between items-center mb-3 pb-1 border-b">
                            <h4 className="font-semibold text-md">{moduleDef.label}</h4>
                            <div className="space-x-1">
                                <Button type="button" variant="ghost" size="xs" onClick={() => handleModuleSelectAll(moduleKey as ModuleKey)} disabled={editingRole?.name === 'Admin'} className="text-xs p-1 h-auto">
                                   <CheckSquare className="mr-1 h-3 w-3"/> All
                                </Button>
                                <Button type="button" variant="ghost" size="xs" onClick={() => handleModuleDeselectAll(moduleKey as ModuleKey)} disabled={editingRole?.name === 'Admin'} className="text-xs p-1 h-auto">
                                    <XSquare className="mr-1 h-3 w-3"/> None
                                </Button>
                            </div>
                        </div>
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
