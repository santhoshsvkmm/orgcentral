'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Users,
  Briefcase,
  HeadphonesIcon,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const contactMethods = [
  {
    icon: <Phone className="h-8 w-8 text-primary" />,
    title: 'Phone Support',
    description: 'Speak directly with our construction experts',
    contact: '+1 (555) 012-3456',
    availability: 'Mon-Fri, 8AM-6PM EST'
  },
  {
    icon: <Mail className="h-8 w-8 text-primary" />,
    title: 'Email Support',
    description: 'Get detailed help via email',
    contact: 'support@orgcentral.com',
    availability: 'Response within 24 hours'
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    title: 'Live Chat',
    description: 'Chat with our team in real-time',
    contact: 'Available on website',
    availability: 'Mon-Fri, 9AM-5PM EST'
  }
];

const offices = [
  {
    city: 'New York',
    address: '123 Construction Ave, Suite 500',
    zipcode: 'New York, NY 10001',
    phone: '+1 (555) 012-3456',
    email: 'ny@orgcentral.com'
  },
  {
    city: 'Los Angeles',
    address: '456 Builder Blvd, Floor 12',
    zipcode: 'Los Angeles, CA 90210',
    phone: '+1 (555) 987-6543',
    email: 'la@orgcentral.com'
  },
  {
    city: 'Chicago',
    address: '789 Project Plaza, Suite 300',
    zipcode: 'Chicago, IL 60601',
    phone: '+1 (555) 456-7890',
    email: 'chicago@orgcentral.com'
  }
];

const departments = [
  { value: 'sales', label: 'Sales & Demos' },
  { value: 'support', label: 'Technical Support' },
  { value: 'billing', label: 'Billing & Accounts' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'general', label: 'General Inquiry' }
];

const companySizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    department: '',
    message: ''
  });

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this to your backend
  };

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
              Get in Touch
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              Ready to transform your construction projects? Our team of experts is here to help you find the perfect solution for your business needs.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Methods */}
        <motion.section
          className="py-16 sm:py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">How Can We Help?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the best way to reach us. Our team is ready to assist you with any questions or support needs.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        {method.icon}
                      </div>
                      <CardTitle className="font-headline">{method.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{method.description}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-primary mb-2">{method.contact}</p>
                      <p className="text-muted-foreground text-sm">{method.availability}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Form & Info */}
        <motion.section
          className="py-16 sm:py-20 bg-slate-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline">Send us a Message</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="companySize">Company Size</Label>
                          <Select onValueChange={(value) => handleInputChange('companySize', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent>
                              {companySizes.map((size) => (
                                <SelectItem key={size.value} value={size.value}>
                                  {size.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Select onValueChange={(value) => handleInputChange('department', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.value} value={dept.value}>
                                {dept.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us about your project and how we can help..."
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Company Info */}
              <motion.div variants={itemVariants} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline">Our Offices</CardTitle>
                    <p className="text-muted-foreground">
                      Visit us at one of our locations or reach out to your nearest office.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {offices.map((office, index) => (
                      <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <h4 className="font-semibold text-lg mb-2">{office.city}</h4>
                        <div className="space-y-1 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{office.address}</span>
                          </div>
                          <div className="text-sm ml-6">{office.zipcode}</div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span className="text-sm">{office.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">{office.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline">Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="text-muted-foreground">8:00 AM - 6:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="text-muted-foreground">9:00 AM - 2:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="text-muted-foreground">Closed</span>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2 text-primary">
                        <HeadphonesIcon className="h-4 w-4" />
                        <span className="font-medium">24/7 Emergency Support</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Available for Enterprise customers
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline">Follow Us</CardTitle>
                    <p className="text-muted-foreground">
                      Stay connected for the latest updates and construction industry insights.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <Link href="#" className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                        <Twitter className="h-5 w-5 text-primary" />
                      </Link>
                      <Link href="#" className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                        <Linkedin className="h-5 w-5 text-primary" />
                      </Link>
                      <Link href="#" className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                        <Facebook className="h-5 w-5 text-primary" />
                      </Link>
                    </div>
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
              Ready to See OrgCentral in Action?
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-xl mx-auto mb-8">
              Schedule a personalized demo and see how OrgCentral can transform your construction project management.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-background text-primary hover:bg-background/90">
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/solutions/project-command-center">View Demo</Link>
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