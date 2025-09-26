import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Folder,
  MoreVertical,
  Edit,
  Trash2,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Projects() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", { userId: user?.id }],
    enabled: !!user?.id,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "generating":
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
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

  const filteredProjects = projects
    .filter((project: Project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a: Project, b: Project) => {
      if (sortBy === "updated") {
        return new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
      } else if (sortBy === "created") {
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <Layout showSidebar>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="projects-title">My Projects</h1>
            <p className="text-muted-foreground">Manage and organize your Flutter app projects</p>
          </div>
          <Link href="/projects/new" data-testid="button-new-project">
            <Button className="bg-gradient-to-r from-primary to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32" data-testid="select-status-filter">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="generating">Generating</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32" data-testid="select-sort">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Last Updated</SelectItem>
                    <SelectItem value="created">Date Created</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Folder className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2" data-testid="no-projects-title">
                  {searchQuery || statusFilter !== "all" ? "No projects found" : "No projects yet"}
                </h3>
                <p className="text-muted-foreground mb-6" data-testid="no-projects-description">
                  {searchQuery || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Create your first Flutter app with the power of AI"}
                </p>
                {(!searchQuery && statusFilter === "all") && (
                  <Link href="/projects/new" data-testid="button-create-first">
                    <Button className="bg-gradient-to-r from-primary to-purple-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Project
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredProjects.map((project: Project) => (
                <Card key={project.id} className="group hover:shadow-md transition-shadow" data-testid={`project-card-${project.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          {getStatusIcon(project.status)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Link href={`/projects/${project.id}`} data-testid={`project-link-${project.id || 'unknown'}`}>
                              <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer truncate">
                                {project.name}
                              </h3>
                            </Link>
                            {getStatusBadge(project.status)}
                          </div>
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2" data-testid={`project-description-${project.id}`}>
                            {project.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Theme: {project.theme}</span>
                            <span>Language: {project.language?.toUpperCase()}</span>
                            <span>Updated: {new Date(project.updatedAt!).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link href={`/projects/${project.id}`} data-testid={`button-open-${project.id || 'unknown'}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Open
                          </Button>
                        </Link>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" data-testid={`button-menu-${project.id}`}>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/projects/${project.id}/details`} data-testid={`menu-details-${project.id}`}>
                                <Folder className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            {project.generatedCode && (
                              <DropdownMenuItem data-testid={`menu-download-${project.id}`}>
                                <Download className="mr-2 h-4 w-4" />
                                Download ZIP
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600" data-testid={`menu-delete-${project.id}`}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {filteredProjects.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span data-testid="projects-count">
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
                <div className="flex items-center space-x-4">
                  <span>
                    {projects.filter((p: Project) => p.status === "completed").length} completed
                  </span>
                  <span>
                    {projects.filter((p: Project) => p.status === "generating").length} generating
                  </span>
                  <span>
                    {projects.filter((p: Project) => p.status === "draft").length} drafts
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
