import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";

export default function Features() {
  const featureCategories = [
    {
      category: "Payment Features",
      description: "Send, receive, and manage payments effortlessly",
      items: [
        "Instant domestic transfers",
        "International money transfer",
        "Bill payment automation",
        "QR code payments",
        "Recurring payments",
        "Payment scheduling",
      ],
    },
    {
      category: "Security & Protection",
      description: "Your money and data are always protected",
      items: [
        "256-bit encryption",
        "Two-factor authentication",
        "Biometric login",
        "Real-time fraud monitoring",
        "Transaction verification",
        "Account recovery options",
      ],
    },
    {
      category: "User Management",
      description: "Manage your finances with ease",
      items: [
        "Multiple wallet accounts",
        "Transaction history",
        "Receipt storage",
        "Budget tracking",
        "Spending analytics",
        "Transaction categorization",
      ],
    },
    {
      category: "Agent Services",
      description: "Easy cash in and out services",
      items: [
        "Cash deposit services",
        "Cash withdrawal options",
        "Commission tracking",
        "Agent performance metrics",
        "Customer management tools",
        "Transaction reporting",
      ],
    },
    {
      category: "Admin Controls",
      description: "Complete platform management",
      items: [
        "User management",
        "Agent approval system",
        "Transaction monitoring",
        "Fee management",
        "System settings control",
        "Compliance reporting",
      ],
    },
    {
      category: "Mobile Experience",
      description: "Optimized for smartphones and tablets",
      items: [
        "Native mobile app",
        "Offline mode support",
        "Push notifications",
        "Fast load times",
        "Touch ID/Face ID",
        "Dark mode support",
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            Everything You Need
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive features designed for users, agents, and
            administrators
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featureCategories.map((category, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {category.category}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {category.description}
                </p>
                <ul className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Create your account and experience all these features today.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/register">
              Sign Up Now <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
