"use client";

import { Button } from "@/components/ui/button";
import { Home, Lock, MessageCircle, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Main Content */}
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/10 rounded-full blur-3xl"></div>
              <div className="relative w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center border-2 border-destructive/20">
                <ShieldAlert className="w-12 h-12 text-destructive" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="space-y-2">
            <div className="text-7xl sm:text-8xl font-bold text-foreground">
              403
            </div>
            <p className="text-2xl sm:text-3xl font-semibold text-foreground">
              Access Denied
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              You don't have permission to access this resource. This action
              requires elevated privileges or specific authorization.
            </p>

            {/* Security Info Box */}
            <div className="bg-card border border-border rounded-lg p-6 text-left space-y-3">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    Why are you seeing this?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This page is protected and requires proper authentication
                    and authorization to access.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button size="lg" onClick={() => navigate("/")} className="gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/contact")}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
