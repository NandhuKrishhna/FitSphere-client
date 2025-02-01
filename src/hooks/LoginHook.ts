import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignIn, setToken, setUser } from "../redux/slice/authSlice";
import { useLoginMutation } from "../redux/api/apiSlice";
export const ERRORS = {
  EMAIL_VERIFICATION_REQUIRED: "Please verify your email. A verification code has been sent to your email."
};
interface ErrorResponse {
    data: {
      errors?: Array<{ path: string; message: string }>;
      message?: string;
    };
    status: number;
  }
const useLoginHook = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const [login , {isLoading}] = useLoginMutation()

  // Validation Logic
  const validateForm = () => {
    if (!email || !password ) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await login({ email, password }).unwrap();
        console.log(res);
        toast.success(res.message);
        dispatch(setUser(res.user));
        dispatch(setToken(res.accessToken));
        dispatch(setSignIn(true));
        setEmail("");
        setPassword("");
        navigate("/home");
      } catch (err) {
        console.log(err)
        const error = err as ErrorResponse;
        if (error.status === 401 && error.data?.message === ERRORS.EMAIL_VERIFICATION_REQUIRED) {
          toast.error(ERRORS.EMAIL_VERIFICATION_REQUIRED);
          navigate("/verify-email");
          return;
        }
        if (error.data?.message) {
          toast.error(error.data.message); 
          return; 
        }
        if (error.data?.errors) {
          const fieldErrors: Record<string, string> = {};
          error.data.errors.forEach((err: { path: string; message: string }) => {
            fieldErrors[err.path] = err.message;
          });
          toast.error(fieldErrors.email || fieldErrors.password);
          return; 
        }
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  


  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    isLoading
  };
};

export default useLoginHook;
