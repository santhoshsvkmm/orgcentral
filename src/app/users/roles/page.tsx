
'use client';

import { RoleManagement } from "@/components/roles/role-management";
// PageTitle is handled by the layout: src/app/users/layout.tsx

export default function UserRolesPage() {
  return (
    <>
      {/* 
        The PageTitle component (e.g., title="User & Role Management") 
        is now rendered by the src/app/users/layout.tsx file.
        This page specifically renders the RoleManagement component.
        The sub-header "Manage Roles" is part of the Menubar in the layout.
      */}
      <RoleManagement />
    </>
  );
}
