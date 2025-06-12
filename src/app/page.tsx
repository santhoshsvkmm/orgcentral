import { MainHeader } from '@/components/layout/main-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChartBig, Users, Briefcase, Brain, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
        
        {/* Placeholder Image Section */}
        <section className="py-16 sm:py-24 bg-slate-50">
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
        <section id="pricing" className="py-16 sm:py-24 bg-background">
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
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OrgCentral Simplified. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
