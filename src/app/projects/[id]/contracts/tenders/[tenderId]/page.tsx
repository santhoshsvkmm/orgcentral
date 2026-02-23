// Server component: fetch tender details on the server and render client-side
// DataTable which is a client component.
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import TenderQuotesClient from '@/components/projects/tender-quotes-client';

interface Quote {
  id: string;
  supplier: string;
  amount: number;
  currency: string;
  submittedAt: string;
  notes?: string;
}

// Mock fetch (in real app replace with server call)
async function getTenderById(id: string) {
  await new Promise(r => setTimeout(r, 50));
  return {
    id,
    title: id === 't-1' ? 'Supply: Structural Steel' : 'Tender Item',
    type: 'material',
    description: 'Tender description and scope',
    createdAt: new Date().toISOString().slice(0,10),
    closingDate: new Date().toISOString().slice(0,10),
  };
}

const mockQuotes: Quote[] = [
  { id: 'q-1', supplier: 'SteelCo Ltd', amount: 12500, currency: 'USD', submittedAt: new Date().toISOString().slice(0,10), notes: 'Includes delivery' },
  { id: 'q-2', supplier: 'MetalWorks', amount: 11900, currency: 'USD', submittedAt: new Date().toISOString().slice(0,10), notes: 'Excludes GST' },
];

export default async function TenderDetailPage({ params }: { params: { id: string, tenderId: string } }) {
  const { tenderId, id: projectId } = params;
  const tender = await getTenderById(tenderId);

  // Column definitions are provided in the client component (TenderQuotesClient).

  return (
    <div className="space-y-6">
      <PageTitle title={`Tender: ${tender.title}`} description={`Details and received quotations for ${tender.title}`} actions={<Button variant="outline" asChild><Link href={`/projects/${projectId}/contracts/tenders`}><ArrowLeft className="mr-2 h-4 w-4"/>Back to Tenders</Link></Button>} />

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>{tender.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{tender.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="font-medium">{tender.createdAt}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Closing</p>
              <p className="font-medium">{tender.closingDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quotations</CardTitle>
          <CardDescription>Vendors/contractors who submitted a response to this tender.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render the quotations table in a client component so it can provide cell renderers */}
          <TenderQuotesClient quotes={mockQuotes} projectId={projectId} tenderId={tenderId} />
        </CardContent>
      </Card>
    </div>
  );
}
