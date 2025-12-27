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
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function SendMoney() {
  const navigate = useNavigate();
  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.receiver || !formData.amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await sendMoney({
        receiver: formData.receiver,
        amount: Number.parseFloat(formData.amount),
      }).unwrap();
      toast.success("Money sent successfully");
      navigate("/user/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to send money");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>Transfer money to another user</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="receiver">Recipient Number</Label>
              <Input
                id="receiver"
                placeholder="Enter recipient phone number"
                value={formData.receiver}
                onChange={(e) =>
                  setFormData({ ...formData, receiver: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
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
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? "Sending..." : "Send Money"}
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
