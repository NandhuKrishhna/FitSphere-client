import { useDispatch } from "react-redux";
import { useLazyDoctorLogoutQuery } from "../../redux/api/doctorApi";
import { setDoctorCredentials, setDoctorSignIn,  } from "../../redux/slice/doctorSlice";
import toast from "react-hot-toast";



export const useDoctorLogout = () =>{
 const dispatch = useDispatch()

 const [doctorLogout, { isLoading }] = useLazyDoctorLogoutQuery();

    const handleDoctorLogout = async(e : React.FormEvent) =>{
        e.preventDefault()
        try {
            const response = await doctorLogout({}).unwrap()
            console.log(response)
            dispatch(setDoctorCredentials(null))
            dispatch(setDoctorSignIn(false))
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