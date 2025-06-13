
'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Briefcase, CalendarDays, ListChecks, DraftingCompass, Box, Users, DollarSign, Building, Layers, Wand2, Mail, Phone, MapPin, Twitter, Facebook, Linkedin, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const commandCenterSections = [
  {
    icon: <CalendarDays className="h-8 w-8 text-primary" />,
    title: 'Strategic Planning & Scheduling',
    description: "Lay the groundwork for success with robust planning tools. Create detailed project timelines, define critical milestones, and visualize dependencies with interactive Gantt charts. Ensure your project stays on track from day one.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "gantt chart planning"
  },
  {
    icon: <ListChecks className="h-8 w-8 text-primary" />,
    title: 'Dynamic Task Management',
    description: "Break down complex projects into manageable tasks. Assign responsibilities, set deadlines, track progress in real-time, and manage dependencies. Foster accountability and transparency across your entire team.",
    image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "task list collaboration"
  },
  {
    icon: <DraftingCompass className="h-8 w-8 text-primary" />,
    title: 'Advanced 2D/3D Model Control',
    description: "Bring your designs to life. View, annotate, and (with advanced modules) edit 2D blueprints and 3D BIM models directly within OrgCentral. Facilitate clash detection, streamline design reviews, and ensure all stakeholders are working with the latest revisions.",
    image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "3d model architecture"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Efficient Resource Allocation',
    description: "Optimize your most valuable assets. Manage your workforce, equipment, and materials effectively. Track availability, assign resources to tasks, and prevent overallocation to keep your project running smoothly and cost-effectively.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "team resource planning"
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: 'Integrated Financial Oversight',
    description: "Keep a firm grip on project financials. Track budgets, manage expenses, oversee invoicing, and monitor profitability in real-time. Make informed financial decisions to ensure your projects are not just completed, but are also profitable.",
    image: "https://images.unsplash.com/photo-1554224155-169544351742?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dataAiHint: "financial chart construction"
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


export default function ProjectCommandCenterPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MainHeader />
      <main className="flex-1">
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={itemVariants} className="inline-block p-4 bg-primary/10 rounded-full mb-6">
               <Briefcase className="h-16 w-16 text-primary" />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline"
              variants={itemVariants}
            >
              The Ultimate Project Command Center
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              OrgCentral unifies every critical aspect of construction project management into a single, intuitive platform. From initial blueprint to final build, gain unparalleled control and visibility.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/register">Experience the Command Center – Request Demo</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {commandCenterSections.map((section, index) => (
          <motion.section
            key={section.title}
            className={`py-12 sm:py-16 ${index % 2 === 0 ? 'bg-background' : 'bg-slate-50'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <div className="container mx-auto px-4">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense md:grid-cols-2 [grid-template-areas:_"text_image"]' : ''}`}>
                 <motion.div className={`${index % 2 !== 0 ? 'md:[grid-area:image]' : ''}`} variants={itemVariants}>
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[3/2]"
                    data-ai-hint={section.dataAiHint}
                  />
                </motion.div>
                <motion.div className={`${index % 2 !== 0 ? 'md:[grid-area:text]' : ''}`} variants={itemVariants}>
                  <div className="flex items-center gap-3 mb-3">
                    {section.icon}
                    <h2 className="text-2xl font-semibold text-foreground sm:text-3xl font-headline">{section.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-md">
                    {section.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}
        
        <motion.section
          className="py-16 sm:py-20 bg-primary text-primary-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-6">
              Ready to Take Command of Your Construction Projects?
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-xl mx-auto mb-8">
              Stop juggling multiple tools. OrgCentral brings everything you need into one place, empowering you to deliver projects on time and on budget.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button size="lg" variant="secondary" asChild className="bg-background text-primary hover:bg-background/90">
                <Link href="/register">Get Started with OrgCentral</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

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

    