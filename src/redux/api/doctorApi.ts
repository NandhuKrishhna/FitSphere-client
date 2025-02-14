import { apiSlice } from "./EntryApiSlice";

export const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // signUp
    doctorSignUp: builder.mutation({
      query: (data ,) => ({
        url: "/doctor/signup",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmailByOtp : builder.mutation({
      query:(data) => ({
        url: "/doctor/verify/otp",
        method: "POST",
        body: {code : data}
      }),
    }),

    registerAsDoctor: builder.mutation({
      query: (data) => ({
        url: "/doctor/registration",
        method: "POST",
        body: data,
      }),
    }),
    doctorLogin : builder.mutation({
      query: (data) => ({
        url: "/doctor/doctor-login",
        method : "POST",
        body : data
      })
    }),
    addSlots : builder.mutation({
      query :(data) =>({
        url : "/doctor/slot-management",
        method : "POST",
        body : data
      }),
      invalidatesTags:["slots"]
    }),
    getAllSlots : builder.query({
      query : ()=>({
        url :"/doctor/get-slots",
        method : "GET"
      }),
      providesTags:["slots"]
    }),
    cancelSlot : builder.mutation({
      query :(data) =>({
        url : "/doctor/cancel-slot",
        method : "POST",
        body : data
      }),
      invalidatesTags:["slots","wallet"]
    }),

    doctorLogout : builder.query({
        query : () =>({
          url : "/doctor/logout",
          method: "GET"
        })
    }),

    getAllAppointments: builder.query({
      query: (data) => ({
        url: "/doctor/get/all-appointments",
        method: "POST",
        body: data,
      }),
      providesTags:["wallet"]
    }),
    

  }),
 
});

export const { 
    useDoctorSignUpMutation,
    useVerifyEmailByOtpMutation,
    useRegisterAsDoctorMutation,
    useDoctorLoginMutation,
    useAddSlotsMutation,
    useCancelSlotMutation,
    useGetAllSlotsQuery,
    useLazyDoctorLogoutQuery,
    useGetAllAppointmentsQuery

} = doctorApi;