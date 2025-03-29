import { UserQueryParams } from "@/types/userTypes";
import { apiSlice } from "./EntryApiSlice";


export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: (params: UserQueryParams) => {
        const { ...queryParams } = params;
        const queryString = Object.entries(queryParams)
          .filter(([value]) => value !== undefined && value !== "")
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join("&");

        return {
          url: `/admin/users${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    getAllDoctors: builder.query({
      query: (params: UserQueryParams) => {
        const { ...queryParams } = params;
        const queryString = Object.entries(queryParams)
          .filter(([value]) => value !== undefined && value !== "")
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join("&");

        return {
          url: `/admin/doctors${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["doctors"],
    }),
    adminLogout: builder.query({
      query: () => ({
        url: "/admin/logout",
        method: "GET",
      }),
    }),
    getNotification: builder.query({
      query: () => ({
        url: "/admin/notification",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    approveRequest: builder.mutation({
      query: (data) => ({
        url: "/admin/approve-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["doctors", "notification"],
    }),
    rejectRequest: builder.mutation({
      query: (data) => ({
        url: "/admin/reject-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["doctors", "notification"],
    }),
    doctorManagement: builder.query({
      query: () => ({
        url: "/admin/doctorDetails",
        method: "GET",
      }),
    }),
    unblockUsers: builder.mutation({
      query: (data) => ({
        url: "/admin/unblock-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users", "doctors"],
    }),
    blockUsers: builder.mutation({
      query: (data) => ({
        url: "/admin/block-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users", "doctors"],
    }),
    addSubcription: builder.mutation({
      query: (data) => ({
        url: "/admin/create-subcription-plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subcription"],
    }),
    editSubcription: builder.mutation({
      query: (data) => ({
        url: "/admin/edit-subcription-plan",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["subcription"],
    }),
    deleteSubcription: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-subscription-plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subcription"],
    }),
    getAllSubcription: builder.query({
      query: () => ({
        url: "/admin/get-subcription-plan",
        method: "GET",
      }),
      providesTags: ["subcription"],
    }),
    adminDashboard: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
    }),

  }),

});

export const {
  useAdminLoginMutation,
  useGetAllUsersQuery,
  useGetAllDoctorsQuery,
  useLazyAdminLogoutQuery,
  useGetNotificationQuery,
  useApproveRequestMutation,
  useRejectRequestMutation,
  useDoctorManagementQuery,
  useBlockUsersMutation,
  useUnblockUsersMutation,
  useAddSubcriptionMutation,
  useEditSubcriptionMutation,
  useDeleteSubcriptionMutation,
  useGetAllSubcriptionQuery,
  useAdminDashboardQuery
} = adminApi;
