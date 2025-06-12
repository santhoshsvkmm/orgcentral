import { UserList } from "@/components/users/user-list";
import { PageTitle } from "@/components/page-title";

export default function UsersPage() {
  return (
    <>
      <PageTitle 
        title="User Management"
        description="Administer users, assign roles, and manage permissions."
        // The "Add User" button is now part of UserList component's header
      />
      <UserList />
    </>
  );
}
