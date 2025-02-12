import { apiSlice } from "./EntryApiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: "/admin/signin",
                method: "POST",
                body: data,
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/admin/users",
                method: "GET",
            }),
            providesTags: ["users"]
        }),
        getAllDoctors: builder.query({
            query: () => ({
                url: "/admin/doctors",
                method: "GET",
            }),
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
            providesTags: ["notification"]
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
                method: "GET"
            })
        }),
        unblockUsers: builder.mutation({
            query: (data) => ({
                url: "/admin/unblock-user",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["users"]
        }),
        blockUsers: builder.mutation({
            query: (data) => ({
                url: "/admin/block-user",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["users"]
        })
    }),
    overrideExisting: false
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
    useUnblockUsersMutation
} = adminApi;