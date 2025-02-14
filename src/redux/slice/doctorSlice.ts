import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import {Doctor } from "../../types/auth.types";


interface DoctorState {
    doctor : Doctor | null
    isSignIn : boolean,
    isOtpVerified : boolean,
    isApproved : boolean,
    isCanelSlot : string
    
}

const intialState : DoctorState = {
    doctor : null,
    isSignIn : false,
    isOtpVerified : false,
    isApproved : false,
    isCanelSlot: ""
};
export const doctorSlice = createSlice({
    name : "auth",
    initialState : intialState,
    reducers : {
        setDoctorCredentials: (state, action: PayloadAction<{ doctor: Doctor }>) => {
             const { doctor } = action.payload;
             state.doctor = doctor;
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

export const { setDoctorCredentials  , 
    setDoctorSignIn , 
    setOtpVerified,
    setDoctorApprove,
    setCanelSlot
} = doctorSlice.actions;
export default doctorSlice.reducer;