import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IUser } from "@/types";
import { Eye } from "lucide-react";

interface UserDetailsDialogProps {
  user: IUser;
}

export default function UserDetailsDialog({ user }: UserDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p>{user.phone}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">NID</p>
            <p>{user.nid}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <Badge>{user.role}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Approval Status</p>
            <Badge variant="outline">{user.approvalStatus}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Verification</p>
            <Badge variant={user.isVerified ? "default" : "destructive"}>
              {user.isVerified ? "Verified" : "Not Verified"}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Account Status</p>
            <Badge
              variant={user.isActive === "ACTIVE" ? "default" : "destructive"}
            >
              {user.isActive}
            </Badge>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Address</p>
            <p>{user.address}</p>
          </div>
        </div>

        <div className="border rounded-lg p-4 mt-4">
          <h3 className="font-semibold mb-4">Wallet Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="font-bold text-lg">৳ {user.wallet?.balance ?? 0}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Wallet Status</p>
              <Badge>{user.wallet?.status}</Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Wallet ID</p>
              <p className="break-all text-xs">{user.wallet?._id}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Owner ID</p>
              <p className="break-all text-xs">{user.wallet?.owner}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
