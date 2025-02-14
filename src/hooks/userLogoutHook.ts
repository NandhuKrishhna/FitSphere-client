import { useDispatch } from "react-redux"
import { setSignIn, setToken, setUser } from "../redux/slice/authSlice"
import { useLazyLogoutQuery } from "../redux/api/apiSlice";
import toast from "react-hot-toast";



export const useLogout = () =>{
 const dispatch = useDispatch()

 const [logout, { isLoading }] = useLazyLogoutQuery();

    const handleLogout = async(e : React.FormEvent) =>{
        e.preventDefault()
        try {
            const response = await logout({}).unwrap()
            console.log(response)
            dispatch(setUser(null))
            dispatch(setToken(null))
            dispatch(setSignIn(false))
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