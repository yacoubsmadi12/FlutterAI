import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Plus, Calendar, Clock, CheckCircle, AlertCircle, Folder } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/projects", { userId: user?.id }],
    enabled: !!user?.id,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "generating":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Folder className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      generating: "secondary",
      error: "destructive",
      draft: "outline",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Layout showSidebar>
      <div className="p-6">
        {/* Welcome Banner */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary to-purple-600 text-white">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-2" data-testid="welcome-title">
                Welcome to Appio Flow, {user?.displayName || user?.username}!
              </h1>
              <p className="text-primary-foreground/80 mb-4">
                You have {user?.credits || 0} credits remaining. Start building your next amazing app!
              </p>
              <Link href="/projects/new" data-testid="button-create-project">
                <Button variant="secondary">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-projects">
                {projects.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Apps</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-completed-projects">
                {projects.filter((p: Project) => p.status === "completed").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-credits">
                {user?.credits || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <Badge variant="outline">{user?.subscription || "free"}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize" data-testid="stat-subscription">
                {user?.subscription || "Free"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle data-testid="projects-title">Your Projects</CardTitle>
                <CardDescription>
                  Manage and organize your Flutter app projects
                </CardDescription>
              </div>
              <Link href="/projects/new" data-testid="button-new-project-header">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12" data-testid="no-projects">
                <Folder className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first Flutter app with the power of AI
                </p>
                <Link href="/projects/new" data-testid="button-create-first-project">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Project
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project: Project) => (
                  <Link key={project.id} href={`/projects/${project.id}`} data-testid={`project-card-${project.id}`}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(project.status)}
                            <div>
                              <h3 className="font-semibold" data-testid={`project-name-${project.id}`}>
                                {project.name}
                              </h3>
                              <p className="text-sm text-muted-foreground" data-testid={`project-description-${project.id}`}>
                                {project.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(project.status)}
                            <span className="text-sm text-muted-foreground">
                              {new Date(project.updatedAt!).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
