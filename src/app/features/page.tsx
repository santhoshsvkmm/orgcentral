'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Calendar, 
  Users, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Cloud, 
  Zap, 
  CheckCircle,
  Brain,
  Settings,
  Globe,
  Lock,
  Twitter,
  Linkedin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const featureCategories = [
  {
    title: 'Project Management',
    description: 'Complete project lifecycle management from planning to delivery',
    icon: <Calendar className="h-8 w-8 text-primary" />,
    features: [
      {
        name: 'Interactive Gantt Charts',
        description: 'Visual project timelines with drag-and-drop scheduling',
        icon: <Calendar className="h-5 w-5" />
      },
      {
        name: 'Task Management',
        description: 'Assign, track, and manage tasks across your entire team',
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        name: 'Milestone Tracking',
        description: 'Set and monitor critical project milestones',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        name: 'Resource Planning',
        description: 'Optimize resource allocation and prevent conflicts',
        icon: <Users className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Team Collaboration',
    description: 'Keep everyone connected and informed throughout the project',
    icon: <Users className="h-8 w-8 text-primary" />,
    features: [
      {
        name: 'Real-time Chat',
        description: 'Instant messaging for quick team communication',
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        name: 'Document Sharing',
        description: 'Centralized file storage with version control',
        icon: <FileText className="h-5 w-5" />
      },
      {
        name: 'Team Dashboards',
        description: 'Personalized views for different team roles',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        name: 'Client Portals',
        description: 'Secure access for clients to track project progress',
        icon: <Globe className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Financial Management',
    description: 'Complete financial oversight and budget control',
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    features: [
      {
        name: 'Budget Tracking',
        description: 'Real-time budget monitoring and variance analysis',
        icon: <DollarSign className="h-5 w-5" />
      },
      {
        name: 'Cost Control',
        description: 'Track expenses and prevent budget overruns',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        name: 'Invoice Management',
        description: 'Automated invoicing and payment tracking',
        icon: <FileText className="h-5 w-5" />
      },
      {
        name: 'Profitability Analysis',
        description: 'Detailed profit and loss reporting by project',
        icon: <BarChart3 className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'AI & Automation',
    description: 'Intelligent features that learn and optimize your workflows',
    icon: <Brain className="h-8 w-8 text-primary" />,
    features: [
      {
        name: 'Predictive Analytics',
        description: 'AI-powered insights for better decision making',
        icon: <Brain className="h-5 w-5" />
      },
      {
        name: 'Risk Detection',
        description: 'Early warning system for potential project issues',
        icon: <Shield className="h-5 w-5" />
      },
      {
        name: 'Smart Scheduling',
        description: 'AI-optimized resource and timeline planning',
        icon: <Calendar className="h-5 w-5" />
      },
      {
        name: 'Automated Reporting',
        description: 'Generate reports automatically based on project data',
        icon: <FileText className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Platform & Security',
    description: 'Enterprise-grade platform built for reliability and security',
    icon: <Shield className="h-8 w-8 text-primary" />,
    features: [
      {
        name: 'Cloud-Based',
        description: 'Access from anywhere with secure cloud infrastructure',
        icon: <Cloud className="h-5 w-5" />
      },
      {
        name: 'Mobile Apps',
        description: 'Native iOS and Android apps for field teams',
        icon: <Smartphone className="h-5 w-5" />
      },
      {
        name: 'Enterprise Security',
        description: 'SOC 2 compliance with bank-level encryption',
        icon: <Lock className="h-5 w-5" />
      },
      {
        name: 'API Integration',
        description: 'Connect with your existing tools and systems',
        icon: <Settings className="h-5 w-5" />
      }
    ]
  }
];

const platformHighlights = [
  {
    title: 'All-in-One Platform',
    description: 'Everything you need for construction project management in one integrated solution.',
    icon: <Building className="h-12 w-12 text-primary" />
  },
  {
    title: 'Industry Expertise',
    description: 'Built by construction professionals who understand your unique challenges.',
    icon: <Users className="h-12 w-12 text-primary" />
  },
  {
    title: 'Scalable Solution',
    description: 'Grows with your business from small projects to enterprise operations.',
    icon: <Zap className="h-12 w-12 text-primary" />
  }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MainHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={itemVariants} className="inline-block p-4 bg-primary/10 rounded-full mb-6">
              <Building className="h-16 w-16 text-primary" />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline"
              variants={itemVariants}
            >
              Powerful Features for Construction Excellence
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              Discover the comprehensive set of tools and capabilities that make OrgCentral the leading choice for construction project management.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/register">Try All Features Free</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Platform Highlights */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Why Choose OrgCentral?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Built specifically for the construction industry with the features and reliability you need.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {platformHighlights.map((highlight, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {highlight.icon}
                      </div>
                      <CardTitle className="font-headline text-xl">{highlight.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{highlight.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Feature Categories */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Complete Feature Set</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Every tool you need to manage construction projects efficiently, organized by category.
              </p>
            </motion.div>
            <div className="space-y-16">
              {featureCategories.map((category, categoryIndex) => (
                <motion.div key={categoryIndex} variants={itemVariants}>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      {category.icon}
                      <h3 className="text-2xl font-bold text-foreground font-headline">{category.title}</h3>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {category.features.map((feature, featureIndex) => (
                      <Card key={featureIndex} className="h-full">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              {feature.icon}
                            </div>
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Integration Section */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-6">
                  Seamless Integrations
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  OrgCentral integrates with the tools you already use, creating a unified workflow that eliminates data silos and reduces manual work.
                </p>
                <div className="space-y-4">
                  {[
                    'Accounting software (QuickBooks, Sage, etc.)',
                    'CAD and BIM tools (AutoCAD, Revit, etc.)',
                    'Communication platforms (Slack, Microsoft Teams)',
                    'File storage services (Google Drive, Dropbox)',
                    'Time tracking and payroll systems'
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{integration}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Request Custom Integration</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Software integrations dashboard"
                  width={600}
                  height={450}
                  className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/3]"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-16 sm:py-20 bg-primary text-primary-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-6">
              Experience All Features Risk-Free
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-xl mx-auto mb-8">
              Start your 14-day free trial and discover how OrgCentral's comprehensive feature set can transform your construction projects.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-background text-primary hover:bg-background/90">
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/solutions/project-command-center">View Demo</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="border-t bg-gray-50 text-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            <motion.div 
              className="col-span-2 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-2">
                <Building className="h-7 w-7" />
                <span>OrgCentral</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Empowering construction excellence with integrated project management, powered by AI.
              </p>
            </motion.div>
            {[
              { title: 'Products', links: [
                  {label: 'All Features', href: '/features'}, 
                  {label: 'AI Features', href: '/ai-in-construction'}, 
                  {label: 'Solutions', href: '/solutions'}, 
                  {label: 'Pricing', href: '/pricing'}
                ] 
              },
              { title: 'Company', links: [
                {label: 'About Us', href: '/about'}, 
                {label: 'Contact', href: '/contact'}, 
                {label: 'Careers', href: '/careers'},
                {label: 'Press', href: '/press'}
              ] },
              { title: 'Resources', links: [
                {label: 'Case Studies', href: '/case-studies'}, 
                {label: 'Help Center', href: '/help'}, 
                {label: 'API Docs', href: '/api-docs'},
                {label: 'Blog', href: '/blog'}
              ] }
            ].map((column, colIndex) => (
              <motion.div 
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + colIndex * 0.1 }}
              >
                <h5 className="font-semibold mb-3 text-foreground">{column.title}</h5>
                <ul className="space-y-2 text-sm">
                  {column.links.map(link => (
                     <li key={link.label}><Link href={link.href} className="hover:text-primary hover:underline">{link.label}</Link></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p>&copy; {currentYear || new Date().getFullYear()} OrgCentral. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link href="/privacy" className="hover:text-primary hover:underline">Privacy Policy</Link>
              <span className="mx-2">|</span>
              <Link href="/terms" className="hover:text-primary hover:underline">Terms of Service</Link>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}