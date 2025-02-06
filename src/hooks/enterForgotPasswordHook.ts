
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/api/apiSlice";
import { EmailData, emailScheme } from "../types/Validations/registerAsDoctorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
interface ErrorResponse {
    data: {
      errors?: Array<{ path: string; message: string }>;
      message?: string;
    };
    status: number;
  }
const  useForgotPasswordHook = () => {

  const navigate = useNavigate();
 const [resetPassword , {isLoading}] =  useResetPasswordMutation()
  const {register, handleSubmit , formState: { errors },} = useForm<EmailData>({resolver: zodResolver(emailScheme),});

  const onSubmit = async (data: EmailData) => {
    
      try {
        const res = await resetPassword(data).unwrap();
        console.log(res);
        toast.success(res.message);

        navigate("/verify-reset-otp");
      } catch (err) {
        const error = err as ErrorResponse;
        if (error.data?.message) {
          toast.error(error.data.message); 
          return; 
        }
        if (error.data?.errors) {
          const fieldErrors: Record<string, string> = {};
          error.data.errors.forEach((err: { path: string; message: string }) => {
            fieldErrors[err.path] = err.message;
          });
          toast.error(fieldErrors.password);
          return; 
        }
        toast.error("An unexpected error occurred. Please try again.");
      
    }
  };
  
  

  return {
    register,
    errors,
    handleSubmit : handleSubmit(onSubmit),
    isLoading
  };
};

export default useForgotPasswordHook;
