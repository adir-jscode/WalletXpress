import { baseApi } from "@/redux/baseApi";
import type { IUser } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<{ data: IUser[] }, void>({
      query: () => ({
        url: "/user/users",
        method: "GET",
      }),
      providesTags: ["USER"],
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
      providesTags: ["USER"],
    }),

    updateUser: build.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PUT",
        data, // ✅ Axios uses data
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllAgentsQuery,
  useGetUserInfoQuery,
  useUpdateUserMutation,
} = userApi;
