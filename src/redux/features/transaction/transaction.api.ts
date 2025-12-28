import { baseApi } from "@/redux/baseApi";
import type { ITransaction } from "@/types";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTransactionHistory: build.query<{ data: ITransaction[] }, void>({
      query: () => ({
        url: "/transaction/transaction-history",
        method: "GET",
      }),
      providesTags: ["TRANSACTION", "WALLET", "USER"],
    }),
    getAllTransactions: build.query<{ data: ITransaction[] }, void>({
      query: () => ({
        url: "/transaction",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTransactionHistoryQuery, useGetAllTransactionsQuery } =
  transactionApi;
