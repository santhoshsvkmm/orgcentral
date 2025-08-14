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
  ArrowRight,
  Star,
  Twitter,
  Linkedin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const productFeatures = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Project Planning & Scheduling',
    description: 'Advanced Gantt charts, milestone tracking, and resource scheduling with AI-powered optimization.',
    features: ['Interactive Gantt Charts', 'Critical Path Analysis', 'Resource Leveling', 'Milestone Tracking'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Team Collaboration',
    description: 'Seamless communication tools, file sharing, and real-time collaboration across all project stakeholders.',
    features: ['Real-time Chat', 'Document Sharing', 'Team Dashboards', 'Mobile Access'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: 'Financial Management',
    description: 'Complete budget tracking, cost control, invoicing, and profitability analysis in one platform.',
    features: ['Budget Tracking', 'Cost Control', 'Invoice Management', 'Profit Analysis'],
    image: 'https://images.unsplash.com/photo-1554224155-169544351742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Document Management',
    description: 'Centralized document storage with version control, approval workflows, and secure access controls.',
    features: ['Version Control', 'Approval Workflows', 'Secure Storage', 'Quick Search'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'Analytics & Reporting',
    description: 'Powerful analytics dashboard with customizable reports and AI-driven insights for better decision making.',
    features: ['Custom Dashboards', 'Automated Reports', 'KPI Tracking', 'Predictive Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: 'RFI & Change Management',
    description: 'Streamlined request for information (RFI) processing and change order management with approval workflows.',
    features: ['RFI Tracking', 'Change Orders', 'Approval Workflows', 'Audit Trails'],
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const platformBenefits = [
  {
    icon: <Cloud className="h-6 w-6 text-primary" />,
    title: 'Cloud-Based',
    description: 'Access your projects from anywhere, anytime with our secure cloud infrastructure.'
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    title: 'Mobile Ready',
    description: 'Native mobile apps for iOS and Android keep your team connected on the go.'
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance and advanced data encryption.'
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'AI-Powered',
    description: 'Intelligent automation and predictive insights to optimize your workflows.'
  }
];

const testimonials = [
  {
    name: 'John Martinez',
    role: 'Project Manager',
    company: 'BuildCorp Construction',
    content: 'OrgCentral has transformed how we manage our projects. The AI insights have helped us prevent delays and stay within budget.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Sarah Williams',
    role: 'Operations Director',
    company: 'Metro Infrastructure',
    content: 'The collaboration features are outstanding. Our teams are more coordinated than ever, and project visibility is incredible.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'CEO',
    company: 'Precision Builders',
    content: 'ROI was evident within the first quarter. OrgCentral pays for itself through improved efficiency and reduced project overruns.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
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

export default function ProductsPage() {
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
              Complete Construction Management Platform
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              Everything you need to plan, execute, and deliver successful construction projects. From initial planning to final delivery, OrgCentral provides the tools and insights to keep your projects on track.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/solutions/project-command-center">View Demo</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Platform Benefits */}
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
                Built specifically for construction professionals, with the features and reliability you need.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformBenefits.map((benefit, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {benefit.icon}
                      </div>
                      <CardTitle className="font-headline text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Product Features */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Comprehensive Feature Set</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Every tool you need to manage construction projects efficiently, all in one integrated platform.
              </p>
            </motion.div>
            <div className="space-y-16">
              {productFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[3/2]"
                    />
                  </div>
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      {feature.icon}
                      <h3 className="text-2xl font-bold text-foreground font-headline">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg mb-6">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.features.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" asChild>
                        <Link href="/solutions/project-command-center">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">What Our Customers Say</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what construction professionals are saying about OrgCentral.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground italic">"{testimonial.content}"</p>
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
              Ready to Transform Your Construction Projects?
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-xl mx-auto mb-8">
              Join thousands of construction professionals who trust OrgCentral to deliver their projects on time and within budget.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-background text-primary hover:bg-background/90">
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/contact">Contact Sales</Link>
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
                  {label: 'Project Management', href: '/products'}, 
                  {label: 'AI Features', href: '/ai-in-construction'}, 
                  {label: 'Command Center', href: '/solutions/project-command-center'}, 
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