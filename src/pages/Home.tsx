import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Lock,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First Experience",
      description:
        "Access your wallet anytime, anywhere with our intuitive mobile app",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Transactions",
      description:
        "Send and receive money in seconds with our lightning-fast payment system",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Level Security",
      description:
        "Your funds are protected with military-grade encryption and fraud detection",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Two-Factor Authentication",
      description:
        "Extra layer of security to keep your account safe and protected",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-Time Analytics",
      description:
        "Track your spending with detailed charts and transaction history",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Agent Network",
      description:
        "Access to a wide network of agents for easy cash-in and cash-out services",
    },
  ];

  const stats = [
    { label: "Active Users", value: "2.5M+" },
    { label: "Daily Transactions", value: "500K+" },
    { label: "Countries Served", value: "15+" },
    { label: "Uptime Guarantee", value: "99.9%" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold text-foreground">
                  Digital Wallet
                  <span className="text-primary"> for the Future</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Fast, secure, and convenient digital payments. Send money, pay
                  bills, and manage your finances all in one place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => navigate("/about")}
                  variant="outline"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span>Instant Transfers</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Hero Image */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl"></div>
                <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Wallet Balance
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Active
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-4xl font-bold text-foreground">
                        $5,234.50
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your available balance
                      </p>
                    </div>
                    <div className="border-t border-border pt-4 mt-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Recent Transaction
                        </span>
                        <span className="font-medium">+$250.00</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Payment Sent
                        </span>
                        <span className="font-medium text-destructive">
                          -$45.99
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 border-y border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for seamless digital payments and wallet
              management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              onClick={() => navigate("/features")}
              variant="outline"
              size="lg"
            >
              View All Features
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions of users who trust Digital Xpress for their financial
            transactions. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="gap-2"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              size="lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
