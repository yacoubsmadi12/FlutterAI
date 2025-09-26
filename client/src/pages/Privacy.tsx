import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, Users, Globe } from "lucide-react";

export default function Privacy() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold" data-testid="privacy-title">Appio Flow Privacy Policy</h1>
              </div>
              <p className="text-xl text-muted-foreground mb-6" data-testid="privacy-subtitle">
                Your privacy is important to us. This policy explains how we collect, use, and protect your data.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Badge variant="outline">
                  Last Updated: September 26, 2025
                </Badge>
                <Badge variant="outline">
                  <Globe className="mr-1 h-3 w-3" />
                  GDPR Compliant
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-blue-500" />
                    Privacy at a Glance
                  </CardTitle>
                  <CardDescription>
                    Key points about how we handle your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center" data-testid="privacy-highlights">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-green-800 dark:text-green-200">Data Encryption</h3>
                      <p className="text-sm text-green-600 dark:text-green-300">All data encrypted in transit and at rest</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200">No Data Selling</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-300">We never sell your personal information</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-purple-800 dark:text-purple-200">Your Control</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-300">You control your data and privacy settings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                {/* Information We Collect */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-collection">1. Information We Collect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Account Information</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Email address and username</li>
                          <li>Display name and profile photo (optional)</li>
                          <li>Authentication provider information (Google OAuth)</li>
                          <li>Language and theme preferences</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Usage Data</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>App generation prompts and settings</li>
                          <li>Project names and descriptions</li>
                          <li>Generated Flutter code and assets</li>
                          <li>Usage patterns and feature interactions</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Technical Information</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>IP address and device identifiers</li>
                          <li>Browser type and version</li>
                          <li>Operating system information</li>
                          <li>Session logs and error reports</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* How We Use Your Information */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-usage">2. How We Use Your Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>We use the collected information for the following purposes:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Service Provision</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Generate Flutter applications using AI</li>
                            <li>Manage your projects and files</li>
                            <li>Process payments and billing</li>
                            <li>Provide customer support</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Service Improvement</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Improve AI model accuracy</li>
                            <li>Analyze usage patterns</li>
                            <li>Debug and fix technical issues</li>
                            <li>Develop new features</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Sharing */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-sharing">3. Data Sharing and Disclosure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                      </p>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Service Providers</h4>
                        <p>We may share data with trusted service providers who assist us in operating our platform:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>Google Cloud Platform (for AI processing and hosting)</li>
                          <li>PayPal (for payment processing)</li>
                          <li>Firebase (for authentication and database services)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Legal Requirements</h4>
                        <p>We may disclose your information when required by law or to:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>Comply with legal obligations</li>
                          <li>Protect our rights and property</li>
                          <li>Ensure user safety</li>
                          <li>Investigate potential violations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Security */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-security">4. Data Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>We implement industry-standard security measures to protect your information:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Technical Safeguards</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>SSL/TLS encryption for data transmission</li>
                            <li>AES encryption for data storage</li>
                            <li>Regular security audits and updates</li>
                            <li>Multi-factor authentication support</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Operational Security</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Limited access to personal data</li>
                            <li>Employee background checks</li>
                            <li>Incident response procedures</li>
                            <li>Regular backup and recovery testing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Retention */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-retention">5. Data Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>We retain your information for as long as necessary to provide our services:</p>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Retention Periods</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Account Data:</strong> Until account deletion requested</li>
                          <li><strong>Project Data:</strong> Until manually deleted or account closure</li>
                          <li><strong>Usage Logs:</strong> 12 months for service improvement</li>
                          <li><strong>Payment Records:</strong> 7 years for tax and legal compliance</li>
                        </ul>
                      </div>
                      <p>
                        You can request deletion of your data at any time by contacting our support team.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Your Rights */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-rights">6. Your Privacy Rights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>You have the following rights regarding your personal data:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Access and Control</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>View and download your data</li>
                            <li>Update your information</li>
                            <li>Delete your account</li>
                            <li>Control data processing</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">GDPR Rights (EU Users)</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Right to rectification</li>
                            <li>Right to erasure</li>
                            <li>Right to data portability</li>
                            <li>Right to object</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cookies and Tracking */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-cookies">7. Cookies and Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>We use cookies and similar technologies to enhance your experience:</p>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Types of Cookies</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Essential:</strong> Required for basic platform functionality</li>
                          <li><strong>Analytics:</strong> Help us understand how you use our service</li>
                          <li><strong>Preferences:</strong> Remember your settings and choices</li>
                        </ul>
                      </div>
                      <p>
                        You can control cookie preferences through your browser settings. Note that disabling certain cookies may affect platform functionality.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* International Transfers */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-transfers">8. International Data Transfers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        Your data may be processed in countries other than your country of residence. We ensure appropriate safeguards are in place:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Adequacy decisions by relevant authorities</li>
                        <li>Standard contractual clauses</li>
                        <li>Binding corporate rules</li>
                        <li>Certification schemes</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="section-contact">9. Contact Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                      </p>
                      <div className="bg-muted p-4 rounded-lg" data-testid="contact-details">
                        <p><strong>Privacy Officer:</strong> privacy@appioflow.com</p>
                        <p><strong>General Support:</strong> support@appioflow.com</p>
                        <p><strong>Data Protection Officer:</strong> dpo@appioflow.com</p>
                        <p><strong>Address:</strong> Noorixa AI Ecosystem</p>
                      </div>
                      <p>
                        We will respond to privacy inquiries within 30 days of receipt.
                      </p>
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
