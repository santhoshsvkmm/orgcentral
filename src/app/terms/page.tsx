'use client';

import { LandingLayout } from "@/components/layout/landing-layout";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, Shield, CreditCard, Mail, Phone } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <LandingLayout>
      <PageTitle 
        title="Terms of Service" 
        description="Terms and conditions for using OrgCentral's construction management platform." 
      />
      
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle>Agreement to Terms</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p className="text-muted-foreground">
              By accessing and using OrgCentral's construction management platform, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Last updated:</strong> January 15, 2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              OrgCentral provides a comprehensive construction management platform that includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Project planning and scheduling tools</li>
              <li>Resource and budget management</li>
              <li>Team collaboration features</li>
              <li>Document management and file sharing</li>
              <li>Reporting and analytics capabilities</li>
              <li>Mobile applications for field access</li>
              <li>AI-powered insights and recommendations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <CardTitle>User Responsibilities</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account Security</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use strong passwords and enable two-factor authentication</li>
                <li>Regularly update your account information</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Acceptable Use</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Use the service only for lawful construction management purposes</li>
                <li>Respect intellectual property rights</li>
                <li>Do not attempt to reverse engineer or hack the platform</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <CardTitle>Prohibited Activities</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The following activities are strictly prohibited when using our service:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Uploading malicious software or viruses</li>
              <li>Attempting to gain unauthorized access to other accounts</li>
              <li>Using the service to store or transmit illegal content</li>
              <li>Interfering with the proper functioning of the platform</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Sharing account credentials with unauthorized users</li>
              <li>Using automated tools to access the service without permission</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <CardTitle>Payment Terms</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Subscription Fees</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>Price changes will be communicated 30 days in advance</li>
                <li>Taxes may apply based on your location</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Methods</h3>
              <p className="text-muted-foreground">
                We accept major credit cards, bank transfers, and other payment methods as specified during registration. 
                You authorize us to charge your chosen payment method for all applicable fees.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Ownership and Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Your Data</h3>
              <p className="text-muted-foreground">
                You retain ownership of all data you upload to our platform. We do not claim ownership of your project data, 
                documents, or other content. However, you grant us a license to use this data to provide our services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Security</h3>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your data. However, no system is 100% secure, 
                and you acknowledge the inherent risks of transmitting data over the internet.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Limitation of Liability</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, OrgCentral shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Loss of profits, data, or business opportunities</li>
              <li>Service interruptions or downtime</li>
              <li>Third-party actions or content</li>
              <li>Unauthorized access to your account</li>
              <li>Errors or omissions in the service</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We strive to maintain high service availability but cannot guarantee uninterrupted access. We may:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Perform scheduled maintenance with advance notice</li>
              <li>Temporarily suspend service for security or technical reasons</li>
              <li>Update or modify features and functionality</li>
              <li>Implement usage limits to ensure fair access for all users</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">By You</h3>
              <p className="text-muted-foreground">
                You may terminate your account at any time by contacting our support team or using the account closure 
                feature in your dashboard. Termination will be effective at the end of your current billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">By Us</h3>
              <p className="text-muted-foreground">
                We may terminate or suspend your account immediately if you violate these terms, engage in prohibited 
                activities, or fail to pay applicable fees. We will provide notice when possible.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The OrgCentral platform, including its software, design, content, and trademarks, is owned by us and protected 
              by intellectual property laws. You may not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Copy, modify, or distribute our software or content</li>
              <li>Use our trademarks without written permission</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Create derivative works based on our platform</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These terms are governed by the laws of [Jurisdiction] without regard to conflict of law principles. 
              Any disputes arising from these terms or your use of the service will be resolved through binding arbitration 
              or in the courts of [Jurisdiction].
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Material changes will be communicated via email or 
              platform notification at least 30 days before taking effect. Your continued use of the service after changes 
              constitutes acceptance of the updated terms.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>Contact Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>legal@orgcentral.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div>
                <strong>Mailing Address:</strong><br />
                OrgCentral Legal Department<br />
                123 Construction Ave<br />
                Building City, BC 12345
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LandingLayout>
  );
}