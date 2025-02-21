import { apiSlice } from "./EntryApiSlice";
export const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    displayAllDoctors: builder.query({
      query: ({
        page = 1,
        limit = 8,
        search = "",
        sort = "_id,asc",
        gender = [],
        specialty = [],
        language = [],
        experience = 0,
      }) => ({
        url: "/app/doctors/all",
        method: "GET",
        params: {
          page,
          limit,
          search,
          sort,
          gender: gender.join(","),
          specialty: specialty.join(","),
          language: language.join(","),
          experience,
        },
      }),
    }),
    uploadProfilePic: builder.mutation({
      query: (data) => ({
        url: "/app/update-profile",
        method: "POST",
        body: data,
      }),
    }),
    doctorDetails: builder.query({
      query: (data) => ({
        url: "/app/doctor/profile",
        method: "POST",
        body: data,
      }),
    }),
    getAllSlotDetails: builder.query({
      query: (data) => ({
        url: "/app/doctor/slots",
        method: "POST",
        body: data,
      }),
      providesTags: ["slots"],
    }),
    bookSlots: builder.mutation({
      query: (data) => ({
        url: "/app/book/slots",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["slots"],
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/app/verify/payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
    getAppointmentDetails: builder.query({
      query: (data) => ({
        url: "/app/get-appointments",
        method: "POST",
        body: data,
      }),
      providesTags: ["appointments"],
    }),
    cancelAppointment: builder.mutation({
      query: (data) => ({
        url: "/app/cancel/appointments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointments", "wallet"],
    }),
    getWallet: builder.query({
      query: (data) => ({
        url: "/app/wallet",
        method: "POST",
        body: data,
      }),
      providesTags: ["wallet"],
    }),
  }),
});

export const {
  useDisplayAllDoctorsQuery,
  useUploadProfilePicMutation,
  useDoctorDetailsQuery,
  useGetAllSlotDetailsQuery,
  useBookSlotsMutation,
  useVerifyPaymentMutation,
  useGetAppointmentDetailsQuery,
  useCancelAppointmentMutation,
  useGetWalletQuery,
} = appApi;
