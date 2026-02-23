import { ProjectMenubar } from "@/components/projects/project-menubar";
import { ReactNode } from "react";

export default async function ProjectLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="flex-1 flex flex-col">
            <div className="container mx-auto px-4 pt-10 pb-0">
                <ProjectMenubar projectId={id} />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
