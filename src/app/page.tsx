'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Brain, UserCheck, AlertTriangle, TrendingUp, Building, Twitter, Facebook, Linkedin, CheckCircle, Lightbulb, Shield, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const aiFeaturesData = [
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: 'Intelligent Role Suggestions',
    description: "Streamline team onboarding and ensure appropriate access levels from the start. OrgCentral's AI analyzes job descriptions and project needs to recommend suitable user roles and permission sets, saving administrative time and enhancing security.",
    dataAiHint: "ai user roles"
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-primary" />,
    title: 'Proactive Project Issue Analysis',
    description: "Stay ahead of potential problems. Our AI continuously monitors project data – task progress, RFI statuses, resource allocation, and schedule deviations – to identify critical issues and bottlenecks before they impact your timeline or budget. Get actionable alerts and recommendations to mitigate risks effectively.",
    dataAiHint: "ai risk detection"
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Data-Driven Decision Making',
    description: "Transform raw project data into strategic insights. OrgCentral's AI capabilities help you understand trends, forecast potential outcomes, and optimize resource deployment. Make informed decisions backed by intelligent analysis to improve project efficiency and profitability.",
    dataAiHint: "ai data insights"
  }
];

const benefitsData = [
  {
    icon: <Lightbulb className="h-10 w-10 text-accent" />,
    title: 'Predictive Scheduling',
    description: 'Our AI analyzes project timelines and resource availability to suggest optimized schedules, helping you meet deadlines and avoid costly delays.',
  },
  {
    icon: <Shield className="h-10 w-10 text-accent" />,
    title: 'Enhanced Safety & Compliance',
    description: 'Intelligent systems can flag potential safety hazards and ensure all project activities adhere to regulatory standards, reducing on-site risks.',
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-accent" />,
    title: 'Real-Time Performance Analytics',
    description: 'Get instant insights into project performance, budget tracking, and resource utilization, allowing for quick, data-backed adjustments.',
  }
];

const carouselImages = [
  { src: "/images/ai-construction-site.jpg", alt: "AI-powered construction site" },
  { src: "/images/data-analytics-construction.jpg", alt: "Data analytics for construction projects" },
  { src: "/images/team-ai-planning.jpg", alt: "Team using AI for planning" }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? carouselImages.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === carouselImages.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
        {carouselImages.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center p-8">
              <div className="text-white max-w-3xl">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold font-headline mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Innovate Your Workflow with OrgCentral
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Our AI solutions are designed to build smarter, safer, and more profitable projects.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-6"
                >
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button onClick={prevSlide} className="rounded-full bg-white/20 hover:bg-white/50 text-white p-2">
          <ChevronLeft size={24} />
        </Button>
        <Button onClick={nextSlide} className="rounded-full bg-white/20 hover:bg-white/50 text-white p-2">
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );
};

export default function AiInConstructionPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col">
      <MainHeader />
      <Carousel />
      <main className="flex-1 overflow-auto">
        {/* The rest of your sections, now inside the main content area */}
        {/* AI-Powered Features Section */}
        <motion.section 
          className="py-16 sm:py-20 bg-background" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }} 
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">AI-Powered Features in OrgCentral</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our intelligent tools are designed to provide you with a competitive edge in the construction industry.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aiFeaturesData.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
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

        {/* New Section: Deeper Dive into AI Benefits */}
        <motion.section 
          className="py-16 sm:py-20 bg-slate-100" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <Image
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Construction workers collaborating"
                  width={600}
                  height={450}
                  className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/3]"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-4">How AI Integrates into Your Workflow</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  OrgCentral's AI isn't just a feature; it's a co-pilot for your entire project lifecycle. It works silently in the background, analyzing real-time data to offer predictive insights and automated optimizations.
                </p>
                <div className="space-y-6">
                  {benefitsData.map((benefit, index) => (
                    <motion.div key={index} variants={itemVariants} className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-foreground font-headline">{benefit.title}</h4>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Existing Section: The Future of Construction is Intelligent */}
        <motion.section 
          className="py-16 sm:py-20 bg-slate-50" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-4">The Future of Construction is Intelligent</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  OrgCentral is committed to integrating cutting-edge AI to solve real-world construction challenges. Our goal is to empower you with tools that not only manage projects but actively contribute to their success by anticipating needs, optimizing processes, and providing deeper insights than ever before.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <span>Reduce project delays through early risk identification.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <span>Optimize resource allocation for maximum efficiency.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <span>Improve budget adherence with intelligent cost oversight.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <span>Enhance team productivity with smarter workflows.</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                 <Image 
                   src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                   alt="AI enhancing construction project management" 
                   width={600} 
                   height={450} 
                   className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/3]" 
                   data-ai-hint="AI construction technology" 
                 />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Dashboard Features Section */}
        <motion.section 
          className="py-16 sm:py-20 bg-background" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }} 
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Powerful Dashboard Features</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Get real-time insights and manage your construction projects with our comprehensive dashboard.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <BarChart2 className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Project Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">Real-time project metrics, progress tracking, and performance analytics in one unified view.</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <Brain className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">Intelligent recommendations and predictive analytics to optimize your construction workflows.</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <Shield className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Safety Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">Comprehensive safety tracking with incident reporting and compliance management tools.</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <TrendingUp className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Resource Management</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">Optimize resource allocation and track material usage across all your construction projects.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Dashboard Preview Image */}
            <motion.div variants={itemVariants} className="mt-12">
              <div className="relative mx-auto max-w-5xl">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Construction dashboard interface"
                  width={1200}
                  height={600}
                  className="rounded-lg shadow-2xl object-cover w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

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