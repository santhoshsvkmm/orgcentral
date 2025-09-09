'use client';

import { LandingLayout } from "@/components/layout/landing-layout";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  ArrowRight,
  Building,
  Clock,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <Home className="h-8 w-8 text-primary" />,
    title: "Custom Home Builder Tools",
    description: "Specialized workflows for custom home construction with client collaboration features."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Homeowner Portal",
    description: "Keep clients informed with real-time project updates and milestone tracking."
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Residential Scheduling",
    description: "Optimized scheduling templates for residential construction phases."
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Budget Management",
    description: "Track costs, change orders, and maintain profitability on every project."
  }
];

const benefits = [
  "Faster project delivery with streamlined workflows",
  "Improved client satisfaction through transparency", 
  "Better cost control and profit margins",
  "Reduced administrative overhead",
  "Enhanced quality control processes"
];

export default function ResidentialSolutionsPage() {
  return (
    <LandingLayout>
      <PageTitle 
        title="Residential Construction Solutions" 
        description="Purpose-built tools for residential builders, custom home contractors, and housing developers." 
      />
      
      <div className="space-y-8 md:space-y-12">
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">Residential Focus</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Build Better Homes with Smarter Management
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                From single-family homes to multi-unit developments, OrgCentral provides 
                the specialized tools residential builders need to deliver projects on time 
                and within budget.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/register">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Schedule Demo</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern residential construction site"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Residential-Specific Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tools designed specifically for the unique challenges of residential construction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 rounded-lg p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose OrgCentral for Residential?</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Card className="text-center p-6">
                <Building className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Homes Built</div>
              </Card>
              <Card className="text-center p-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">15%</div>
                <div className="text-sm text-muted-foreground">Faster Delivery</div>
              </Card>
              <Card className="text-center p-6">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">$50K</div>
                <div className="text-sm text-muted-foreground">Avg. Savings</div>
              </Card>
              <Card className="text-center p-6">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="text-center bg-primary text-primary-foreground rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Residential Projects?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of residential builders who trust OrgCentral to deliver exceptional homes.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register" className="inline-flex items-center gap-2">
              Get Started Today <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </LandingLayout>
  );
}