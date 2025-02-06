import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/admin";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes: ["doctors"],
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
            })
        }),
        approveRequest : builder.mutation({
            query : (data) => ({
                url: "/approve-request",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["doctors"],
        }),
        rejectRequest : builder.mutation({
            query : (data) => ({
                url: "/reject-request",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["doctors"],
        })
    }),
   
});


export const { useAdminLoginMutation,
    useGetAllUsersQuery,
    useGetAllDoctorsQuery,
    useLazyAdminLogoutQuery,
    useGetNotificationQuery,
    useApproveRequestMutation,
    useRejectRequestMutation
 } = adminApi;