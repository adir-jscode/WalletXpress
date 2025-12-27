import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyOtp() {
  const [value, setValue] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  return (
    <div>
      <Card className="border-border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a 6-digit OTP to{" "}
            <span className="font-medium text-foreground">email</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form form={form}>
            <form
              id="otp-form"
              onSubmit={form.handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
