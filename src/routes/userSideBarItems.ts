import CashOut from "@/pages/Agent/CashOut";
import UserDashboard from "@/pages/User/Dashboard";
import Transactions from "@/pages/User/Transactions";
import type { ISidebarItems } from "@/types";

export const userSideBarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/dashboard",
        component: UserDashboard,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      // {
      //   title: "Add Money",
      //   url: "/user/add-money",
      //   component: AddMoney,
      // },

      // {
      //   title: "Withdraw",
      //   url: "/user/withdraw",
      //   component: Withdraw,
      // },
      {
        title: "Cash-Out",
        url: "/user/cash-out",
        component: CashOut,
      },
      {
        title: "History",
        url: "/user/transactions",
        component: Transactions,
      },
    ],
  },
];
