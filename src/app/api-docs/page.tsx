'use client';

import { LandingLayout } from "@/components/layout/landing-layout";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Zap, 
  Shield, 
  Globe, 
  BookOpen,
  Download,
  ExternalLink,
  Copy,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/v1/projects",
    description: "Retrieve all projects for the authenticated user"
  },
  {
    method: "POST", 
    endpoint: "/api/v1/projects",
    description: "Create a new project"
  },
  {
    method: "GET",
    endpoint: "/api/v1/projects/{id}",
    description: "Get detailed information about a specific project"
  },
  {
    method: "PUT",
    endpoint: "/api/v1/projects/{id}",
    description: "Update project information"
  }
];

const sdks = [
  {
    name: "JavaScript/Node.js",
    description: "Official SDK for JavaScript and Node.js applications",
    install: "npm install @orgcentral/sdk"
  },
  {
    name: "Python",
    description: "Python SDK for backend integrations",
    install: "pip install orgcentral-python"
  },
  {
    name: "PHP",
    description: "PHP SDK for web applications",
    install: "composer require orgcentral/php-sdk"
  },
  {
    name: "C#/.NET",
    description: ".NET SDK for enterprise applications",
    install: "dotnet add package OrgCentral.SDK"
  }
];

const codeExample = `// Initialize the OrgCentral client
const orgcentral = new OrgCentral({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.orgcentral.com/v1'
});

// Get all projects
const projects = await orgcentral.projects.list();

// Create a new project
const newProject = await orgcentral.projects.create({
  name: 'New Office Building',
  description: 'Commercial office construction',
  startDate: '2024-01-15',
  estimatedEndDate: '2024-12-31'
});`;

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <LandingLayout>
      <PageTitle 
        title="API Documentation" 
        description="Integrate OrgCentral with your existing tools and workflows using our comprehensive API." 
      />
      
      <div className="space-y-8 md:space-y-12">
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">Developer Tools</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Build Powerful Integrations
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Connect OrgCentral to your existing systems with our RESTful API. 
                Access project data, manage resources, and automate workflows programmatically.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Get API Key
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download SDKs
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Card className="p-6 bg-slate-900 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    <span className="font-mono text-sm">API Example</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyCode}
                    className="text-white hover:bg-slate-800"
                  >
                    {copiedCode ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </Card>
            </motion.div>
          </div>
        </section>

        <section>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="sdks">SDKs</TabsTrigger>
              <TabsTrigger value="authentication">Auth</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <Card className="p-6">
                  <Zap className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">RESTful API</h3>
                  <p className="text-muted-foreground">
                    Simple, predictable REST API with JSON responses and standard HTTP methods.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <Shield className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Secure Authentication</h3>
                  <p className="text-muted-foreground">
                    OAuth 2.0 and API key authentication with role-based access control.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <Globe className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Global CDN</h3>
                  <p className="text-muted-foreground">
                    Fast, reliable API access from anywhere in the world with 99.9% uptime.
                  </p>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Getting Started</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Get Your API Key</h4>
                      <p className="text-muted-foreground">Sign up for an OrgCentral account and generate your API key from the developer settings.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Choose Your SDK</h4>
                      <p className="text-muted-foreground">Download the official SDK for your preferred programming language or use direct HTTP requests.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Make Your First Request</h4>
                      <p className="text-muted-foreground">Start with a simple GET request to retrieve your projects and explore the API capabilities.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">API Endpoints</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive list of available API endpoints for managing your construction projects.
                </p>
              </div>
              
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                          {endpoint.method}
                        </Badge>
                        <code className="font-mono text-sm">{endpoint.endpoint}</code>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground mt-2 ml-20">{endpoint.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sdks" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Official SDKs</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Use our official SDKs to integrate OrgCentral into your applications quickly and easily.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {sdks.map((sdk, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{sdk.name}</h3>
                        <p className="text-muted-foreground">{sdk.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Install
                      </Button>
                    </div>
                    <div className="bg-slate-100 rounded p-3">
                      <code className="text-sm">{sdk.install}</code>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">API Authentication</h3>
                <p className="text-muted-foreground mb-6">
                  OrgCentral API uses API keys for authentication. Include your API key in the Authorization header of your requests.
                </p>
                
                <div className="bg-slate-900 text-white p-4 rounded-lg mb-6">
                  <code className="text-sm">
                    curl -H "Authorization: Bearer YOUR_API_KEY" \<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;https://api.orgcentral.com/v1/projects
                  </code>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Rate Limits</h4>
                    <p className="text-muted-foreground">API requests are limited to 1000 requests per hour per API key.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Error Handling</h4>
                    <p className="text-muted-foreground">The API returns standard HTTP status codes and detailed error messages in JSON format.</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="text-center bg-slate-50 rounded-lg p-12">
          <Code className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get your API key and start integrating OrgCentral into your applications today.
          </p>
          <Button size="lg">
            Get API Access
          </Button>
        </section>
      </div>
    </LandingLayout>
  );
}