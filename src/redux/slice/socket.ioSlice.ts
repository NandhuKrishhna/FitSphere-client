import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SelectedUser } from "@/types/ChatTypes";

interface SocketState {
  users: string[];
  selectedUser: SelectedUser | null;
  onlineUsers: string[];
  isConnected: boolean;
}

const initialState: SocketState = {
  users: [],
  selectedUser: null,
  onlineUsers: [],
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setOnlineUsers, setUsers, setSelectedUser, setConnectionStatus } = socketSlice.actions;

export default socketSlice.reducer;

// Selectors
export const selectUsers = (state: RootState) => state.socket.users;
export const selectOnlineUsers = (state: RootState) => state.socket.onlineUsers;
export const selectSelectedUser = (state: RootState) => state.socket.selectedUser;
export const selectConnectionStatus = (state: RootState) => state.socket.isConnected;
