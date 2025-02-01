import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/api/apiSlice";
interface ErrorResponse {
    data: {
      errors?: Array<{ path: string; message: string }>;
      message?: string;
    };
    status: number;
  }
const useForgotPasswordHook = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
 const [resetPassword , {isLoading}] =  useResetPasswordMutation()

  const validateForm = ()=> {
    if (!email) return toast.error("Please enter your email");
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = validateForm()
    if (success === true) {
      try {
        const res = await resetPassword({ email}).unwrap();
        console.log(res);
        toast.success(res.message);
        setEmail("");
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
    }
  };
  
  

  return {
    email,
    setEmail,
    handleSubmit,
    isLoading
  };
};

export default useForgotPasswordHook;
