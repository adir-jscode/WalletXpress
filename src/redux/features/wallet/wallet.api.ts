import { baseApi } from "@/redux/baseApi";
import type { ITransaction, IWallet, IWalletAction } from "@/types";

const walletApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWallet: build.query<{ data: IWallet }, void>({
      query: () => ({
        url: "/wallet",
        method: "GET",
      }),
    }),
    getAllWallets: build.query<{ data: IWallet[] }, void>({
      query: () => ({
        url: "/wallet",
        method: "GET",
      }),
    }),
    addMoney: build.mutation<{ data: ITransaction }, IWalletAction>({
      query: (data) => ({
        url: "/wallet/add-money",
        method: "PATCH",
        data,
      }),
    }),
    withdrawMoney: build.mutation<{ data: ITransaction }, IWalletAction>({
      query: (data) => ({
        url: "/wallet/withdraw-money",
        method: "PATCH",
        data,
      }),
    }),
    sendMoney: build.mutation<
      { data: ITransaction },
      IWalletAction & { receiver: string }
    >({
      query: (data) => ({
        url: "/wallet/send-money",
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const {
  useGetWalletQuery,
  useGetAllWalletsQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
} = walletApi;
