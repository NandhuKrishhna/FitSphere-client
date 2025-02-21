import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../../types/auth.types";
import { RootState } from "../store";

interface DoctorState {
  doctor: Doctor | null;
  isSignIn: boolean;
  isOtpVerified: boolean;
  isApproved: boolean;
  isCanelSlot: string;
  notification: [];
}

const intialState: DoctorState = {
  doctor: null,
  isSignIn: false,
  isOtpVerified: false,
  isApproved: false,
  isCanelSlot: "",
  notification: [],
};
export const doctorSlice = createSlice({
  name: "doctor",
  initialState: intialState,
  reducers: {
    setDoctorCredentials: (state, action: PayloadAction<{ doctor: Doctor }>) => {
      const { doctor } = action.payload;
      state.doctor = doctor;
    },
    setDoctorSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignIn = action.payload;
    },
    setOtpVerified: (state, action: PayloadAction<boolean>) => {
      state.isOtpVerified = action.payload;
    },
    setDoctorApprove: (state, action: PayloadAction<boolean>) => {
      state.isApproved = action.payload;
    },
    setCanelSlot: (state, action: PayloadAction<string>) => {
      state.isCanelSlot = action.payload;
    },
    setDoctorLogout: (state) => {
      state.doctor = null;
    },
  },
});

export const {
  setDoctorCredentials,
  setDoctorSignIn,
  setOtpVerified,
  setDoctorApprove,
  setCanelSlot,
  setDoctorLogout,
} = doctorSlice.actions;
export default doctorSlice.reducer;
export const selectCurrentDoctor = (state: RootState) => state.doctor.doctor;
export const selectDoctorToken = (state: RootState) => state.doctor.doctor?.accessToken;
