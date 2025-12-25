import {
  default as Analytics,
  default as Transaction,
} from "@/pages/Admin/Transaction";
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
        component: Transaction,
      },
    ],
  },
];
