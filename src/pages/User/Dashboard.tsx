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
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  Plus,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function UserDashboard() {
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
      <div className="grid gap-6 md:grid-cols-3">
        {/* Balance Card */}
        <Card className="md:col-span-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Total Balance</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/20 rounded"
              >
                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </CardTitle>
            <CardDescription className="text-blue-100">
              Your wallet balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {showBalance ? `৳${balance.toFixed(2)}` : "৳ ••••"}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">৳0</div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">৳0</div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => navigate("/user/add-money")}
              className="flex flex-col items-center gap-2 h-auto py-4 bg-blue-500 hover:bg-blue-600"
            >
              <Plus size={24} />
              <span>Add Money</span>
            </Button>
            <Button
              onClick={() => navigate("/user/withdraw")}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <ArrowDownLeft size={24} />
              <span>Withdraw</span>
            </Button>
            <Button
              onClick={() => navigate("/user/send-money")}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <Send size={24} />
              <span>Send Money</span>
            </Button>
            <Button
              onClick={() => navigate("/user/transactions")}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <ArrowUpRight size={24} />
              <span>History</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
