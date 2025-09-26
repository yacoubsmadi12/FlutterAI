import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import { Smartphone, Sparkles, Target, Users, Globe, Zap } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                  <Smartphone className="text-primary-foreground w-6 h-6" />
                </div>
                <h1 className="text-4xl font-bold" data-testid="about-title">About Appio Flow</h1>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="about-subtitle">
                Appio Flow is part of the Noorixa AI ecosystem, built to simplify app creation with the power of AI. 
                We believe that everyone should have the ability to bring their app ideas to life, regardless of their 
                technical background.
              </p>
              
              <Badge variant="outline" className="mb-8">
                <Sparkles className="mr-2 h-4 w-4" />
                Powered by Gemini AI
              </Badge>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="p-8">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <Target className="text-primary-foreground h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl" data-testid="mission-title">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed" data-testid="mission-description">
                    To democratize app development by making it accessible to everyone. We aim to bridge the gap 
                    between innovative ideas and technical implementation, empowering creators to build the next 
                    generation of mobile applications with the assistance of artificial intelligence.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="text-white h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl" data-testid="vision-title">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed" data-testid="vision-description">
                    To become the world's leading platform for AI-powered app development, where millions of 
                    creators can transform their ideas into reality within minutes. We envision a future where 
                    the barrier between imagination and implementation no longer exists.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="what-we-do-title">What We Do</h2>
              <p className="text-xl text-muted-foreground">
                We leverage cutting-edge AI technology to transform your app concepts into production-ready Flutter applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="text-center p-6">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-white h-8 w-8" />
                  </div>
                  <CardTitle data-testid="ai-generation-title">AI-Powered Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our advanced Gemini AI understands your natural language descriptions and converts them into 
                    structured, production-ready Flutter code following best practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-white h-8 w-8" />
                  </div>
                  <CardTitle data-testid="instant-preview-title">Instant Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See your app come to life instantly with our real-time preview system. Test functionality 
                    and iterate on your design before downloading the final product.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-white h-8 w-8" />
                  </div>
                  <CardTitle data-testid="community-title">Community Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built for developers, by developers. We continuously improve our platform based on community 
                    feedback and the evolving needs of the mobile development ecosystem.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-3xl text-center mb-6" data-testid="our-story-title">Our Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="story-paragraph-1">
                    Appio Flow was born from a simple observation: too many great app ideas never see the light of day 
                    because of technical barriers. Our founders, experienced developers who had worked with countless 
                    startups and entrepreneurs, witnessed brilliant concepts get shelved due to development costs, 
                    time constraints, or lack of technical expertise.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed" data-testid="story-paragraph-2">
                    With the advent of advanced AI technologies like Google's Gemini, we saw an opportunity to change 
                    this narrative. We envisioned a platform where the gap between idea and implementation could be 
                    measured in minutes, not months. Where creativity and innovation would be the only prerequisites 
                    for app development.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed" data-testid="story-paragraph-3">
                    Today, Appio Flow serves thousands of developers, entrepreneurs, and businesses worldwide, helping 
                    them transform their visions into tangible mobile applications. As part of the Noorixa AI ecosystem, 
                    we continue to push the boundaries of what's possible when human creativity meets artificial intelligence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="values-title">Our Values</h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Innovation",
                  description: "We embrace cutting-edge technology to solve real-world problems",
                  icon: Sparkles,
                },
                {
                  title: "Accessibility",
                  description: "Technology should be accessible to everyone, regardless of background",
                  icon: Users,
                },
                {
                  title: "Quality",
                  description: "We never compromise on the quality of our generated applications",
                  icon: Target,
                },
                {
                  title: "Community",
                  description: "Our users' success is our success, and we grow together",
                  icon: Globe,
                },
              ].map((value, index) => (
                <Card key={index} className="text-center p-6" data-testid={`value-${value.title.toLowerCase()}`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="text-primary-foreground h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
