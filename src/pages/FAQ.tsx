"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click the 'Get Started' button on the home page, fill in your details, and follow the verification steps. You'll have access to your wallet in minutes.",
        },
        {
          q: "What do I need to sign up?",
          a: "You need a valid email address, a strong password, and a phone number for verification. We'll also need your full name and identification for security purposes.",
        },
        {
          q: "Is there a monthly fee?",
          a: "Basic account usage is completely free. Premium features are available at $4.99/month, and business plans are custom-priced based on your needs.",
        },
      ],
    },
    {
      category: "Payments & Transfers",
      questions: [
        {
          q: "How long do transfers take?",
          a: "Most domestic transfers are instant. International transfers typically take 1-3 business days depending on the receiving bank.",
        },
        {
          q: "What are the transfer limits?",
          a: "Daily limits are $5,000 for basic users and $50,000 for premium users. Business accounts have custom limits based on their plan.",
        },
        {
          q: "Can I schedule transfers?",
          a: "Yes! Premium and business users can schedule transfers for future dates. Simply select the date when initiating a transfer.",
        },
      ],
    },
    {
      category: "Security",
      questions: [
        {
          q: "Is my money safe?",
          a: "Absolutely. We use bank-level encryption and real-time fraud monitoring. Your funds are also insured up to $250,000.",
        },
        {
          q: "What is two-factor authentication?",
          a: "Two-factor authentication adds an extra layer of security by requiring a second verification method (like a code from your phone) when logging in.",
        },
        {
          q: "What should I do if my account is compromised?",
          a: "Contact our support team immediately at support@digitalxpress.com or call our hotline. We can freeze your account and help secure it within minutes.",
        },
      ],
    },
    {
      category: "Agent Services",
      questions: [
        {
          q: "How do I become an agent?",
          a: "Apply through our agent portal with your business details. Our team will verify your information and activate your account.",
        },
        {
          q: "What commission do agents earn?",
          a: "Agent commissions vary based on transaction volume. Standard rates start at 1.5% for cash deposits and increase with higher volumes.",
        },
        {
          q: "Can I manage multiple locations?",
          a: "Yes, business agents can manage multiple outlets with separate transaction tracking and commission calculations for each location.",
        },
      ],
    },
    {
      category: "Admin & Support",
      questions: [
        {
          q: "How do admins manage users?",
          a: "Admins have a dedicated dashboard with tools to view users, manage agents, monitor transactions, and adjust system fees.",
        },
        {
          q: "Is there dedicated support for business accounts?",
          a: "Yes, business and premium users get priority support with dedicated account managers available 24/7.",
        },
        {
          q: "Can I get detailed transaction reports?",
          a: "Our platform provides detailed transaction reports with filters for date, amount, type, and status. Export to CSV or PDF anytime.",
        },
      ],
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs;

    return faqs
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [searchTerm]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about Digital Xpress
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-base"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No results found for "{searchTerm}"
              </p>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {category.category}
                  </h2>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full bg-card border border-border rounded-lg"
                  >
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem
                        key={qIdx}
                        value={`item-${idx}-${qIdx}`}
                        className="border-b last:border-0"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50 text-left">
                          <span className="text-foreground font-semibold">
                            {item.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our support team is here to help
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
