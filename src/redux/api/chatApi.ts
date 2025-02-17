import { setMessages } from "../slice/socket.ioSlice";
import { apiSlice } from "./EntryApiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (data) => ({
        url: "/app/get-messages",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          console.log("Response from getMessages:", res);
          dispatch(setMessages(res.data.message));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      },
    }),

    sendMessages: builder.mutation({
      query: (data) => ({
        url: "/app/send-message",
        method: "POST",
        body: data,
      }),
    }),

    getSidebarUsers: builder.query({
      query: () => ({
        url: "/app/get-sidebar-users",
        method: "GET",
      }),
    })
  }),
});

export const { useGetMessagesQuery, useSendMessagesMutation } = chatApi;
