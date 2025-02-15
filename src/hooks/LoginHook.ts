import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "../types/Validations/registerAsDoctorForm";
import { setCredentials } from "../redux/slice/Auth_Slice";
export const ERRORS = {
  EMAIL_VERIFICATION_REQUIRED: "Please verify your email. A verification code has been sent to your email."
};
export interface ErrorResponse {
    data: {
      errors?: Array<{ path: string; message: string }>;
      message?: string;
    };
    status: number;
  }
const useLoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const [login , {isLoading}] = useLoginMutation()

    const {register,handleSubmit , formState: { errors },} = useForm<LoginData>({resolver: zodResolver(loginSchema),});
     const onSubmit = async (data: LoginData) => {
      try {
        const res = await login(data).unwrap();
        console.log(res);
        toast.success(res.message);
        dispatch(setCredentials({...res.user}));
        navigate("/doctors/all");
      } catch (err) {
        console.log(err)
        const error = err as ErrorResponse;
        if (error.data?.message) {
          toast.error(error.data.message); 
          return; 
        }
        if (error.status === 401 && error.data?.message === ERRORS.EMAIL_VERIFICATION_REQUIRED) {
          toast.error(ERRORS.EMAIL_VERIFICATION_REQUIRED);
          navigate("/verify-email");
          return;
        }
      
    }
  };
  


  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isLoading,
    errors
  };
};

export default useLoginHook;
