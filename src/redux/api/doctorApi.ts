import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:5000/api/doctor";
export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  tagTypes:["slots"],
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
    }),
    doctorLogin : builder.mutation({
      query: (data) => ({
        url: "/doctor-login",
        method : "POST",
        body : data
      })
    }),
    addSlots : builder.mutation({
      query :(data) =>({
        url : "/slot-management",
        method : "POST",
        body : data
      }),
      invalidatesTags:["slots"]
    }),
    getAllSlots : builder.query({
      query : ()=>({
        url :"/get-slots",
        method : "GET"
      }),
      providesTags:["slots"]
    }),
    cancelSlot : builder.mutation({
      query :(data) =>({
        url : "/cancel-slot",
        method : "POST",
        body : data
      }),
      invalidatesTags:["slots"]
    })

  }),
 
});

export const { 
    useSignUpMutation ,
    useVerifyEmailByOtpMutation,
    useRegisterAsDoctorMutation,
    useDoctorLoginMutation,
    useAddSlotsMutation,
    useCancelSlotMutation,
    useGetAllSlotsQuery

} = doctorApi;