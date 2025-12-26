"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const Roles = ["USER", "AGENT"] as const;
const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least 1 special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least 1 special character.",
      }),
    phone: z.string().min(11, {
      message: "Phone number must be at least 11 characters.",
    }),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    nid: z.string().length(10, {
      message: "NID must be exactly 10 characters.",
    }),
    role: z.enum(Roles).default("USER"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      nid: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      nid: data.nid,
      role: data.role,
    };
    try {
      const response = await register(userInfo).unwrap();
      console.log("res = ", response);
      if (response?.data?.statusCode === 201) {
        toast.success("Registration successful!");
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* First row: Name and Email */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          {...field}
                          className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Passwords row */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                          placeholder="Min 8 chars + 1 special char"
                          className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Password
                          {...field}
                          placeholder="Re-enter password"
                          className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone and Address row */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Street, City"
                          {...field}
                          className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* NID and Role row */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="nid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                        National ID (NID)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890"
                          {...field}
                          className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                        Account Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-lg border-slate-200 dark:border-slate-700">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USER">Personal User</SelectItem>
                          <SelectItem value="AGENT">
                            Agent (Business)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg mt-2"
              >
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
