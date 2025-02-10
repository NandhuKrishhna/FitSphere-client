import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDoctorLoginMutation } from "../../redux/api/doctorApi";
import { LoginData, loginSchema } from "../../types/Validations/registerAsDoctorForm";
import { setDoctor, setDoctorSignIn, setDoctorToken } from "../../redux/slice/doctorSlice";

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
const useDoctorLoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [doctorLogin,{isLoading}] = useDoctorLoginMutation();

    const {register,handleSubmit , formState: { errors },} = useForm<LoginData>({resolver: zodResolver(loginSchema),});
     const onSubmit = async (data: LoginData) => {
      try {
        const res = await doctorLogin(data).unwrap();
        console.log(res);
        toast.success(res.message);
        dispatch(setDoctor(res.user));
        dispatch(setDoctorToken(res.accessToken));
        dispatch(setDoctorSignIn(true));
        navigate("/doctor/dashboard");
      } catch (err) {
        console.log(err)
        const error = err as ErrorResponse;
        if (error.data?.message) {
          toast.error(error.data.message); 
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

export default useDoctorLoginHook;
