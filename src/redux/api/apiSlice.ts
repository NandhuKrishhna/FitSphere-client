import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { setToken, setUser , setSignIn } from "../slice/authSlice";

interface ErrorResponse {
  data: {
    errors: Array<{
      path: string;
      message: string;
    }>;
  };
  status: number;
}
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log(response);
          toast.success("Registration complete! Please check your email for the OTP.");
          dispatch(setUser(response.data.user));
          dispatch(setToken(response.data.accessToken));
        } catch (err) {
          const error = err as { error: ErrorResponse };
          if (error.error?.data?.errors) {
            const fieldErrors: Record<string, string> = {};
            error.error.data.errors.forEach((err) => {
              fieldErrors[err.path] = err.message;
            });
            console.error("Field errors:", fieldErrors);
            toast.error(fieldErrors?.name || fieldErrors?.email || fieldErrors?.password || fieldErrors?.confirmPassword);
          } else {
            console.error("An unexpected error occurred:", error);
            toast.error("An unexpected error occurred. Please try again.");
          }
        }
      },
    }),
    verfiyEmail : builder.mutation({
      query:(data) => ({
        url: "/verify-email",
        method: "POST",
        body: {code : data}
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(setSignIn(true));
          toast.success("Email was successfully verfied");
          console.log(response);
        } catch (err : any) {
          console.log(err)
          toast.error(err.error.data.message)
        
    }}
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(setUser(response.data.user));
          dispatch(setToken(response.data.accessToken));
          dispatch(setSignIn(true));
          toast.success("Login successful!");
        } catch (err : any) {
          console.log(err)
          toast.error(err.error.data.message)
        }
      },
  }),
  })
});


export const { useSignUpMutation, useVerfiyEmailMutation , useLoginMutation } = authApi;
