import type React from "react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Verify() {
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  const [phone] = useState(location.state);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (!phone) {
      navigate("/register");
    }
  }, [phone, navigate]);

  // Timer for OTP expiry
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Timer for resend button
  useEffect(() => {
    if (resendTimer <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.split("").slice(0, 6);
      setOtp(pastedOtp.concat(Array(6 - pastedOtp.length).fill("")));
    } else if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-move to next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification API call
    setTimeout(() => {
      // For demo purposes, accept any 6-digit OTP
      if (otpCode === "000000") {
        toast.error("Invalid OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      toast.success("Phone number verified successfully!");
      setIsLoading(false);
      // Navigate to dashboard or next step
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 1500);
  };

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setResendTimer(60);
    setTimeLeft(300);
    toast.success("OTP resent successfully!");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-medium hover:opacity-80 transition-opacity"
          >
            <Logo />
          </button>
        </div>

        {/* Main Card */}
        <Card className="border-border">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Verify Your Phone</CardTitle>
            <CardDescription>
              We've sent a 6-digit OTP to{" "}
              <span className="font-medium text-foreground">{phone}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              {/* Security Notice */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">
                    Your verification is secure
                  </p>
                  <p className="text-muted-foreground">
                    Never share your OTP with anyone
                  </p>
                </div>
              </div>

              {/* OTP Input Fields */}
              <div>
                <Label className="mb-3 block">Enter OTP</Label>
                <div className="flex gap-3 justify-between">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="h-12 text-center text-lg font-semibold tracking-widest"
                      placeholder="0"
                      inputMode="numeric"
                    />
                  ))}
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-between bg-secondary/5 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>OTP expires in:</span>
                </div>
                <div
                  className={`font-semibold ${
                    timeLeft < 60 ? "text-destructive" : "text-foreground"
                  }`}
                >
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || timeLeft === 0}
                size="lg"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Didn't receive the OTP?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  disabled={isResendDisabled || timeLeft === 0}
                  onClick={handleResendOtp}
                >
                  {isResendDisabled
                    ? `Resend in ${resendTimer}s`
                    : "Resend OTP"}
                </Button>
              </div>

              {/* Change Phone */}
              <Button
                type="button"
                variant="ghost"
                className="w-full text-primary hover:text-primary"
                onClick={() => navigate("/register")}
              >
                Change Phone Number
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Having trouble? Contact our support team at
            support@digitalxpress.com
          </p>
        </div>
      </div>
    </div>
  );
}
