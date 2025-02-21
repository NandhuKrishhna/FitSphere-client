import { AppURL, DoctorURL } from "@/utils/PathEnums";
import { setMessages, setUsers } from "../slice/socket.ioSlice";
import { apiSlice } from "./EntryApiSlice";
import { getCurrentUserRole } from "@/utils/GetCurrentUser";
export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (data) => {
        const role = getCurrentUserRole();
        console.log("Role : ", role);
        const url = role === "doctor" ? DoctorURL.GET_MESSAGES : AppURL.GET_MESSAGES;
        return {
          url,
          method: "POST",
          body: data,
        };
      },
      providesTags: (result, error, arg) => ["chatsidebar", { type: "chats", id: arg.conversationId }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log("GetMessage Query : ", data);
          dispatch(setMessages(data.messages));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      },
    }),

    sendMessages: builder.mutation({
      query: (data) => {
        const role = getCurrentUserRole();
        const url = role === "doctor" ? DoctorURL.SEND_MESSAGE : AppURL.SEND_MESSAGE;
        return {
          url,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => ["chatsidebar", { type: "chats", id: arg.conversationId }],
    }),

    getSidebarUsers: builder.query({
      query: () => {
        const role = getCurrentUserRole();
        const url = role === "doctor" ? DoctorURL.GET_USERS : AppURL.GET_USERS;
        return {
          url,
          method: "GET",
        };
      },
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
