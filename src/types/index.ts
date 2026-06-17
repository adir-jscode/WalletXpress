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
  address: string;
  isVerified: boolean;
  isActive?: "ACTIVE" | "INACTIVE" | "BLOCKED";
  approvalStatus?: "APPROVED" | "SUSPENDED" | "PENDING";
  wallet: IWallet;
  createdAt: string;
  updatedAt: string;
}

export interface IWallet {
  _id: string;
  owner: string;
  balance: number;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  createdAt: string;
  updatedAt: string;
}

export interface ITransaction {
  _id: string;
  userId: string;
  type: "CASH_IN" | "CASH_OUT" | "SEND";
  amount: number;
  fee: number;
  fromWallet: string;
  toWallet?: string;
  commission: number;
  initiator: IUser;
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
