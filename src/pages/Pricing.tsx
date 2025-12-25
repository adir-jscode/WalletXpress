import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      description: "For individual users",
      monthlyFee: "Free",
      features: [
        "Unlimited transactions",
        "Basic security",
        "Mobile app access",
        "Transaction history",
        "Customer support",
      ],
      highlighted: false,
    },
    {
      name: "Premium",
      description: "For power users",
      monthlyFee: "200 BDT",
      features: [
        "All Basic features",
        "Advanced analytics",
        "Priority support",
        "Budget tracking",
        "Transaction insights",
        "Custom categories",
      ],
      highlighted: true,
    },
    {
      name: "Business",
      description: "For agents and businesses",
      monthlyFee: "Custom",
      features: [
        "All Premium features",
        "Agent dashboard",
        "Commission tracking",
        "Bulk transactions",
        "API access",
        "Dedicated support",
      ],
      highlighted: false,
    },
  ];

  const transactionFees = [
    { type: "Domestic Transfer", fee: "0.5%" },
    { type: "Cash Deposit", fee: "1%" },
    { type: "Bill Payment", fee: "0.25%" },
    { type: "International Transfer", fee: "2%" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that works best for you
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary shadow-xl scale-105"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-foreground">
                    {plan.monthlyFee}
                  </p>
                  {plan.monthlyFee !== "Custom" && (
                    <p className="text-sm text-muted-foreground">per month</p>
                  )}
                </div>
                <Button
                  asChild
                  className="w-full mb-8"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  <Link to="/register">Get Started</Link>
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Fees */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            Transaction Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transactionFees.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-background border border-border rounded-lg p-6"
              >
                <span className="text-foreground font-medium">{item.type}</span>
                <span className="text-primary font-bold text-lg">
                  {item.fee}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Check out our FAQ page for more information
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/faq">View FAQ</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
