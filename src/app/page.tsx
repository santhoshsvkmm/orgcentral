
'use client'; // Add this if not already present at the top for useState/useEffect

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, BarChartBig, Users, Briefcase, Brain, ShieldCheck, Layers, Wand2, Mail, Phone, MapPin, Twitter, Facebook, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Import useState and useEffect

const features = [
  {
    icon: <BarChartBig className="h-10 w-10 text-primary" />,
    title: 'Insightful Dashboard',
    description: 'Get a clear overview of organizational metrics and project progress at a glance.',
    dataAiHint: 'dashboard analytics'
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Project Management',
    description: 'Efficiently manage projects and tasks with intuitive CRUD operations.',
    dataAiHint: 'project collaboration'
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'User Administration',
    description: 'Easily manage users, roles, and permissions within your organization.',
    dataAiHint: 'team management'
  },
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: 'AI Role Suggestion',
    description: 'Leverage AI to get smart role suggestions based on job descriptions.',
    dataAiHint: 'artificial intelligence'
  },
];

const whyChooseUsItems = [
  {
    icon: <Layers className="h-10 w-10 text-primary" />,
    title: 'Unified Platform',
    description: 'Bring all your organizational tools and data into one seamless experience.',
    dataAiHint: 'integrated system'
  },
  {
    icon: <Wand2 className="h-10 w-10 text-primary" />,
    title: 'Intelligent Automation',
    description: 'Leverage AI to automate routine tasks and gain deeper insights.',
    dataAiHint: 'smart technology'
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Scalable & Secure',
    description: 'Built to grow with your organization, ensuring data safety and reliability.',
    dataAiHint: 'secure platform'
  }
];

const pricingTiers = [
  {
    name: 'Basic',
    price: '$0',
    period: '/month',
    description: 'For individuals and small teams starting out.',
    features: ['Dashboard Overview', 'Basic Project Management', 'Up to 5 Users'],
    cta: 'Get Started Free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For growing businesses needing more power.',
    features: ['All Basic Features', 'Advanced Project Management', 'AI Role Suggestion', 'Up to 20 Users', 'Priority Support'],
    cta: 'Choose Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations.',
    features: ['All Pro Features', 'Unlimited Users', 'Dedicated Account Manager', 'Custom Integrations'],
    cta: 'Contact Sales',
    featured: false,
  },
];

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
        <section className="py-20 md:py-32 bg-gradient-to-br from-background to-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
              Streamline Your Organization with <span className="text-primary">OrgCentral Simplified</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
              Manage projects, users, and gain AI-powered insights all in one place. Boost productivity and make smarter decisions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/register">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Key Features</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to manage your organization effectively.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="py-16 sm:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Why Choose OrgCentral?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the advantages that make OrgCentral the ideal solution for your organizational needs.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {whyChooseUsItems.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-headline">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
             <div className="mt-12 text-center">
                 <Image 
                  src="https://placehold.co/800x450.png" 
                  alt="OrgCentral in action" 
                  width={800} 
                  height={450} 
                  className="w-full max-w-3xl mx-auto h-auto object-cover rounded-lg shadow-xl"
                  data-ai-hint="team collaboration screen" 
                />
            </div>
          </div>
        </section>
        
        {/* Placeholder Image Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                  Visualize Your Success
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  OrgCentral Simplified provides powerful tools and an intuitive interface to help you achieve your organizational goals. See your projects and teams thrive.
                </p>
                <Button size="lg" asChild className="mt-8 bg-primary hover:bg-primary/90">
                  <Link href="/dashboard">Explore Dashboard</Link>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Platform dashboard" 
                  width={600} 
                  height={400} 
                  className="w-full h-auto object-cover"
                  data-ai-hint="dashboard interface" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 sm:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that's right for you.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={`flex flex-col ${tier.featured ? 'border-2 border-primary shadow-2xl relative' : 'shadow-lg'}`}>
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
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact-us" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Get in Touch</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Have questions or need assistance? We&apos;re here to help. Reach out to us!
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground font-headline">Contact Information</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Our Office</h4>
                    <p className="text-muted-foreground">123 Innovation Drive, Tech City, TX 75001</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Email Us</h4>
                    <p className="text-muted-foreground hover:text-primary"><Link href="mailto:support@orgcentral.com">support@orgcentral.com</Link></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Call Us</h4>
                    <p className="text-muted-foreground hover:text-primary"><Link href="tel:+15551234567">(555) 123-4567</Link></p>
                  </div>
                </div>
                 <div className="mt-6 h-64 w-full bg-muted rounded-lg overflow-hidden shadow-md" data-ai-hint="map location">
                    <Image src="https://placehold.co/600x400.png" alt="Map location" width={600} height={400} className="w-full h-full object-cover" />
                </div>
              </div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline">Send Us a Message</CardTitle>
                  <CardDescription>We&apos;ll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <form onSubmit={(e) => e.preventDefault()}>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="contact-name">Full Name</Label>
                      <Input id="contact-name" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea id="contact-message" placeholder="Your message..." className="min-h-[120px]" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t bg-gray-50 text-gray-700">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-2">
                <Briefcase className="h-7 w-7" /> {/* Using Briefcase as placeholder logo icon */}
                <span>OrgCentral Simplified</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Empowering organizations with simplified project and user management, powered by AI.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-foreground">Product</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-primary hover:underline">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-primary hover:underline">Pricing</Link></li>
                <li><Link href="/register" className="hover:text-primary hover:underline">Request Demo</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-foreground">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary hover:underline">About Us</Link></li>
                <li><Link href="#contact-us" className="hover:text-primary hover:underline">Contact</Link></li>
                <li><Link href="#" className="hover:text-primary hover:underline">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-foreground">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary hover:underline">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary hover:underline">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary hover:underline">API Documentation</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear || new Date().getFullYear()} OrgCentral Simplified. All rights reserved.</p>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
