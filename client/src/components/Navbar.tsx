import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Smartphone, Moon, Sun, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Smartphone className="text-primary-foreground w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-foreground">Appio Flow</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          {!user && (
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">
                {t("nav.features")}
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-pricing">
                {t("nav.pricing")}
              </a>
              <Link href="/about" data-testid="link-about">
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {t("nav.about")}
                </span>
              </Link>
              <Link href="/contact" data-testid="link-contact">
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {t("nav.contact")}
                </span>
              </Link>
            </div>
          )}
          
          {/* Auth & Settings */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" data-testid="link-dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" data-testid="button-user-menu">
                      {user.displayName || user.username}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" data-testid="link-profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/billing" data-testid="link-billing">Billing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login" data-testid="link-login">
                  <Button variant="ghost" size="sm">{t("nav.login")}</Button>
                </Link>
                <Link href="/register" data-testid="link-register">
                  <Button size="sm">{t("nav.getStarted")}</Button>
                </Link>
              </>
            )}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="button-language-toggle">
                  <Globe className="h-4 w-4 mr-1" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")} data-testid="button-language-en">
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")} data-testid="button-language-ar">
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
