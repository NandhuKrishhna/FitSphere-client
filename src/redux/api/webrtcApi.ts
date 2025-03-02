import { apiSlice } from "./EntryApiSlice";

export const webrtcApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMeetingDetails: builder.query({
      query: (meetingId) => `/meeting/${meetingId}`,
    }),
  }),
});

export const { useGetMeetingDetailsQuery } = webrtcApi;
