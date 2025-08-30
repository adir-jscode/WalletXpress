import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import Login from "@/pages/Login";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSideBarItems } from "./adminSideBarItems";
import About from "@/pages/About";
import Register from "@/pages/Register";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      // {
      //   Component: Home,
      //   path: "/",
      // },
      {
        Component: About,
        path: "/about",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSideBarItems)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [{}],
  },
  {
    Component: DashboardLayout,
    path: "/agent",
    children: [{}],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);
