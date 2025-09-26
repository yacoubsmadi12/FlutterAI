import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Plus, 
  User, 
  CreditCard, 
  Folder,
  Settings 
} from "lucide-react";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Projects",
    href: "/projects",
    icon: Folder,
  },
  {
    label: "New Project",
    href: "/projects/new",
    icon: Plus,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
];

export const Sidebar = () => {
  const [location] = useLocation();

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex h-[60px] items-center border-b px-4">
          <h2 className="text-lg font-semibold">Workspace</h2>
        </div>
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
            
            return (
              <Link key={item.href} href={item.href} data-testid={`sidebar-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
