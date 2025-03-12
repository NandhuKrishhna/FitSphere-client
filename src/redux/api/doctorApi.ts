import { AppointmentQueryParams } from "@/types/doctorAppoitment.types";
import { apiSlice } from "./EntryApiSlice";

export const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // signUp
    doctorSignUp: builder.mutation({
      query: (data) => ({
        url: "/doctor/signup",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmailByOtp: builder.mutation({
      query: (data) => ({
        url: "/doctor/verify/otp",
        method: "POST",
        body: data,
      }),
    }),

    registerAsDoctor: builder.mutation({
      query: (data) => ({
        url: "/doctor/registration",
        method: "POST",
        body: data,
      }),
    }),
    doctorLogin: builder.mutation({
      query: (data) => ({
        url: "/doctor/login",
        method: "POST",
        body: data,
      }),
    }),
    addSlots: builder.mutation({
      query: (data) => ({
        url: "/doctor/slot-management",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["slots"],
    }),
    getAllSlots: builder.query({
      query: () => ({
        url: "/doctor/get-slots",
        method: "GET",
      }),
      providesTags: ["slots"],
    }),
    cancelSlot: builder.mutation({
      query: (data) => ({
        url: "/doctor/cancel-slot",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["slots", "wallet"],
    }),

    doctorLogout: builder.query({
      query: () => ({
        url: "/doctor/logout",
        method: "GET",
      }),
    }),

    getAllAppointments: builder.query({
      query: (params: AppointmentQueryParams) => {
        const { userId, ...queryParams } = params;
        const queryString = Object.entries(queryParams)
          .filter(([value]) => value !== undefined && value !== "")
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join("&");

        return {
          url: `/doctor/get/all-appointments${queryString ? `?${queryString}` : ""}`,
          method: "POST",
          body: { userId },
        };
      },
      providesTags: ["appointments"],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/doctor/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyResetPasswordCode: builder.mutation({
      query: (data) => ({
        url: "/doctor/verify/reset-password/otp",
        method: "POST",
        body: data,
      }),
    }),
    setNewPasswordForDoctor: builder.mutation({
      query: (data) => ({
        url: "/doctor/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    getAllReviewsAndRatings: builder.query({
      query: (data) => ({
        url: "/doctor/get-reviews",
        method: "POST",
        body: data,
      }),
    }),
    doctorDetails: builder.query({
      query: (data) => ({
        url: "/doctor/profile",
        method: "POST",
        body: data,
      }),
    }),
    allDoctorDetails: builder.query({
      query: () => ({
        url: "/doctor/patients-appointments",
        method: "GET",
      }),
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
  useGetAllAppointmentsQuery,
  useForgotPasswordMutation,
  useVerifyResetPasswordCodeMutation,
  useSetNewPasswordForDoctorMutation,
  useGetAllReviewsAndRatingsQuery,
  useDoctorDetailsQuery,
  useAllDoctorDetailsQuery,
} = doctorApi;
