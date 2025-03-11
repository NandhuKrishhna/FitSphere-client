import { apiSlice } from "./EntryApiSlice";

export const webrtcApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    joinMeeting: builder.mutation({
      query: (data) => ({
        url: "/meeting",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useJoinMeetingMutation } = webrtcApi;
