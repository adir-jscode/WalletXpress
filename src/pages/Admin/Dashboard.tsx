"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import {
  useGetAllAgentsQuery,
  useGetAllUsersQuery,
} from "@/redux/features/user/user.api";
import { useGetAllWalletsQuery } from "@/redux/features/wallet/wallet.api";
import { Activity, TrendingUp, Users, Wallet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminDashboard() {
  const { data: walletsData, isLoading: walletsLoading } =
    useGetAllWalletsQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetAllTransactionsQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: agentsData, isLoading: agentsLoading } = useGetAllAgentsQuery();

  const wallets = walletsData?.data || [];
  const transactions = transactionsData?.data || [];
  const users = usersData?.data || [];
  const agents = agentsData?.data || [];

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
  const totalTransactions = transactions.reduce((sum, t) => sum + t.amount, 0);
  const blockedWallets = wallets.filter((w) => w.isBlocked).length;

  // Prepare chart data
  const chartData = [
    { name: "Total Balance", value: totalBalance },
    { name: "Total Transactions", value: totalTransactions },
  ];

  const isLoading =
    walletsLoading || transactionsLoading || usersLoading || agentsLoading;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">Active agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{totalBalance.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">System balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blocked Wallets
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockedWallets}</div>
            <p className="text-xs text-muted-foreground">Suspended accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      {!isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1f84ef" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
