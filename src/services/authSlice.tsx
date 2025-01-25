import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  message: string;
  userId: string;
  token: string;
}

const BASE_URL = 'http://localhost:5173/';

export const authSlice = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authSlice;