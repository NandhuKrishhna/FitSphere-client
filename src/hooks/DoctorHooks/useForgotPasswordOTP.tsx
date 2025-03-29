import { useVerifyResetPasswordCodeMutation } from "@/redux/api/doctorApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface ErrorResponse {
  data: {
    errors?: Array<{ path: string; message: string }>;
    message?: string;
  };
  status: number;
}

const useDoctorResetPasswordHook = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const navigate = useNavigate();
  const [verifyResetPasswordCode, { isLoading }] = useVerifyResetPasswordCodeMutation();

  const validateForm = () => {
    const otpString = otp.join("");
    if (otpString.length < 6) return toast.error("Please enter a valid code");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      try {
        const userId = localStorage.getItem("ForgotPasswordUserId");
        const res = await verifyResetPasswordCode({ code: otp.join(""), userId: userId }).unwrap();
        toast.success(res.message);
        setOtp(new Array(6).fill(""));
        navigate("/doctor/reset/new-password");
      } catch (err) {
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
  };

  return {
    otp,
    setOtp,
    handleSubmit,
    isLoading,
  };
};

export default useDoctorResetPasswordHook;
