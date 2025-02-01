import { useState } from "react";
import { useVerfiyEmailMutation } from "../redux/api/apiSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignIn } from "../redux/slice/authSlice";
interface ErrorResponse {
  data: {
    errors?: Array<{ path: string; message: string }>;
    message?: string;
  };
  status: number;
}
  const useVerificationCodeHook = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verfiyEmail, { isLoading }] = useVerfiyEmailMutation();

  const validateForm = () => {
    const otpString = otp.join("");
    console.log(otpString);
    console.log(typeof otpString);
    if (otpString.length < 6) return toast.error("Please enter a valid code");
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      try {
        const res = await verfiyEmail(otp.join("")).unwrap();
        console.log(res);
        toast.success(res.message);
        setOtp(new Array(6).fill(""));
        dispatch(setSignIn(true));
        navigate("/home");
      } catch (err) {
        console.log(err)
        const error = err as ErrorResponse;
        if (error.data?.errors) {
          const fieldErrors: Record<string, string> = {};
          error.data.errors.forEach((err: { path: string; message: string }) => {
            fieldErrors[err.path] = err.message;
          });
          toast.error(fieldErrors.code);
        } else if (error.status === 404 && error.data?.message) {
          toast.error(error.data.message); 
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
      }
    }



  return {
    otp,
    setOtp,
    handleSubmit,
    isLoading,
    verfiyEmail,
  };
};

export default useVerificationCodeHook;
