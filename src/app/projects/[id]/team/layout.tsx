import ProjectMenubar from '@/components/projects/project-menubar';

interface TeamLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

const TeamLayout: React.FC<TeamLayoutProps> = ({ children, params }) => {
  const projectId = params.id;

  return (
    <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default TeamLayout;