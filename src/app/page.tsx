
'use client'; 

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Users, Briefcase, Brain, ShieldCheck, Layers, Wand2, Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Handshake, FolderOpen, Building, HardHat, Draftsman } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Unified Project Command Center',
    description: 'From Blueprint to Build: Manage every phase of your construction projects – planning, scheduling, advanced 2D/3D model control (view, edit, annotate), resource allocation, and financials – all in one seamless hub.',
    dataAiHint: 'construction project management'
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Precision Team & Access Control',
    description: 'Empower Your Crew, Protect Your Data: Define precise roles for every team member, from site supervisors to office staff, with granular, module-specific permissions ensuring secure access and clear responsibilities.',
    dataAiHint: 'construction team access'
  },
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: 'AI-Driven Site Intelligence',
    description: 'Build with Insight: Leverage AI for intelligent role suggestions, proactive project issue analysis, and data-driven decision-making that keeps your projects on time and on budget.',
    dataAiHint: 'construction AI insights'
  },
  {
    icon: <Handshake className="h-10 w-10 text-primary" />,
    title: 'Seamless Stakeholder Collaboration',
    description: 'Connect Your Ecosystem: Streamline communication with clients, architects, consultants, and subcontractors through dedicated portals, real-time RFI management, and transparent project mapping.',
    dataAiHint: 'construction collaboration B2B'
  },
];

const whyChooseUsItems = [
  {
    icon: <Layers className="h-10 w-10 text-primary" />,
    title: 'End-to-End Construction OS',
    description: 'Your entire construction lifecycle, unified. From pre-construction planning and on-site execution to post-construction closeout, OrgCentral integrates every tool and data point.',
    dataAiHint: 'construction workflow integrated'
  },
  {
    icon: <Wand2 className="h-10 w-10 text-primary" />,
    title: 'Boost Profitability with AI',
    description: 'Turn Data into Dollars: Our AI doesn\'t just manage tasks; it identifies risks, optimizes resources, and provides actionable insights to maximize project profitability.',
    dataAiHint: 'construction finance AI'
  },
  {
    icon: <Building className="h-10 w-10 text-primary" />,
    title: 'Field-Tested, Office-Approved',
    description: 'Built for the Demands of Construction: Secure, scalable, and customizable, OrgCentral provides the robust access control your field teams need and the comprehensive oversight your office requires.',
    dataAiHint: 'construction software reliable'
  }
];

const pricingTiers = [
  {
    name: 'Basic',
    price: '$0',
    period: '/month',
    description: 'For small contractors and individual projects.',
    features: ['Dashboard Overview', 'Basic Project Management', 'Up to 3 Users', 'Core Document Management'],
    cta: 'Get Started Free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'For growing construction businesses needing more power.',
    features: ['All Basic Features', 'Advanced Project & Task Management', '2D/3D Model Viewer (Basic)', 'AI Role Suggestion & Issue Analysis', 'Client & Subcontractor Portals', 'Up to 25 Users', 'Priority Support'],
    cta: 'Choose Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large construction firms.',
    features: ['All Pro Features', 'Unlimited Users', 'Advanced 2D/3D Editor/Annotator', 'Dedicated Account Manager', 'Custom Integrations & Reporting', 'Full API Access'],
    cta: 'Contact Sales',
    featured: false,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


export default function LandingPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section 
          className="py-20 md:py-32 bg-gradient-to-br from-background to-blue-50"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Build Smarter, Not Harder with <span className="text-primary">OrgCentral</span>
            </motion.h1>
            <motion.p 
              className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The all-in-one construction management platform designed to streamline your projects, enhance collaboration, and boost profitability from site to office.
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/register">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Explore Features</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          id="features" 
          className="py-16 sm:py-24 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Empowering Your Construction Success</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                OrgCentral provides the tools you need to manage every aspect of your construction projects.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section 
          id="why-choose-us" 
          className="py-16 sm:py-24 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">The OrgCentral Advantage for Construction</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover why leading construction firms choose OrgCentral to build their future.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {whyChooseUsItems.map((item, index) => (
                <motion.div 
                  key={item.title} 
                  className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-headline">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
             <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                 <Image 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Construction team collaborating on site" 
                  width={800} 
                  height={450} 
                  className="w-full max-w-3xl mx-auto h-auto object-cover rounded-lg shadow-xl"
                  data-ai-hint="construction team meeting" 
                />
            </motion.div>
          </div>
        </motion.section>
        
        {/* Placeholder Image Section */}
        <motion.section 
          className="py-16 sm:py-24 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, amount: 0.3 }}
                 transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                  Visualize Your Project's Success from Foundation to Finish
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  OrgCentral provides powerful tools and an intuitive interface to help you manage complex construction projects and achieve your delivery goals.
                </p>
                <Button size="lg" asChild className="mt-8 bg-primary hover:bg-primary/90">
                  <Link href="/dashboard">Explore Dashboard</Link>
                </Button>
              </motion.div>
              <motion.div 
                className="rounded-lg overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <Image 
                  src="https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern construction project dashboard interface" 
                  width={800} 
                  height={450} 
                  className="w-full h-auto object-cover"
                  data-ai-hint="construction dashboard" 
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section 
          id="pricing" 
          className="py-16 sm:py-24 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Transparent Pricing for Every Builder</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that scales with your construction business.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" , transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className={`flex flex-col h-full ${tier.featured ? 'border-2 border-primary shadow-2xl relative' : 'shadow-lg'}`}>
                    {tier.featured && (
                      <div className="absolute top-0 right-0 -mt-3 mr-3">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-accent text-accent-foreground">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl font-headline">{tier.name}</CardTitle>
                      <p className="mt-1">
                        <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                      </p>
                      <CardDescription className="mt-2">{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul role="list" className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full ${tier.featured ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90 text-accent-foreground'}`}
                        size="lg"
                        asChild
                      >
                        <Link href="/register">{tier.cta}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Us Section */}
        <motion.section 
          id="contact-us" 
          className="py-16 sm:py-24 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Let's Build Together</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Have questions about how OrgCentral can transform your construction projects? Reach out to our specialists.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-foreground font-headline">Contact Information</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Our Office</h4>
                    <p className="text-muted-foreground">123 Construction Plaza, Builder City, TX 75002</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Email Us</h4>
                    <p className="text-muted-foreground hover:text-primary"><Link href="mailto:sales@orgcentral.construction">sales@orgcentral.construction</Link></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Call Us</h4>
                    <p className="text-muted-foreground hover:text-primary"><Link href="tel:+1555BUILDIT">(555) BUILD-IT</Link></p>
                  </div>
                </div>
                 <div className="mt-6 h-64 w-full bg-muted rounded-lg overflow-hidden shadow-md" data-ai-hint="office map location">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.437798998414!2d-96.79899698481716!3d32.78197288097123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9922a278a29b%3A0x21f083f9b1d877b6!2s123%20Construction%20Plaza%2C%20Builder%20City%2C%20TX%2075002%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000001!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border:0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location - 123 Construction Plaza, Builder City, TX 75002"
                    ></iframe>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-headline">Send Us a Message</CardTitle>
                    <CardDescription>We'll connect you with a construction solutions expert.</CardDescription>
                  </CardHeader>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="contact-name">Full Name</Label>
                        <Input id="contact-name" placeholder="John Doe" />
                      </div>
                       <div className="grid gap-2">
                        <Label htmlFor="contact-company">Company Name</Label>
                        <Input id="contact-company" placeholder="ABC Construction Inc." />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" type="email" placeholder="john.doe@abcconstruction.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contact-message">How can we help?</Label>
                        <Textarea id="contact-message" placeholder="Tell us about your project needs..." className="min-h-[120px]" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Send Inquiry</Button>
                    </CardFooter>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Enhanced Footer */}
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
                <Building className="h-7 w-7" /> {/* Using Building as construction-related logo icon */}
                <span>OrgCentral</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Empowering construction excellence with integrated project management, powered by AI.
              </p>
            </motion.div>
            {[
              { title: 'Solutions', links: [{label: 'Project Management', href: '#features'}, {label: 'AI for Construction', href: '#features'}, {label: 'Pricing', href: '#pricing'}, {label: 'Request Demo', href: '/register'}] },
              { title: 'Company', links: [{label: 'About Us', href: '#'}, {label: 'Contact Sales', href: '#contact-us'}, {label: 'Careers', href: '#'}] },
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

    