import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Github, 
  Linkedin, 
  Twitter,
  Mail,
  Users,
  Sparkles,
  Code,
  Palette,
  Shield,
  Megaphone
} from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former Google engineer with 10+ years in mobile development. Sarah leads our vision to democratize app development through AI.",
      icon: Users,
      color: "bg-blue-500",
      initials: "SC"
    },
    {
      name: "Ahmed Hassan",
      role: "Co-Founder & CTO",
      bio: "AI researcher and Flutter expert. Ahmed architected our core Gemini AI integration and leads our technical development.",
      icon: Code,
      color: "bg-green-500",
      initials: "AH"
    },
    {
      name: "Maria Rodriguez",
      role: "Head of AI Engineering",
      bio: "Specialized in natural language processing and machine learning. Maria ensures our AI understands and generates exactly what users need.",
      icon: Sparkles,
      color: "bg-purple-500",
      initials: "MR"
    },
    {
      name: "David Kim",
      role: "Senior Flutter Developer",
      bio: "Flutter framework contributor with deep expertise in mobile app architecture. David ensures all generated code follows best practices.",
      icon: Code,
      color: "bg-indigo-500",
      initials: "DK"
    },
    {
      name: "Lisa Thompson",
      role: "Head of Design",
      bio: "UX/UI designer who previously worked with major tech companies. Lisa crafts the beautiful themes and user experiences in our platform.",
      icon: Palette,
      color: "bg-pink-500",
      initials: "LT"
    },
    {
      name: "Omar Al-Said",
      role: "DevOps Engineer",
      bio: "Infrastructure specialist ensuring our platform scales globally. Omar manages our cloud architecture and deployment pipelines.",
      icon: Shield,
      color: "bg-orange-500",
      initials: "OA"
    },
    {
      name: "Jennifer Wu",
      role: "Product Marketing Manager",
      bio: "Growth expert who helps developers discover Appio Flow. Jennifer connects with our community and drives product adoption.",
      icon: Megaphone,
      color: "bg-teal-500",
      initials: "JW"
    },
    {
      name: "Robert Johnson",
      role: "Customer Success Lead",
      bio: "Dedicated to ensuring every user succeeds with Appio Flow. Robert leads our support team and user onboarding programs.",
      icon: Users,
      color: "bg-red-500",
      initials: "RJ"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="team-title">
                Meet the Appio Flow Team
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-testid="team-subtitle">
                We're a passionate group of engineers, designers, and innovators dedicated to making app development 
                accessible to everyone. Our diverse team combines expertise in AI, mobile development, and user experience 
                to create the best possible platform for our users.
              </p>
              <Badge variant="outline" className="mb-8">
                <Users className="mr-2 h-4 w-4" />
                8 Team Members Across 4 Countries
              </Badge>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300" data-testid={`team-member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader className="text-center pb-4">
                    <div className="relative mb-4">
                      <Avatar className="w-24 h-24 mx-auto">
                        <AvatarFallback className={`text-white text-xl font-semibold ${member.color}`}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${member.color} rounded-full flex items-center justify-center`}>
                        <member.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-lg" data-testid={`member-name-${index}`}>{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary" data-testid={`member-role-${index}`}>
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4" data-testid={`member-bio-${index}`}>
                      {member.bio}
                    </p>
                    
                    {/* Social Links Placeholder */}
                    <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" data-testid={`member-linkedin-${index}`}>
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" data-testid={`member-github-${index}`}>
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" data-testid={`member-email-${index}`}>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="culture-title">Our Culture</h2>
              <p className="text-xl text-muted-foreground">
                What makes working at Appio Flow special
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Innovation First",
                  description: "We encourage experimentation and embrace new technologies",
                  icon: Sparkles,
                  color: "bg-purple-500"
                },
                {
                  title: "Remote Friendly",
                  description: "Work from anywhere in the world with flexible hours",
                  icon: Users,
                  color: "bg-blue-500"
                },
                {
                  title: "Continuous Learning",
                  description: "We invest in our team's growth and development",
                  icon: Code,
                  color: "bg-green-500"
                },
                {
                  title: "User Focused",
                  description: "Every decision is made with our users' success in mind",
                  icon: Shield,
                  color: "bg-orange-500"
                }
              ].map((value, index) => (
                <Card key={index} className="text-center p-6" data-testid={`culture-${value.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${value.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <value.icon className="text-white h-6 w-6" />
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

        {/* Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto p-8 text-center">
              <CardHeader>
                <CardTitle className="text-3xl mb-4" data-testid="join-us-title">Join Our Team</CardTitle>
                <CardDescription className="text-lg" data-testid="join-us-subtitle">
                  We're always looking for talented individuals who share our passion for innovation and user-centric design.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold mb-2">💰 Competitive Salary</h4>
                    <p className="text-sm text-muted-foreground">Market-leading compensation packages</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🏥 Health Benefits</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive health, dental, and vision coverage</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📈 Equity Options</h4>
                    <p className="text-sm text-muted-foreground">Share in the company's success and growth</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-primary to-purple-600" data-testid="button-view-openings">
                    View Open Positions
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Don't see a role that fits? Send us your resume at{" "}
                  <span className="text-primary font-medium" data-testid="careers-email">careers@appioflow.com</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
}
