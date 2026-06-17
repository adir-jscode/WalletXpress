"use client";
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

import { useApproveSuspendAgentMutation } from "@/redux/features/admin/admin.api";
import { useGetAllAgentsQuery } from "@/redux/features/user/user.api";
import { CheckCircle, Mail, Phone, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function Agents() {
  const { data: agentsData, isLoading } = useGetAllAgentsQuery();
  const [approveSuspend] = useApproveSuspendAgentMutation();

  const agents = agentsData?.data || [];

  const handleApproveSuspend = async (
    agentId: string,
    approvalStatus: string,
  ) => {
    try {
      await approveSuspend({
        id: agentId,
      }).unwrap();
      toast.success(
        approvalStatus === "APPROVED" ? "Agent suspended" : "Agent activated",
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Agent Management</CardTitle>
          <CardDescription>Manage agents and their commissions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSpinner text="Loading agents..." fullscreen />
          ) : agents.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No agents found
            </div>
          ) : (
            <div className="space-y-3">
              {agents
                .filter((agent) => agent.role === "AGENT")
                .map((agent) => (
                  <div
                    key={agent._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{agent.name}</p>
                      <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          {agent.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          {agent.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserDetailsDialog user={agent} />

                      <Badge variant="outline">{agent.role}</Badge>

                      <Badge
                        variant={
                          agent.approvalStatus === "APPROVED"
                            ? "default"
                            : agent.approvalStatus === "SUSPENDED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {agent.approvalStatus}
                      </Badge>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleApproveSuspend(agent._id, agent.approvalStatus!)
                        }
                      >
                        {agent.approvalStatus === "APPROVED" ? (
                          <XCircle size={16} className="text-red-600" />
                        ) : (
                          <CheckCircle size={16} className="text-green-600" />
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
