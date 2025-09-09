'use client';

import { LandingLayout } from "@/components/layout/landing-layout";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users2, 
  BarChart3, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <Building2 className="h-8 w-8 text-primary" />,
    title: "Enterprise Project Management",
    description: "Handle complex multi-phase commercial projects with advanced planning and coordination tools."
  },
  {
    icon: <Users2 className="h-8 w-8 text-primary" />,
    title: "Multi-Stakeholder Collaboration",
    description: "Coordinate between architects, engineers, contractors, and clients with unified communication."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Advanced Analytics",
    description: "Deep insights into project performance, resource utilization, and profitability metrics."
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Compliance & Safety",
    description: "Comprehensive safety management and regulatory compliance tracking for large projects."
  }
];

const benefits = [
  "Scale operations across multiple large projects",
  "Reduce project delivery time by up to 25%", 
  "Improve profit margins through better resource management",
  "Enhanced risk management and mitigation",
  "Streamlined compliance and reporting processes"
];

export default function CommercialSolutionsPage() {
  return (
    <LandingLayout>
      <PageTitle 
        title="Commercial Construction Solutions" 
        description="Enterprise-grade project management for commercial contractors, developers, and construction firms." 
      />
      
      <div className="space-y-8 md:space-y-12">
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">Enterprise Solution</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Scale Your Commercial Construction Operations
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                From office buildings to industrial complexes, OrgCentral provides the enterprise-grade 
                tools needed to manage large-scale commercial construction projects with precision and efficiency.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/register">Request Enterprise Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Sales</Link>
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Commercial construction skyscraper"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed for the complexity and scale of commercial construction projects.
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
              <h2 className="text-3xl font-bold mb-6">Enterprise Benefits</h2>
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
                <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">$2B+</div>
                <div className="text-sm text-muted-foreground">Projects Managed</div>
              </Card>
              <Card className="text-center p-6">
                <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">25%</div>
                <div className="text-sm text-muted-foreground">Faster Delivery</div>
              </Card>
              <Card className="text-center p-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">18%</div>
                <div className="text-sm text-muted-foreground">Profit Increase</div>
              </Card>
              <Card className="text-center p-6">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="text-center bg-primary text-primary-foreground rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Commercial Operations?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join leading commercial contractors who rely on OrgCentral for their largest projects.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact" className="inline-flex items-center gap-2">
              Schedule Enterprise Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </LandingLayout>
  );
}