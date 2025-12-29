"use client";

import CashOutForm from "@/components/modules/user/CashOutForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CashOut() {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Cash-Out</CardTitle>
          <CardDescription>Cash out money from wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <CashOutForm />
        </CardContent>
      </Card>
    </div>
  );
}
