import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "../../types/auth.types";

interface AuthState {
  user: AuthUser | null;
  isOtpVerified: boolean;
  isUpdatingProfile: boolean;
}

const intialState: AuthState = {
  user: null,
  isOtpVerified: false,
  isUpdatingProfile: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    setCredentialsDemo: (state, action: PayloadAction<{ user: AuthUser }>) => {
      const { user } = action.payload;
      state.user = user;
    },
    setOtpVerified: (state, action: PayloadAction<boolean>) => {
      state.isOtpVerified = action.payload;
    },
    setlogout: (state) => {
      state.user = null;
    },

    setUpdatingProfile: (state, action: PayloadAction<boolean>) => {
      state.isUpdatingProfile = action.payload;
    },
    setProfilePic: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profilePicture = action.payload;
      }
    },
  },
});

export const { setCredentialsDemo, setlogout, setUpdatingProfile, setProfilePic } = authSlice.actions;
export default authSlice.reducer;
