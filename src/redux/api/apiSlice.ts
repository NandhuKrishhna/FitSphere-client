import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:5000/api/auth";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    // signUp
    signUp: builder.mutation({
      query: (data ,) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    verfiyEmail : builder.mutation({
      query:(data) => ({
        url: "/verify-email",
        method: "POST",
        body: {code : data}
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
  }),
 // user enter their email to reset the password
    resetPassword : builder.mutation({
      query:(data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data
      })
    }),
    // user enter the otp to reset the password
    verifyResetPasswordCode : builder.mutation({
      query:(data) => ({
        url: "/verify/reset-password/otp",
        method: "POST",
        body: {code : data}
      })
    }),

    // user enter the new password
    resetNewPassword : builder.mutation({
      query:(data) => ({
        url: "/reset/new-password",
        method: "POST",
        body: data
      })
    }),

    logout: builder.query({
      query: () => ({
        url :"/logout",
        method: "GET",
      })
    })
  })
});


export const {
   useSignUpMutation,
   useVerfiyEmailMutation ,
   useLoginMutation ,
   useResetPasswordMutation,
   useVerifyResetPasswordCodeMutation,
   useResetNewPasswordMutation,
    useLazyLogoutQuery

    } = authApi;
