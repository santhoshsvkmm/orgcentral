'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Target,
  Zap,
  FileText,
  Calendar,
  Users,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface ProjectAnalysisResult {
  projectId: string;
  projectName: string;
  overallHealth: 'excellent' | 'good' | 'warning' | 'critical';
  healthScore: number;
  criticalIssues: {
    issue: string;
    severity: 'High' | 'Medium' | 'Low';
    recommendation: string;
    relatedTaskIds?: string[];
  }[];
  summary: string;
  predictions: {
    completionDate: string;
    budgetVariance: number;
    riskFactors: string[];
  };
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    action: string;
    impact: string;
    effort: 'low' | 'medium' | 'high';
  }[];
}

interface AIProjectAnalysisProps {
  analysisResults?: ProjectAnalysisResult[];
  onAnalyzeProject?: (projectId: string) => Promise<ProjectAnalysisResult>;
  onViewDetails?: (projectId: string) => void;
  className?: string;
}

const healthConfig = {
  excellent: { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    label: 'Excellent',
    bgColor: 'bg-green-50'
  },
  good: { 
    color: 'bg-blue-100 text-blue-800 border-blue-200', 
    label: 'Good',
    bgColor: 'bg-blue-50'
  },
  warning: { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    label: 'Warning',
    bgColor: 'bg-yellow-50'
  },
  critical: { 
    color: 'bg-red-100 text-red-800 border-red-200', 
    label: 'Critical',
    bgColor: 'bg-red-50'
  }
};

const severityConfig = {
  High: { color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  Medium: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  Low: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle }
};

export function AIProjectAnalysis({ 
  analysisResults = [], 
  onAnalyzeProject, 
  onViewDetails, 
  className = '' 
}: AIProjectAnalysisProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Project Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Intelligent analysis of project health, risks, and recommendations
          </p>
        </CardHeader>
      </Card>

      {analysisResults.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">No Analysis Available</h3>
                <p className="text-sm text-muted-foreground">
                  Run AI analysis on your projects to get intelligent insights and recommendations
                </p>
              </div>
              <Button variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                Analyze All Projects
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {analysisResults.map((analysis, index) => {
            const healthInfo = healthConfig[analysis.overallHealth];

            return (
              <motion.div
                key={analysis.projectId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className={`border-l-4 ${healthInfo.bgColor}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{analysis.projectName}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          AI Analysis Results
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={healthInfo.color}>
                          {healthInfo.label}
                        </Badge>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{analysis.healthScore}</div>
                          <div className="text-xs text-muted-foreground">Health Score</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Health Score Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Project Health</span>
                        <span className="font-medium">{analysis.healthScore}/100</span>
                      </div>
                      <Progress value={analysis.healthScore} className="h-2" />
                    </div>

                    {/* Summary */}
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Executive Summary
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {analysis.summary}
                      </p>
                    </div>

                    {/* Critical Issues */}
                    {analysis.criticalIssues.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Critical Issues ({analysis.criticalIssues.length})
                        </h4>
                        <div className="space-y-2">
                          {analysis.criticalIssues.slice(0, 3).map((issue, idx) => {
                            const severityInfo = severityConfig[issue.severity];
                            const SeverityIcon = severityInfo.icon;

                            return (
                              <div key={idx} className="p-3 rounded-lg border bg-white">
                                <div className="flex items-start gap-3">
                                  <SeverityIcon className="h-4 w-4 mt-0.5 text-red-500" />
                                  <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-medium text-sm">{issue.issue}</h5>
                                      <Badge variant="outline" className={severityInfo.color}>
                                        {issue.severity}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {issue.recommendation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {analysis.criticalIssues.length > 3 && (
                            <div className="text-center">
                              <Button variant="ghost" size="sm">
                                View {analysis.criticalIssues.length - 3} more issues
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Predictions */}
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Predicted Completion</span>
                        </div>
                        <div className="text-lg font-semibold">
                          {analysis.predictions.completionDate}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Budget Variance</span>
                        </div>
                        <div className={`text-lg font-semibold ${
                          analysis.predictions.budgetVariance > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {analysis.predictions.budgetVariance > 0 ? '+' : ''}
                          {analysis.predictions.budgetVariance.toFixed(1)}%
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Risk Factors</span>
                        </div>
                        <div className="text-sm">
                          {analysis.predictions.riskFactors.length} identified
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        AI Recommendations ({analysis.recommendations.length})
                      </h4>
                      <div className="space-y-2">
                        {analysis.recommendations.slice(0, 2).map((rec, idx) => (
                          <div key={idx} className="p-3 rounded-lg border bg-green-50">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="font-medium text-sm">{rec.action}</h5>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Impact: {rec.impact}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <Badge variant="outline" className={
                                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }>
                                  {rec.priority}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {rec.effort} effort
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Last analyzed: 2 hours ago
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Re-analyze
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => onViewDetails?.(analysis.projectId)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Sample analysis results
export const sampleAnalysisResults: ProjectAnalysisResult[] = [
  {
    projectId: 'project-alpha',
    projectName: 'Residential Tower A',
    overallHealth: 'warning',
    healthScore: 72,
    criticalIssues: [
      {
        issue: 'Budget overrun risk detected',
        severity: 'High',
        recommendation: 'Review material costs and negotiate with suppliers for better rates',
        relatedTaskIds: ['task-1', 'task-5']
      },
      {
        issue: 'Weather delays affecting concrete work',
        severity: 'Medium',
        recommendation: 'Consider covered work areas or adjust schedule for weather windows'
      },
      {
        issue: 'Resource allocation inefficiency',
        severity: 'Medium',
        recommendation: 'Redistribute 2 workers from Phase 1 to Phase 2 for optimal productivity'
      }
    ],
    summary: 'Project is progressing but shows signs of budget pressure and weather-related delays. Immediate attention needed on cost management and resource optimization.',
    predictions: {
      completionDate: 'March 15, 2024',
      budgetVariance: 8.5,
      riskFactors: ['Weather delays', 'Material cost inflation', 'Labor shortage']
    },
    recommendations: [
      {
        priority: 'high',
        action: 'Implement cost control measures',
        impact: 'Reduce budget overrun by 5-7%',
        effort: 'medium'
      },
      {
        priority: 'medium',
        action: 'Optimize crew scheduling',
        impact: 'Improve productivity by 12%',
        effort: 'low'
      }
    ]
  },
  {
    projectId: 'project-beta',
    projectName: 'Commercial Plaza',
    overallHealth: 'good',
    healthScore: 85,
    criticalIssues: [
      {
        issue: 'Minor permit approval delay',
        severity: 'Low',
        recommendation: 'Follow up with city planning office for expedited review'
      }
    ],
    summary: 'Project is performing well with minor administrative delays. Overall trajectory is positive with good resource utilization.',
    predictions: {
      completionDate: 'June 30, 2024',
      budgetVariance: -2.1,
      riskFactors: ['Permit delays']
    },
    recommendations: [
      {
        priority: 'low',
        action: 'Accelerate permit approval process',
        impact: 'Save 3-5 days on schedule',
        effort: 'low'
      },
      {
        priority: 'medium',
        action: 'Leverage current efficiency for future projects',
        impact: 'Apply best practices company-wide',
        effort: 'medium'
      }
    ]
  }
];
