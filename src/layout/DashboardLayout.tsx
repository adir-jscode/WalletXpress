// src/layout/DashboardLayout.tsx

import AIChatWidget from "@/components/Aichatwidget";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hook";
import { ChevronDown, Key, LayoutDashboard, LogOut, User } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

export default function DashboardLayout() {
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  //const [unreadCount, setUnreadCount] = useState(0); // ← add

  // ── Socket notification listener ───────────────────────────────────────
  // useNotifications((notification) => {
  //   toast.success(notification.message, { description: notification.title });
  //   setUnreadCount((prev) => prev + 1);
  // });
  // ──────────────────────────────────────────────────────────────────────

  const handleLogout = async () => {
    await logout(undefined).unwrap();

    dispatch(authApi.util.resetApiState());

    window.location.href = "/login";
  };

  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          {userInfo && (
            <div className="flex flex-col ml-4 space-y-0.5">
              <span className="font-medium">
                {userInfo.data.name}{" "}
                <span className="text-orange-500">({userInfo.data.role})</span>
              </span>
              <span className="text-sm text-muted-foreground">
                {userInfo.data.email}
              </span>
            </div>
          )}

          {/* ── Bell icon with unread badge ── */}
          <div className="relative ml-auto mr-2">
            {/* <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )} */}
          </div>

          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-11 px-2 flex items-center gap-3 hover:bg-muted"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
                  {userInfo?.data?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium leading-none">
                    {userInfo?.data?.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {userInfo?.data?.role}
                  </span>
                </div>

                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{userInfo?.data?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {userInfo?.data?.phone}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  const profilePath =
                    userInfo?.data.role === "ADMIN"
                      ? "/admin/profile"
                      : userInfo?.data.role === "USER"
                        ? "/user/profile"
                        : "/agent/profile";
                  navigate(profilePath);
                }}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  const dashboardPath =
                    userInfo?.data.role === "ADMIN"
                      ? "/admin/dashboard"
                      : userInfo?.data.role === "USER"
                        ? "/user/dashboard"
                        : "/agent/dashboard";

                  navigate(dashboardPath);
                }}
                className="cursor-pointer"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
              {/* change password */}
              <DropdownMenuItem
                onClick={() => {
                  const changePasswordPath =
                    userInfo?.data.role === "ADMIN"
                      ? "/admin/change-password"
                      : userInfo?.data.role === "USER"
                        ? "/user/change-password"
                        : "/agent/change-password";
                  navigate(changePasswordPath);
                }}
                className="cursor-pointer"
              >
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
      <AIChatWidget /> {/* Add the AIChatWidget component here */}
    </SidebarProvider>
  );
}
