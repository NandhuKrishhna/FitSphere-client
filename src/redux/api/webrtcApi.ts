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
    leaveMeeting: builder.mutation({
      query: (data) => ({
        url: "/leave-meeting",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["appointments"]
    })
  }),
});

export const {
  useJoinMeetingMutation,
  useLeaveMeetingMutation
} = webrtcApi;
