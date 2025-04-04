import { useDispatch } from "react-redux";
import { useLazyDoctorLogoutQuery } from "../../redux/api/doctorApi";
import toast from "react-hot-toast";
import { setLogout } from "../../redux/slice/Auth_Slice";
import { ErrorResponse } from "react-router-dom";
import { disconnectSocket } from "@/lib/socketManager";
import { resetSocketState } from "@/redux/slice/socket.ioSlice";
import { resetAppState } from "@/redux/slice/appFeatSlice";



export const useDoctorLogout = () => {
    const dispatch = useDispatch()

    const [doctorLogout, { isLoading }] = useLazyDoctorLogoutQuery();

    const handleDoctorLogout = async (e?: React.FormEvent) => {
        e?.preventDefault()
        try {
            await doctorLogout({}).unwrap()
            dispatch(setLogout());
            disconnectSocket();
            dispatch(resetSocketState());
            dispatch(resetAppState());
            localStorage.removeItem("accessToken");
            toast.success("Logout Successfull")
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data.message) return toast.error(err.data.message);
            toast.error("Something went wrong. Please try again.");
        }
    }

    return {
        isLoading,
        handleDoctorLogout
    }
}