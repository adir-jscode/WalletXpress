"use client";

import SendMoneyForm from "@/components/modules/user/SendMoneyForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SendMoney() {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>Transfer money to another user</CardDescription>
        </CardHeader>
        <CardContent>
          <SendMoneyForm />
        </CardContent>
      </Card>
    </div>
  );
}
