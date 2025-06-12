import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProjectList } from "@/components/projects/project-list";
import { PageTitle } from "@/components/page-title";

export default function ProjectsPage() {
  return (
    <>
      <PageTitle 
        title="Projects" 
        description="Overview of all your ongoing and completed projects."
        actions={
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Project
          </Button>
        }
      />
      <ProjectList />
    </>
  );
}
