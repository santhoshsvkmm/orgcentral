
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Users,
  Search,
  Mail,
  Phone,
  MoreVertical,
  UserPlus,
  Filter,
  MessageSquare,
  ShieldCheck,
  Briefcase,
  MapPin,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { MemberForm } from '@/components/team/member-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Management' | 'Engineering' | 'Field Staff' | 'Design' | 'Planning';
  status: 'Online' | 'Offline' | 'Busy';
  email: string;
  phone: string;
  avatar?: string;
  location: string;
  joinDate: string;
}

const DEPARTMENTS = ['Management', 'Engineering', 'Field Staff', 'Design', 'Planning'];

export default function TeamMembersPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { toast } = useToast();

  const [projectName, setProjectName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const [team, setTeam] = useState<TeamMember[]>([
    { id: '1', name: 'John Doe', role: 'Project Manager', department: 'Management', status: 'Online', email: 'john.doe@orgcentral.com', phone: '+1 (555) 123-4567', avatar: 'https://i.pravatar.cc/150?u=1', location: 'London, UK', joinDate: '2025-01-10' },
    { id: '2', name: 'Jane Smith', role: 'Lead Structural Engineer', department: 'Engineering', status: 'Busy', email: 'jane.smith@orgcentral.com', phone: '+1 (555) 234-5678', avatar: 'https://i.pravatar.cc/150?u=2', location: 'New York, USA', joinDate: '2025-02-15' },
    { id: '3', name: 'Mike Johnson', role: 'Site Supervisor', department: 'Field Staff', status: 'Online', email: 'mike.j@orgcentral.com', phone: '+1 (555) 345-6789', avatar: 'https://i.pravatar.cc/150?u=3', location: 'On-Site', joinDate: '2025-03-01' },
    { id: '4', name: 'Sarah Williams', role: 'Senior Architect', department: 'Design', status: 'Offline', email: 'sarah.w@orgcentral.com', phone: '+1 (555) 456-7890', avatar: 'https://i.pravatar.cc/150?u=4', location: 'Berlin, Germany', joinDate: '2025-01-20' },
    { id: '5', name: 'David Brown', role: 'Planning Coordinator', department: 'Planning', status: 'Online', email: 'david.b@orgcentral.com', phone: '+1 (555) 567-8901', avatar: 'https://i.pravatar.cc/150?u=5', location: 'Paris, France', joinDate: '2025-04-05' },
    { id: '6', name: 'Emily Davis', role: 'MEP Engineer', department: 'Engineering', status: 'Busy', email: 'emily.d@orgcentral.com', phone: '+1 (555) 678-9012', avatar: 'https://i.pravatar.cc/150?u=6', location: 'London, UK', joinDate: '2025-05-12' },
  ]);

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      getProjectNameById(projectId).then(name => {
        setProjectName(name);
        setIsLoading(false);
      });
    }
  }, [projectId]);

  const filteredTeam = team.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept ? member.department === selectedDept : true;
    return matchesSearch && matchesDept;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto py-8 pb-12">
      
      <PageTitle
        title={`Team Members: ${projectName}`}
        description="Collaborate and manage assignments with your project team."
        actions={
          <div className="flex gap-2">
            <MemberForm
              onSave={(newMember) => {
                setTeam([...team, newMember]);
                toast({
                  title: "Member Invited",
                  description: `${newMember.name} has been invited to the project.`,
                });
              }}
              trigger={
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              }
            />
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        }
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name or role..."
            className="pl-9 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <Button
            variant={selectedDept === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDept(null)}
            className={cn("rounded-full text-xs h-8", selectedDept === null ? "bg-indigo-600" : "text-slate-500 border-slate-200")}
          >
            All Members
          </Button>
          {DEPARTMENTS.map(dept => (
            <Button
              key={dept}
              variant={selectedDept === dept ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDept(dept)}
              className={cn("rounded-full text-xs h-8 whitespace-nowrap", selectedDept === dept ? "bg-indigo-600" : "text-slate-500 border-slate-200")}
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.length > 0 ? filteredTeam.map((member, idx) => (
          <Card key={member.id} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 50}ms` }}>
            <CardHeader className="pb-4 relative">
              <div className="absolute top-4 right-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <MemberForm
                      initialData={member}
                      onSave={(updatedMember) => {
                        setTeam(team.map(m => m.id === updatedMember.id ? { ...m, ...updatedMember } : m));
                        toast({
                          title: "Member Updated",
                          description: `${updatedMember.name}'s details have been updated.`,
                        });
                      }}
                      trigger={
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                      }
                    />
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Remove Member
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove {member.name} from the project. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              setTeam(team.filter(m => m.id !== member.id));
                              toast({
                                title: "Member Removed",
                                description: `${member.name} has been removed from the project.`,
                                variant: "destructive",
                              });
                            }}
                            className="bg-destructive hover:bg-destructive/90 text-white"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-md ring-2 ring-slate-100">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm",
                    member.status === 'Online' ? "bg-emerald-500" :
                      member.status === 'Busy' ? "bg-rose-500" :
                        "bg-slate-300"
                  )} />
                </div>
                <div className="pt-1">
                  <CardTitle className="text-base font-bold text-slate-800">{member.name}</CardTitle>
                  <CardDescription className="text-xs font-medium text-indigo-600">{member.role}</CardDescription>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-slate-50 text-slate-500 border-slate-200">
                      {member.department}
                    </Badge>
                    {idx === 0 && (
                      <Badge className="text-[9px] px-1.5 py-0 bg-amber-500/10 text-amber-600 border-amber-200 hover:bg-amber-500/20">
                        Admin
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4 pt-0">
              <Separator className="mb-4 bg-slate-100/50" />
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span>{member.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 p-3 pt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 h-8 text-[11px] font-bold border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Chat
              </Button>
              <Button size="sm" variant="outline" className="flex-1 h-8 text-[11px] font-bold border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                <Briefcase className="mr-1.5 h-3.5 w-3.5" /> Profile
              </Button>
            </CardFooter>
          </Card>
        )) : (
          <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No team members found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-xs">We couldn't find any team members matching your search or filters.</p>
            <Button variant="link" onClick={() => { setSearchQuery(''); setSelectedDept(null); }} className="mt-2 text-indigo-600">
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
          <ShieldCheck className="absolute -right-4 -bottom-4 h-32 w-32 text-indigo-500/10 rotate-12" />
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-400" />
              Project Access Control
            </CardTitle>
            <CardDescription className="text-slate-400">Manage permissions and security roles for this project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">Standard Access</p>
                  <p className="text-[10px] text-slate-500">View and basic editing</p>
                </div>
              </div>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">4 Members</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">Admin Privileges</p>
                  <p className="text-[10px] text-slate-500">Full management control</p>
                </div>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">2 Members</Badge>
            </div>
            <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs h-9">
              Manage Roles & Permissions
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              Quick Assignments
            </CardTitle>
            <CardDescription>Recently assigned tasks and responsibilities across the team.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { member: 'Jane Smith', task: 'Review Structural Calculations', time: '2h ago' },
              { member: 'Mike Johnson', task: 'Site Inspection Report', time: '5h ago' },
              { member: 'John Doe', task: 'Budget Re-allocation', time: 'Yesterday' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{item.task}</p>
                    <p className="text-[10px] text-slate-500 italic">Assigned to {item.member}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">{item.time}</span>
              </div>
            ))}
            <div className="pt-2">
              <Button variant="link" className="p-0 h-auto text-[11px] text-indigo-600 flex items-center gap-1 group">
                View all active assignments <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-3 items-start shadow-sm">
        <Users className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-indigo-900 leading-tight">Collaborative Environment</h4>
          <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
            Effective communication is the key to project success. Use the built-in chat or Microsoft Teams integration to stay connected with your colleagues on-site and in the office.
          </p>
          <div className="mt-3 flex gap-3">
            <Button variant="outline" size="sm" className="h-7 text-[10px] bg-white border-indigo-200 text-indigo-700 font-bold hover:bg-indigo-50">
              <ExternalLink className="mr-1.5 h-3 w-3" /> External Directory
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
