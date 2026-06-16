// src/hooks/useNotifications.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../redux/hook"; // note: your file is hook.ts not hooks.ts

export interface INotification {
  _id: string;
  type: "CASH_IN" | "CASH_OUT" | "MONEY_SENT" | "MONEY_RECEIVED";
  title: string;
  message: string;
  amount: number;
  isRead: boolean;
  transactionId?: string;
  createdAt: string;
}

export const useNotifications = (onNew: (n: INotification) => void) => {
  const token = useAppSelector((s) => s.auth.token); // ✅ correct field
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    const socket = io(import.meta.env.VITE_API_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("notification:new", onNew);

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.off("notification:new", onNew);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, onNew]); // reconnects if token changes
};
