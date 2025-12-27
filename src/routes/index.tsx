import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Pricing from "@/pages/Pricing";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";

import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSideBarItems } from "./adminSideBarItems";
import { agentSideBarItems } from "./agentSideBarItems";
import { userSideBarItems } from "./userSideBarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: Features,
        path: "/features",
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        Component: FAQ,
        path: "/faq",
      },
      {
        Component: Pricing,
        path: "/pricing",
      },
      {
        Component: About,
        path: "/about",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, "ADMIN"),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      ...generateRoutes(adminSideBarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, "USER"),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/dashboard" /> },
      ...generateRoutes(userSideBarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, "AGENT"),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/dashboard" /> },
      ...generateRoutes(agentSideBarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },

  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
