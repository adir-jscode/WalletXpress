import { baseApi } from "@/redux/baseApi";
import type { IUser } from "@/types";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    blockUnblockWallet: build.mutation<{ data: IUser }, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/block-unblock/${id}`,
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

export const { useBlockUnblockWalletMutation, useApproveSuspendAgentMutation } =
  adminApi;
