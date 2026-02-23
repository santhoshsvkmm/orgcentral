
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, MoreHorizontal, Trash2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { UserForm } from "./user-form"; 
import { useToast } from '@/hooks/use-toast';
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


const initialUsers = [
  { id: "1", name: "Alice Wonderland", email: "alice@example.com", role: "Admin", avatar: "https://placehold.co/40x40.png?text=AW", jobDescription: "Manages the entire system and all users." },
  { id: "2", name: "Bob The Builder", email: "bob@example.com", role: "Project Manager", avatar: "https://placehold.co/40x40.png?text=BB", jobDescription: "Oversees project planning and execution." },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Member", avatar: "https://placehold.co/40x40.png?text=CB", jobDescription: "Regular team member contributing to projects." },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Member", avatar: "https://placehold.co/40x40.png?text=DP", jobDescription: "Specialist in front-end development." },
  { id: "5", name: "Eve Adams", email: "eve@example.com", role: "Editor", avatar: "https://placehold.co/40x40.png?text=EA", jobDescription: "Responsible for content creation and editing." },
  { id: "6", name: "Frank Carter", email: "frank@example.com", role: "Viewer", avatar: "https://placehold.co/40x40.png?text=FC", jobDescription: "Has read-only access to certain parts of the system." },
  { id: "7", name: "Grace Hopper", email: "grace@example.com", role: "Contributor", avatar: "https://placehold.co/40x40.png?text=GH", jobDescription: "Contributes specialized knowledge or resources." },
  { id: "8", name: "Heidi Lamar", email: "heidi@example.com", role: "HR Manager", avatar: "https://placehold.co/40x40.png?text=HL", jobDescription: "Manages human resources and team assignments." },
  { id: "9", name: "Ivan Petrov", email: "ivan@example.com", role: "Project Lead", avatar: "https://placehold.co/40x40.png?text=IP", jobDescription: "Leads specific project teams or modules." },
  { id: "10", name: "Judy Bloom", email: "judy@example.com", role: "Member", avatar: "https://placehold.co/40x40.png?text=JB", jobDescription: "Backend developer and database administrator." },
  { id: "11", name: "Ken Adams", email: "ken@example.com", role: "Support Staff", avatar: "https://placehold.co/40x40.png?text=KA", jobDescription: "Provides technical support to users." },
  { id: "12", name: "Laura Jones", email: "laura@example.com", role: "Analyst", avatar: "https://placehold.co/40x40.png?text=LJ", jobDescription: "Analyzes project data and performance metrics." },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  jobDescription?: string;
}


export function UserList() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { toast } = useToast();
  
  const handleAddUser = (newUser: User | (Omit<User, 'id' | 'avatar'> & { avatar?: string })) => {
    // Support being called with either a full User (rare) or the create-shape
    if ('id' in newUser && newUser.id) {
      // If a full user is passed, treat as update
      setUsers(prevUsers => prevUsers.map(u => u.id === newUser.id ? newUser as User : u));
      return;
    }

    const createShape = newUser as Omit<User, 'id' | 'avatar'> & { avatar?: string };
    const userWithId: User = {
      ...createShape,
      id: `user-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,
      avatar: createShape.avatar || `https://placehold.co/40x40.png?text=${createShape.name.substring(0,2).toUpperCase()}`
    };
    setUsers(prevUsers => [userWithId, ...prevUsers]);
  };

  const handleUpdateUser = (updatedUser: User | (Omit<User, 'id' | 'avatar'> & { avatar?: string })) => {
    // If we get a partial/create shape without id, ignore as update
    if (!('id' in updatedUser) || !updatedUser.id) {
      // nothing to update
      return;
    }
    const user = updatedUser as User;
    setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? user : u));
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    toast({
      title: "User Deleted",
      description: `User "${userName}" has been deleted.`,
    });
  };

  const getRoleBadgeVariant = (role: string): "default" | "secondary" | "outline" => {
    if (role.toLowerCase() === 'admin') return 'default';
    if (role.toLowerCase().includes('manager') || role.toLowerCase().includes('lead')) return 'secondary';
    return 'outline';
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar} alt={row.name} data-ai-hint="user avatar" />
            <AvatarFallback>{row.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
      cell: ({ row }) => <>{row.email}</>,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
      cell: ({ row }) => <Badge variant={getRoleBadgeVariant(row.role)}>{row.role}</Badge>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <UserForm 
            mode="edit"
            userData={row}
            onSave={handleUpdateUser}
            triggerButton={
              <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit user</span>
              </Button>
            }
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      onSelect={(e) => e.preventDefault()} 
                      className="text-destructive focus:text-destructive focus:bg-destructive/10 w-full flex items-center"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the user "{row.name}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteUser(row.id, row.name)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
  
  const searchableUserColumns: (keyof User)[] = ['name', 'email', 'role'];

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage users, roles, and permissions.</CardDescription>
        </div>
         <UserForm 
            mode="create"
            onSave={handleAddUser}
            triggerButton={
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Add User
              </Button>
            }
          />
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={users}
          itemsPerPage={10} 
          searchableColumns={searchableUserColumns}
          globalFilterPlaceholder="Search users (name, email, role)..."
          noResultsMessage="No users match your search."
        />
      </CardContent>
    </Card>
  );
}
