import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import {Doctor } from "../../types/auth.types";


interface DoctorState {
    user : Doctor | null;
    accessToken : string,
    isSignIn : boolean,
    isOtpVerified : boolean,
    isApproved : boolean,
    isCanelSlot : string
    
}

const intialState : DoctorState = {
    user : null,
    accessToken : "",
    isSignIn : false,
    isOtpVerified : false,
    isApproved : false,
    isCanelSlot: ""
};
export const doctorSlice = createSlice({
    name : "auth",
    initialState : intialState,
    reducers : {
        setDoctor : (state , action : PayloadAction<Doctor | null>) => {
            state.user = action.payload;
        },
        setDoctorToken : (state , action : PayloadAction<string>) => {
           state.accessToken = action.payload
        },
        setDoctorSignIn : (state , action : PayloadAction<boolean>) => {
            state.isSignIn = action.payload;
        },
        setOtpVerified  : (state , action : PayloadAction<boolean>) => {
            state.isOtpVerified = action.payload
        },
        setDoctorApprove : (state , action : PayloadAction<boolean>) => {
            state.isApproved = action.payload
        },
        setCanelSlot : (state , action : PayloadAction<string>) => {
            state.isCanelSlot = action.payload
        }
    }
});

export const { setDoctor  , 
    setDoctorToken , 
    setDoctorSignIn , 
    setOtpVerified,
    setDoctorApprove,
    setCanelSlot
} = doctorSlice.actions;
export default doctorSlice.reducer;