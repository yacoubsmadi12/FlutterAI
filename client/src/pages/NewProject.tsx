import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Lightbulb, 
  Palette, 
  Globe, 
  Smartphone,
  ArrowLeft,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function NewProject() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    theme: "modern",
    language: "en",
  });

  const [promptSuggestions] = useState([
    "Create a social media app for sharing photos with friends",
    "Build a task management app with calendar integration",
    "Design a fitness tracking app with workout plans",
    "Develop an e-commerce app for local businesses",
    "Make a recipe sharing app with meal planning",
    "Create a meditation and mindfulness app",
  ]);

  const createProjectMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/projects", data);
      return response.json();
    },
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project created!",
        description: "Your new project has been created successfully.",
      });
      setLocation(`/projects/${project.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create project",
        description: error.message || "An error occurred while creating your project.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a project.",
        variant: "destructive",
      });
      return;
    }

    createProjectMutation.mutate({
      ...formData,
      userId: user.id,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({
      ...prev,
      description: suggestion,
    }));
  };

  const themes = [
    { value: "modern", label: "Modern", description: "Clean and contemporary design" },
    { value: "minimal", label: "Minimal", description: "Simple and focused interface" },
    { value: "colorful", label: "Colorful", description: "Vibrant and energetic design" },
    { value: "dark", label: "Dark", description: "Dark mode optimized interface" },
  ];

  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  return (
    <Layout showSidebar>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/projects" data-testid="button-back">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="new-project-title">Create New Project</h1>
            <p className="text-muted-foreground">Start building your Flutter app with AI assistance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Project Details
                  </CardTitle>
                  <CardDescription>
                    Basic information about your Flutter application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">App Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="My Awesome App"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      data-testid="input-name"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This will be the display name of your Flutter application
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description">App Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your app idea in detail. What features should it have? Who is the target audience? Be as specific as possible..."
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      data-testid="textarea-description"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Detailed descriptions help our AI generate better code. Include features, functionality, and design preferences.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="mr-2 h-5 w-5" />
                    Design Settings
                  </CardTitle>
                  <CardDescription>
                    Choose the visual style and language for your app
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={formData.theme} onValueChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}>
                      <SelectTrigger data-testid="select-theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme.value} value={theme.value}>
                            <div>
                              <div className="font-medium">{theme.label}</div>
                              <div className="text-xs text-muted-foreground">{theme.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger data-testid="select-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            <div className="flex items-center">
                              <span className="mr-2">{lang.flag}</span>
                              {lang.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between pt-6">
                <div className="text-sm text-muted-foreground">
                  <Zap className="inline h-4 w-4 mr-1" />
                  Initial generation will use ~10 credits
                </div>
                <Button
                  type="submit"
                  disabled={createProjectMutation.isPending || !formData.name.trim() || !formData.description.trim()}
                  className="bg-gradient-to-r from-primary to-purple-600"
                  data-testid="button-create"
                >
                  {createProjectMutation.isPending ? (
                    "Creating..."
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create Project
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                  Tips for Better Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Be specific about features and functionality you want</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Mention your target audience and use cases</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Include design preferences and color schemes</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Describe the main user flow and navigation</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Ideas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
                  Quick Ideas
                </CardTitle>
                <CardDescription>
                  Click to use as inspiration for your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors w-full text-sm"
                    data-testid={`suggestion-${index}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Credits Remaining</span>
                  <Badge variant="outline" data-testid="credits-remaining">
                    {user?.credits || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Plan</span>
                  <Badge variant={user?.subscription === "pro" ? "default" : "secondary"} data-testid="current-plan">
                    {user?.subscription || "Free"}
                  </Badge>
                </div>
                {(user?.credits || 0) < 10 && (
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <p className="text-sm text-orange-600 dark:text-orange-300">
                      You need at least 10 credits to generate an app.
                    </p>
                    <Link href="/billing" data-testid="link-buy-credits">
                      <Button variant="outline" size="sm" className="mt-2 text-orange-600 border-orange-600">
                        Buy Credits
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
