
'use client';

import { UserList } from "@/components/users/user-list";
// PageTitle is now handled by the layout: src/app/users/layout.tsx

export default function UsersPage() {
  return (
    <>
      {/* 
        The PageTitle component (e.g., title="User Management") 
        is now rendered by the src/app/users/layout.tsx file.
        This page specifically renders the UserList.
      */}
      <UserList />
    </>
  );
}
