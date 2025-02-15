import { useDispatch } from "react-redux"
import toast from "react-hot-toast";
import { useLazyAdminLogoutQuery } from "../../redux/api/adminApi";
import { setLogout } from "../../redux/slice/Auth_Slice";



export const useAdminLogout = () =>{
 const dispatch = useDispatch()

 const [adminLogin, { isLoading }] = useLazyAdminLogoutQuery();

    const handleLogout = async(e : React.FormEvent) =>{
        e.preventDefault()
        try {
            const response = await adminLogin({}).unwrap()
            console.log(response)
            dispatch(setLogout())
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