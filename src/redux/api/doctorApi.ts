import { AppointmentQueryParams } from "@/types/doctorAppoitment.types";
import { apiSlice } from "./EntryApiSlice";
import { ICaneceSlotResponse, IGetAllSlotDetailsResponse, IGetDoctorProfileResponse, IUpdateDoctorDetailsResponse } from "@/types/api/doctor-api-types";
import { DoctorDetailsParams } from "@/types/doctorDetails";

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
    getAllSlots: builder.query<IGetAllSlotDetailsResponse, void>({
      query: () => ({
        url: "/doctor/get-slots",
        method: "GET",
      }),
      providesTags: ["slots"],
    }),
    // invalidatesTags: ["slots", "wallet"],
    cancelSlot: builder.mutation<ICaneceSlotResponse, { slotId: string }>({
      query: (data) => ({
        url: "/doctor/cancel-slot",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          doctorApi.util.updateQueryData(
            "getAllSlots",
            undefined,
            (draft) => {
              if (!draft.response) return;
              const slotIndex = draft.response.findIndex((slot) => slot._id === arg.slotId);
              if (slotIndex !== -1) {
                draft.response.splice(slotIndex, 1);
              }
            }
          )
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo()
        }
      }
    }),

    doctorLogout: builder.query({
      query: () => ({
        url: "/doctor/logout",
        method: "GET",
      }),
    }),

    getAllAppointments: builder.query({
      query: (params: AppointmentQueryParams) => {
        const { ...queryParams } = params;
        const queryString = Object.entries(queryParams)
          .filter(([value]) => value !== undefined && value !== "")
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join("&");

        return {
          url: `/doctor/get/all-appointments${queryString ? `?${queryString}` : ""}`,
          method: "GET",
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
      query: (doctorId) => ({
        url: `/doctor/get-reviews/${doctorId}`,
        method: "GET",
      }),
    }),
    doctorProfile: builder.query<IGetDoctorProfileResponse, { doctorId: string | undefined }>({
      query: (data) => ({
        url: "/doctor/profile",
        method: "POST",
        body: data,
      }),
      providesTags: ["doctorDetails"],
    }),
    allDoctorDetails: builder.query({
      query: () => ({
        url: "/doctor/patients-appointments",
        method: "GET",
      }),
    }),

    updateDoctorDetails: builder.mutation<IUpdateDoctorDetailsResponse, DoctorDetailsParams>({
      query: (data) => ({
        url: "/doctor/update-details",
        method: "PATCH",
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          doctorApi.util.updateQueryData(
            "doctorProfile",
            { doctorId: args.doctorId },
            (draft) => {
              if (!draft.doctorDetails || !draft.doctorDetails.details) return;
              draft.doctorDetails.details = {
                ...draft.doctorDetails.details,
                ...args,
              };
            }

          )
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo()
        }
      }
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
  useDoctorProfileQuery,
  useAllDoctorDetailsQuery,
  useUpdateDoctorDetailsMutation,
} = doctorApi;
