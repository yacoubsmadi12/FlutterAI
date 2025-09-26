import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Sparkles, 
  Brain, 
  Eye, 
  Download, 
  FolderOpen, 
  Globe, 
  Palette,
  Rocket,
  Play,
  Users,
  Smartphone,
  Star,
  Calendar,
  Check
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Badge */}
            <Badge variant="outline" className="mb-8" data-testid="hero-badge">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              Powered by Gemini AI
            </Badge>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6" data-testid="hero-title">
              From Prompt to App —<br/>
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Effortless with AI
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed" data-testid="hero-subtitle">
              {t("hero.subtitle")}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/register" data-testid="button-start-building">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <Rocket className="mr-2 h-5 w-5" />
                  {t("hero.cta")}
                </Button>
              </Link>
              <Button variant="outline" size="lg" data-testid="button-watch-demo">
                <Play className="mr-2 h-5 w-5" />
                {t("hero.demo")}
              </Button>
            </div>
            
            {/* Demo Preview */}
            <div className="relative max-w-5xl mx-auto">
              <Card className="overflow-hidden shadow-2xl" data-testid="demo-preview">
                {/* Top bar */}
                <div className="flex items-center justify-between p-4 border-b bg-muted/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">Appio Flow Workspace</div>
                  <div className="w-20"></div>
                </div>
                
                {/* Mock interface content */}
                <div className="p-6">
                  <div className="flex space-x-6">
                    {/* Left sidebar */}
                    <div className="w-64 space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-foreground">Project Settings</div>
                        <div className="space-y-1">
                          <div className="h-8 bg-muted rounded flex items-center px-3 text-sm text-muted-foreground">
                            <Smartphone className="mr-2 h-4 w-4" />
                            Shopping App
                          </div>
                          <div className="h-8 bg-muted rounded flex items-center px-3 text-sm text-muted-foreground">
                            <Palette className="mr-2 h-4 w-4" />
                            Modern Theme
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="flex-1 space-y-4">
                      <Card className="p-4">
                        <div className="text-sm font-medium mb-2">Describe your app idea...</div>
                        <div className="h-24 bg-muted rounded p-3 text-sm text-muted-foreground">
                          "Create a shopping app with product listings, cart functionality, and user authentication"
                        </div>
                      </Card>
                      
                      <Button className="w-full bg-gradient-to-r from-primary to-purple-600">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate with Gemini
                      </Button>
                      
                      {/* Generated code preview */}
                      <Card className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-medium">Generated Flutter Code</div>
                          <div className="flex space-x-2">
                            <Badge variant="secondary">Pages</Badge>
                            <Badge variant="secondary">Code</Badge>
                            <Badge variant="secondary">Assets</Badge>
                          </div>
                        </div>
                        <div className="h-32 bg-slate-900 dark:bg-slate-800 rounded p-3 text-green-400 font-mono text-xs overflow-hidden">
                          <div>import 'package:flutter/material.dart';</div>
                          <div></div>
                          <div>class ShoppingApp extends StatelessWidget {`{`}</div>
                          <div>&nbsp;&nbsp;@override</div>
                          <div>&nbsp;&nbsp;Widget build(BuildContext context) {`{`}</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;return MaterialApp(</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: 'Shopping App',</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;theme: ThemeData(</div>
                        </div>
                      </Card>
                    </div>
                    
                    {/* Right preview */}
                    <div className="w-64">
                      <div className="text-sm font-medium mb-2">Live Preview</div>
                      <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 h-96 flex items-center justify-center">
                        <div className="bg-white dark:bg-slate-100 rounded-lg w-32 h-56 shadow-lg flex flex-col">
                          <div className="bg-primary h-12 rounded-t-lg flex items-center justify-center">
                            <span className="text-white text-xs font-medium">Shopping App</span>
                          </div>
                          <div className="p-2 flex-1 space-y-2">
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                            <div className="space-y-1 mt-3">
                              <div className="h-3 bg-slate-100 rounded"></div>
                              <div className="h-3 bg-slate-100 rounded"></div>
                              <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="features-title">
              {t("features.title")}
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="features-subtitle">
              {t("features.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature Cards */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="feature-ai-builder">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Brain className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered App Builder</h3>
              <p className="text-muted-foreground mb-4">
                Describe your app in plain language and watch as Gemini AI generates complete Flutter code with intelligent structure and best practices.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                <span>Powered by Gemini</span>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="feature-live-preview">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Eye className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Real-Time Preview</h3>
              <p className="text-muted-foreground mb-4">
                See your app come to life instantly with our Flutter web preview. Test interactions and UI elements before downloading.
              </p>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <span>Instant feedback</span>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="feature-zip-download">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">ZIP Download</h3>
              <p className="text-muted-foreground mb-4">
                Get your complete Flutter project as a ready-to-use ZIP file with all dependencies, assets, and configuration files included.
              </p>
              <div className="flex items-center text-sm text-purple-600 font-medium">
                <span>Production ready</span>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="feature-project-management">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <FolderOpen className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Project Management</h3>
              <p className="text-muted-foreground mb-4">
                Organize your apps with a powerful dashboard. Track generation history, manage settings, and iterate on your projects.
              </p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <span>Stay organized</span>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="feature-multi-language">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Multi-Language Support</h3>
              <p className="text-muted-foreground mb-4">
                Work in your preferred language with support for English and Arabic, including right-to-left layout support.
              </p>
              <div className="flex items-center text-sm text-indigo-600 font-medium">
                <span>Global accessibility</span>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="feature-theme-customization">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Palette className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Theme Customization</h3>
              <p className="text-muted-foreground mb-4">
                Choose from beautiful pre-built themes or let AI suggest the perfect design that matches your app's purpose and audience.
              </p>
              <div className="flex items-center text-sm text-pink-600 font-medium">
                <span>Beautiful designs</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="pricing-title">
              {t("pricing.title")}
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="pricing-subtitle">
              {t("pricing.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8" data-testid="pricing-free">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Free</h3>
                <div className="text-4xl font-bold text-foreground mb-2">$0</div>
                <p className="text-muted-foreground">Perfect for trying out the platform</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">100 free credits</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">3 projects</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">Basic themes</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">Community support</span>
                </div>
              </div>
              
              <Link href="/register" data-testid="button-free-plan">
                <Button variant="outline" className="w-full">Get Started Free</Button>
              </Link>
            </Card>
            
            {/* Pro Plan */}
            <Card className="p-8 border-primary relative overflow-hidden" data-testid="pricing-pro">
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
                <div className="text-4xl font-bold text-foreground mb-2">$29</div>
                <p className="text-muted-foreground">For serious app developers</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">3,000 credits ($30 value)</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">Unlimited projects</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">Premium themes</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">Priority support</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">Advanced customization</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-primary to-purple-600" data-testid="button-pro-plan">
                Choose Pro
              </Button>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="p-8" data-testid="pricing-enterprise">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-foreground mb-2">$99</div>
                <p className="text-muted-foreground">For teams and businesses</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">12,000 credits ($120 value)</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">Team collaboration</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">Custom themes</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">24/7 dedicated support</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-foreground">API access</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" data-testid="button-enterprise-plan">
                Contact Sales
              </Button>
            </Card>
          </div>
          
          {/* Credit System Info */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <Card className="p-6 bg-muted/50" data-testid="credit-system-info">
              <h4 className="font-semibold text-foreground mb-2">How Credits Work</h4>
              <p className="text-muted-foreground">
                Each app generation consumes credits based on complexity. Simple apps use ~10 credits, 
                while complex apps with multiple features may use ~50 credits. $1 = 100 credits.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              Ready to Build Your Next App?
            </h2>
            <p className="text-xl text-muted-foreground mb-10" data-testid="cta-subtitle">
              Join thousands of developers who are already using Appio Flow to bring their ideas to life faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" data-testid="button-cta-start">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Building for Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" data-testid="button-cta-demo">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 mt-12 text-muted-foreground">
              <div className="flex items-center" data-testid="trust-developers">
                <Users className="mr-2 h-5 w-5" />
                <span className="text-sm">10,000+ Developers</span>
              </div>
              <div className="flex items-center" data-testid="trust-apps">
                <Smartphone className="mr-2 h-5 w-5" />
                <span className="text-sm">50,000+ Apps Generated</span>
              </div>
              <div className="flex items-center" data-testid="trust-rating">
                <Star className="mr-2 h-5 w-5" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Smartphone className="text-primary-foreground w-4 h-4" />
                </div>
                <span className="text-xl font-bold text-foreground">Appio Flow</span>
              </div>
              <p className="text-muted-foreground text-sm">
                {t("footer.tagline")}
              </p>
            </div>
            
            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-features">Features</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-pricing">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-docs">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-api">API Reference</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" data-testid="footer-about"><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">About Us</span></Link></li>
                <li><Link href="/team" data-testid="footer-team"><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Meet Our Team</span></Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-careers">Careers</a></li>
                <li><Link href="/contact" data-testid="footer-contact"><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Contact</span></Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" data-testid="footer-terms"><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Terms & Conditions</span></Link></li>
                <li><Link href="/privacy" data-testid="footer-privacy"><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span></Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-cookies">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-support">Support</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground" data-testid="footer-copyright">
              © 2024 Appio Flow. All rights reserved. Part of Noorixa AI ecosystem.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground" data-testid="footer-support-email">Support: support@appioflow.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
