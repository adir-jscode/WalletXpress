"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Eye, EyeOff, Minus, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AgentDashboard() {
  const navigate = useNavigate();
  const { data: walletData, isLoading } = useGetWalletQuery();
  const [showBalance, setShowBalance] = useState(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const balance = walletData?.data?.balance || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        {/* Commission Balance */}
        <Card className="md:col-span-1 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Total Commission</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/20 rounded"
              >
                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </CardTitle>
            <CardDescription className="text-amber-100">
              Your earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {showBalance ? `৳${balance.toFixed(2)}` : "৳ ••••"}
            </div>
          </CardContent>
        </Card>

        {/* Cash-In Total */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Cash-In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">৳0</div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>

        {/* Cash-Out Total */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Cash-Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">৳0</div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>

        {/* Customers Served */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <p className="text-xs text-muted-foreground mt-2">
              Unique customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate("/agent/cash-in")}
              className="flex flex-col items-center gap-2 h-auto py-4 bg-green-500 hover:bg-green-600"
            >
              <Plus size={24} />
              <span>Cash-In</span>
            </Button>
            <Button
              onClick={() => navigate("/agent/cash-out")}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <Minus size={24} />
              <span>Cash-Out</span>
            </Button>
            <Button
              onClick={() => navigate("/agent/customers")}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <Users size={24} />
              <span>Customers</span>
            </Button>
            {/* <Button
              onClick={() => navigate("/agent/commission")}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <TrendingUp size={24} />
              <span>Commission</span>
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
