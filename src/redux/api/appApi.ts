import { TransactionQueryParams } from "@/types/transaction";
import { apiSlice } from "./EntryApiSlice";
import { AppointmentQueryParams } from "@/types/appointmentList";
import { WalletTransactionQuery } from "@/types/wallet.types";
import { Roles } from "@/utils/Enums";
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
      invalidatesTags: ["appointments", "slots","notification"],
    }),
    getAppointmentDetails: builder.query({
      query: (params: AppointmentQueryParams) => {
        const { ...queryParams } = params;
        const queryString = Object.entries(queryParams)
          .filter(([value]) => value !== undefined && value !== "")
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join("&");

        return {
          url: `/app/get-appointments${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
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
      query: ({ userId, role, ...queryParams }: { userId?: string; role?: string } & WalletTransactionQuery) => {
        console.log("Role from api",role)
        const queryString = Object.entries(queryParams)
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join("&");
        return {
          url: `${role === Roles.USER ? `/app/wallet/${userId}` : `/doctor/wallet/${userId}`}${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
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
    addReview: builder.mutation({
      query: (data) => ({
        url: "/app/add-reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews", "ratings"],
    }),
    getReviews: builder.query({
      query: (doctorId) => ({
        url: `/app/get-reviews/${doctorId}`,  
        method: "GET",
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
    getAllNotification : builder.query({
      query: () => ({
        url: "/app/get-all-notification",
        method: "GET",
      }),
      providesTags:["notification"]
    }),
     markAsRead : builder.mutation({
      query: (data) => ({
        url: "/app/mark-as-read",
        method: "POST",
        body:data
      }),
      invalidatesTags:["notification"]
     }),
     getAllTransactions : builder.query({
      query: () => ({
        url: "/app/get-all-transactions",
        method: "GET",
      }),
     }),
     editReview : builder.mutation({
      query: (data) => ({
        url: "/app/edit-review",
        method: "PATCH",
        body:data
      }),
      invalidatesTags:["reviews"]
     }),
     deleteReviews : builder.mutation({
      query: (data) => ({
        url: "/app/delete-review",
        method: "DELETE",
        body:data
      }),
      invalidatesTags:["reviews"]
     }),
     getTransactions : builder.query({
         query: (params: TransactionQueryParams) => {
               const { ...queryParams } = params;
               const queryString = Object.entries(queryParams)
                 .filter(([value]) => value !== undefined && value !== "")
                 .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
                 .join("&");
       
               return {
                 url: `/app/get-transaction-history${queryString ? `?${queryString}` : ""}`,
                 method: "GET",
               };
             },
             providesTags: ["appointments"],
     }),
     updatePassword : builder.mutation({
      query: (data) => ({
        url: "/app/update-password",
        method: "PATCH",
        body:data
      }),
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
  useAddReviewMutation,
  useGetReviewsQuery,
  useGetAllRatingsQuery,
  useGetAllNotificationQuery,
  useMarkAsReadMutation,
  useGetAllTransactionsQuery,
  useEditReviewMutation,
  useDeleteReviewsMutation,
  useGetTransactionsQuery,
  useUpdatePasswordMutation
}
 = appApi;
