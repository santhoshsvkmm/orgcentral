'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Building, 
  Search, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Phone,
  Mail,
  FileText,
  Users,
  Settings,
  HelpCircle,
  Twitter,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of OrgCentral',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    articles: [
      'Setting up your first project',
      'Inviting team members',
      'Understanding the dashboard',
      'Basic navigation guide'
    ]
  },
  {
    title: 'Project Management',
    description: 'Master project planning and execution',
    icon: <Settings className="h-8 w-8 text-primary" />,
    articles: [
      'Creating Gantt charts',
      'Managing tasks and milestones',
      'Resource allocation',
      'Progress tracking'
    ]
  },
  {
    title: 'Team Collaboration',
    description: 'Work effectively with your team',
    icon: <Users className="h-8 w-8 text-primary" />,
    articles: [
      'Using team chat features',
      'Sharing documents',
      'Setting up client portals',
      'Managing permissions'
    ]
  },
  {
    title: 'Financial Management',
    description: 'Track budgets and costs',
    icon: <FileText className="h-8 w-8 text-primary" />,
    articles: [
      'Setting up project budgets',
      'Tracking expenses',
      'Generating invoices',
      'Financial reporting'
    ]
  }
];

const supportOptions = [
  {
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    icon: <MessageCircle className="h-6 w-6 text-primary" />,
    availability: 'Mon-Fri, 9AM-5PM EST',
    action: 'Start Chat'
  },
  {
    title: 'Phone Support',
    description: 'Speak directly with our experts',
    icon: <Phone className="h-6 w-6 text-primary" />,
    availability: 'Mon-Fri, 8AM-6PM EST',
    action: 'Call Now'
  },
  {
    title: 'Email Support',
    description: 'Send us your questions via email',
    icon: <Mail className="h-6 w-6 text-primary" />,
    availability: 'Response within 24 hours',
    action: 'Send Email'
  }
];

const popularArticles = [
  'How to create your first project',
  'Setting up team permissions',
  'Understanding project dashboards',
  'Integrating with other tools',
  'Mobile app setup guide',
  'Troubleshooting common issues'
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HelpPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
              <HelpCircle className="h-16 w-16 text-primary" />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline"
              variants={itemVariants}
            >
              How Can We Help?
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              Find answers to your questions, learn how to use OrgCentral effectively, and get the support you need to succeed.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div variants={itemVariants} className="mt-10 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for help articles, guides, and tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Help Categories */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Browse by Category</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the information you need organized by topic and feature area.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpCategories.map((category, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {category.icon}
                      </div>
                      <CardTitle className="font-headline">{category.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <li key={articleIndex}>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline">
                              {article}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full mt-4">
                        View All Articles
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Popular Articles */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-6">
                  Popular Articles
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  The most helpful articles based on what other users are reading.
                </p>
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="flex items-center gap-3 p-4 bg-background rounded-lg hover:shadow-md transition-shadow duration-300"
                    >
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground hover:text-primary">{article}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-6">
                  Video Tutorials
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Learn visually with our comprehensive video tutorial library.
                </p>
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center mb-4">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Getting Started with OrgCentral</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      A comprehensive overview of OrgCentral's main features and how to set up your first project.
                    </p>
                    <Button className="w-full">
                      <Video className="mr-2 h-4 w-4" />
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Support Options */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Need More Help?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportOptions.map((option, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {option.icon}
                      </div>
                      <CardTitle className="font-headline">{option.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{option.description}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{option.availability}</p>
                      <Button className="w-full">{option.action}</Button>
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
              Still Have Questions?
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-xl mx-auto mb-8">
              Our team is always ready to help. Contact us for personalized support and guidance.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-background text-primary hover:bg-background/90">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/register">Try OrgCentral Free</Link>
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