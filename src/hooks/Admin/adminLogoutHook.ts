import { useDispatch } from "react-redux"
import toast from "react-hot-toast";
import { useLazyAdminLogoutQuery } from "../../redux/api/adminApi";
import { setLogout } from "../../redux/slice/Auth_Slice";
import { ErrorResponse } from "../LoginHook";
import { resetSocketState } from "@/redux/slice/socket.ioSlice";
import { disconnectSocket } from "@/lib/socketManager";
import { resetAppState } from "@/redux/slice/appFeatSlice";
import { apiSlice } from "@/redux/api/EntryApiSlice";
import { persistor } from "@/redux/store";



export const useAdminLogout = () => {
    const dispatch = useDispatch()

    const [adminLogin, { isLoading }] = useLazyAdminLogoutQuery();

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await adminLogin({}).unwrap()
            dispatch(setLogout());
            disconnectSocket();
            dispatch(resetSocketState());
            dispatch(resetAppState());
            localStorage.clear();
            dispatch(apiSlice.util.resetApiState());
            await persistor.purge();
            toast.success("Logout Successfull")
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data?.message) return toast.error(err.data.message);
            toast.error("Something went wrong . Please try again")
        }
    }

    return {
        isLoading,
        handleLogout
    }
}