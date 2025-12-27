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
import Verify from "@/pages/Verify";
import VerifyOtp from "@/pages/verifyOtp";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
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
      {
        Component: VerifyOtp,
        path: "/verify-otp",
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
    children: [...generateRoutes(userSideBarItems)],
  },
  {
    Component: DashboardLayout,
    path: "/agent",
    children: [...generateRoutes(agentSideBarItems)],
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
    Component: Verify,
    path: "/verify",
  },
]);
