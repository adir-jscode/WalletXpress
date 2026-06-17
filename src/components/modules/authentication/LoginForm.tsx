/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/ui/Password";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  phone: z.string().min(11, {
    message: "Phone number must be 11 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type LoginFormProps = React.ComponentProps<"div"> & {
  phone?: string;
  password?: string;
};

export function LoginForm({
  className,
  phone = "",
  password = "",
  ...props
}: LoginFormProps) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone,
      password,
    },
  });

  // 🔥 THIS FIXES AUTOFILL
  useEffect(() => {
    form.setValue("phone", phone);
    form.setValue("password", password);
  }, [phone, password, form]);

  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(data).unwrap();

      if (res.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (res.data.role === "USER") {
        navigate("/user/dashboard");
      } else {
        navigate("/agent/dashboard");
      }

      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");

      if (error?.data?.message === "User is not verified") {
        navigate("/verify", { state: data.phone });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+8801XXXXXXXXX"
                        className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Password
                        {...field}
                        placeholder="Enter your password"
                        className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
