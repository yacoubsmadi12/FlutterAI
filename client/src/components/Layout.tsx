import { Navbar } from "./Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children?: React.ReactNode;
  showSidebar?: boolean;
}

export const Layout = ({ children, showSidebar = false }: LayoutProps) => {
  const { isRTL } = useLanguage();
  const { user } = useAuth();

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <Navbar />
      <div className="flex">
        {showSidebar && user && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? "ml-64" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
};
