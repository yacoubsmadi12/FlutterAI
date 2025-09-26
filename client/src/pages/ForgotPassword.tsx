import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      setEmailSent(true);
      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error.message || "Failed to send reset email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Smartphone className="text-primary-foreground w-4 h-4" />
              </div>
              <span className="text-xl font-bold">Appio Flow</span>
            </div>
            <CardTitle data-testid="reset-sent-title">Check Your Email</CardTitle>
            <CardDescription data-testid="reset-sent-description">
              We've sent password reset instructions to {email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button
                variant="outline"
                onClick={() => setEmailSent(false)}
                data-testid="button-try-again"
              >
                Try Again
              </Button>
            </div>
            
            <div className="text-center">
              <Link href="/login" data-testid="link-back-to-login">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Smartphone className="text-primary-foreground w-4 h-4" />
            </div>
            <span className="text-xl font-bold">Appio Flow</span>
          </div>
          <CardTitle data-testid="forgot-password-title">Reset Your Password</CardTitle>
          <CardDescription data-testid="forgot-password-description">
            Enter your email address and we'll send you instructions to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  data-testid="input-email"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-submit"
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/login" data-testid="link-back-to-login">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
