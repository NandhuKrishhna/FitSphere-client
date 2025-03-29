import { useDispatch } from "react-redux"
import toast from "react-hot-toast";
import { useLazyAdminLogoutQuery } from "../../redux/api/adminApi";
import { setLogout } from "../../redux/slice/Auth_Slice";
import { ErrorResponse } from "../LoginHook";



export const useAdminLogout = () => {
    const dispatch = useDispatch()

    const [adminLogin, { isLoading }] = useLazyAdminLogoutQuery();

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await adminLogin({}).unwrap()
            dispatch(setLogout())
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