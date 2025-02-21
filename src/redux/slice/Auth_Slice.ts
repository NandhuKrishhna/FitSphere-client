import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth_State, Auth_User } from "../../types/authentication.type";
import { RootState } from "../store";

const initialState: Auth_State = {
  currentUser: null,
};

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Auth_User>) => {
      state.currentUser = action.payload;
    },
    setLogout: (state) => {
      state.currentUser = null;
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.profilePicture = action.payload;
      }
    },
  },
});

export const { setCredentials, setLogout, setProfilePicture } = authslice.actions;

export default authslice.reducer;

// Selectors
export const selectCurrentUser = (state: RootState) =>
  state.auth.currentUser?.role === "user" ? state.auth.currentUser : null;

export const selectCurrentDoctor = (state: RootState) =>
  state.auth.currentUser?.role === "doctor" ? state.auth.currentUser : null;

export const selectCurrentAdmin = (state: RootState) =>
  state.auth.currentUser?.role === "admin" ? state.auth.currentUser : null;

export const selectCurrentToken = (state: RootState) => state.auth.currentUser?.accessToken;
