"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetTransactionHistoryQuery } from "@/redux/features/transaction/transaction.api";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import { ArrowUpRight, Eye, EyeOff, Plus, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { data: userInfo, isLoading } = useGetUserInfoQuery(undefined);
  const { data: transactionInfo } = useGetTransactionHistoryQuery();
  const [showBalance, setShowBalance] = useState(true);

  const totalSend = transactionInfo?.data
    .filter((tx) => tx.type === "SEND" || tx.type === "CASH_OUT")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalReceive = transactionInfo?.data
    .filter(
      (tx) =>
        tx.type === "CASH_IN" || tx.toWalletId === userInfo?.data.wallet._id
    )
    .reduce((acc, tx) => acc + tx.amount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const balance = userInfo?.data.wallet.balance || 0;

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
            <div className="text-2xl font-bold text-blue-600">৳{totalSend}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ৳{totalReceive}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate("/user/cash-out")}
              className="flex flex-col items-center gap-2 h-auto py-4 bg-blue-500 hover:bg-blue-600"
            >
              <Plus size={24} />
              <span>Cash Out</span>
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
