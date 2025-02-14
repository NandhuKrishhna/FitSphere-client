import { useDispatch } from "react-redux"
import { useLazyLogoutQuery } from "../redux/api/apiSlice";
import toast from "react-hot-toast";
import { setlogout } from "../redux/slice/authSlice";



export const useLogout = () =>{
 const dispatch = useDispatch()

 const [logout, { isLoading }] = useLazyLogoutQuery();

    const handleLogout = async(e : React.FormEvent) =>{
        e.preventDefault()
        try {
            const response = await logout({}).unwrap()
            console.log(response)
            dispatch(setlogout())
            toast.success("Logout Successfull")
        } catch (error) {
            console.log(error)
        }
    }

    return{
        isLoading ,
        handleLogout
    }
}