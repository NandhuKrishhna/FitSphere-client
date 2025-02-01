import { createSlice , PayloadAction } from "@reduxjs/toolkit";import { AuthUser } from "../../types/auth.types";


interface AuthState {
    user : AuthUser | null;
    accessToken : string,
    isSignIn : boolean,
    isOtpVerified : boolean
}

const intialState : AuthState = {
    user : null,
    accessToken : "",
    isSignIn : false,
    isOtpVerified : false
};
export const authSlice = createSlice({
    name : "auth",
    initialState : intialState,
    reducers : {
        setUser : (state , action : PayloadAction<AuthUser>) => {
            state.user = action.payload;
        },
        setToken : (state , action : PayloadAction<string>) => {
           state.accessToken = action.payload
        },
        setSignIn : (state , action : PayloadAction<boolean>) => {
            state.isSignIn = action.payload;
        },
        setOtpVerified  : (state , action : PayloadAction<boolean>) => {
            state.isOtpVerified = action.payload
        }
    }
});

export const { setUser  , setToken , setSignIn , setOtpVerified} = authSlice.actions;
export default authSlice.reducer;