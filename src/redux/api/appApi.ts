import { apiSlice } from "./AuthApi";

export const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    displayAllDoctors: builder.query({
      query: ({ page = 1, limit = 8, search = "", sort = "_id,asc" }) => ({
        url: "/app/doctors/all",
        method: "GET",
        params: { page, limit, search, sort },
      }),
    }),
    uploadProfilePic: builder.mutation({
      query: (data) => ({
        url: "/app/update-profile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useDisplayAllDoctorsQuery, useUploadProfilePicMutation } = appApi;