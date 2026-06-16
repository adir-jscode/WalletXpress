import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface PageTemplateProps {
  title: string;
  subtitle: string;
  content: string;
}

function PageTemplate({ title, subtitle, content }: PageTemplateProps) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">
          {title}
        </p>
        <h1 className="text-4xl font-bold text-foreground">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{subtitle}</p>
      </div>
      <div className="space-y-6 prose prose-slate dark:prose-invert">
        <p>{content}</p>
      </div>
      <div>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    </div>
  );
}

export function SecurityPage() {
  return (
    <PageTemplate
      title="Security"
      subtitle="See how we protect your money and personal data with enterprise-grade defenses."
      content="Digital Xpress uses multi-layered security, end-to-end encryption, device verification, fraud risk monitoring, and secure storage to ensure your account and wallet data remain protected at all times."
    />
  );
}

export function CareersPage() {
  return (
    <PageTemplate
      title="Careers"
      subtitle="Join a fast-growing fintech team that builds secure, accessible payments for everyone."
      content="We are hiring engineers, product managers, compliance specialists, and customer success partners. If you want to build financial tools that move money safely and quickly, explore our open roles and apply today."
    />
  );
}

export function BlogPage() {
  return (
    <PageTemplate
      title="Blog"
      subtitle="Insights, product updates, and finance trends from the Digital Xpress team."
      content="Read our latest posts on digital payments, wallet security, financial inclusion, and product best practices. We publish regular updates on our services, partnerships, and industry insights."
    />
  );
}

export function PrivacyPolicyPage() {
  return (
    <PageTemplate
      title="Privacy Policy"
      subtitle="Learn how we collect, store, and protect your personal information."
      content="We only collect the minimum data required to provide wallet services, process transactions, and keep accounts secure. Your data is encrypted in transit and at rest, and we never sell personal information to third parties."
    />
  );
}

export function TermsPage() {
  return (
    <PageTemplate
      title="Terms of Service"
      subtitle="Review the terms that govern use of Digital Xpress services."
      content="By using our platform, you agree to our terms for account registration, transaction processing, account security, and dispute resolution. We provide clear guidelines for responsible use and compliance with applicable laws."
    />
  );
}

export function CookiePolicyPage() {
  return (
    <PageTemplate
      title="Cookie Policy"
      subtitle="Understand how we use cookies to improve your experience."
      content="We use cookies and similar tracking technologies to remember preferences, secure sessions, and analyze usage patterns. You can manage cookie preferences through your browser settings."
    />
  );
}

export function StatusPage() {
  return (
    <PageTemplate
      title="Status Page"
      subtitle="Track uptime, service availability, and incident updates."
      content="Digital Xpress continuously monitors our platform and services for availability. Here you can find the latest status information and any scheduled maintenance windows."
    />
  );
}
