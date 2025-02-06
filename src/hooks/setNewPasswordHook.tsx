import toast from "react-hot-toast";
import { useResetNewPasswordMutation } from "../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setOtpVerified } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PasswordData, setNewPasswordSchema } from "../types/Validations/registerAsDoctorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "./LoginHook";



const useSetNewPasswordHook = () => {

 const [resetNewPassword , {isLoading}] = useResetNewPasswordMutation()
 const {register , handleSubmit ,  watch , formState:{errors}} = useForm<PasswordData>({resolver: zodResolver(setNewPasswordSchema)})
 const dispatch = useDispatch();
 const navigate = useNavigate();


  const onSubmit = async (data : PasswordData) =>{
      try {
         const res = await resetNewPassword(data).unwrap();
         toast.success(res.message);
         dispatch(setOtpVerified(false));
         navigate("/login");
      } catch (error) {
        const err  = error as ErrorResponse;
        if(err.data.message) return toast.error(err.data.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  
  return{
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isLoading,
    watch
  }
}

export default useSetNewPasswordHook
