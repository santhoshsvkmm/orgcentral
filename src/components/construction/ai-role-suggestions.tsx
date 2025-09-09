'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Brain, 
  Users, 
  Lightbulb,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export interface RoleSuggestion {
  role: string;
  confidence: number;
  reasoning: string;
  permissions: string[];
  responsibilities: string[];
}

interface AIRoleSuggestionsProps {
  onAnalyze?: (jobDescription: string) => Promise<RoleSuggestion[]>;
  className?: string;
}

export function AIRoleSuggestions({ onAnalyze, className = '' }: AIRoleSuggestionsProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState<RoleSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !onAnalyze) return;
    
    setIsAnalyzing(true);
    try {
      const results = await onAnalyze(jobDescription);
      setSuggestions(results);
    } catch (error) {
      console.error('Error analyzing job description:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleRoleSelection = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Role Suggestions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Analyze job descriptions to get intelligent role and permission recommendations
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste the job description here. Include responsibilities, required skills, experience level, and any specific requirements..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          
          <Button 
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Analyze & Suggest Roles
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Role Recommendations
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on the job description analysis, here are the suggested roles
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-4 rounded-lg border hover:shadow-md transition-all duration-200">
                  <div className="space-y-4">
                    {/* Role header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`role-${suggestion.role}`}
                            checked={selectedRoles.includes(suggestion.role)}
                            onChange={() => toggleRoleSelection(suggestion.role)}
                            className="rounded border-gray-300"
                          />
                          <label 
                            htmlFor={`role-${suggestion.role}`}
                            className="font-semibold text-lg cursor-pointer"
                          >
                            {suggestion.role}
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`${getConfidenceColor(suggestion.confidence)} border-0`}
                        >
                          {suggestion.confidence}% confidence
                        </Badge>
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Why this role fits:
                      </h4>
                      <p className="text-sm text-foreground">
                        {suggestion.reasoning}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Key Responsibilities:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {suggestion.responsibilities.map((responsibility, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {responsibility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Permissions */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Suggested Permissions:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {suggestion.permissions.map((permission, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {selectedRoles.length > 0 && (
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedRoles.length} role{selectedRoles.length !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create User with Selected Roles
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Sample suggestions for demo */}
      {suggestions.length === 0 && !isAnalyzing && (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">No analysis yet</h3>
                <p className="text-sm text-muted-foreground">
                  Enter a job description above to get AI-powered role suggestions
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setJobDescription(`Construction Project Manager - Senior Level

We are seeking an experienced Construction Project Manager to oversee large-scale commercial construction projects. The ideal candidate will have 8+ years of experience in construction management, with expertise in budget management, team leadership, and regulatory compliance.

Key Responsibilities:
- Manage project budgets ranging from $2M to $10M
- Lead cross-functional teams of 15-25 professionals
- Ensure compliance with safety regulations and building codes
- Coordinate with subcontractors, suppliers, and stakeholders
- Prepare and present project status reports to executives
- Manage project schedules and critical path analysis
- Review and approve change orders and budget modifications

Required Skills:
- Bachelor's degree in Construction Management or Engineering
- PMP certification preferred
- Proficiency in project management software (MS Project, Primavera)
- Strong leadership and communication skills
- Experience with BIM and construction technology
- Knowledge of OSHA safety standards`);
                }}
              >
                Try Sample Job Description
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Sample role suggestions for demo
export const sampleRoleSuggestions: RoleSuggestion[] = [
  {
    role: 'Senior Project Manager',
    confidence: 92,
    reasoning: 'The job description clearly indicates a senior-level position requiring extensive project management experience, budget oversight, and team leadership capabilities. The 8+ years requirement and $2M-$10M budget responsibility align perfectly with a Senior Project Manager role.',
    responsibilities: [
      'Project Planning & Execution',
      'Budget Management',
      'Team Leadership',
      'Stakeholder Communication',
      'Risk Management',
      'Quality Assurance'
    ],
    permissions: [
      'Create and modify projects',
      'Approve budgets up to $10M',
      'Manage team assignments',
      'Access financial reports',
      'Approve change orders',
      'View all project data',
      'Generate executive reports',
      'Manage subcontractor relationships'
    ]
  },
  {
    role: 'Construction Manager',
    confidence: 85,
    reasoning: 'The focus on construction-specific requirements, safety compliance, and coordination with subcontractors suggests this role would also fit well as a Construction Manager with operational oversight responsibilities.',
    responsibilities: [
      'Site Operations Management',
      'Safety Compliance',
      'Subcontractor Coordination',
      'Quality Control',
      'Schedule Management',
      'Resource Planning'
    ],
    permissions: [
      'Access construction schedules',
      'Manage site personnel',
      'Review safety reports',
      'Approve material orders',
      'Coordinate with subcontractors',
      'Generate progress reports',
      'Access equipment management',
      'Review inspection reports'
    ]
  },
  {
    role: 'Project Director',
    confidence: 78,
    reasoning: 'Given the executive reporting requirements and large budget responsibility, this position could also function at a Project Director level, especially for portfolio management of multiple projects.',
    responsibilities: [
      'Portfolio Oversight',
      'Executive Reporting',
      'Strategic Planning',
      'Client Relations',
      'Performance Management',
      'Business Development'
    ],
    permissions: [
      'Access all projects',
      'Approve major expenditures',
      'Manage project portfolios',
      'Access executive dashboards',
      'Review financial performance',
      'Manage client relationships',
      'Approve strategic decisions',
      'Access company-wide reports'
    ]
  }
];
