
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, MoreHorizontal, Trash2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { UserForm } from "./user-form"; 
import { useToast } from '@/hooks/use-toast';


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

type User = typeof initialUsers[0];

const ITEMS_PER_PAGE = 10;

export function UserList() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const handleAddUser = (newUser: Omit<User, 'id' | 'avatar'> & { avatar?: string }) => {
    const userWithId: User = {
        ...newUser,
        id: `user-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,
        avatar: newUser.avatar || `https://placehold.co/40x40.png?text=${newUser.name.substring(0,2).toUpperCase()}`
    };
    setUsers(prevUsers => [userWithId, ...prevUsers]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    toast({
      title: "User Deleted",
      description: `User "${userName}" has been deleted.`,
    });
     // Reset to page 1 if current page becomes empty after deletion
    if (currentUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    } else if (users.slice((currentPage - 1) * ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE).length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    } else if (users.length / ITEMS_PER_PAGE < currentPage ) {
        setCurrentPage(Math.max(1, Math.ceil(users.length / ITEMS_PER_PAGE) -1) || 1)
    }
  };


  const getRoleBadgeVariant = (role: string): "default" | "secondary" | "outline" => {
    if (role.toLowerCase() === 'admin') return 'default';
    if (role.toLowerCase().includes('manager') || role.toLowerCase().includes('lead')) return 'secondary';
    return 'outline';
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
            onSave={handleAddUser}
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
            {currentUsers.map((user) => (
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
                      onSave={handleUpdateUser}
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
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive focus:bg-destructive/10" 
                        onClick={() => handleDeleteUser(user.id, user.name)}
                       >
                        <Trash2 className="mr-2 h-4 w-4" />Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4 mt-4 border-t pt-4">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
