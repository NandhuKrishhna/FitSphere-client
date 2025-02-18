import { setUsers } from "../slice/socket.ioSlice";
import { apiSlice } from "./EntryApiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (data) => ({
        url: "/app/conversation",
        method: "POST",
        body: data,
      }),
      providesTags: ["chats"],
    }),

    sendMessages: builder.mutation({
      query: (data) => ({
        url: "/app/send-message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chatsidebar", "chats"],
    }),

    getSidebarUsers: builder.query({
      query: () => ({
        url: "/app/get-users",
        method: "GET",
      }),
      providesTags: ["chatsidebar"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          console.log(res);
          dispatch(setUsers(res.data.users));
          console.log("Response from getSidebarUsers:", res);
        } catch (error) {
          console.error("Error fetching sidebar users:", error);
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessagesMutation, useGetSidebarUsersQuery } = chatApi;
