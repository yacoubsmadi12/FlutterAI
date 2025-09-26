import { useRoute, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  RefreshCw, 
  FileText, 
  Clock, 
  User, 
  Calendar,
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function ProjectDetails() {
  const [, params] = useRoute("/projects/:id/details");
  const { toast } = useToast();
  const projectId = params?.id;

  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  const { data: generations = [], isLoading: generationsLoading } = useQuery({
    queryKey: ["/api/generations", projectId],
    enabled: !!projectId,
  });

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
      
      toast({
        title: "Download started",
        description: "Your Flutter project is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download project files.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (projectLoading) {
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href={`/projects/${projectId}`} data-testid="button-back">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Workspace
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold" data-testid="project-title">{project.name}</h1>
              <p className="text-muted-foreground" data-testid="project-description">{project.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {project.generatedCode && (
              <Button onClick={downloadProject} data-testid="button-download-zip">
                <Download className="mr-2 h-4 w-4" />
                Download Flutter ZIP
              </Button>
            )}
            <Link href={`/projects/${projectId}`} data-testid="button-regenerate">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate Page
              </Button>
            </Link>
          </div>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              {getStatusIcon(project.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize" data-testid="project-status">
                {project.status}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Theme</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize" data-testid="project-theme">
                {project.theme}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Language</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold uppercase" data-testid="project-language">
                {project.language}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="project-updated">
                {new Date(project.updatedAt!).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="files" className="space-y-6">
          <TabsList>
            <TabsTrigger value="files" data-testid="tab-files">Files Overview</TabsTrigger>
            <TabsTrigger value="logs" data-testid="tab-logs">Generation Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle data-testid="files-title">Project Files</CardTitle>
                <CardDescription>
                  Overview of all generated files in your Flutter project
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.generatedCode ? (
                  <div className="space-y-4" data-testid="files-overview">
                    {/* Main Dart File */}
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <h4 className="font-semibold">main.dart</h4>
                            <p className="text-sm text-muted-foreground">Main application entry point</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Dart</Badge>
                      </div>
                    </Card>

                    {/* Pubspec.yaml */}
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-yellow-500" />
                          <div>
                            <h4 className="font-semibold">pubspec.yaml</h4>
                            <p className="text-sm text-muted-foreground">Project configuration and dependencies</p>
                          </div>
                        </div>
                        <Badge variant="secondary">YAML</Badge>
                      </div>
                    </Card>

                    {/* Pages */}
                    {project.generatedCode.pages && Object.keys(project.generatedCode.pages).map((pageName) => (
                      <Card key={pageName} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-500" />
                            <div>
                              <h4 className="font-semibold">{pageName}.dart</h4>
                              <p className="text-sm text-muted-foreground">App page/screen component</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Dart</Badge>
                        </div>
                      </Card>
                    ))}

                    {/* Widgets */}
                    {project.generatedCode.widgets && Object.keys(project.generatedCode.widgets).map((widgetName) => (
                      <Card key={widgetName} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-purple-500" />
                            <div>
                              <h4 className="font-semibold">{widgetName}.dart</h4>
                              <p className="text-sm text-muted-foreground">Reusable widget component</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Dart</Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12" data-testid="no-files">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No files generated</h3>
                    <p className="text-muted-foreground">Generate your app to see the project files here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle data-testid="logs-title">Generation History</CardTitle>
                <CardDescription>
                  Track all generation attempts and their results
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generationsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted animate-pulse rounded" />
                    ))}
                  </div>
                ) : generations.length === 0 ? (
                  <div className="text-center py-12" data-testid="no-logs">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No generation logs</h3>
                    <p className="text-muted-foreground">Start generating apps to see the history here</p>
                  </div>
                ) : (
                  <div className="space-y-4" data-testid="generation-logs">
                    {generations.map((generation: any) => (
                      <Card key={generation.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(generation.status)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant={generation.status === "completed" ? "default" : generation.status === "error" ? "destructive" : "secondary"}>
                                  {generation.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(generation.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm font-medium mb-1" data-testid={`generation-prompt-${generation.id}`}>
                                Prompt: "{generation.prompt.substring(0, 100)}..."
                              </p>
                              {generation.creditsUsed && (
                                <p className="text-sm text-muted-foreground">
                                  Credits used: {generation.creditsUsed}
                                </p>
                              )}
                              {generation.errorMessage && (
                                <p className="text-sm text-red-500 mt-1" data-testid={`generation-error-${generation.id}`}>
                                  Error: {generation.errorMessage}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
