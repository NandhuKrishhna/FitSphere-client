import { apiSlice } from "./EntryApiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (data) => ({
        url: "/notification",
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
