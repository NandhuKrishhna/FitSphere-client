import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { RootState } from "../store";

// const BASE_URL = "http://localhost:5000";

interface SocketState {
  messages: string[];
  users: string[];
  selectedUser: string | null;
  socket: Socket | null;
  onlineUsers: string[];
}

const initialState: SocketState = {
  messages: [],
  users: [],
  selectedUser: null,
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    disconnectSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { setSocket, setOnlineUsers, disconnectSocket, setMessages, setUsers } = socketSlice.actions;

export default socketSlice.reducer;
export const selectUsers = (state: RootState) => state.socket.users;
export const selectMessages = (state: RootState) => state.socket.messages;
export const selectOnlineUsers = (state: RootState) => state.socket.onlineUsers;
export const selectedUser = (state: RootState) => state.socket.selectedUser;

// export const connectSocket = (authUser) => (dispatch, getState) => {
//   const { socket } = getState().socket;

//   if (!authUser || socket?.connected) return;

//   const newSocket = io(BASE_URL, {
//     query: { userId: authUser._id },
//   });

//   newSocket.connect();
//   dispatch(setSocket(newSocket));

//   // Handle "getOnlineUsers" event
//   newSocket.on("getOnlineUsers", (userIds) => {
//     dispatch(setOnlineUsers(userIds));
//   });
// };
