import { RoleManagement } from "@/components/roles/role-management";
import { PageTitle } from "@/components/page-title";

export default function RolesPage() {
  return (
    <>
      <PageTitle
        title="Role Management"
        description="Manage user roles and permissions within the application."
      />
      <RoleManagement />
    </>
  );
}