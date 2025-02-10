import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = "http://localhost:5000/api/app";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    displayAllDoctors: builder.query({
      query: ({ page = 1, limit = 8, search = "", sort = "_id,asc" }) => ({
        url: "/doctors/all",
        method: "GET",
        params: { page, limit, search, sort },
      }),
    }),
  uploardProfilePic : builder.mutation({
    query :(data) => ({
      url:"/update-profile",
      method : "POST",
      body : data
    })
  })

  }),
});

export const {
   useDisplayAllDoctorsQuery ,
   useUploardProfilePicMutation
  } = appApi;
