'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Briefcase, 
  Home, 
  Factory, 
  Hammer, 
  Truck, 
  ArrowRight,
  CheckCircle,
  Users,
  DollarSign,
  Clock,
  Shield,
  Twitter,
  Linkedin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const solutions = [
  {
    icon: <Briefcase className="h-12 w-12 text-primary" />,
    title: 'Project Command Center',
    description: 'Complete project management solution with planning, scheduling, resource management, and real-time collaboration.',
    features: ['Gantt Chart Planning', 'Resource Allocation', 'Team Collaboration', 'Financial Tracking'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/solutions/project-command-center',
    badge: 'Most Popular'
  },
  {
    icon: <Home className="h-12 w-12 text-primary" />,
    title: 'Residential Construction',
    description: 'Specialized tools for residential builders, from single homes to large developments.',
    features: ['Custom Home Planning', 'Permit Tracking', 'Subcontractor Management', 'Client Communication'],
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/solutions/residential',
    badge: null
  },
  {
    icon: <Building className="h-12 w-12 text-primary" />,
    title: 'Commercial Construction',
    description: 'Enterprise-grade solution for large commercial and institutional construction projects.',
    features: ['Multi-Project Management', 'Compliance Tracking', 'Advanced Reporting', 'Stakeholder Portals'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/solutions/commercial',
    badge: null
  },
  {
    icon: <Factory className="h-12 w-12 text-primary" />,
    title: 'Infrastructure & Civil',
    description: 'Purpose-built for infrastructure projects including roads, bridges, and utilities.',
    features: ['GIS Integration', 'Environmental Compliance', 'Public Coordination', 'Long-term Planning'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/solutions/infrastructure',
    badge: null
  },
  {
    icon: <Hammer className="h-12 w-12 text-primary" />,
    title: 'Specialty Contractors',
    description: 'Tailored solutions for electrical, plumbing, HVAC, and other specialty trade contractors.',
    features: ['Trade-Specific Tools', 'Material Tracking', 'Service Scheduling', 'Mobile Workforce'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/solutions/specialty',
    badge: null
  },
  {
    icon: <Truck className="h-12 w-12 text-primary" />,
    title: 'Equipment & Fleet Management',
    description: 'Comprehensive equipment tracking, maintenance scheduling, and fleet optimization.',
    features: ['Asset Tracking', 'Maintenance Scheduling', 'Utilization Analytics', 'Cost Management'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/solutions/equipment',
    badge: null
  }
];

const industryStats = [
  { number: '10,000+', label: 'Projects Managed', icon: <Briefcase className="h-6 w-6" /> },
  { number: '500+', label: 'Companies Trust Us', icon: <Building className="h-6 w-6" /> },
  { number: '25%', label: 'Average Time Savings', icon: <Clock className="h-6 w-6" /> },
  { number: '15%', label: 'Cost Reduction', icon: <DollarSign className="h-6 w-6" /> }
];

const benefits = [
  {
    title: 'Unified Platform',
    description: 'All your construction management needs in one integrated solution.',
    icon: <Shield className="h-8 w-8 text-primary" />
  },
  {
    title: 'Industry Expertise',
    description: 'Built by construction professionals who understand your challenges.',
    icon: <Users className="h-8 w-8 text-primary" />
  },
  {
    title: 'Scalable Solutions',
    description: 'Grows with your business from small projects to enterprise operations.',
    icon: <Building className="h-8 w-8 text-primary" />
  },
  {
    title: 'Proven Results',
    description: 'Thousands of successful projects delivered on time and within budget.',
    icon: <CheckCircle className="h-8 w-8 text-primary" />
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

export default function SolutionsPage() {
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
              Solutions for Every Construction Need
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              Whether you're building homes, commercial properties, or infrastructure projects, OrgCentral has the specialized tools and expertise to help you succeed.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">Find Your Solution</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Industry Stats */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {industryStats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Solutions Grid */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Choose Your Solution</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized solutions designed for different types of construction projects and business needs.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
                    {solution.badge && (
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                        {solution.badge}
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="mb-4">
                        <Image
                          src={solution.image}
                          alt={solution.title}
                          width={400}
                          height={200}
                          className="rounded-lg object-cover w-full h-48"
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        {solution.icon}
                        <CardTitle className="font-headline">{solution.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 flex-1">{solution.description}</p>
                      <div className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button asChild className="w-full">
                        <Link href={solution.href}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Why Choose OrgCentral Solutions?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our solutions are built on years of construction industry experience and cutting-edge technology.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {benefit.icon}
                      </div>
                      <CardTitle className="font-headline">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Implementation Process */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Simple Implementation Process</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Get up and running quickly with our proven implementation methodology.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Discovery & Planning',
                  description: 'We analyze your current processes and design a customized solution that fits your specific needs.'
                },
                {
                  step: '2',
                  title: 'Setup & Configuration',
                  description: 'Our experts configure the platform, migrate your data, and set up integrations with your existing tools.'
                },
                {
                  step: '3',
                  title: 'Training & Go-Live',
                  description: 'Comprehensive training for your team and ongoing support to ensure successful adoption and maximum ROI.'
                }
              ].map((process, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                        {process.step}
                      </div>
                      <CardTitle className="font-headline">{process.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{process.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              Ready to Find Your Perfect Solution?
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-xl mx-auto mb-8">
              Let our experts help you choose the right solution for your construction business and get you started today.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-background text-primary hover:bg-background/90">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/register">Start Free Trial</Link>
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
              { title: 'Solutions', links: [
                  {label: 'Project Command Center', href: '/solutions/project-command-center'}, 
                  {label: 'Residential', href: '/solutions/residential'}, 
                  {label: 'Commercial', href: '/solutions/commercial'}, 
                  {label: 'Infrastructure', href: '/solutions/infrastructure'}
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