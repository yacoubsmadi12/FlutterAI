import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Globe, Moon, Sun, Settings } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  const [preferences, setPreferences] = useState({
    language: user?.language || "en",
    theme: user?.theme || "light",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        username: user.username || "",
      });
      setPreferences({
        language: user.language || "en",
        theme: user.theme || "light",
      });
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: any) => {
      const response = await apiRequest("PATCH", `/api/users/${user?.id}`, updates);
      return response.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/users", user?.id], updatedUser);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    },
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: any) => {
      const response = await apiRequest("PATCH", `/api/users/${user?.id}`, updates);
      return response.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/users", user?.id], updatedUser);
      
      // Update local contexts
      if (updates.language) {
        setLanguage(updates.language);
      }
      if (updates.theme) {
        setTheme(updates.theme);
      }
      
      toast({
        title: "Preferences updated",
        description: "Your preferences have been saved.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update preferences.",
        variant: "destructive",
      });
    },
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferencesMutation.mutate(preferences);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return null;

  return (
    <Layout showSidebar>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="profile-title">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || user.username} />
                  <AvatarFallback className="text-2xl">
                    {(user.displayName || user.username).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle data-testid="user-display-name">{user.displayName || user.username}</CardTitle>
                <CardDescription data-testid="user-email">{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold" data-testid="user-credits">{user.credits}</p>
                    <p className="text-sm text-muted-foreground">Credits</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold capitalize" data-testid="user-subscription">{user.subscription}</p>
                    <p className="text-sm text-muted-foreground">Plan</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleLogout} data-testid="button-logout">
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Settings Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      data-testid="input-display-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      data-testid="input-username"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      data-testid="input-email"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    data-testid="button-save-profile"
                  >
                    {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Preferences
                </CardTitle>
                <CardDescription>
                  Customize your language and theme preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePreferencesSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger data-testid="select-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">
                          <div className="flex items-center">
                            <Globe className="mr-2 h-4 w-4" />
                            English
                          </div>
                        </SelectItem>
                        <SelectItem value="ar">
                          <div className="flex items-center">
                            <Globe className="mr-2 h-4 w-4" />
                            العربية (Arabic)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={preferences.theme}
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}
                    >
                      <SelectTrigger data-testid="select-theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="mr-2 h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="mr-2 h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={updatePreferencesMutation.isPending}
                    data-testid="button-save-preferences"
                  >
                    {updatePreferencesMutation.isPending ? "Saving..." : "Save Preferences"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" data-testid="button-delete-account">
                  Delete Account
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  This will permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
