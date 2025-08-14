'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Target, Award, Lightbulb, Shield, TrendingUp, Heart, Twitter, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: '15+ years in construction management and technology innovation.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Former software architect with expertise in AI and construction tech.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Emily Rodriguez',
    role: 'VP of Product',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Product strategist with deep understanding of construction workflows.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'David Thompson',
    role: 'VP of Engineering',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Engineering leader focused on scalable, reliable construction solutions.',
    linkedin: '#',
    twitter: '#'
  }
];

const values = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Innovation First',
    description: 'We continuously push the boundaries of what\'s possible in construction technology, integrating cutting-edge AI and automation.'
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Customer-Centric',
    description: 'Every feature we build is designed with our users in mind, solving real problems faced by construction professionals daily.'
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Reliability & Security',
    description: 'We understand that construction projects can\'t afford downtime. Our platform is built for enterprise-grade reliability and security.'
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Integrity',
    description: 'We believe in transparent communication, honest pricing, and building long-term partnerships with our clients.'
  }
];

const milestones = [
  { year: '2019', title: 'Company Founded', description: 'Started with a vision to revolutionize construction project management' },
  { year: '2020', title: 'First Product Launch', description: 'Released our core project management platform to early adopters' },
  { year: '2021', title: 'AI Integration', description: 'Introduced AI-powered features for predictive analytics and automation' },
  { year: '2022', title: 'Series A Funding', description: 'Raised $15M to accelerate product development and market expansion' },
  { year: '2023', title: '10,000+ Projects', description: 'Reached milestone of managing over 10,000 construction projects' },
  { year: '2024', title: 'Global Expansion', description: 'Expanded operations to serve construction companies worldwide' }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
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
              Building the Future of Construction
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              At OrgCentral, we're passionate about empowering construction professionals with intelligent tools that streamline workflows, enhance collaboration, and drive project success.
            </motion.p>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    OrgCentral was born from firsthand experience with the challenges facing the construction industry. Our founders, having worked in construction management for over a decade, witnessed the inefficiencies caused by fragmented tools, poor communication, and lack of real-time visibility.
                  </p>
                  <p>
                    In 2019, we set out to create a unified platform that would address these pain points. Today, OrgCentral serves thousands of construction professionals worldwide, helping them deliver projects on time, within budget, and with unprecedented efficiency.
                  </p>
                  <p>
                    Our mission is simple: to revolutionize how construction projects are managed by leveraging the power of artificial intelligence, intuitive design, and deep industry expertise.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Image
                  src="https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Construction team collaboration"
                  width={600}
                  height={450}
                  className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/3]"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Our Values</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do and shape how we build products and serve our customers.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {value.icon}
                      </div>
                      <CardTitle className="font-headline">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Our Journey</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                From startup to industry leader, here are the key milestones that have shaped OrgCentral.
              </p>
            </motion.div>
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start mb-8 last:mb-0"
                >
                  <div className="flex-shrink-0 w-20 text-right mr-8">
                    <Badge variant="outline" className="text-primary border-primary">
                      {milestone.year}
                    </Badge>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-1 mr-8 relative">
                    {index < milestones.length - 1 && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-primary/30"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Meet Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind OrgCentral, bringing together decades of construction and technology expertise.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={120}
                          height={120}
                          className="rounded-full object-cover w-30 h-30"
                        />
                      </div>
                      <CardTitle className="font-headline">{member.name}</CardTitle>
                      <p className="text-primary font-medium">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                      <div className="flex justify-center space-x-3">
                        <Link href={member.linkedin} className="text-muted-foreground hover:text-primary">
                          <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link href={member.twitter} className="text-muted-foreground hover:text-primary">
                          <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="mailto:contact@orgcentral.com" className="text-muted-foreground hover:text-primary">
                          <Mail className="h-5 w-5" />
                        </Link>
                      </div>
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
              Join thousands of construction professionals who trust OrgCentral to deliver their projects successfully.
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