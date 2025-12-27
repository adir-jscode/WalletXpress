import Agents from "@/pages/Admin/Agents";
import Dashboard from "@/pages/Admin/Dashboard";
import Transactions from "@/pages/Admin/Transaction";
import Users from "@/pages/Admin/Users";
import Wallets from "@/pages/Admin/Wallets";
import type { ISidebarItems } from "@/types";

export const adminSideBarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard",
        component: Dashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        component: Users,
      },
      {
        title: "Agents",
        url: "/admin/agents",
        component: Agents,
      },
      {
        title: "Wallets",
        url: "/admin/wallets",
        component: Wallets,
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        component: Transactions,
        //component: AdminTransactions,
      },
    ],
  },
];
