import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/admin";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes: ["doctors" , "users" , "notification"],
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: "/signin",
                method: "POST",
                body: data,
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags :["users"]
        }),
        getAllDoctors : builder.query({
            query: () => ({
                url: "/doctors",
                method: "GET",

            }),
            providesTags: ["doctors"],
        }),
        adminLogout : builder.query({
            query: () => ({
                url: "/logout",
                method: "GET",
            }),
        }),
        getNotification: builder.query({
            query : () => ({
                url: "/notification",
                method: "GET",
            }),
            providesTags:["notification"]
        }),
        approveRequest : builder.mutation({
            query : (data) => ({
                url: "/approve-request",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["doctors", "notification"],
        }),
        rejectRequest : builder.mutation({
            query : (data) => ({
                url: "/reject-request",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["doctors" , "notification"],
        }),

        doctorManagement : builder.query({
            query: () =>({
                url:"/doctorDetails",
                method:"GET"

            })
        }),

        unblockUsers : builder.mutation({
            query : (data) =>({
                url:"unblock-user",
                method : "POST",
                body : data
            }),
            invalidatesTags:["users"]
        }),
        blockUsers : builder.mutation({
            query : (data) =>({
                url:"block-user",
                method : "POST",
                body : data
            }),
            invalidatesTags:["users" ]
        })
    })
   
});


export const { useAdminLoginMutation,
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