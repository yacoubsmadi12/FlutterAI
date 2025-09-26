import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Calendar, Shield, AlertTriangle } from "lucide-react";

export default function Terms() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <FileText className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold" data-testid="terms-title">Appio Flow Terms of Service</h1>
              </div>
              <p className="text-xl text-muted-foreground mb-6" data-testid="terms-subtitle">
                Please read these terms carefully before using our platform
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Badge variant="outline">
                  <Calendar className="mr-1 h-3 w-3" />
                  Last Updated: September 26, 2025
                </Badge>
                <Badge variant="outline">
                  <Shield className="mr-1 h-3 w-3" />
                  Version 2.1
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                    Important Notice
                  </CardTitle>
                  <CardDescription>
                    By using Appio Flow, you agree to be bound by these terms of service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4" data-testid="important-notice">
                    <p className="text-sm">
                      These Terms of Service ("Terms") govern your use of Appio Flow's platform and services. 
                      Please read them carefully as they contain important information about your rights and obligations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 space-y-8">
                {/* Acceptance of Terms */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-acceptance">1. Acceptance of Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        By accessing and using Appio Flow ("the Service"), you accept and agree to be bound by the terms 
                        and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                      <p>
                        These terms apply to all users of the service, including without limitation users who are browsers, 
                        vendors, customers, merchants, and/or contributors of content.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Description */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-service">2. Service Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        Appio Flow is an AI-powered platform that helps users generate Flutter mobile applications from 
                        natural language descriptions using advanced artificial intelligence technology.
                      </p>
                      <p>
                        The Service includes but is not limited to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>AI-powered Flutter code generation</li>
                        <li>Real-time app preview capabilities</li>
                        <li>Project management and organization tools</li>
                        <li>ZIP download functionality for generated projects</li>
                        <li>Multi-language support (English and Arabic)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* User Accounts */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-accounts">3. User Accounts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        To access certain features of the Service, you may be required to create an account. You are responsible for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Maintaining the confidentiality of your account credentials</li>
                        <li>All activities that occur under your account</li>
                        <li>Providing accurate and complete information during registration</li>
                        <li>Promptly updating your information to keep it accurate</li>
                      </ul>
                      <p>
                        You must notify us immediately of any unauthorized use of your account or any other breach of security.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Credit System and Billing */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-billing">4. Credit System and Billing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        Appio Flow operates on a credit-based system where:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>$1 USD equals 100 credits</li>
                        <li>App generation costs vary based on complexity (typically 10-50 credits)</li>
                        <li>Credits never expire once purchased</li>
                        <li>Unused credits carry over between billing cycles</li>
                      </ul>
                      <p>
                        Payment processing is handled through PayPal. All prices are in USD unless otherwise specified. 
                        Subscription fees are non-refundable except as required by law.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Acceptable Use */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-acceptable-use">5. Acceptable Use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        You agree not to use the Service to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Generate applications that violate any applicable laws or regulations</li>
                        <li>Create malicious software, including viruses, malware, or spyware</li>
                        <li>Infringe upon the intellectual property rights of others</li>
                        <li>Generate content that is discriminatory, hateful, or offensive</li>
                        <li>Attempt to reverse engineer or compromise our AI systems</li>
                        <li>Use the service for any commercial purpose without proper licensing</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Intellectual Property */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-ip">6. Intellectual Property</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        Generated Code: You retain full ownership of the Flutter applications generated through our Service. 
                        However, the underlying AI models, algorithms, and platform technology remain our intellectual property.
                      </p>
                      <p>
                        Appio Flow Platform: All rights, title, and interest in and to the Service, including all related 
                        intellectual property rights, remain with Appio Flow and its licensors.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Availability */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-availability">7. Service Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        We strive to maintain high service availability but cannot guarantee uninterrupted access. 
                        The Service may be temporarily unavailable due to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Scheduled maintenance</li>
                        <li>System upgrades</li>
                        <li>Force majeure events</li>
                        <li>Third-party service dependencies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Limitation of Liability */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-liability">8. Limitation of Liability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        To the maximum extent permitted by law, Appio Flow shall not be liable for any indirect, 
                        incidental, special, consequential, or punitive damages, including without limitation, loss of 
                        profits, data, use, goodwill, or other intangible losses.
                      </p>
                      <p>
                        Our total liability to you for all damages shall not exceed the amount paid by you for the 
                        Service during the twelve (12) months preceding the claim.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Termination */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-termination">9. Termination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, 
                        for any reason, including without limitation if you breach the Terms.
                      </p>
                      <p>
                        Upon termination, your right to use the Service will cease immediately. All provisions of 
                        the Terms that by their nature should survive termination shall survive.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-contact">10. Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        If you have any questions about these Terms of Service, please contact us at:
                      </p>
                      <div className="bg-muted p-4 rounded-lg" data-testid="contact-details">
                        <p><strong>Email:</strong> legal@appioflow.com</p>
                        <p><strong>Support:</strong> support@appioflow.com</p>
                        <p><strong>Address:</strong> Noorixa AI Ecosystem</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
