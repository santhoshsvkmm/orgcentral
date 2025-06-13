
'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Briefcase, ShieldCheck, Brain, Handshake, Building, Layers, Wand2, Mail, Phone, MapPin, Twitter, Facebook, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const detailedFeaturesData = [
  {
    id: 'project-command-center',
    icon: <Briefcase className="h-12 w-12 text-primary" />,
    title: 'Unified Project Command Center',
    subtitle: 'From Blueprint to Build – Total Control Over Your Construction Projects.',
    description: "OrgCentral provides a comprehensive suite to manage every phase of your construction projects. Plan and schedule with intuitive Gantt charts and milestone tracking. Assign and monitor tasks with clarity. Seamlessly integrate and manage 2D blueprints and complex 3D BIM models with built-in viewing, annotation, and editing capabilities. Allocate resources effectively, track equipment, and oversee project financials, all from a single, powerful dashboard. Reduce risks, eliminate silos, and ensure every project stakeholder is aligned from groundbreaking to handover.",
    image: "https://images.unsplash.com/photo-1581092917144-438ab4916134?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "construction planning blueprint"
  },
  {
    id: 'team-access-control',
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: 'Precision Team & Access Control',
    subtitle: 'Empower Your Crew, Protect Your Data – Granular Permissions for Every Role.',
    description: "Define precise roles and permissions for every member of your construction ecosystem. Whether it's site supervisors needing access to daily logs and RFI management, office staff managing contracts and financials, or clients viewing progress reports, OrgCentral ensures secure, role-based access. Our detailed permissions system allows you to control who sees and does what, down to specific modules and actions, safeguarding sensitive project information and maintaining clear lines of responsibility.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "construction team security"
  },
  {
    id: 'ai-site-intelligence',
    icon: <Brain className="h-12 w-12 text-primary" />,
    title: 'AI-Driven Site Intelligence',
    subtitle: 'Build with Insight – Leverage AI to Keep Projects On Time & On Budget.',
    description: "OrgCentral's AI engine works as your intelligent assistant. Get AI-powered suggestions for user roles based on job descriptions, ensuring the right people have the right access from day one. Our AI proactively analyzes project data, including tasks, schedules, and RFIs, to identify potential critical issues, bottlenecks, and risks before they escalate. Make data-driven decisions, optimize resource allocation, and improve project outcomes with actionable insights delivered by our intelligent platform.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "AI construction analysis"
  },
  {
    id: 'stakeholder-collaboration',
    icon: <Handshake className="h-12 w-12 text-primary" />,
    title: 'Seamless Stakeholder Collaboration',
    subtitle: 'Connect Your Entire Construction Ecosystem – From Clients to Subcontractors.',
    description: "Effective communication is key to successful construction projects. OrgCentral streamlines collaboration across your entire network. Provide dedicated portals for clients to track progress and access relevant documents. Facilitate efficient communication with architects and consultants through centralized RFI management and shared 2D/3D models. Onboard and manage subcontractors with clear project mappings, service agreements, and communication channels. Ensure everyone is on the same page, reducing misunderstandings and delays.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "construction collaboration meeting"
  }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function FeaturesDetailedPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MainHeader />
      <main className="flex-1">
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline"
              variants={itemVariants}
            >
              OrgCentral: In-Depth Features
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              Explore how OrgCentral's powerful, construction-focused features streamline every aspect of your projects, from initial planning to final handover, ensuring efficiency, collaboration, and profitability.
            </motion.p>
          </div>
        </motion.section>

        {detailedFeaturesData.map((feature, index) => (
          <motion.section
            key={feature.id}
            id={feature.id}
            className={`py-16 sm:py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-slate-50'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <div className="container mx-auto px-4">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${index % 2 === 0 ? '' : 'md:grid-flow-row-dense md:grid-cols-2 [grid-template-areas:_"text_image"]'}`}>
                <motion.div className={`${index % 2 === 0 ? '' : 'md:[grid-area:text]'}`} variants={itemVariants}>
                  <div className="mb-4 flex items-center gap-3">
                    {feature.icon}
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">{feature.title}</h2>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">{feature.subtitle}</h3>
                  <p className="text-muted-foreground leading-relaxed text-md">
                    {feature.description}
                  </p>
                  <Button size="lg" asChild className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/register">Learn More & Request Demo</Link>
                  </Button>
                </motion.div>
                <motion.div className={`${index % 2 === 0 ? '' : 'md:[grid-area:image]'}`} variants={itemVariants}>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={450}
                    className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/3]"
                    data-ai-hint={feature.dataAiHint}
                  />
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}
      </main>

      {/* Footer (Copied from src/app/page.tsx for consistency) */}
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
              { title: 'Explore', links: [
                  {label: 'Detailed Features', href: '/features-detailed'}, 
                  {label: 'AI in Construction', href: '/ai-in-construction'}, 
                  {label: 'Project Command Center', href: '/solutions/project-command-center'}, 
                  {label: 'Pricing', href: '/#pricing'}, 
                  {label: 'Request Demo', href: '/register'}
                ] 
              },
              { title: 'Company', links: [{label: 'About Us', href: '#'}, {label: 'Contact Sales', href: '/#contact-us'}, {label: 'Careers', href: '#'}] },
              { title: 'Resources', links: [{label: 'Case Studies', href: '#'}, {label: 'Help Center', href: '#'}, {label: 'API Documentation', href: '#'}] }
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
              <Link href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link href="#" className="hover:text-primary hover:underline">Privacy Policy</Link>
              <span className="mx-2">|</span>
              <Link href="#" className="hover:text-primary hover:underline">Terms of Service</Link>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

    