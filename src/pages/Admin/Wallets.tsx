import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllWalletsQuery } from "@/redux/features/wallet/wallet.api";
import { Wallet } from "lucide-react";

export default function Wallets() {
  const { data: walletsData, isLoading } = useGetAllWalletsQuery();

  const wallets = walletsData?.data || [];
  console.log(wallets);
  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
  const blockedCount = wallets.filter((w) => w.isBlocked).length;

  return (
    <div className="space-y-4">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Wallet size={18} />
              Total System Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳{totalBalance.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Blocked Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {blockedCount}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Out of {wallets.length} total
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wallet Details</CardTitle>
          <CardDescription>Monitor all wallets in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : wallets.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No wallets found
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {wallets.map((wallet) => (
                <div
                  key={wallet._id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">
                      Wallet ID: {wallet._id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(wallet.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{wallet.balance.toFixed(2)}</p>
                    <Badge
                      variant={wallet.isBlocked ? "destructive" : "default"}
                    >
                      {wallet.isBlocked ? "Blocked" : "Active"}
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
