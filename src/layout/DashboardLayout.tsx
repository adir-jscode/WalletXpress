import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hook";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout(undefined).unwrap();
    dispatch(authApi.util.resetApiState());
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {/* logout */}
          {/* show user phone and name */}
          {userInfo && (
            <div className="flex flex-col ml-4 space-y-0.5">
              <span className="font-medium">
                {" "}
                {userInfo.data.name}{" "}
                <span className="text-orange-500">({userInfo.data.role}) </span>
              </span>
              <span className="text-sm text-muted-foreground">
                {userInfo.data.phone}
              </span>
            </div>
          )}
          {/* logout button */}

          <Button
            variant="destructive"
            className="ml-auto"
            onClick={handleLogout}
          >
            Logout
          </Button>
          {/* sidebar toggle */}

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
