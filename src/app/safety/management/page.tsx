import { LandingLayout } from '@/components/layout/landing-layout';
import { PageTitle } from '@/components/page-title';
import { SafetyDashboard, sampleSafetyIncidents, sampleSafetyMetrics } from '@/components/construction/safety-dashboard';
import SafetyClient from '@/components/projects/safety-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SafetyManagementPage() {
  // Use sample data for initial rendering; this can be replaced with API calls later.
  const incidents = sampleSafetyIncidents;
  const metrics = sampleSafetyMetrics;

  return (
    <LandingLayout>
      <PageTitle title="Safety Management" description="Manage incidents, audits and safety compliance across projects." />

      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Safety Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <SafetyDashboard incidents={incidents as any} metrics={metrics as any} />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Incident Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <SafetyClient initialIncidents={incidents as any} projectId={""} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
