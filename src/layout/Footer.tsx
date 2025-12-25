"use client";

import Logo from "@/components/logo";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();

  const footerLinks = {
    Product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "#" },
      { label: "Updates", href: "#" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Compliance", href: "#" },
    ],
    Support: [
      { label: "Help Center", href: "#" },
      { label: "FAQs", href: "/faq" },
      { label: "Status Page", href: "#" },
      { label: "Feedback", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "Twitter", href: "#", icon: "twitter" },
    { name: "LinkedIn", href: "#", icon: "linkedin" },
    { name: "Instagram", href: "#", icon: "instagram" },
  ];

  return (
    <footer className="bg-background border-t border-border dark:bg-slate-950 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-12 md:gap-8 lg:grid-cols-5">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <Logo />
                </button>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Secure, fast, and convenient digital payments for everyone. Your
                trusted financial companion.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <span className="text-primary text-sm font-semibold">
                      {social.icon === "facebook" && "f"}
                      {social.icon === "twitter" && "𝕏"}
                      {social.icon === "linkedin" && "in"}
                      {social.icon === "instagram" && "@"}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => navigate(link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info and Newsletter Signup */}
          <div className="border-t border-border mt-12 pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground">Get in Touch</h4>
              <div className="space-y-4">
                <a
                  href="mailto:support@digitalxpress.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>support@digitalxpress.com</span>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+1 (234) 567-890</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>123 Finance Street, Silicon Valley, CA 94025</span>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Stay Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Get the latest updates and features delivered to your inbox.
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Digital Xpress. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("#")}
              className="hover:text-primary transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate("#")}
              className="hover:text-primary transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => navigate("#")}
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
