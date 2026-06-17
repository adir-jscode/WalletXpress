import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading, error } = useGetUserInfoQuery();

    if (isLoading) {
      return <LoadingSpinner text="Checking authentication..." fullscreen />;
    }

    if (error || !data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole !== data.data.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
