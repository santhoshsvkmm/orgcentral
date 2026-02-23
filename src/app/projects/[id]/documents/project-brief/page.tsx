
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  FileText,
  Target,
  Users,
  CheckCircle2,
  Calendar,
  Info,
  Edit2,
  Save,
  Clock,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

interface Stakeholder {
  name: string;
  role: string;
  impact: 'High' | 'Medium' | 'Low';
}

interface Deliverable {
  title: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  dueDate: string;
}

export default function ProjectBriefPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [projectName, setProjectName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Initial mockup state
  const [briefData, setBriefData] = useState({
    objectives: [
      "Successfully launch the Alpha version of the product by Q3.",
      "Achieve a user satisfaction rate of 85% or higher during beta testing.",
      "Ensure all core features are optimized for performance and scalability.",
      "Establish a robust feedback loop with early adopters for continuous improvement."
    ],
    scope: {
      inScope: [
        "Core feature development (Authentication, Dashboard, Reporting).",
        "API integration with third-party service providers.",
        "Mobile-responsive frontend implementation.",
        "Comprehensive unit and integration testing."
      ],
      outOfScope: [
        "Advanced AI-driven analytics (planned for Phase 2).",
        "Localization into more than 3 languages.",
        "Legacy system migration support."
      ]
    },
    stakeholders: [
      { name: "John Doe", role: "Project Sponsor", impact: "High" },
      { name: "Jane Smith", role: "Lead Architect", impact: "High" },
      { name: "Mike Johnson", role: "Product Owner", impact: "Medium" },
      { name: "Sarah Williams", role: "Head of Marketing", impact: "Low" }
    ] as Stakeholder[],
    deliverables: [
      { title: "Requirements Specification", status: "Completed", dueDate: "2026-01-15" },
      { title: "UI/UX High-Fidelity Mockups", status: "Completed", dueDate: "2026-02-01" },
      { title: "Alpha Build Deployment", status: "In Progress", dueDate: "2026-03-20" },
      { title: "Security Audit Report", status: "Pending", dueDate: "2026-04-10" }
    ] as Deliverable[],
    lastUpdated: "2026-02-15T10:30:00Z"
  });

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      getProjectNameById(projectId).then(name => {
        setProjectName(name);
        setIsLoading(false);
      });
    }
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto py-8 pb-12">
      
      <PageTitle
        title={`Project Brief: ${projectName}`}
        description="Core roadmap, objectives, and high-level scope of the project."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4 text-emerald-500" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Brief
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl bg-gradient-to-br from-white to-slate-50/50">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Target className="h-5 w-5 text-indigo-500" />
                    Strategic Objectives
                  </CardTitle>
                  <CardDescription>Primary goals and success criteria for this initiative.</CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updated: {new Date(briefData.lastUpdated).toLocaleDateString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {briefData.objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-3 items-start animate-in slide-in-from-left duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="mt-1 h-5 w-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-indigo-600">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{obj}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Tabs defaultValue="in-scope" className="w-full">
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <FileText className="h-5 w-5 text-slate-600" />
                    </div>
                    <CardTitle className="text-lg">Project Scope</CardTitle>
                  </div>
                  <TabsList className="bg-slate-100/50">
                    <TabsTrigger value="in-scope" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">In-Scope</TabsTrigger>
                    <TabsTrigger value="out-of-scope" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Out-of-Scope</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <TabsContent value="in-scope" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {briefData.scope.inScope.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50 text-emerald-800 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="out-of-scope" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {briefData.scope.outOfScope.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-sm">
                        <Info className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          <Card className="border-none shadow-md overflow-hidden bg-indigo-900 text-white">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-300" />
                Key Deliverables
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="mt-4 px-6 pb-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-indigo-200 border-b border-indigo-800/50">
                      <th className="py-3 text-left font-medium">Deliverable</th>
                      <th className="py-3 text-center font-medium">Status</th>
                      <th className="py-3 text-right font-medium">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-800/10">
                    {briefData.deliverables.map((item, idx) => (
                      <tr key={idx} className="group">
                        <td className="py-4 font-medium">{item.title}</td>
                        <td className="py-4 text-center">
                          <Badge
                            className={item.status === 'Completed' ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
                              item.status === 'In Progress' ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
                                "bg-slate-500/20 text-slate-300 border-slate-500/30"}
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-right text-indigo-300">{item.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" />
                Stakeholders
              </CardTitle>
              <CardDescription>Key individuals and their level of impact.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {briefData.stakeholders.map((person, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors border">
                  <div>
                    <h4 className="font-bold text-sm">{person.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{person.role}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={person.impact === 'High' ? "text-rose-500 border-rose-100 bg-rose-50 text-[10px]" :
                      person.impact === 'Medium' ? "text-amber-500 border-amber-100 bg-amber-50 text-[10px]" :
                        "text-blue-500 border-blue-100 bg-blue-50 text-[10px]"}
                  >
                    {person.impact} Impact
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                View All Stakeholders
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-indigo-100 bg-indigo-50/30">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-indigo-600" />
                Related Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="link" className="p-0 h-auto text-xs text-indigo-600 flex justify-start">
                <Link href={`/projects/${projectId}/documents/specifications`}>Technical Specifications</Link>
              </Button>
              <Button asChild variant="link" className="p-0 h-auto text-xs text-indigo-600 flex justify-start text-left">
                <Link href={`/projects/${projectId}/documents/drawings`}>Architectural Drawings</Link>
              </Button>
              <Separator className="my-2 bg-indigo-100" />
              <p className="text-[10px] text-slate-500 italic leading-snug">
                The project brief is a living document. Any structural changes should be reviewed by the Project Sponsor.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
