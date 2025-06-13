
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OldRolesPage() {
  return (
    <div className="container mx-auto py-10 flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <AlertTriangle className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Page Moved</CardTitle>
          <CardDescription className="text-base">
            Role Management has been moved to a new location within the User Management section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Please update your bookmarks and use the link below to access the new Role Management page.
          </p>
          <Button asChild size="lg">
            <Link href="/users/roles">
              Go to New Role Management Page
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
