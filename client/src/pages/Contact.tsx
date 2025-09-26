import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Twitter,
  Github,
  Linkedin
} from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="contact-title">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed" data-testid="contact-subtitle">
                Have questions about Appio Flow? Need technical support? We'd love to hear from you. 
                Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="contact-info-title">Contact Information</CardTitle>
                    <CardDescription>
                      Multiple ways to reach our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Email Support</h4>
                        <p className="text-sm text-muted-foreground" data-testid="support-email">
                          support@appioflow.com
                        </p>
                        <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MessageCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Live Chat</h4>
                        <p className="text-sm text-muted-foreground">
                          Available on our platform
                        </p>
                        <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM UTC</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Support Hours</h4>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM UTC
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Saturday - Sunday: Limited support
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="social-title">Follow Us</CardTitle>
                    <CardDescription>
                      Stay updated with our latest news and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors" data-testid="social-twitter">
                        <Twitter className="h-5 w-5 text-blue-500" />
                      </a>
                      <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors" data-testid="social-github">
                        <Github className="h-5 w-5 text-foreground" />
                      </a>
                      <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors" data-testid="social-linkedin">
                        <Linkedin className="h-5 w-5 text-blue-700" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="quick-links-title">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-documentation">
                      📖 Documentation
                    </a>
                    <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-api-reference">
                      🔧 API Reference
                    </a>
                    <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-status">
                      🟢 System Status
                    </a>
                    <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-changelog">
                      📝 Changelog
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="contact-form-title">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            data-testid="input-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            data-testid="input-email"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          required
                          data-testid="textarea-message"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto"
                        data-testid="button-submit"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* FAQ Section */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle data-testid="faq-title">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div data-testid="faq-response-time">
                      <h4 className="font-semibold mb-2">How quickly do you respond to support requests?</h4>
                      <p className="text-sm text-muted-foreground">
                        We aim to respond to all support requests within 24 hours during business days. 
                        For urgent issues, please mark your message as "urgent" in the subject line.
                      </p>
                    </div>

                    <div data-testid="faq-technical-support">
                      <h4 className="font-semibold mb-2">Do you provide technical support for generated apps?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes! We provide comprehensive technical support for all apps generated through Appio Flow. 
                        This includes help with deployment, customization, and troubleshooting.
                      </p>
                    </div>

                    <div data-testid="faq-feature-requests">
                      <h4 className="font-semibold mb-2">Can I request new features?</h4>
                      <p className="text-sm text-muted-foreground">
                        Absolutely! We love hearing from our users about what features would make Appio Flow 
                        even better. Send us your ideas and we'll consider them for future updates.
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
