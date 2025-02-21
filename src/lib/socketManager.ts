import { io, Socket } from "socket.io-client";
import { AppDispatch } from "@/redux/store";
import { addMessages, setConnectionStatus, setOnlineUsers } from "@/redux/slice/socket.ioSlice";

let socket: Socket | null = null;

export const connectSocket = (userId: string, dispatch: AppDispatch) => {
  if (socket?.connected) return;

  socket = io("http://localhost:5000", {
    query: { userId },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Socket connected");
    dispatch(setConnectionStatus(true));
  });

  socket.on("getOnlineUsers", (users: string[]) => {
    dispatch(setOnlineUsers(users));
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
    dispatch(setConnectionStatus(false));
  });

  socket.on("newMessage", (message: string) => {
    console.log("a new message is received", message);
    dispatch(addMessages(message));
  });
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

export const getSocket = (): Socket | null => socket;
