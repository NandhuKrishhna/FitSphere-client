import { useDispatch } from "react-redux"

import toast from "react-hot-toast";
import { useLazyAdminLogoutQuery } from "../../redux/api/adminApi";
import { setAdminToken, setAdminUser } from "../../redux/slice/adminSlice";



export const useAdminLogout = () =>{
 const dispatch = useDispatch()

 const [adminLogin, { isLoading }] = useLazyAdminLogoutQuery();

    const handleLogout = async(e : React.FormEvent) =>{
        e.preventDefault()
        try {
            const response = await adminLogin({}).unwrap()
            console.log(response)
            dispatch(setAdminUser(null))
            dispatch(setAdminToken(""))
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