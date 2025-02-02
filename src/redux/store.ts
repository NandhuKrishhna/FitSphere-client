import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/apiSlice.ts";
import authReducer from "./slice/authSlice.ts"
import doctorReducer from "./slice/doctorSlice.ts"
import { doctorApi } from "./api/doctorApi.ts";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    [doctorApi.reducerPath]: doctorApi.reducer,
    auth: authReducer,
    doctor: doctorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware , doctorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
