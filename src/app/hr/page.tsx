
'use client';

import { Users as UsersIcon } from "lucide-react"; // Using a distinct alias
import { UserList } from "@/components/users/user-list";

export default function EmployeeDirectoryPage() {
  return (
    <>
      {/* The PageTitle and navigation tabs are in hr/layout.tsx */}
      {/* This page specifically renders the content for Employee Directory */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <UsersIcon className="mr-2 h-5 w-5 text-primary" />
          Employee Directory
        </h2>
        {/* The "Add Employee" button is now part of the UserList component */}
      </div>

      {/* Render the UserList component here */}
      <UserList />
    </>
  );
}
