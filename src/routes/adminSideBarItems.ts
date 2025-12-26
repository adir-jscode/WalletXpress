import type { ISidebarItems } from "@/types";

export const adminSideBarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard",
        //component: AdminDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        //component: AdminUsers,
      },
      {
        title: "Agents",
        url: "/admin/agents",
        //component: AdminAgents,
      },
      {
        title: "Wallets",
        url: "/admin/wallets",
        //component: AdminWallets,
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        //component: AdminTransactions,
      },
    ],
  },
];
