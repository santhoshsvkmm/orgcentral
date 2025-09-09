'use client';

import { LandingLayout } from "@/components/layout/landing-layout";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Mail, Phone } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <LandingLayout>
      <PageTitle 
        title="Privacy Policy" 
        description="How we collect, use, and protect your personal information." 
      />
      
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Our Commitment to Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p className="text-muted-foreground">
              At OrgCentral, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Last updated:</strong> January 15, 2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              <CardTitle>Information We Collect</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Name, email address, and contact information</li>
                <li>Company information and job title</li>
                <li>Account credentials and authentication data</li>
                <li>Payment and billing information</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Usage Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Project data and construction management information</li>
                <li>Application usage patterns and preferences</li>
                <li>Device information and IP addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-primary" />
              <CardTitle>How We Use Your Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and maintain our construction management services</li>
              <li>Process transactions and manage your account</li>
              <li>Communicate with you about updates, support, and marketing</li>
              <li>Improve our services and develop new features</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations and resolve disputes</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <CardTitle>Data Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div>
              <h3 className="font-semibold mb-2">Security Measures Include:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure data centers with 24/7 monitoring</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication protocols</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Information Sharing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>With service providers who assist in operating our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or acquisition</li>
              <li>With your explicit consent for specific purposes</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Objection:</strong> Object to certain processing activities</li>
              <li><strong>Restriction:</strong> Request limitation of processing</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. 
              You can control cookie preferences through your browser settings.
            </p>
            <div>
              <h3 className="font-semibold mb-2">Types of Cookies:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Essential:</strong> Required for basic functionality</li>
                <li><strong>Analytics:</strong> Help us understand usage patterns</li>
                <li><strong>Functional:</strong> Remember your preferences</li>
                <li><strong>Marketing:</strong> Deliver relevant advertisements</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, 
              comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, 
              we securely delete or anonymize it.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>International Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your information may be transferred to and processed in countries other than your own. We ensure that such transfers 
              comply with applicable data protection laws and implement appropriate safeguards to protect your information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the 
              new policy on this page and updating the "Last updated" date. Your continued use of our services after such 
              changes constitutes acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>Contact Us</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>privacy@orgcentral.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div>
                <strong>Mailing Address:</strong><br />
                OrgCentral Privacy Team<br />
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