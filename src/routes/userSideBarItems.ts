import ChangePassword from "@/pages/ChangePassword";
import Profile from "@/pages/Profile";
import CashOut from "@/pages/User/CashOut";
import UserDashboard from "@/pages/User/Dashboard";
import SendMoney from "@/pages/User/SendMoney";
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
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
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
      {
        title: "Change Password",
        url: "/user/change-password",
        component: ChangePassword,
      },
    ],
  },
];
