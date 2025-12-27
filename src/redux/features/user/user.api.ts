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
    getUserInfo: build.query<{ data: IUser }, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getAllAgents: build.query<{ data: IUser[] }, void>({
      query: () => ({
        url: "/user/agents",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllAgentsQuery,
  useGetUserInfoQuery,
} = userApi;
