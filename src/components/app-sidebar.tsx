import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import { getSideBarItems } from "@/utils/getSideBarItems";
import * as React from "react";
import { Link } from "react-router";
import Logo from "./logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  //user info
  const { data: userInfo } = useGetUserInfoQuery();
  console.log(userInfo);

  const data = {
    navMain: getSideBarItems(userInfo?.data.role),
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo></Logo>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
