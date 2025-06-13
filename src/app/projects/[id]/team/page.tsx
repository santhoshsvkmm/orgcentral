'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMember {
  id: string;
  name: string;
  accepted: boolean;
}

const placeholderTeamMembers: TeamMember[] = [
  { id: '1', name: 'Alice Smith', accepted: true },
  { id: '2', name: 'Bob Johnson', accepted: false },
  { id: '3', name: 'Charlie Brown', accepted: true },
  { id: '4', name: 'David Green', accepted: false },
];

export default function TeamMembersPage({ params }: { params: { id: string } }) {
  const projectId = params.id;

  // In a real application, you would fetch team members for this project using projectId
  const teamMembers = placeholderTeamMembers;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Team Members</h1>
      <p className="text-lg mb-8">This is where you can view and manage the team members for this project.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${member.accepted ? 'text-green-600' : 'text-yellow-600'}`}>
                Status: {member.accepted ? 'Accepted' : 'Pending'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}