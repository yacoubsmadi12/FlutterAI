import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Project } from "@shared/schema";
import { Sparkles, Settings, Code, FileText, Image, Play, Download } from "lucide-react";

export default function ProjectWorkspace() {
  const [, params] = useRoute("/projects/:id");
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const projectId = params?.id;

  const [prompt, setPrompt] = useState("");
  const [projectSettings, setProjectSettings] = useState({
    name: "",
    theme: "modern",
    language: "en",
  });

  const { data: project, isLoading } = useQuery({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  const { data: generations = [] } = useQuery({
    queryKey: ["/api/generations", projectId],
    enabled: !!projectId,
  });

  const generateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/generate", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId] });
      queryClient.invalidateQueries({ queryKey: ["/api/generations", projectId] });
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id] });
      toast({
        title: "Generation completed!",
        description: "Your Flutter app has been generated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate app code.",
        variant: "destructive",
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async (updates: Partial<Project>) => {
      const response = await apiRequest("PATCH", `/api/projects/${projectId}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId] });
    },
  });

  useEffect(() => {
    if (project) {
      setProjectSettings({
        name: project.name,
        theme: project.theme || "modern",
        language: project.language || "en",
      });
    }
  }, [project]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please describe your app idea before generating.",
        variant: "destructive",
      });
      return;
    }

    if (!user || user.credits < 10) {
      toast({
        title: "Insufficient credits",
        description: "You need at least 10 credits to generate an app.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({
      projectId,
      userId: user.id,
      prompt,
      theme: projectSettings.theme,
      language: projectSettings.language,
    });
  };

  const handleUpdateProject = () => {
    updateProjectMutation.mutate(projectSettings);
  };

  const downloadProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/download`);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project?.name || "flutter-app"}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download project files.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout showSidebar>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout showSidebar>
        <div className="p-6">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
              <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSidebar>
      <div className="p-6">
        {/* Project Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" data-testid="project-title">{project.name}</h1>
            <p className="text-muted-foreground" data-testid="project-description">{project.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            {project.generatedCode && (
              <Button variant="outline" onClick={downloadProject} data-testid="button-download">
                <Download className="mr-2 h-4 w-4" />
                Download ZIP
              </Button>
            )}
            <Button onClick={handleUpdateProject} disabled={updateProjectMutation.isPending} data-testid="button-save-settings">
              <Settings className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Input & Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Project Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="projectName">App Name</Label>
                  <Input
                    id="projectName"
                    value={projectSettings.name}
                    onChange={(e) => setProjectSettings(prev => ({ ...prev, name: e.target.value }))}
                    data-testid="input-project-name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={projectSettings.theme}
                    onValueChange={(value) => setProjectSettings(prev => ({ ...prev, theme: value }))}
                  >
                    <SelectTrigger data-testid="select-theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="colorful">Colorful</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={projectSettings.language}
                    onValueChange={(value) => setProjectSettings(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger data-testid="select-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Prompt Input */}
            <Card>
              <CardHeader>
                <CardTitle>Describe Your App Idea</CardTitle>
                <CardDescription>
                  Tell us what kind of app you want to build. Be as detailed as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Create a shopping app with product listings, cart functionality, and user authentication..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  data-testid="textarea-prompt"
                />
                
                <Button
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-primary to-purple-600"
                  data-testid="button-generate"
                >
                  {generateMutation.isPending ? (
                    "Generating..."
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with Gemini
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  This will use approximately 10 credits
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Generated Content & Preview */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="code" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="code" data-testid="tab-code">
                  <Code className="mr-2 h-4 w-4" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="pages" data-testid="tab-pages">
                  <FileText className="mr-2 h-4 w-4" />
                  Pages
                </TabsTrigger>
                <TabsTrigger value="preview" data-testid="tab-preview">
                  <Play className="mr-2 h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="mt-6">
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle>Generated Flutter Code</CardTitle>
                    <CardDescription>
                      View and explore your generated Flutter application code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {project.generatedCode ? (
                      <div className="bg-slate-900 dark:bg-slate-800 rounded p-4 h-[500px] overflow-auto">
                        <pre className="text-green-400 text-sm font-mono" data-testid="generated-code">
                          {JSON.stringify(project.generatedCode, null, 2)}
                        </pre>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[500px] text-muted-foreground" data-testid="no-code">
                        <div className="text-center">
                          <Code className="mx-auto h-12 w-12 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No code generated yet</h3>
                          <p>Describe your app idea and generate code to see it here</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pages" className="mt-6">
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle>App Pages</CardTitle>
                    <CardDescription>
                      Explore the different pages and screens in your app
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {project.generatedCode?.pages ? (
                      <div className="space-y-4" data-testid="app-pages">
                        {Object.entries(project.generatedCode.pages).map(([pageName, pageCode]) => (
                          <Card key={pageName}>
                            <CardHeader>
                              <CardTitle className="text-lg">{pageName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-muted rounded p-3">
                                <pre className="text-sm overflow-auto max-h-32">
                                  {String(pageCode)}
                                </pre>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[500px] text-muted-foreground" data-testid="no-pages">
                        <div className="text-center">
                          <FileText className="mx-auto h-12 w-12 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No pages generated yet</h3>
                          <p>Generate your app to see the pages here</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>
                      See how your app will look on mobile devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-[500px]">
                      {project.generatedCode ? (
                        <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-8 flex items-center justify-center" data-testid="app-preview">
                          <div className="bg-white dark:bg-slate-100 rounded-lg w-64 h-96 shadow-lg flex flex-col">
                            <div className="bg-primary h-16 rounded-t-lg flex items-center justify-center">
                              <span className="text-white font-medium">{project.name}</span>
                            </div>
                            <div className="p-4 flex-1 space-y-3">
                              <div className="h-6 bg-slate-200 rounded"></div>
                              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                              <div className="space-y-2 mt-6">
                                <div className="h-4 bg-slate-100 rounded"></div>
                                <div className="h-4 bg-slate-100 rounded"></div>
                                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                              </div>
                              <div className="mt-6 space-y-2">
                                <div className="h-8 bg-primary/20 rounded"></div>
                                <div className="h-8 bg-primary/20 rounded"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground" data-testid="no-preview">
                          <Play className="mx-auto h-12 w-12 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No preview available</h3>
                          <p>Generate your app to see a live preview here</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
