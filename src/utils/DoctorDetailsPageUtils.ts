import { setSelectedUser } from "@/redux/slice/socket.ioSlice";
import { AppDispatch } from "@/redux/store";
import { SelectedUser } from "@/types/ChatTypes";
import { NavigateFunction } from "react-router-dom";

export const handleOptionClick = (
  option: string,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  user: SelectedUser
) => {
  if (option === "Chat") {
    dispatch(setSelectedUser(user));
    navigate("/messenger");
  } else if (option === "Video") {
    navigate("/video");
  } else if (option === "Audio") {
    navigate("/audio");
  }
};
