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
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function CashIn() {
  const navigate = useNavigate();
  const [addMoney, { isLoading }] = useAddMoneyMutation();
  const [formData, setFormData] = useState({
    customerPhone: "",
    amount: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerPhone || !formData.amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await addMoney({
        phone: formData.customerPhone,
        balance: Number.parseFloat(formData.amount),
      }).unwrap();
      toast.success("Cash-in successful");
      navigate("/agent/dashboard");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message || "Cash-in failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Cash-In</CardTitle>
          <CardDescription>Add money to customer wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="customerPhone">Customer Phone</Label>
              <Input
                id="customerPhone"
                placeholder="Enter customer phone number"
                value={formData.customerPhone}
                onChange={(e) =>
                  setFormData({ ...formData, customerPhone: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (৳)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              {isLoading ? "Processing..." : "Cash-In"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/agent/dashboard")}
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
