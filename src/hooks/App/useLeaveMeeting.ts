import { useLeaveMeetingMutation } from "@/redux/api/webrtcApi";
import { ErrorResponse } from "../LoginHook";
import toast from "react-hot-toast";
import { setMeetingId } from "@/redux/slice/appFeatSlice";
import { useDispatch } from "react-redux";

const useLeaveMeeting = () => {
     const dispatch = useDispatch() 
    const[leaveMeeting] = useLeaveMeetingMutation();
    const handleLeaveMeeting = async(meetingId:string) => {
        if (!meetingId) return;
        try {
            await leaveMeeting(meetingId).unwrap();
            dispatch(setMeetingId(null));
        } catch (error) {
            const err = error as ErrorResponse;
            if(err.data.message) return toast.error(err.data.message);
            toast.error("Unexpected Error . Please try again.")
        }

    }
    return {
        handleLeaveMeeting
    }
};
export default useLeaveMeeting;