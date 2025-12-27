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
import { useWithdrawMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Withdraw() {
  const navigate = useNavigate();
  const [withdraw, { isLoading }] = useWithdrawMoneyMutation();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    try {
      await withdraw({ amount: Number.parseFloat(amount) }).unwrap();
      toast.success("Withdrawal successful");
      navigate("/user/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Withdrawal failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Withdraw Money</CardTitle>
          <CardDescription>Withdraw funds from your wallet</CardDescription>
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
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Processing..." : "Withdraw"}
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
