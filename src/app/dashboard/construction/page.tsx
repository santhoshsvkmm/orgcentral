'use client';

import { PageTitle } from "@/components/page-title";
import { ProjectStatusCard, sampleProjectData } from "@/components/construction/project-status-card";
import { ConstructionMetrics, sampleConstructionMetrics } from "@/components/construction/construction-metrics";
import { AIInsightsPanel, sampleAIInsights } from "@/components/construction/ai-insights-panel";
import { ProjectTimeline, sampleTimelinePhases } from "@/components/construction/project-timeline";
import { ResourceAllocation, sampleResources } from "@/components/construction/resource-allocation";
import { SafetyDashboard, sampleSafetyIncidents, sampleSafetyMetrics } from "@/components/construction/safety-dashboard";
import { FinancialOverview, sampleFinancialMetrics, sampleProjectBudgets } from "@/components/construction/financial-overview";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample project data for the status cards
const sampleProjects = [
  {
    id: 'project-alpha',
    name: 'Residential Tower A',
    type: 'residential' as const,
    status: 'in-progress' as const,
    progress: 68,
    budget: {
      allocated: 850000,
      spent: 578000,
      currency: '$'
    },
    timeline: {
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      daysRemaining: 45
    },
    location: 'Downtown District',
    projectManager: {
      name: 'John Smith',
      avatar: 'https://placehold.co/40x40.png?text=JS'
    },
    teamSize: 15,
    riskLevel: 'medium' as const,
    lastUpdate: '2 hours ago'
  },
  {
    id: 'project-beta',
    name: 'Commercial Plaza',
    type: 'commercial' as const,
    status: 'in-progress' as const,
    progress: 45,
    budget: {
      allocated: 1200000,
      spent: 540000,
      currency: '$'
    },
    timeline: {
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      daysRemaining: 78
    },
    location: 'Business District',
    projectManager: {
      name: 'Maria Garcia',
      avatar: 'https://placehold.co/40x40.png?text=MG'
    },
    teamSize: 22,
    riskLevel: 'low' as const,
    lastUpdate: '1 hour ago'
  },
  {
    id: 'project-gamma',
    name: 'Infrastructure Bridge',
    type: 'infrastructure' as const,
    status: 'delayed' as const,
    progress: 32,
    budget: {
      allocated: 2500000,
      spent: 1200000,
      currency: '$'
    },
    timeline: {
      startDate: '2023-10-01',
      endDate: '2024-09-30',
      daysRemaining: 120
    },
    location: 'River Crossing',
    projectManager: {
      name: 'David Chen',
      avatar: 'https://placehold.co/40x40.png?text=DC'
    },
    teamSize: 35,
    riskLevel: 'high' as const,
    lastUpdate: '30 minutes ago'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ConstructionDashboardPage() {
  return (
    <>
      <PageTitle 
        title="Construction Dashboard" 
        description="Comprehensive overview of construction projects, AI insights, and performance metrics." 
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Construction Metrics Overview */}
        <motion.section variants={itemVariants}>
          <ConstructionMetrics metrics={sampleConstructionMetrics} />
        </motion.section>

        {/* Main Content Tabs */}
        <motion.section variants={itemVariants}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Project Status Cards */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold">Active Projects</h3>
                  <div className="space-y-4">
                    {sampleProjects.map((project) => (
                      <ProjectStatusCard 
                        key={project.id} 
                        project={project}
                        onClick={() => console.log('Project clicked:', project.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Insights Panel */}
                <div className="space-y-4">
                  <AIInsightsPanel 
                    insights={sampleAIInsights}
                    onInsightClick={(insight) => console.log('Insight clicked:', insight.id)}
                    onViewAll={() => console.log('View all insights')}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <ProjectTimeline 
                phases={sampleTimelinePhases}
                projectName="Residential Tower A"
                onPhaseClick={(phase) => console.log('Phase clicked:', phase.id)}
              />
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              <AIInsightsPanel 
                insights={sampleAIInsights}
                onInsightClick={(insight) => console.log('Insight clicked:', insight.id)}
                onViewAll={() => console.log('View all insights')}
                className="max-w-none"
              />
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <ResourceAllocation 
                resources={sampleResources}
                onResourceClick={(resource) => console.log('Resource clicked:', resource.id)}
              />
            </TabsContent>

            <TabsContent value="safety" className="space-y-6">
              <SafetyDashboard 
                incidents={sampleSafetyIncidents}
                metrics={sampleSafetyMetrics}
                onIncidentClick={(incident) => console.log('Incident clicked:', incident.id)}
              />
            </TabsContent>

            <TabsContent value="financials" className="space-y-6">
              <FinancialOverview 
                budgets={sampleProjectBudgets}
                metrics={sampleFinancialMetrics}
                onProjectClick={(projectId) => console.log('Project clicked:', projectId)}
              />
            </TabsContent>
          </Tabs>
        </motion.section>
      </motion.div>
    </>
  );
}
