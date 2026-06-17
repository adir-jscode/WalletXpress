import LoadingSpinner from "@/components/LoadingSpinner";
import UserDetailsDialog from "@/components/modules/user/UserDetailsDialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBlockUnblockMutation } from "@/redux/features/admin/admin.api";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import { Lock, Mail, Phone, Unlock } from "lucide-react";
import { toast } from "sonner";

export default function Users() {
  const { data: usersData, isLoading } = useGetAllUsersQuery();
  const [blockUnblock] = useBlockUnblockMutation();

  const users = usersData?.data || [];

  const handleBlockUnblock = async (userId: string) => {
    try {
      await blockUnblock({ id: userId }).unwrap();

      toast.success("Action successful");
    } catch {
      toast.error("Action failed");
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading users..." fullscreen />;
  }

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
          {users.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No users found
            </div>
          ) : (
            <div className="space-y-3">
              {users
                .filter((user: IUser) => user.role === "USER")
                .map((user: IUser) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{user.name}</p>

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
                      <UserDetailsDialog user={user} />

                      <Badge
                        variant={
                          user.isActive === "BLOCKED"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {user.isActive === "BLOCKED" ? "BLOCKED" : "Active"}
                      </Badge>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBlockUnblock(user._id)}
                      >
                        {user.isActive === "BLOCKED" ? (
                          <Unlock className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
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
