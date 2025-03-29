import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MessagesData, SelectedUser, Users } from "@/types/ChatTypes";


interface SocketState {
  messages: MessagesData[];
  users: Users[];
  selectedUser: SelectedUser | null;
  onlineUsers: string[];
  isConnected: boolean;
}

const initialState: SocketState = {
  messages: [],
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
    setUsers: (state, action: PayloadAction<Users[]>) => {

      const newUsers = action.payload.filter(
        (newUser) => !state.users.some((existingUser) => existingUser.doctorDetails._id === newUser.doctorDetails._id)
      );
      state.users = [...state.users, ...newUsers];
    },


    setSelectedUser: (state, action: PayloadAction<SelectedUser | null>) => {
      state.selectedUser = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setMessages: (state, action: PayloadAction<MessagesData[]>) => {
      state.messages = action.payload;
    },
    resetSocketState: () => initialState,
    addMessages: (state, action: PayloadAction<MessagesData>) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  setOnlineUsers,
  setUsers,
  setSelectedUser,
  setConnectionStatus,
  setMessages,
  resetSocketState,
  addMessages,
} = socketSlice.actions;
export default socketSlice.reducer;
// Selectors
export const selectUsers = (state: RootState) => state.socket.users;
export const selectOnlineUsers = (state: RootState) => state.socket.onlineUsers;
export const selectSelectedUser = (state: RootState) => state.socket.selectedUser;
export const selectConnectionStatus = (state: RootState) => state.socket.isConnected;
export const selectMessages = (state: RootState) => state.socket.messages;
