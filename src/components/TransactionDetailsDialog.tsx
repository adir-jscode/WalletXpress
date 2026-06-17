import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ITransaction } from "@/types";
import { Eye } from "lucide-react";

interface TransactionDetailsDialogProps {
  transaction: ITransaction;
}

export default function TransactionDetailsDialog({
  transaction,
}: TransactionDetailsDialogProps) {
  const initiator = transaction.initiator;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>

        {/* Transaction Info */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Transaction Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Transaction Type</p>
              <p className="font-medium capitalize">{transaction.type}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-bold text-lg">৳ {transaction.amount}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Fee</p>
              <p>৳ {transaction.fee}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge>{transaction.status}</Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p>{new Date(transaction.createdAt).toLocaleString()}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="break-all text-xs">{transaction._id}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">From Wallet</p>
              <p className="break-all text-xs">{transaction.fromWallet}</p>
            </div>

            {transaction.toWallet && (
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">To Wallet</p>
                <p className="break-all text-xs">{transaction.toWallet}</p>
              </div>
            )}
          </div>
        </div>

        {/* Initiator Info */}
        {initiator && (
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Initiator Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p>{initiator.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{initiator.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>{initiator.phone}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <Badge>{initiator.role}</Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">NID</p>
                <p>{initiator.nid}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Approval Status</p>
                <Badge variant="outline">{initiator.approvalStatus}</Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Verification</p>
                <Badge
                  variant={initiator.isVerified ? "default" : "destructive"}
                >
                  {initiator.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <Badge>{initiator.isActive}</Badge>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Address</p>
                <p>{initiator.address}</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
