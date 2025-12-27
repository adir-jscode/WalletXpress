import AddMoney from "@/pages/User/AddMoney";
import UserDashboard from "@/pages/User/Dashboard";
import SendMoney from "@/pages/User/SendMoney";
import Transactions from "@/pages/User/Transactions";
import Withdraw from "@/pages/User/Withdraw";
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
      {
        title: "Add Money",
        url: "/user/add-money",
        component: AddMoney,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        component: Withdraw,
      },
      {
        title: "History",
        url: "/user/transactions",
        component: Transactions,
      },
    ],
  },
];
