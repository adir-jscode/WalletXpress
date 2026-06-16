import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
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

  const steps = [
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Create Your Account",
      description:
        "Sign up in minutes with just your email and basic details. No paperwork, no waiting.",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Fund Your Wallet",
      description:
        "Add money through an agent cash-in point or link your bank account securely.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Send & Receive Instantly",
      description:
        "Transfer funds to friends, family, or businesses in seconds, anytime, anywhere.",
    },
  ];

  const testimonials = [
    {
      name: "Ayesha Rahman",
      role: "Small Business Owner",
      quote:
        "Switching to this wallet cut my payment processing time in half. My customers love how fast transfers settle.",
      rating: 5,
    },
    {
      name: "Tanvir Hasan",
      role: "Freelance Designer",
      quote:
        "The agent network makes cashing out incredibly convenient, even in areas without nearby bank branches.",
      rating: 5,
    },
    {
      name: "Maria Gomez",
      role: "Frequent Traveler",
      quote:
        "I feel safe knowing my account is protected with strong encryption and two-factor authentication.",
      rating: 4,
    },
  ];

  const trustPoints = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "256-bit Encryption",
      description: "All data is encrypted in transit and at rest.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Secure Authentication",
      description: "JWT-based sessions with role-based access control.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "Verified Agents",
      description: "Every cash-in/cash-out agent is verified and monitored.",
    },
  ];

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setNewsletterStatus("error");
      return;
    }

    setNewsletterStatus("loading");

    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
    }, 1000);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-[65vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/5 px-4 sm:px-6 lg:px-8 py-12">
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

      {/* How It Works Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with WalletXpress in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-background border border-border rounded-xl p-8 text-center hover:border-primary transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Step {idx + 1}: {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from people using WalletXpress every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-8 flex flex-col hover:border-primary transition-colors duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 ${
                        starIdx < testimonial.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 flex-1">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security / Trust Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Your Money, Always Protected
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We take security seriously. Every transaction is encrypted,
                every account is protected, and every agent is verified to keep
                your funds safe.
              </p>
              <div className="space-y-4">
                {trustPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl"></div>
                <div className="relative bg-background border border-border rounded-2xl p-8 shadow-2xl h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Bank-Grade Protection
                  </h3>
                  <p className="text-muted-foreground">
                    256-bit encryption, JWT authentication, and continuous
                    monitoring keep your account secure around the clock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Stay in the Loop
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to get product updates, security tips, and exclusive
            offers delivered to your inbox.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 text-left">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  setNewsletterStatus("idle");
                }}
                aria-invalid={newsletterStatus === "error"}
                disabled={newsletterStatus === "loading"}
              />
            </div>
            <Button type="submit" disabled={newsletterStatus === "loading"}>
              {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          {newsletterStatus === "error" && (
            <p className="text-sm text-destructive mt-3">
              Please enter a valid email address.
            </p>
          )}
          {newsletterStatus === "success" && (
            <p className="text-sm text-primary mt-3">
              Thanks for subscribing! Check your inbox for confirmation.
            </p>
          )}
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
