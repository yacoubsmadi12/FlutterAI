import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PayPalButton from "@/components/PayPalButton";
import { CreditCard, Check, Star, Users, Smartphone, Zap } from "lucide-react";

export default function Billing() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { data: subscription } = useQuery({
    queryKey: ["/api/subscriptions", user?.id],
    enabled: !!user?.id,
  });

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      credits: 100,
      description: "Perfect for trying out the platform",
      features: [
        "100 free credits",
        "3 projects",
        "Basic themes",
        "Community support"
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 29,
      credits: 3000,
      description: "For serious app developers",
      features: [
        "3,000 credits ($30 value)",
        "Unlimited projects",
        "Premium themes",
        "Priority support",
        "Advanced customization"
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      credits: 12000,
      description: "For teams and businesses",
      features: [
        "12,000 credits ($120 value)",
        "Team collaboration",
        "Custom themes",
        "24/7 dedicated support",
        "API access"
      ],
      popular: false,
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  if (!user) return null;

  return (
    <Layout showSidebar>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="billing-title">Billing & Subscriptions</h1>
          <p className="text-muted-foreground">Manage your subscription and credits</p>
        </div>

        {/* Current Plan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize" data-testid="current-plan">
                {user.subscription || "Free"}
              </div>
              <Badge variant={user.subscription === "pro" ? "default" : user.subscription === "enterprise" ? "secondary" : "outline"}>
                {user.subscription === "pro" && <Star className="mr-1 h-3 w-3" />}
                Active
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="credits-remaining">
                {user.credits || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                ~{Math.floor((user.credits || 0) / 10)} app generations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="next-billing">
                {subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                {subscription?.status || "No active subscription"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usage This Month</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="usage-month">
                {100 - (user.credits || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Credits used
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Plans */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle data-testid="plans-title">Choose Your Plan</CardTitle>
            <CardDescription>
              Upgrade or change your subscription plan. Pay only for what you use with our credit system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all ${
                    plan.popular ? "border-primary" : ""
                  } ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handlePlanSelect(plan.id)}
                  data-testid={`plan-${plan.id}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      <Star className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold mb-2">${plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.id === "free" ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={user.subscription === "free"}
                        data-testid={`button-select-${plan.id}`}
                      >
                        {user.subscription === "free" ? "Current Plan" : "Downgrade to Free"}
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-purple-600" : ""}`}
                          disabled={user.subscription === plan.id}
                          data-testid={`button-select-${plan.id}`}
                        >
                          {user.subscription === plan.id ? "Current Plan" : `Choose ${plan.name}`}
                        </Button>
                        
                        {selectedPlan === plan.id && user.subscription !== plan.id && (
                          <div className="mt-4 p-4 border rounded-lg" data-testid={`paypal-${plan.id}`}>
                            <h4 className="font-semibold mb-2">Complete Payment</h4>
                            <PayPalButton
                              amount={plan.price.toString()}
                              currency="USD"
                              intent="capture"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Credit System Info */}
        <Card>
          <CardHeader>
            <CardTitle data-testid="credit-system-title">How Credits Work</CardTitle>
            <CardDescription>
              Understanding our credit-based pricing system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold mb-2">Credit Usage Guide</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Simple Apps (10-20 credits)</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Basic UI with 2-3 screens</li>
                    <li>• Simple navigation</li>
                    <li>• Basic functionality</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Complex Apps (30-50 credits)</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Multiple screens and features</li>
                    <li>• Database integration</li>
                    <li>• Advanced functionality</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">💡 Pro Tip: $1 = 100 credits</p>
                <p className="text-sm text-muted-foreground">
                  Credits never expire and carry over to the next billing cycle.
                </p>
              </div>
            </div>

            {/* Payment History Placeholder */}
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">Payment History</h4>
              <div className="text-center py-8 text-muted-foreground" data-testid="payment-history">
                <CreditCard className="mx-auto h-12 w-12 mb-4" />
                <p>No payment history yet</p>
                <p className="text-sm">Your transactions will appear here once you make a purchase</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
