import { AppURL, DoctorURL } from "@/utils/PathEnums";
import { setUsers } from "../slice/socket.ioSlice";
import { apiSlice } from "./EntryApiSlice";
import { getCurrentUserRole } from "@/utils/GetCurrentUser";
export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ receiverId }) => {
        const role = getCurrentUserRole();
        const baseUrl = role === "doctor" ? DoctorURL.GET_MESSAGES : AppURL.GET_MESSAGES;
        
        return {
          url: `${baseUrl}?receiverId=${receiverId}`, 
          method: "GET",
        };
      },
      providesTags: ["chatsidebar", "chats",],
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
      invalidatesTags: ["chatsidebar", "chats" , "notification"],
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
          dispatch(setUsers(res.data.users));
        } catch (error) {
          console.error("Error fetching sidebar users:", error);
        }
      },
    }),
    createConversation : builder.mutation({
      query: (data) => ({
        url: "/app/create-conversation",
        method: "POST",
        body: data,
      }),
    }),

  }),
  
});

export const { useGetMessagesQuery, 
  useSendMessagesMutation,
   useGetSidebarUsersQuery,
   useCreateConversationMutation
   } = chatApi;
