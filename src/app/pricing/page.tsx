'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Building, 
  Check, 
  X,
  Users,
  Briefcase,
  Crown,
  Phone,
  Mail,
  MessageCircle,
  Twitter,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const pricingPlans = [
  {
    name: 'Small Contractor',
    description: 'Perfect for residential contractors and small trades',
    monthlyPrice: 49,
    yearlyPrice: 490,
    icon: <Users className="h-8 w-8 text-primary" />,
    features: [
      'Up to 10 field workers',
      '5 active projects',
      'Basic CPM scheduling',
      'Daily field reports',
      'RFI management',
      'Blueprint storage (25GB)',
      'Mobile app access',
      'Email support',
      'Basic job costing'
    ],
    limitations: [
      'No subcontractor portal',
      'No progress billing',
      'No API access',
      'Limited integrations'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'General Contractor',
    description: 'Ideal for mid-size GCs and specialty contractors',
    monthlyPrice: 129,
    yearlyPrice: 1290,
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    features: [
      'Up to 50 team members',
      'Unlimited projects',
      'Advanced CPM scheduling',
      'Subcontractor management',
      'Progress billing (AIA forms)',
      'Blueprint storage (500GB)',
      'Submittal tracking',
      'Change order management',
      'Job cost accounting',
      'Safety inspections',
      'Priority support',
      'Mobile app access'
    ],
    limitations: [
      'No API access',
      'No white-label options',
      'Limited custom integrations'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise Builder',
    description: 'For large construction firms and developers',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    icon: <Crown className="h-8 w-8 text-primary" />,
    features: [
      'Unlimited users',
      'Unlimited projects',
      'Multi-company management',
      'Advanced construction analytics',
      'Unlimited blueprint storage',
      'Dedicated account manager',
      'API access & integrations',
      'Custom construction workflows',
      'Advanced security & SSO',
      'On-site training',
      'SLA guarantee',
      'Custom reporting'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false
  }
];

const addOns = [
  {
    name: 'Additional Blueprint Storage',
    description: 'Extra storage for construction documents and blueprints',
    price: '$10/month per 50GB'
  },
  {
    name: 'Construction AI Analytics',
    description: 'Predictive scheduling and cost overrun prevention',
    price: '$25/month per user'
  },
  {
    name: 'Dedicated Construction Support',
    description: '24/7 support with construction industry specialists',
    price: '$300/month'
  },
  {
    name: 'ERP Integrations',
    description: 'Connect with Sage, Viewpoint, and other construction ERPs',
    price: 'Contact for pricing'
  }
];

const faqs = [
  {
    question: 'Do you offer a free trial for construction companies?',
    answer: 'Yes! We offer a 30-day free trial for all plans with full access to CPM scheduling, RFI management, and job costing. No credit card required.'
  },
  {
    question: 'Can I manage multiple construction projects?',
    answer: 'Yes. The Small Contractor plan includes 5 active projects, while General Contractor and Enterprise plans offer unlimited projects.'
  },
  {
    question: 'Do you integrate with construction accounting software?',
    answer: 'Yes, we integrate with QuickBooks, Sage 300 Construction, Foundation, and other popular construction accounting systems.'
  },
  {
    question: 'Is there mobile access for field crews?',
    answer: 'Yes, our mobile apps allow field workers to submit daily reports, track progress, manage punch lists, and access blueprints offline.'
  },
  {
    question: 'How does subcontractor management work?',
    answer: 'Our platform includes subcontractor portals for bid management, progress tracking, payment applications, and document sharing.'
  },
  {
    question: 'Do you provide construction-specific training?',
    answer: 'Yes, we offer specialized training for construction workflows including CPM scheduling, RFI processes, and AIA billing forms.'
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

export default function PricingPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isYearly, setIsYearly] = useState(false);

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
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              Choose the perfect plan for your construction business. All plans include our core features with no hidden fees.
            </motion.p>
            
            {/* Billing Toggle */}
            <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge variant="secondary" className="ml-2">Save 2 months</Badge>
            </motion.div>
          </div>
        </motion.section>

        {/* Pricing Plans */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className={`h-full relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center pb-8">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {plan.icon}
                      </div>
                      <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                      <div className="mt-4">
                        <div className="text-4xl font-bold text-primary">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          per {isYearly ? 'year' : 'month'}
                        </div>
                        {isYearly && (
                          <div className="text-green-600 text-sm font-medium">
                            Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-3 mb-8 flex-1">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <div key={limitationIndex} className="flex items-center gap-3 opacity-60">
                            <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                        asChild
                      >
                        <Link href={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                          {plan.cta}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Add-ons Section */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Add-ons & Extensions</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Enhance your plan with additional features and services tailored to your specific needs.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {addOns.map((addon, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{addon.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{addon.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary">{addon.price}</span>
                        <Button variant="outline" size="sm">Add to Plan</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Got questions? We've got answers. If you can't find what you're looking for, contact our support team.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Need Help Choosing?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our team is here to help you find the perfect plan for your construction business.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div variants={itemVariants}>
                <Card className="text-center">
                  <CardHeader>
                    <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                    <CardTitle>Call Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Speak with our sales team</p>
                    <Button variant="outline" asChild>
                      <Link href="tel:+1-555-0123">+1 (555) 012-3456</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="text-center">
                  <CardHeader>
                    <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                    <CardTitle>Email Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Get detailed information</p>
                    <Button variant="outline" asChild>
                      <Link href="mailto:sales@orgcentral.com">sales@orgcentral.com</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="text-center">
                  <CardHeader>
                    <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                    <CardTitle>Live Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Chat with our experts</p>
                    <Button variant="outline">Start Chat</Button>
                  </CardContent>
                </Card>
              </motion.div>
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
              Ready to Get Started?
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-xl mx-auto mb-8">
              Join thousands of construction professionals who trust OrgCentral to manage their projects successfully.
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