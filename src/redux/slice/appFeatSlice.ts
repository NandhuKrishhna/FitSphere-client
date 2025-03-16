import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
type SlotType = {
  startTime: string;
  endTime: string;
  date: string;
  doctorId: string;
};
interface AppState {
  selectedDoctorId: string | null;
  selectedSlot: SlotType | null;
}

const initialState: AppState = {
  selectedDoctorId: null,
  selectedSlot: null,
};

const appFeatSlice = createSlice({
  name: "appFeat",
  initialState: initialState,
  reducers: {
    setSelectedDoctorId: (state, action :PayloadAction<string>) => {
      state.selectedDoctorId = action.payload;
    },
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
    resetAppState: () => initialState,
  },
});

export const { setSelectedDoctorId, setSelectedSlot, resetAppState } = appFeatSlice.actions;
export default appFeatSlice.reducer;
export const selectedDoctorId = (state:RootState) => state.appFeat.selectedDoctorId;