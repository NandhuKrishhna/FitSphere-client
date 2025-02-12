import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "../../types/auth.types";

interface AuthState {
    user : AuthUser | null;
    accessToken : null,
    isSignIn : boolean,
    isOtpVerified : boolean;
    isUpdatingProfile: boolean;
}

const intialState : AuthState = {
    user : null,
    accessToken : null,
    isSignIn : false,
    isOtpVerified : false,
    isUpdatingProfile: false
};
export const authSlice = createSlice({
    name : "auth",
    initialState : intialState,
    reducers : {
        setUser : (state , action : PayloadAction<AuthUser | null>) => {
            state.user = action.payload;
        },
        setToken : (state , action : PayloadAction<null>) => {
           state.accessToken = action.payload
        },
        setSignIn : (state , action : PayloadAction<boolean>) => {
            state.isSignIn = action.payload;
        },
        setOtpVerified  : (state , action : PayloadAction<boolean>) => {
            state.isOtpVerified = action.payload
        },
        logout :(state) => {
            state.user = null;
            state.accessToken = null; 
            state.isSignIn = false
            state.isOtpVerified = false           
        },
        setUpdatingProfile: (state, action: PayloadAction<boolean>) => {
            state.isUpdatingProfile = action.payload;
        },
        setProfilePic: (state, action: PayloadAction<string>) => {
            if(state.user){
                state.user.profilePicture = action.payload
            }

    }
}
})


export const { setUser  , 
    setToken , 
    setSignIn ,
     setOtpVerified ,
      logout,
      setUpdatingProfile,
      setProfilePic
    } = authSlice.actions;
export default authSlice.reducer;