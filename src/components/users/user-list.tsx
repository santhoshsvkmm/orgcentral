'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, MoreHorizontal, Trash2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { UserForm } from "./user-form"; // Import UserForm

// Mock data - replace with actual data fetching
const initialUsers = [
  { id: "1", name: "Alice Wonderland", email: "alice@example.com", role: "Admin", avatar: "/avatars/alice.png" },
 { id: "2", name: "Bob The Builder", email: "bob@example.com", role: "Project Manager", avatar: "/avatars/bob.png" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Member", avatar: "/avatars/charlie.png" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Member", avatar: "/avatars/diana.png" },
 { id: "5", name: "Eve Adams", email: "eve@example.com", role: "Editor", avatar: "/avatars/eve.png" },
 { id: "6", name: "Frank Carter", email: "frank@example.com", role: "Viewer", avatar: "/avatars/frank.png" },
 { id: "7", name: "Grace Hopper", email: "grace@example.com", role: "Contributor", avatar: "/avatars/grace.png" },
 { id: "8", name: "Heidi Lamar", email: "heidi@example.com", role: "HR Manager", avatar: "/avatars/heidi.png" },
 { id: "9", name: "Ivan Petrov", email: "ivan@example.com", role: "Project Lead", avatar: "/avatars/ivan.png" },
 { id: "10", name: "Judy Bloom", email: "judy@example.com", role: "Member", avatar: "/avatars/judy.png" },
];
type User = { id: string; name: string; email: string; role: string; avatar: string };
export function UserList() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const getRoleBadgeVariant = (role: string): "default" | "secondary" | "outline" => {
    if (role.toLowerCase() === 'admin') return 'default';
    if (role.toLowerCase().includes('manager')) return 'secondary';
    return 'outline';
  };
  
  const handleEditUser = (user: User) => {
    // Logic to open UserForm in edit mode with this user's data
    console.log("Editing user:", user);
    // This would typically involve setting state to control the UserForm's dialog and passing user data.
    // For now, we'll just log. The UserForm component itself needs to be triggered.
  };


  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage users, roles, and permissions.</CardDescription>
        </div>
         <UserForm 
            mode="create"
            triggerButton={
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Add User
              </Button>
            }
          />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="user avatar" />
                      <AvatarFallback>{user.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                   <UserForm 
                      mode="edit"
                      userData={user}
                      triggerButton={
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit user</span>
                        </Button>
                      }
                    />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                       {/* The UserForm component will now handle editing through its own trigger */}
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => console.log('Delete user', user.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
