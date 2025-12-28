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
  // const navigate = useNavigate();
  // const [sendMoney, { isLoading }] = useSendMoneyMutation();
  // const [formData, setFormData] = useState({
  //   receiver: "",
  //   amount: "",
  // });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formData.receiver || !formData.amount) {
  //     toast.error("Please fill in all fields");
  //     return;
  //   }

  //   try {
  //     await sendMoney({
  //       phone: formData.receiver,
  //       balance: Number.parseFloat(formData.amount),
  //     }).unwrap();
  //     toast.success("Money sent successfully");
  //     navigate("/user");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error?.data?.message || "Failed to send money");
  //   }
  // };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>Transfer money to another user</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="receiver">Recipient Number</Label>
              <Input
                id="receiver"
                placeholder="Enter recipient phone number"
                value={formData.receiver}
                onChange={(e) =>
                  setFormData({ ...formData, receiver: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? "Sending..." : "Send Money"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/user/dashboard")}
              className="w-full"
            >
              Cancel
            </Button>
          </form> */}
          <SendMoneyForm />
        </CardContent>
      </Card>
    </div>
  );
}
