import { baseApi } from "@/redux/baseApi";
import type { IUser } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<{ data: IUser[] }, void>({
      query: () => ({
        url: "/user/users",
        method: "GET",
      }),
    }),
    getAllAgents: build.query<{ data: IUser[] }, void>({
      query: () => ({
        url: "/user/agents",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAllAgentsQuery } = userApi;
