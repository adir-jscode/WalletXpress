// src/layout/DashboardLayout.tsx

import AIChatWidget from "@/components/Aichatwidget";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNotifications } from "@/hooks/useNotifications"; // ← add
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hook";
import { Bell } from "lucide-react"; // ← add
import { useState } from "react"; // ← add
import { Outlet } from "react-router";
import { toast } from "sonner"; // ← add (already in your project)

export default function DashboardLayout() {
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [unreadCount, setUnreadCount] = useState(0); // ← add

  // ── Socket notification listener ───────────────────────────────────────
  useNotifications((notification) => {
    toast.success(notification.message, { description: notification.title });
    setUnreadCount((prev) => prev + 1);
  });
  // ──────────────────────────────────────────────────────────────────────

  const handleLogout = async () => {
    await logout(undefined).unwrap();

    dispatch(authApi.util.resetApiState());

    window.location.href = "/login";
  };

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
                {userInfo.data.phone}
              </span>
            </div>
          )}

          {/* ── Bell icon with unread badge ── */}
          <div className="relative ml-auto mr-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>

          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
      <AIChatWidget /> {/* Add the AIChatWidget component here */}
    </SidebarProvider>
  );
}
