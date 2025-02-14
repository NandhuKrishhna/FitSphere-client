import { useDispatch } from "react-redux";
import { useLazyDoctorLogoutQuery } from "../../redux/api/doctorApi";
import { setDoctor, setDoctorSignIn, setDoctorToken } from "../../redux/slice/doctorSlice";
import toast from "react-hot-toast";



export const useDoctorLogout = () =>{
 const dispatch = useDispatch()

 const [doctorLogout, { isLoading }] = useLazyDoctorLogoutQuery();

    const handleDoctorLogout = async(e : React.FormEvent) =>{
        e.preventDefault()
        try {
            const response = await doctorLogout({}).unwrap()
            console.log(response)
            dispatch(setDoctor(null))
            dispatch(setDoctorToken(''))
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