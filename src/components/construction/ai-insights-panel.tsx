'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Lightbulb,
  ChevronRight,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface AIInsight {
  id: string;
  type: 'risk' | 'opportunity' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'safety' | 'budget' | 'timeline' | 'quality' | 'resources' | 'compliance';
  actionable: boolean;
  estimatedImpact?: string;
  relatedProjects?: string[];
  timestamp: string;
}

interface AIInsightsPanelProps {
  insights: AIInsight[];
  onInsightClick?: (insight: AIInsight) => void;
  onViewAll?: () => void;
  className?: string;
}

const typeConfig = {
  risk: { 
    icon: AlertTriangle, 
    color: 'bg-red-100 text-red-800 border-red-200',
    bgColor: 'bg-red-50'
  },
  opportunity: { 
    icon: TrendingUp, 
    color: 'bg-green-100 text-green-800 border-green-200',
    bgColor: 'bg-green-50'
  },
  recommendation: { 
    icon: Lightbulb, 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    bgColor: 'bg-blue-50'
  },
  prediction: { 
    icon: Target, 
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    bgColor: 'bg-purple-50'
  }
};

const priorityConfig = {
  low: { color: 'bg-gray-100 text-gray-800', label: 'Low' },
  medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
  high: { color: 'bg-orange-100 text-orange-800', label: 'High' },
  critical: { color: 'bg-red-100 text-red-800', label: 'Critical' }
};

const categoryConfig = {
  safety: { label: 'Safety', color: 'text-red-600' },
  budget: { label: 'Budget', color: 'text-green-600' },
  timeline: { label: 'Timeline', color: 'text-blue-600' },
  quality: { label: 'Quality', color: 'text-purple-600' },
  resources: { label: 'Resources', color: 'text-orange-600' },
  compliance: { label: 'Compliance', color: 'text-indigo-600' }
};

export function AIInsightsPanel({ 
  insights, 
  onInsightClick, 
  onViewAll, 
  className = '' 
}: AIInsightsPanelProps) {
  const sortedInsights = insights
    .sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })
    .slice(0, 5); // Show top 5 insights

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Insights</CardTitle>
              <p className="text-sm text-muted-foreground">
                Smart recommendations for your projects
              </p>
            </div>
          </div>
          {onViewAll && (
            <Button variant="outline" size="sm" onClick={onViewAll}>
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {sortedInsights.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No AI insights available</p>
            <p className="text-sm">Check back later for recommendations</p>
          </div>
        ) : (
          sortedInsights.map((insight, index) => {
            const typeInfo = typeConfig[insight.type];
            const TypeIcon = typeInfo.icon;
            const priorityInfo = priorityConfig[insight.priority];
            const categoryInfo = categoryConfig[insight.category];

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 ${typeInfo.bgColor}`}
                  onClick={() => onInsightClick?.(insight)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${typeInfo.color}`}>
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm leading-tight">
                          {insight.title}
                        </h4>
                        <div className="flex gap-1">
                          <Badge 
                            variant="outline" 
                            className={`${priorityInfo.color} text-xs`}
                          >
                            {priorityInfo.label}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {insight.description}
                      </p>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className={`font-medium ${categoryInfo.color}`}>
                            {categoryInfo.label}
                          </span>
                          <div className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {insight.confidence}% confidence
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{insight.timestamp}</span>
                        </div>
                      </div>

                      {insight.estimatedImpact && (
                        <div className="text-xs text-muted-foreground">
                          <strong>Impact:</strong> {insight.estimatedImpact}
                        </div>
                      )}

                      {insight.actionable && (
                        <Badge variant="secondary" className="text-xs">
                          Actionable
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {index < sortedInsights.length - 1 && (
                  <Separator className="my-3" />
                )}
              </motion.div>
            );
          })
        )}

        {insights.length > 5 && (
          <div className="text-center pt-2">
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              View {insights.length - 5} more insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Sample AI insights data
export const sampleAIInsights: AIInsight[] = [
  {
    id: 'risk-001',
    type: 'risk',
    title: 'Potential Weather Delays for Project Alpha',
    description: 'Weather forecast indicates 70% chance of heavy rain next week, which could delay concrete pouring scheduled for Tuesday.',
    confidence: 85,
    priority: 'high',
    category: 'timeline',
    actionable: true,
    estimatedImpact: '2-3 day delay, $15K additional costs',
    relatedProjects: ['project-alpha'],
    timestamp: '2 hours ago'
  },
  {
    id: 'opportunity-001',
    type: 'opportunity',
    title: 'Cost Savings Opportunity in Material Procurement',
    description: 'Bulk purchasing steel for Projects Beta and Gamma together could save 12% on material costs.',
    confidence: 92,
    priority: 'medium',
    category: 'budget',
    actionable: true,
    estimatedImpact: '$45K savings',
    relatedProjects: ['project-beta', 'project-gamma'],
    timestamp: '4 hours ago'
  },
  {
    id: 'recommendation-001',
    type: 'recommendation',
    title: 'Optimize Crew Allocation',
    description: 'Reallocating 3 workers from Project Delta to Project Echo could improve overall productivity by 15%.',
    confidence: 78,
    priority: 'medium',
    category: 'resources',
    actionable: true,
    estimatedImpact: '15% productivity increase',
    relatedProjects: ['project-delta', 'project-echo'],
    timestamp: '6 hours ago'
  },
  {
    id: 'prediction-001',
    type: 'prediction',
    title: 'Quality Issue Prediction',
    description: 'Based on current inspection patterns, there\'s a 65% chance of quality issues in the electrical work phase.',
    confidence: 65,
    priority: 'high',
    category: 'quality',
    actionable: true,
    estimatedImpact: 'Potential rework costs $25K',
    relatedProjects: ['project-residential-towers'],
    timestamp: '8 hours ago'
  },
  {
    id: 'risk-002',
    type: 'risk',
    title: 'Safety Compliance Alert',
    description: 'Site inspection data shows declining safety equipment usage. Immediate intervention recommended.',
    confidence: 88,
    priority: 'critical',
    category: 'safety',
    actionable: true,
    estimatedImpact: 'Prevent potential incidents',
    timestamp: '1 day ago'
  }
];
