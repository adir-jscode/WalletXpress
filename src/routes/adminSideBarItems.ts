import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItems } from "@/types";

export const adminSideBarItems: ISidebarItems[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Analysis",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "Transactions",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
];
