import { useDispatch } from "react-redux";
import { useLazyDoctorLogoutQuery } from "../../redux/api/doctorApi";
import toast from "react-hot-toast";
import { setLogout } from "../../redux/slice/Auth_Slice";



export const useDoctorLogout = () =>{
 const dispatch = useDispatch()

 const [doctorLogout, { isLoading }] = useLazyDoctorLogoutQuery();

    const handleDoctorLogout = async(e : React.FormEvent) =>{
        e.preventDefault()
        try {
            const response = await doctorLogout({}).unwrap()
            console.log(response)
            dispatch(setLogout())
            toast.success("Logout Successfull")
        } catch (error) {
            console.log(error)
        }
    }

    return{
        isLoading ,
        handleDoctorLogout
    }
}