import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "../../types/auth.types";


interface AuthState {
    user : AuthUser | null;
    accessToken : string,
    isSignIn : boolean,
    isOtpVerified : boolean,
    isApproved : boolean
    
}

const intialState : AuthState = {
    user : null,
    accessToken : "",
    isSignIn : false,
    isOtpVerified : false,
    isApproved : false
};
export const doctorSlice = createSlice({
    name : "auth",
    initialState : intialState,
    reducers : {
        setDoctor : (state , action : PayloadAction<AuthUser>) => {
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
        },
        setDoctorApprove : (state , action : PayloadAction<boolean>) => {
            state.isApproved = action.payload
        }
    }
});

export const { setDoctor  , 
    setToken , 
    setSignIn , 
    setOtpVerified,
    setDoctorApprove
} = doctorSlice.actions;
export default doctorSlice.reducer;