import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:5000/api/doctor";
export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    // signUp
    signUp: builder.mutation({
      query: (data ,) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmailByOtp : builder.mutation({
      query:(data) => ({
        url: "/verify/otp",
        method: "POST",
        body: {code : data}
      }),
    }),

    registerAsDoctor: builder.mutation({
      query: (data) => ({
        url: "/registration",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const { 
    useSignUpMutation ,
    useVerifyEmailByOtpMutation,
    useRegisterAsDoctorMutation

} = doctorApi;