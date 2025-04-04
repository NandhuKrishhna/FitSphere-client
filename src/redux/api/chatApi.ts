import { AppURL, DoctorURL } from "@/utils/PathEnums";
import { setUsers } from "../slice/socket.ioSlice";
import { apiSlice } from "./EntryApiSlice";
import { getCurrentUserId, getCurrentUserRole } from "@/utils/GetCurrentUser";
import { IGetMessagesResponse, IGetUsersForSidebarResponse, IMessage, INewMessageResponse, ISendMessageParams, } from "@/types/api/chat-api-types";


export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<IGetMessagesResponse, { receiverId: string }>({
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


    sendMessages: builder.mutation<INewMessageResponse, ISendMessageParams>({
      query: (data) => {
        const role = getCurrentUserRole();
        const url = role === "doctor" ? DoctorURL.SEND_MESSAGE : AppURL.SEND_MESSAGE;
        return {
          url,
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(content, { dispatch, queryFulfilled }) {
        const tempMessageId = "temp-id-" + Date.now();
        const senderId = getCurrentUserId();
        const optimisticMessage: IMessage = {
          _id: tempMessageId,
          conversationId: "",
          createdAt: new Date().toISOString(),
          isRead: false,
          message: content.message,
          image: content.image,
          receiverId: content.receiverId,
          senderId: senderId!,
        };

        const patchResult = dispatch(
          chatApi.util.updateQueryData("getMessages", { receiverId: content.receiverId }, (draft) => {
            draft.messages.push(optimisticMessage);
          })
        );

        const patchResult2 = dispatch(
          chatApi.util.updateQueryData("getSidebarUsers", undefined, (draft) => {
            if (!draft.users) return;
            const userIndex = draft.users.findIndex((user) => user.doctorDetails._id === content.receiverId);
            if (userIndex !== -1) {
              draft.users[userIndex].lastMessage = content.message;
            }

          })
        )

        try {
          const { data: newMessage } = await queryFulfilled;
          dispatch(
            chatApi.util.updateQueryData("getMessages", { receiverId: content.receiverId }, (draft) => {
              draft.messages = draft.messages.filter((msg) => msg._id !== tempMessageId);
              draft.messages.push(newMessage.newMessage);
            })
          );
        } catch (error) {
          patchResult.undo();
          patchResult2.undo();
          console.error("Error sending message:", error);
        }
      }
    }),


    getSidebarUsers: builder.query<IGetUsersForSidebarResponse, void>({
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
    createConversation: builder.mutation({
      query: (data) => ({
        url: "/app/create-conversation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chatsidebar"],
    }),

  }),

});

export const { useGetMessagesQuery,
  useSendMessagesMutation,
  useGetSidebarUsersQuery,
  useCreateConversationMutation
} = chatApi;
