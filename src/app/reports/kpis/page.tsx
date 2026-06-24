'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTitle } from '@/components/page-title';
import { useMoney } from '@/hooks/use-money';
import { TrendingUp, TrendingDown, Minus, HardHat, DollarSign, Clock, ShieldAlert, Users, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const MONTHLY = [
  { month: 'Jan', budgetSpent: 831000,  planned: 900000,  safetyScore: 92, quality: 88 },
  { month: 'Feb', budgetSpent: 1108000, planned: 1050000, safetyScore: 95, quality: 90 },
  { month: 'Mar', budgetSpent: 1385000, planned: 1300000, safetyScore: 91, quality: 87 },
  { month: 'Apr', budgetSpent: 1524000, planned: 1400000, safetyScore: 94, quality: 92 },
  { month: 'May', budgetSpent: 1662000, planned: 1550000, safetyScore: 97, quality: 94 },
];

const RADAR = [
  { subject: 'Schedule', value: 87 }, { subject: 'Cost', value: 82 },
  { subject: 'Quality', value: 94 }, { subject: 'Safety', value: 97 },
  { subject: 'Resource', value: 88 }, { subject: 'Stakeholder', value: 91 },
];

function KPICard({ label, value, delta, unit = '', icon, color }: { label: string; value: number | string; delta?: number; unit?: string; icon: React.ReactNode; color: string }) {
  const isUp = delta !== undefined ? delta > 0: undefined;
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-xs text-muted-foreground mb-1">{label}</div>
            <div className={`text-2xl font-bold ${color}`}>{value}{unit}</div>
            {delta !== undefined && (
              <div className={`flex items-center gap-1 text-xs mt-1 ${delta > 0 ? 'text-green-400' : delta < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                {delta > 0 ? <TrendingUp className="h-3 w-3" /> : delta < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                {delta > 0 ? '+' : ''}{delta}{unit} vs last month
              </div>
            )}
          </div>
          <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-').replace('400', '500/10')}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function KPIsPage() {
  const { formatCompact } = useMoney();
  return (
    <div className="space-y-6 p-6">
      <PageTitle title="KPI Dashboard" description=" Key performance indicators across all active construction projects." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Active Projects" value={8} delta={1} icon={<Activity className="h-5 w-5 text-blue-400" />} color="text-blue-400" />
        <KPICard label="Overall Progress" value="47" unit="%" delta={3} icon={<TrendingUp className="h-5 w-5 text-green-400" />} color="text-green-400" />
        <KPICard label="Budget Utilised" value="42" unit="%" delta={-1} icon={<DollarSign className="h-5 w-5 text-amber-400" />} color="text-amber-400" />
        <KPICard label="Open RFIs" value={7} delta={-2} icon={<Clock className="h-5 w-5 text-purple-400" />} color="text-purple-400" />
        <KPICard label="Safety Score" value="97" unit="/100" delta={3} icon={<ShieldAlert className="h-5 w-5 text-green-400" />} color="text-green-400" />
        <KPICard label="Workforce Today" value={284} icon={<Users className="h-5 w-5 text-blue-400" />} color="text-blue-400" />
        <KPICard label="Open NCRs" value={4} delta={-1} icon={<HardHat className="h-5 w-5 text-orange-400" />} color="text-orange-400" />
        <KPICard label="CPI" value="0.91" icon={<TrendingDown className="h-5 w-5 text-red-400" />} color="text-red-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Monthly Spend vs Plan</CardTitle><CardDescription>Budget spent vs planned per month ({formatCompact(1)} scale)</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={MONTHLY.map(m => ({ ...m, budgetSpent: m.budgetSpent / 1000, planned: m.planned / 1000 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} tickFormatter={v => `$${v}K`} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} formatter={(v: number) => [`$${(v).toFixed(0)}K`, '']} />
                <Legend />
                <Bar dataKey="planned" fill="#6366f1" opacity={0.4} name="Planned" radius={[4,4,0,0]} />
                <Bar dataKey="budgetSpent" fill="#f59e0b" name="Actual Spend" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Project Health Radar</CardTitle><CardDescription>Overall performance across six dimensions</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={RADAR}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} />
                <Radar name="Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Safety & Quality Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} domain={[80, 100]} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="safetyScore" fill="#22c55e" name="Safety Score" radius={[4,4,0,0]} />
                <Bar dataKey="quality" fill="#6366f1" name="Quality Score" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Project Status Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Residential Tower A', progress: 47, status: 'on-track', budget: '42%' },
                { name: 'Commercial Plaza', progress: 31, status: 'at-risk', budget: '38%' },
                { name: 'Industrial Warehouse B', progress: 88, status: 'on-track', budget: '91%' },
                { name: 'Road Infrastructure P3', progress: 15, status: 'on-track', budget: '14%' },
                { name: 'Hospital Extension', progress: 62, status: 'delayed', budget: '70%' },
              ].map(p => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{p.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className={`text-xs ${p.status === 'on-track' ? 'text-green-400 bg-green-500/10 border-green-500/20' : p.status === 'at-risk' ? 'text-amber-400 bg-amber-500/10' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>{p.status}</Badge>
                        <span className="text-xs text-muted-foreground font-mono">{p.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className={`rounded-full h-1.5 ${p.status === 'delayed' ? 'bg-red-400' : p.status === 'at-risk' ? 'bg-amber-400' : 'bg-green-400'}`} style={{ width: `${p.progress}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Budget used: {p.budget}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
