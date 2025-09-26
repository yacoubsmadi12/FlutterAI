import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import NewProject from "@/pages/NewProject";
import ProjectWorkspace from "@/pages/ProjectWorkspace";
import ProjectDetails from "@/pages/ProjectDetails";
import Profile from "@/pages/Profile";
import Billing from "@/pages/Billing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Team from "@/pages/Team";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      
      {/* Static Pages */}
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/team" component={Team} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      
      {/* Protected Pages */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/new" component={NewProject} />
      <Route path="/projects/:id" component={ProjectWorkspace} />
      <Route path="/projects/:id/details" component={ProjectDetails} />
      <Route path="/profile" component={Profile} />
      <Route path="/billing" component={Billing} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
