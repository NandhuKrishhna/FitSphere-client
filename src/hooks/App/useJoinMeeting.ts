import { useJoinMeetingMutation } from "@/redux/api/webrtcApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "../LoginHook";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useHandleJoinMeeting = () => {
  const [joinMeeting, { isLoading: isJoiningMeeting }] = useJoinMeetingMutation();
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const message =
    user?.role === "user"
      ? "Error in joining meet. Please have a conversation with the doctor"
      : "Error in joining meet. Please have a conversation with the patient";

  const handleJoinMeet = async (meetingId: string) => {
    setLoadingItems((prev) => ({ ...prev, [meetingId]: true }));
    try {
      const response = await joinMeeting({ meetingId: meetingId }).unwrap();
      if (response.success) {
        toast.success("Successfully joined the meeting");
        navigate(`/consultation/${meetingId}`);
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.log(error);
      if (err.data.message) return toast.error(err.data.message);
      toast.error(message);
    }finally{
      setLoadingItems((prev) => ({ ...prev, [meetingId]: false }));
    }
  };

  return { handleJoinMeet, isJoiningMeeting ,loadingItems};
};

export default useHandleJoinMeeting;
