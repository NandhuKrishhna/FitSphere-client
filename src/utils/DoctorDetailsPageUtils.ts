
import { setSelectedUser } from "@/redux/slice/socket.ioSlice";
import { AppDispatch } from "@/redux/store";
import { SelectedUser } from "@/types/ChatTypes";
import { NavigateFunction } from "react-router-dom";
export type createConversationProps = {
  senderId: string,
  receiverId : string
}
export const handleOptionClick = (
  option: string,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  user: SelectedUser,
  currentUserId: string | undefined,
  createConversationHandler: ({senderId, receiverId}:createConversationProps) => Promise<string | undefined>
) => {
  if (option === "Chat") {
    dispatch(setSelectedUser(user));
    createConversationHandler({senderId: currentUserId!, receiverId: user.doctorDetails._id!});
    navigate("/chat");
  } else if (option === "Video") {
    navigate("/video");
  } else if (option === "Audio") {
    navigate("/audio");
  }
};
