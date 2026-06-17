import CashIn from "@/pages/Agent/CashIn";
import AgentDashboard from "@/pages/Agent/Dashboard";
import ChangePassword from "@/pages/ChangePassword";
import Profile from "@/pages/Profile";
import type { ISidebarItems } from "@/types";

export const agentSideBarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/agent/dashboard",
        component: AgentDashboard,
      },
      {
        title: "Profile",
        url: "/agent/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Services",
    items: [
      {
        title: "Cash-In",
        url: "/agent/cash-in",
        component: CashIn,
      },
      {
        title: "Change Password",
        url: "/agent/change-password",
        component: ChangePassword,
      },

      // {
      //   title: "Customers",
      //   url: "/agent/customers",
      //   component: Customers,
      // },
      // {
      //   title: "Commission",
      //   url: "/agent/commission",
      //   //component: Commission,
      // },
    ],
  },
];
