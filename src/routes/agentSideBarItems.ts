import CashIn from "@/pages/Agent/CashIn";
import Customers from "@/pages/Agent/Customers";
import AgentDashboard from "@/pages/Agent/Dashboard";
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
        title: "Customers",
        url: "/agent/customers",
        component: Customers,
      },
      {
        title: "Commission",
        url: "/agent/commission",
        //component: Commission,
      },
    ],
  },
];
