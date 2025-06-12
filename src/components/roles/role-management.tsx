'use client';

import { useState } from 'react';
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

type Role = {
  id: string;
  name: string;
};

const mockRoles: Role[] = [
  { id: '1', name: 'Admin' },
  { id: '2', name: 'Manager' },
  { id: '3', name: 'Member' },
];

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRoleName, setNewRoleName] = useState('');

  const handleAddRole = () => {
    console.log('Add new role logic here');
    // Placeholder for adding a new role
    // Close dialog and clear state
    setIsAddEditDialogOpen(false);
    setNewRoleName('');
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setNewRoleName(role.name);
    setIsAddEditDialogOpen(true);
  };

  const handleUpdateRole = () => {
    console.log('Update role logic here for role:', editingRole, 'with new name:', newRoleName);
    // Placeholder for updating an existing role
    // Close dialog and clear state
    setIsAddEditDialogOpen(false);
    setEditingRole(null);
    setNewRoleName('');
  };

  const handleDeleteRole = (roleId: string) => {
    console.log('Delete role logic here for ID:', roleId);
    // Placeholder for deleting a role
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsAddEditDialogOpen(true)}>
          Add New Role
        </Button>
      </div>
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
                <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>Edit</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">Delete</Button>
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
                      <AlertDialogAction onClick={() => handleDeleteRole(role.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            <DialogDescription>
              {editingRole ? 'Edit the role details.' : 'Enter the details for the new role.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roleName" className="text-right">
                Name
              </Label>
              <Input
                id="roleName"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
             <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
             </DialogClose>
            <Button type="button" onClick={editingRole ? handleUpdateRole : handleAddRole}>
              {editingRole ? 'Save Changes' : 'Add Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}