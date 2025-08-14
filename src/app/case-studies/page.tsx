'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle,
  ArrowRight,
  Quote,
  Twitter,
  Linkedin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const caseStudies = [
  {
    title: 'Metro Commercial Complex',
    company: 'BuildCorp Construction',
    industry: 'Commercial',
    projectValue: '$45M',
    duration: '18 months',
    teamSize: '150+ workers',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    challenge: 'Managing a complex multi-phase commercial development with tight deadlines and multiple stakeholders.',
    solution: 'Implemented OrgCentral\'s Project Command Center with advanced scheduling and stakeholder portals.',
    results: [
      { metric: '25%', description: 'Faster project completion' },
      { metric: '$2.3M', description: 'Cost savings achieved' },
      { metric: '40%', description: 'Reduction in change orders' },
      { metric: '95%', description: 'On-time milestone delivery' }
    ],
    testimonial: {
      quote: 'OrgCentral transformed how we manage large commercial projects. The visibility and control we gained was game-changing.',
      author: 'Sarah Johnson',
      role: 'Project Director, BuildCorp Construction'
    },
    featured: true
  },
  {
    title: 'Riverside Residential Development',
    company: 'Hometown Builders',
    industry: 'Residential',
    projectValue: '$12M',
    duration: '12 months',
    teamSize: '45 workers',
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    challenge: 'Coordinating 50 custom homes with varying specifications while maintaining quality and schedule.',
    solution: 'Used OrgCentral\'s residential-specific tools for custom home planning and subcontractor coordination.',
    results: [
      { metric: '30%', description: 'Improvement in schedule adherence' },
      { metric: '15%', description: 'Reduction in material waste' },
      { metric: '50%', description: 'Faster permit processing' },
      { metric: '98%', description: 'Customer satisfaction rate' }
    ],
    testimonial: {
      quote: 'The custom home planning features helped us deliver each home exactly to spec, on time and within budget.',
      author: 'Mike Rodriguez',
      role: 'Operations Manager, Hometown Builders'
    },
    featured: false
  },
  {
    title: 'Highway Infrastructure Project',
    company: 'Infrastructure Solutions Inc.',
    industry: 'Infrastructure',
    projectValue: '$85M',
    duration: '24 months',
    teamSize: '200+ workers',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    challenge: 'Managing a complex highway expansion with environmental compliance and public coordination requirements.',
    solution: 'Leveraged OrgCentral\'s infrastructure module with GIS integration and compliance tracking.',
    results: [
      { metric: '20%', description: 'Ahead of schedule completion' },
      { metric: '$5M', description: 'Under budget delivery' },
      { metric: '100%', description: 'Environmental compliance' },
      { metric: '0', description: 'Safety incidents' }
    ],
    testimonial: {
      quote: 'The compliance tracking and public coordination features were essential for this complex infrastructure project.',
      author: 'David Chen',
      role: 'Project Manager, Infrastructure Solutions Inc.'
    },
    featured: false
  },
  {
    title: 'Downtown Office Tower',
    company: 'Skyline Construction',
    industry: 'Commercial',
    projectValue: '$120M',
    duration: '30 months',
    teamSize: '300+ workers',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    challenge: 'Constructing a 40-story office tower in a dense urban environment with complex logistics.',
    solution: 'Implemented full OrgCentral Enterprise suite with AI-powered scheduling and resource optimization.',
    results: [
      { metric: '35%', description: 'Improvement in resource utilization' },
      { metric: '$8M', description: 'Cost savings from optimization' },
      { metric: '60%', description: 'Reduction in delays' },
      { metric: '99%', description: 'Quality score achieved' }
    ],
    testimonial: {
      quote: 'The AI-powered insights helped us optimize every aspect of this complex high-rise construction project.',
      author: 'Jennifer Liu',
      role: 'Senior Project Manager, Skyline Construction'
    },
    featured: false
  }
];

const industries = [
  { name: 'All', count: caseStudies.length },
  { name: 'Commercial', count: caseStudies.filter(cs => cs.industry === 'Commercial').length },
  { name: 'Residential', count: caseStudies.filter(cs => cs.industry === 'Residential').length },
  { name: 'Infrastructure', count: caseStudies.filter(cs => cs.industry === 'Infrastructure').length }
];

const overallStats = [
  { number: '500+', label: 'Successful Projects', icon: <Building className="h-6 w-6" /> },
  { number: '$2.5B+', label: 'Project Value Managed', icon: <DollarSign className="h-6 w-6" /> },
  { number: '25%', label: 'Average Time Savings', icon: <Clock className="h-6 w-6" /> },
  { number: '15%', label: 'Average Cost Reduction', icon: <TrendingUp className="h-6 w-6" /> }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CaseStudiesPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const filteredCaseStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

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
              Success Stories
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              See how construction companies across different industries are achieving remarkable results with OrgCentral's comprehensive project management platform.
            </motion.p>
          </div>
        </motion.section>

        {/* Overall Stats */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Proven Results Across Industries</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our customers consistently achieve significant improvements in project delivery and profitability.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {overallStats.map((stat, index) => (
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

        {/* Industry Filter */}
        <motion.section
          className="py-8 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              {industries.map((industry) => (
                <Button
                  key={industry.name}
                  variant={selectedIndustry === industry.name ? 'default' : 'outline'}
                  onClick={() => setSelectedIndustry(industry.name)}
                  className="flex items-center gap-2"
                >
                  {industry.name}
                  <Badge variant="secondary" className="ml-1">
                    {industry.count}
                  </Badge>
                </Button>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Case Studies Grid */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {filteredCaseStudies.map((caseStudy, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="relative">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[3/2]"
                      />
                      {caseStudy.featured && (
                        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                          Featured Case Study
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{caseStudy.industry}</Badge>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{caseStudy.company}</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground font-headline mb-4">
                      {caseStudy.title}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-muted-foreground">Project Value</div>
                        <div className="font-semibold">{caseStudy.projectValue}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold">{caseStudy.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Team Size</div>
                        <div className="font-semibold">{caseStudy.teamSize}</div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                        <p className="text-muted-foreground">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                        <p className="text-muted-foreground">{caseStudy.solution}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {caseStudy.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center p-4 bg-primary/5 rounded-lg">
                          <div className="text-2xl font-bold text-primary mb-1">{result.metric}</div>
                          <div className="text-sm text-muted-foreground">{result.description}</div>
                        </div>
                      ))}
                    </div>

                    <Card className="bg-slate-50 border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <Quote className="h-8 w-8 text-primary mb-4" />
                        <p className="text-muted-foreground italic mb-4">"{caseStudy.testimonial.quote}"</p>
                        <div>
                          <div className="font-semibold">{caseStudy.testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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
              Ready to Write Your Success Story?
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-xl mx-auto mb-8">
              Join hundreds of construction companies that have transformed their project delivery with OrgCentral.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-background text-primary hover:bg-background/90">
                <Link href="/register">Start Your Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/contact">Schedule a Demo</Link>
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