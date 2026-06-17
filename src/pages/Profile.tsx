"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useGetUserInfoQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, ShieldCheck, Wallet } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(11),
  address: z.string().min(5),
  nid: z.string().min(5),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { data: userData, isLoading } = useGetUserInfoQuery();

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const user = userData?.data;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      nid: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        nid: user.nid || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateUser(values).unwrap();

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading profile..." fullscreen />;
  }

  return (
    <div className="space-y-6">
      {/* Profile Summary */}

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user?.name}</h2>

              <p className="text-muted-foreground">{user?.email}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                <Badge>{user?.role}</Badge>

                <Badge variant={user?.isVerified ? "default" : "secondary"}>
                  {user?.isVerified ? "Verified" : "Unverified"}
                </Badge>

                {user?.approvalStatus && (
                  <Badge variant="outline">{user.approvalStatus}</Badge>
                )}

                <Badge
                  variant={
                    user?.isActive === "ACTIVE" ? "default" : "destructive"
                  }
                >
                  {user?.isActive}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4" />
              <span>{user?.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4" />
              <span>{user?.address}</span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4" />
              <span>NID: {user?.nid}</span>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Information */}

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Wallet Information</CardTitle>
            <CardDescription>Current wallet details</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5" />

                <div>
                  <p className="text-sm text-muted-foreground">Balance</p>

                  <p className="text-3xl font-bold">
                    ৳ {user?.wallet?.balance ?? 0}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Wallet Status</p>

                <Badge className="mt-2">{user?.wallet?.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile */}

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
