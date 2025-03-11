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
      invalidatesTags: ["appointments", "slots"],
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
    handleFailedPayment: builder.mutation({
      query: (data) => ({
        url: "/app/payment-failure",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointments", "slots"],
    }),
    walletPayment: builder.mutation({
      query: (data) => ({
        url: "/app/wallet-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointments", "wallet"],
    }),
    addReviws: builder.mutation({
      query: (data) => ({
        url: "/app/add-reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews", "ratings"],
    }),
    getReviews: builder.query({
      query: (data) => ({
        url: "/app/get-reviews",
        method: "POST",
        body: data,
      }),
      providesTags: ["reviews"],
    }),
    getAllRatings: builder.query({
      query: () => ({
        url: "/app/get-all-ratings",
        method: "GET",
      }),
      providesTags: ["ratings"],
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
  useHandleFailedPaymentMutation,
  useWalletPaymentMutation,
  useAddReviwsMutation,
  useGetReviewsQuery,
  useGetAllRatingsQuery,
} = appApi;
