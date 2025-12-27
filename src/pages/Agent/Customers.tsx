"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import { Mail, Phone } from "lucide-react";

export default function Customers() {
  const { data: usersData, isLoading } = useGetAllUsersQuery();

  const users = usersData?.data || [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Customers</CardTitle>
          <CardDescription>Manage your customer relationships</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No customers yet
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone size={16} />
                        {user.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail size={16} />
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <Badge variant={user.isBlocked ? "destructive" : "default"}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
