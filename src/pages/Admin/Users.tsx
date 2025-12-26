import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBlockUnblockWalletMutation } from "@/redux/features/admin/admin.api";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import { Lock, Mail, Phone, Unlock } from "lucide-react";
import { toast } from "sonner";

export default function Users() {
  const { data: usersData, isLoading } = useGetAllUsersQuery();
  const [blockUnblock] = useBlockUnblockWalletMutation();

  const users = usersData?.data || [];

  const handleBlockUnblock = async (userId: string, currentStatus: boolean) => {
    try {
      await blockUnblock({ id: userId }).unwrap();
      toast.success(currentStatus ? "User unblocked" : "User blocked");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage system users and their wallets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No users found
            </div>
          ) : (
            <div className="space-y-3">
              {users
                .filter((user) => user.role === "user")
                .map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          {user.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={user.isBlocked ? "destructive" : "default"}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                      <Badge variant="outline">{user.role}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleBlockUnblock(user._id, user.isBlocked)
                        }
                      >
                        {user.isBlocked ? (
                          <Unlock size={16} />
                        ) : (
                          <Lock size={16} />
                        )}
                      </Button>
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
