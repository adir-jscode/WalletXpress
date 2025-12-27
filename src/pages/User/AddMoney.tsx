"use client";

import type React from "react";

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
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function AddMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    toast.success("Redirecting to payment gateway...");
    // In production, this would integrate with payment gateway
    setTimeout(() => navigate("/user/dashboard"), 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add Money to Wallet</CardTitle>
          <CardDescription>Deposit funds into your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (৳)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Continue to Payment
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/user/dashboard")}
              className="w-full"
            >
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
