'use client';

import { PageTitle } from "@/components/page-title";
import { AIRoleSuggestions, sampleRoleSuggestions } from "@/components/construction/ai-role-suggestions";
import { AIProjectAnalysis, sampleAnalysisResults } from "@/components/construction/ai-project-analysis";
import { AIInsightsPanel, sampleAIInsights } from "@/components/construction/ai-insights-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Users, 
  BarChart3, 
  Lightbulb,
  Target,
  Zap,
  TrendingUp,
  Shield,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

const aiFeatures = [
  {
    id: 'role-suggestions',
    title: 'Intelligent Role Suggestions',
    description: 'AI analyzes job descriptions to recommend optimal user roles and permissions',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    benefits: ['Streamlined onboarding', 'Appropriate access levels', 'Reduced admin time']
  },
  {
    id: 'project-analysis',
    title: 'Project Risk Analysis',
    description: 'Proactive identification of project bottlenecks and critical issues',
    icon: BarChart3,
    color: 'bg-red-100 text-red-600',
    benefits: ['Early risk detection', 'Predictive insights', 'Automated alerts']
  },
  {
    id: 'smart-insights',
    title: 'Smart Recommendations',
    description: 'Data-driven insights for optimizing project performance and efficiency',
    icon: Lightbulb,
    color: 'bg-green-100 text-green-600',
    benefits: ['Performance optimization', 'Resource allocation', 'Cost savings']
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    description: 'Forecast project outcomes and identify potential issues before they occur',
    icon: Target,
    color: 'bg-purple-100 text-purple-600',
    benefits: ['Timeline prediction', 'Budget forecasting', 'Quality assurance']
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

export default function AIFeaturesPage() {
  return (
    <>
      <PageTitle 
        title="AI-Powered Features" 
        description="Intelligent construction management with AI-driven insights and automation." 
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* AI Features Overview */}
        <motion.section variants={itemVariants}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aiFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-3`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {feature.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* AI Capabilities Showcase */}
        <motion.section variants={itemVariants}>
          <Tabs defaultValue="role-suggestions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="role-suggestions">Role Suggestions</TabsTrigger>
              <TabsTrigger value="project-analysis">Project Analysis</TabsTrigger>
              <TabsTrigger value="insights">Smart Insights</TabsTrigger>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
            </TabsList>

            <TabsContent value="role-suggestions" className="space-y-6">
              <AIRoleSuggestions 
                onAnalyze={async (jobDescription) => {
                  // Simulate AI analysis
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  return sampleRoleSuggestions;
                }}
              />
            </TabsContent>

            <TabsContent value="project-analysis" className="space-y-6">
              <AIProjectAnalysis 
                analysisResults={sampleAnalysisResults}
                onAnalyzeProject={async (projectId) => {
                  // Simulate project analysis
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  return sampleAnalysisResults[0];
                }}
                onViewDetails={(projectId) => console.log('View project details:', projectId)}
              />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <AIInsightsPanel 
                insights={sampleAIInsights}
                onInsightClick={(insight) => console.log('Insight clicked:', insight.id)}
                onViewAll={() => console.log('View all insights')}
                className="max-w-none"
              />
            </TabsContent>

            <TabsContent value="demo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Interactive AI Demo
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Experience OrgCentral's AI capabilities with real-time demonstrations
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-dashed">
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Brain className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">AI Risk Prediction</h3>
                            <p className="text-sm text-muted-foreground">
                              See how AI identifies potential project risks
                            </p>
                          </div>
                          <Button className="w-full">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Run Risk Analysis
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Shield className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Safety Compliance AI</h3>
                            <p className="text-sm text-muted-foreground">
                              Automated safety monitoring and alerts
                            </p>
                          </div>
                          <Button className="w-full" variant="outline">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Check Safety Status
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-3">AI Performance Metrics</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">94%</div>
                        <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">2.3s</div>
                        <div className="text-sm text-muted-foreground">Avg Response Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">15%</div>
                        <div className="text-sm text-muted-foreground">Cost Reduction</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* AI Integration Benefits */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Why Choose AI-Powered Construction Management?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Efficiency
                    </Badge>
                  </div>
                  <h3 className="font-semibold">Increased Productivity</h3>
                  <p className="text-sm text-muted-foreground">
                    AI automates routine tasks and provides intelligent recommendations, 
                    allowing teams to focus on high-value activities and decision-making.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Accuracy
                    </Badge>
                  </div>
                  <h3 className="font-semibold">Data-Driven Decisions</h3>
                  <p className="text-sm text-muted-foreground">
                    Make informed decisions based on comprehensive data analysis and 
                    predictive insights rather than intuition alone.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Prevention
                    </Badge>
                  </div>
                  <h3 className="font-semibold">Proactive Risk Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify and address potential issues before they impact project 
                    timelines, budgets, or safety outcomes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </>
  );
}
