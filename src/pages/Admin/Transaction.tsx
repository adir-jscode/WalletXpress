import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { ArrowDownRight, ArrowUpLeft } from "lucide-react";

export default function Transactions() {
  const { data: transactionsData, isLoading } = useGetAllTransactionsQuery();

  const transactions = transactionsData?.data || [];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
      case "withdraw":
      case "cash-out":
        return <ArrowUpLeft className="text-red-500" />;
      default:
        return <ArrowDownRight className="text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "reversed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>
            View and monitor all system transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No transactions found
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {transactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(tx.type)}
                    <div>
                      <p className="font-medium capitalize">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{tx.amount.toFixed(2)}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge className={getStatusColor(tx.status)}>
                        {tx.status}
                      </Badge>
                      {tx.fee > 0 && (
                        <Badge variant="secondary">
                          Fee: ৳{tx.fee.toFixed(2)}
                        </Badge>
                      )}
                      {tx.commission > 0 && (
                        <Badge variant="secondary">
                          Commission: ৳{tx.commission.toFixed(2)}
                        </Badge>
                      )}
                    </div>
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
