"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { logout as logoutAction } from "@/redux/features/auth/auth.slice";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ModeToggle } from "./ModeToggler";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(logoutAction());
      dispatch(authApi.util.resetApiState());
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-2">
          <div className="flex items-center md:hidden">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="group size-8" variant="ghost" size="icon">
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink className="py-1.5">
                          <button
                            onClick={() => navigate(link.href)}
                            className="w-full text-left"
                          >
                            {link.label}
                          </button>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="text-primary hover:text-primary/90"
            >
              <Logo />
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-primary hover:text-primary/90"
            >
              <span className="text-lg font-bold text-primary hidden md:inline">
                Digital Xpress
              </span>
            </button>
            {/* Navigation menu */}
            <NavigationMenu className="h-full *:h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="h-full">
                    <NavigationMenuLink className="text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!">
                      <button
                        onClick={() => navigate(link.href)}
                        className="h-full w-full"
                      >
                        {link.label}
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle></ModeToggle>

          {userInfo?.data?.role ? (
            <>
              <Button
                onClick={() => {
                  const dashboardPath =
                    userInfo?.data.role === "ADMIN"
                      ? "/admin/dashboard"
                      : userInfo?.data.role === "USER"
                      ? "/user/dashboard"
                      : "/agent/dashboard";
                  navigate(dashboardPath);
                }}
                variant="ghost"
                size="sm"
                className="text-sm"
              >
                Dashboard
              </Button>
              <Button onClick={handleLogout} size="sm" className="text-sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/register")}
                variant="ghost"
                size="sm"
                className="text-sm"
              >
                Register
              </Button>
              <Button
                onClick={() => navigate("/login")}
                size="sm"
                className="text-sm"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
