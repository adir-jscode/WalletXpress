import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle, Globe, Shield, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            About Digital Xpress
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing digital payments in South Asia with secure, fast,
            and accessible financial solutions for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                At Digital Xpress, we believe everyone deserves access to fast,
                secure, and affordable digital financial services. Our mission
                is to bridge the gap between traditional banking and modern
                digital payments.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Founded in 2020, we've grown to serve over 2.5 million users
                across South Asia, processing more than 500,000 transactions
                daily. We're committed to empowering individuals and small
                businesses with the tools they need to thrive in the digital
                economy.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/features")}
                className="gap-2"
              >
                Explore Our Features
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-card border border-border rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <Globe className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Global Reach
                      </h3>
                      <p className="text-muted-foreground">
                        Available in 15+ countries across South and Southeast
                        Asia
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Community Focused
                      </h3>
                      <p className="text-muted-foreground">
                        Serving millions of users from diverse backgrounds
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Security First
                      </h3>
                      <p className="text-muted-foreground">
                        Bank-level encryption and regulatory compliance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make and every
              feature we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform operates 24/7 with 99.99% uptime, ensuring your
                  money is always accessible when you need it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We employ military-grade encryption and multi-layer security
                  protocols to protect your data and funds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle>Speed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Transactions complete in seconds, not hours. Experience
                  instant money transfers and real-time updates.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>Inclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're dedicated to financial inclusion, making digital
                  payments accessible to everyone, everywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Clear pricing, no hidden fees, and transparent operations. You
                  always know what you're paying for.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Continuous improvement and innovation drive us to deliver the
                  best user experience possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Talented professionals united by a mission to transform digital
              payments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Khan",
                role: "CEO & Founder",
                expertise: "FinTech Strategy",
              },
              {
                name: "Ahmed Hassan",
                role: "CTO",
                expertise: "Technology Leadership",
              },
              {
                name: "Maya Patel",
                role: "Head of Security",
                expertise: "Cybersecurity",
              },
              {
                name: "James Wilson",
                role: "CFO",
                expertise: "Financial Operations",
              },
            ].map((member, idx) => (
              <Card
                key={idx}
                className="border-border hover:border-primary/50 transition-colors text-center"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.expertise}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2.5M+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500K+</div>
              <p className="text-muted-foreground">Daily Transactions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$2.1B+</div>
              <p className="text-muted-foreground">Volume Processed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be part of the digital payment revolution. Start your journey with
            Digital Xpress today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="gap-2"
            >
              Get Started Now
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/contact")}
              variant="outline"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
