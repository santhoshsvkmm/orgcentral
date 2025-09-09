'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  PieChart,
  BarChart3,
  Calculator,
  CreditCard,
  Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface ProjectBudget {
  projectId: string;
  projectName: string;
  totalBudget: number;
  spentAmount: number;
  committedAmount: number;
  remainingBudget: number;
  currency: string;
  status: 'on-budget' | 'over-budget' | 'at-risk' | 'under-budget';
  variance: number; // percentage
  categories: {
    labor: { budgeted: number; spent: number };
    materials: { budgeted: number; spent: number };
    equipment: { budgeted: number; spent: number };
    overhead: { budgeted: number; spent: number };
  };
}

export interface FinancialMetric {
  id: string;
  title: string;
  value: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  status: 'good' | 'warning' | 'critical';
  icon: 'revenue' | 'profit' | 'costs' | 'cash-flow' | 'roi';
}

interface FinancialOverviewProps {
  budgets: ProjectBudget[];
  metrics: FinancialMetric[];
  onProjectClick?: (projectId: string) => void;
  className?: string;
}

const statusConfig = {
  'on-budget': { color: 'bg-green-100 text-green-800', label: 'On Budget' },
  'over-budget': { color: 'bg-red-100 text-red-800', label: 'Over Budget' },
  'at-risk': { color: 'bg-yellow-100 text-yellow-800', label: 'At Risk' },
  'under-budget': { color: 'bg-blue-100 text-blue-800', label: 'Under Budget' }
};

const iconMap = {
  revenue: { icon: DollarSign, color: 'text-green-500' },
  profit: { icon: TrendingUp, color: 'text-blue-500' },
  costs: { icon: Calculator, color: 'text-orange-500' },
  'cash-flow': { icon: Wallet, color: 'text-purple-500' },
  roi: { icon: BarChart3, color: 'text-indigo-500' }
};

export function FinancialOverview({ 
  budgets, 
  metrics, 
  onProjectClick, 
  className = '' 
}: FinancialOverviewProps) {
  const totalBudget = budgets.reduce((sum, b) => sum + b.totalBudget, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spentAmount, 0);
  const totalCommitted = budgets.reduce((sum, b) => sum + b.committedAmount, 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, index) => {
          const iconConfig = iconMap[metric.icon];
          const IconComponent = iconConfig.icon;

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full bg-muted ${iconConfig.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="text-2xl font-bold">{metric.value}</div>

                  {metric.change && (
                    <div className="flex items-center gap-1">
                      {metric.change.type === 'increase' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        metric.change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change.value > 0 ? '+' : ''}{metric.change.value}%
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {metric.change.period}
                      </span>
                    </div>
                  )}

                  <Badge 
                    variant="outline" 
                    className={
                      metric.status === 'good' ? 'bg-green-100 text-green-800' :
                      metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {metric.status.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Budget Overview Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Portfolio Budget Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Budget</span>
                <span className="font-medium">${totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Spent</span>
                <span className="font-medium text-red-600">${totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Committed</span>
                <span className="font-medium text-yellow-600">${totalCommitted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span className="font-medium text-green-600">
                  ${(totalBudget - totalSpent - totalCommitted).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Budget Utilization</span>
                  <span>{((totalSpent / totalBudget) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Committed</span>
                  <span>{(((totalSpent + totalCommitted) / totalBudget) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={((totalSpent + totalCommitted) / totalBudget) * 100} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Budget Status</div>
              <div className="space-y-1">
                {Object.entries(
                  budgets.reduce((acc, budget) => {
                    acc[budget.status] = (acc[budget.status] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([status, count]) => (
                  <div key={status} className="flex justify-between text-sm">
                    <Badge variant="outline" className={statusConfig[status as keyof typeof statusConfig].color}>
                      {statusConfig[status as keyof typeof statusConfig].label}
                    </Badge>
                    <span>{count} projects</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Budget Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Project Budget Details
            </CardTitle>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgets.map((budget, index) => {
              const spentPercentage = (budget.spentAmount / budget.totalBudget) * 100;
              const statusInfo = statusConfig[budget.status];

              return (
                <motion.div
                  key={budget.projectId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className="p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => onProjectClick?.(budget.projectId)}
                  >
                    <div className="space-y-4">
                      {/* Project header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{budget.projectName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {budget.currency}{budget.totalBudget.toLocaleString()} total budget
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={statusInfo.color}>
                            {statusInfo.label}
                          </Badge>
                          {budget.variance !== 0 && (
                            <Badge variant="outline" className={
                              budget.variance > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }>
                              {budget.variance > 0 ? '+' : ''}{budget.variance.toFixed(1)}%
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Budget progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Budget Used</span>
                          <span className="font-medium">{spentPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={spentPercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Spent: {budget.currency}{budget.spentAmount.toLocaleString()}</span>
                          <span>Remaining: {budget.currency}{budget.remainingBudget.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Category breakdown */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {Object.entries(budget.categories).map(([category, amounts]) => {
                          const categorySpent = (amounts.spent / amounts.budgeted) * 100;
                          return (
                            <div key={category} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="capitalize text-muted-foreground">{category}</span>
                                <span className="font-medium">{categorySpent.toFixed(0)}%</span>
                              </div>
                              <Progress value={categorySpent} className="h-1" />
                              <div className="text-xs text-muted-foreground">
                                {budget.currency}{amounts.spent.toLocaleString()} / {budget.currency}{amounts.budgeted.toLocaleString()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sample financial data
export const sampleFinancialMetrics: FinancialMetric[] = [
  {
    id: 'total-revenue',
    title: 'Total Revenue',
    value: '$2.4M',
    change: { value: 12, type: 'increase', period: 'this quarter' },
    status: 'good',
    icon: 'revenue'
  },
  {
    id: 'gross-profit',
    title: 'Gross Profit',
    value: '$480K',
    change: { value: 8, type: 'increase', period: 'this quarter' },
    status: 'good',
    icon: 'profit'
  },
  {
    id: 'total-costs',
    title: 'Total Costs',
    value: '$1.92M',
    change: { value: 15, type: 'increase', period: 'this quarter' },
    status: 'warning',
    icon: 'costs'
  },
  {
    id: 'cash-flow',
    title: 'Cash Flow',
    value: '$320K',
    change: { value: 5, type: 'decrease', period: 'this month' },
    status: 'warning',
    icon: 'cash-flow'
  },
  {
    id: 'roi',
    title: 'ROI',
    value: '18.5%',
    change: { value: 2, type: 'increase', period: 'this quarter' },
    status: 'good',
    icon: 'roi'
  }
];

export const sampleProjectBudgets: ProjectBudget[] = [
  {
    projectId: 'project-alpha',
    projectName: 'Residential Tower A',
    totalBudget: 850000,
    spentAmount: 680000,
    committedAmount: 120000,
    remainingBudget: 50000,
    currency: '$',
    status: 'at-risk',
    variance: 5.2,
    categories: {
      labor: { budgeted: 340000, spent: 295000 },
      materials: { budgeted: 340000, spent: 280000 },
      equipment: { budgeted: 85000, spent: 70000 },
      overhead: { budgeted: 85000, spent: 35000 }
    }
  },
  {
    projectId: 'project-beta',
    projectName: 'Commercial Plaza',
    totalBudget: 1200000,
    spentAmount: 720000,
    committedAmount: 200000,
    remainingBudget: 280000,
    currency: '$',
    status: 'on-budget',
    variance: -2.1,
    categories: {
      labor: { budgeted: 480000, spent: 320000 },
      materials: { budgeted: 480000, spent: 280000 },
      equipment: { budgeted: 120000, spent: 80000 },
      overhead: { budgeted: 120000, spent: 40000 }
    }
  },
  {
    projectId: 'project-gamma',
    projectName: 'Infrastructure Bridge',
    totalBudget: 2500000,
    spentAmount: 1800000,
    committedAmount: 500000,
    remainingBudget: 200000,
    currency: '$',
    status: 'over-budget',
    variance: 12.8,
    categories: {
      labor: { budgeted: 1000000, spent: 850000 },
      materials: { budgeted: 1000000, spent: 720000 },
      equipment: { budgeted: 250000, spent: 150000 },
      overhead: { budgeted: 250000, spent: 80000 }
    }
  }
];
