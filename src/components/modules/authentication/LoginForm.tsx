"use client";

import type React from "react";

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
  phone: z.string().min(11, { message: "Phone number must be 11 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(data).unwrap();
      console.log("RESPONSE", res);
      if (res.success === true && res.data.user.role === "ADMIN") {
        navigate("/admin");
        toast.success("Login successful");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
      if (error.data.message === "User is not verified") {
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
                        value={
                          field.value.startsWith("+880")
                            ? field.value
                            : `+880${field.value}`
                        }
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.startsWith("880")) {
                            field.onChange("+" + value);
                          } else {
                            field.onChange("+880" + value);
                          }
                        }}
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                        Password
                      </FormLabel>
                      <button
                        type="button"
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Forgot?
                      </button>
                    </div>
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
