import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetTransactionHistoryQuery } from "@/redux/features/transaction/transaction.api";
import { ArrowDownRight, ArrowRight, ArrowUpLeft } from "lucide-react";

export default function Transactions() {
  const { data: transactionsData, isLoading } = useGetTransactionHistoryQuery();
  //const { data: userInfo } = useGetUserInfoQuery(undefined);
  const transactions = transactionsData?.data || [];
  console.log(transactions);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpLeft className="text-red-500" />;
      case "withdraw":
        return <ArrowDownRight className="text-orange-500" />;
      case "add":
        return <ArrowDownRight className="text-green-500" />;
      case "cash-in":
        return <ArrowRight className="text-blue-500" />;
      default:
        return <ArrowRight />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reversed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No transactions yet
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(tx.type)}
                    <div>
                      <p className="font-medium capitalize">
                        {tx.type}
                        {/* {tx.type === "CASH_IN" ||
                        tx.toWalletId === userInfo?.data.wallet.id
                          ? " (Received)"
                          : ""} */}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{tx.amount.toFixed(2)}</p>
                    <Badge className={getStatusColor(tx.status)}>
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
