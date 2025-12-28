"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTransactionHistoryQuery } from "@/redux/features/transaction/transaction.api";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AgentDashboard() {
  const navigate = useNavigate();
  const { data: userInfo, isLoading } = useGetUserInfoQuery(undefined);
  const { data: transactionInfo } = useGetTransactionHistoryQuery();
  const [showBalance, setShowBalance] = useState(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  console.log("info", transactionInfo);

  const balance = userInfo?.data?.wallet.balance || 0;
  const totalCashIn = transactionInfo?.data
    .filter(
      (tx) =>
        tx.type === "CASH_IN" || tx.fromWallet === userInfo?.data.wallet._id
    )
    .reduce((acc, tx) => acc + tx.amount, 0);
  console.log("in", totalCashIn);
  const totalCashOut = transactionInfo?.data
    .filter(
      (tx) =>
        tx.type === "CASH_OUT" || tx.toWallet === userInfo?.data.wallet._id
    )
    .reduce((acc, tx) => acc + tx.amount, 0);
  console.log("out", totalCashOut);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Commission Balance */}
        <Card className="md:col-span-1 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
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
            <div className="text-2xl font-bold text-green-600">
              ৳{totalCashIn}
            </div>
          </CardContent>
        </Card>

        {/* Cash-Out Total */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Cash-Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ৳{totalCashOut}
            </div>
          </CardContent>
        </Card>

        {/* Customers Served */}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
