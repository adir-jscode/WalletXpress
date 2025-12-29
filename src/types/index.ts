import type { ComponentType } from "react";

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

// User & Auth Types
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nid: string;
  role: "USER" | "AGENT" | "ADMIN";
  isVerified: boolean;
  isBlocked: boolean;
  wallet: IWallet;
  createdAt: string;
  updatedAt: string;
}

export interface IWallet {
  _id: string;
  userId: string;
  balance: number;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITransaction {
  _id: string;
  userId: string;
  type: "CASH_IN" | "CASH_OUT" | "SEND";
  amount: number;
  fee: number;
  commission: number;
  initiator: string;
  receiver?: string;
  status: "PENDING" | "COMPLETED" | "REVERSED";
  toWalletId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IWalletAction {
  phone: string;
  balance: number;
}

export type TRole = "ADMIN" | "USER" | "AGENT";
