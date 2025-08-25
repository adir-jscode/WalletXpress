import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import Analytics from "@/pages/Admin/Analytics";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [{}],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      {
        Component: Analytics,
        path: "analytics",
      },
    ],
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
]);
