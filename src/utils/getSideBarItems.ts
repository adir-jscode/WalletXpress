import { adminSideBarItems } from "@/routes/adminSideBarItems";
import { agentSideBarItems } from "@/routes/agentSideBarItems";
import { userSideBarItems } from "@/routes/userSideBarItems";
import type { TRole } from "@/types";

export const getSideBarItems = (role: TRole) => {
  switch (role) {
    case "ADMIN":
      return [...adminSideBarItems];
    case "AGENT":
      return [...agentSideBarItems];
    case "USER":
      return [...userSideBarItems];
    default:
      return [];
  }
};
