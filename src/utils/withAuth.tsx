import { useGetUserInfoQuery } from "@/redux/features/user/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading, error } = useGetUserInfoQuery();
    const result = useGetUserInfoQuery();

    console.log("AUTH CHECK", {
      data: result.data,
      error: result.error,
      isLoading: result.isLoading,
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }
    console.log(data);
    console.log(data?.data?.email);
    if (error || !data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole !== data.data.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
