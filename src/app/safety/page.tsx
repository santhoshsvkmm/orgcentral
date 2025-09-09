'use client';

import { LandingLayout } from "@/components/layout/landing-layout";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Users,
  TrendingDown,
  Clock,
  Award,
  Eye,
  HardHat
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const safetyMetrics = [
  { label: "Incident Reduction", value: "85%", icon: <TrendingDown className="h-6 w-6" /> },
  { label: "Compliance Rate", value: "99.2%", icon: <CheckCircle className="h-6 w-6" /> },
  { label: "Response Time", value: "< 2min", icon: <Clock className="h-6 w-6" /> },
  { label: "Safety Score", value: "A+", icon: <Award className="h-6 w-6" /> }
];

const safetyFeatures = [
  {
    icon: <Eye className="h-8 w-8 text-primary" />,
    title: "Real-Time Monitoring",
    description: "Continuous monitoring of safety conditions with instant alerts for potential hazards."
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Digital Safety Reports",
    description: "Streamlined incident reporting and documentation with photo and video evidence."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Safety Training Tracking",
    description: "Monitor certification status and schedule required safety training for all workers."
  },
  {
    icon: <HardHat className="h-8 w-8 text-primary" />,
    title: "PPE Compliance",
    description: "Ensure proper personal protective equipment usage across all job sites."
  }
];

const complianceStandards = [
  "OSHA Regulations",
  "ISO 45001 Standards", 
  "Local Building Codes",
  "Environmental Safety",
  "Worker Safety Rights"
];

export default function SafetyCenterPage() {
  return (
    <LandingLayout>
      <PageTitle 
        title="Safety Center" 
        description="Comprehensive safety management and compliance tracking for construction sites." 
      />
      
      <div className="space-y-8 md:space-y-12">
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green-100 text-green-800">Safety First</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Protect Your Workers, Protect Your Business
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                OrgCentral's Safety Center provides comprehensive tools to monitor, manage, and 
                maintain the highest safety standards across all your construction projects.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Safety Assessment
                </Button>
                <Button variant="outline" size="lg">
                  View Safety Dashboard
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Construction workers wearing safety equipment"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {safetyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <div className="flex justify-center mb-3 text-green-600">
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <Tabs defaultValue="features" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Safety Features</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="reporting">Reporting</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Advanced Safety Features</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive safety management tools designed for modern construction sites.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {safetyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mb-4">{feature.icon}</div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Regulatory Compliance</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Stay compliant with all relevant safety regulations and standards. 
                    Our system automatically tracks requirements and alerts you to any compliance gaps.
                  </p>
                  <ul className="space-y-3">
                    {complianceStandards.map((standard, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{standard}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Card className="p-6">
                  <div className="text-center">
                    <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Compliance Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Real-time compliance monitoring across all projects
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      View Compliance Status
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reporting" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Safety Reporting & Analytics</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive reporting tools to track safety performance and identify improvement opportunities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <Card className="p-6">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Incident Reports</h3>
                  <p className="text-muted-foreground mb-4">
                    Digital incident reporting with photo documentation and follow-up tracking.
                  </p>
                  <Button variant="outline" className="w-full">Create Report</Button>
                </Card>
                
                <Card className="p-6">
                  <FileText className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Safety Audits</h3>
                  <p className="text-muted-foreground mb-4">
                    Scheduled safety inspections with customizable checklists and scoring.
                  </p>
                  <Button variant="outline" className="w-full">Schedule Audit</Button>
                </Card>
                
                <Card className="p-6">
                  <Users className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Training Records</h3>
                  <p className="text-muted-foreground mb-4">
                    Track safety training completion and certification renewals.
                  </p>
                  <Button variant="outline" className="w-full">View Records</Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="text-center bg-green-50 rounded-lg p-12">
          <Shield className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Make Safety Your Competitive Advantage</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Reduce incidents, improve compliance, and create a culture of safety that protects your workers and your business.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Get Started with Safety Center
          </Button>
        </section>
      </div>
    </LandingLayout>
  );
}