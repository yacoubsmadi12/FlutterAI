import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth, handleRedirectResult } from "@/lib/firebase";
import { User } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Try to get user from our backend
          const response = await fetch(`/api/users/${firebaseUser.uid}`);
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // User doesn't exist in our backend, create them
            const newUserData = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              username: firebaseUser.email!.split('@')[0],
              displayName: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
              photoURL: firebaseUser.photoURL,
              provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
            };
            
            const createResponse = await fetch('/api/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newUserData),
            });
            
            if (createResponse.ok) {
              const { user: createdUser } = await createResponse.json();
              setUser(createdUser);
            }
          }
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    // Handle redirect result for Google OAuth
    handleRedirectResult().catch(console.error);

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      
      const { user } = await response.json();
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      
      const { user } = await response.json();
      setUser(user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value = {
    user,
    firebaseUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
