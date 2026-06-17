import { baseApi } from "@/redux/baseApi";
import type { IUser } from "@/types";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    blockUnblock: build.mutation<{ data: IUser }, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/block-user/${id}`,
        method: "PATCH",
      }),
    }),
    approveSuspendAgent: build.mutation<{ data: IUser }, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/approve-suspend/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useBlockUnblockMutation, useApproveSuspendAgentMutation } =
  adminApi;
