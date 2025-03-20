import { apiSlice } from "./EntryApiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // signUp
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    verfiyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["notification"]
    }),
    // user enter their email to reset the password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    // user enter the otp to reset the password
    verifyResetPasswordCode: builder.mutation({
      query: (data) => ({
        url: "/auth/verify/reset-password/otp",
        method: "POST",
        body: data,
      }),
    }),

    // user enter the new password
    resetNewPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset/new-password",
        method: "POST",
        body: data,
      }),
    }),
    resendNewOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    googleAuthLogin : builder.query({
      query :(code) => ({
        url : `/auth/google?code=${code}`,
        method : "GET"
      })
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerfiyEmailMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyResetPasswordCodeMutation,
  useResetNewPasswordMutation,
  useLazyLogoutQuery,
  useResendNewOtpMutation,
  useLazyGoogleAuthLoginQuery
} = authApi;
