import { useResendNewOtpMutation } from "@/redux/api/apiSlice";
import { Roles } from "@/utils/Enums";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

const useResendPasswordHook = () => {
  const role = Roles.USER;
  const [resendNewOtp] = useResendNewOtpMutation();

  const handleResendOtp = async (email: string | null) => {
    if (!email) return toast.error("Email is required");

    try {
      const res = await resendNewOtp({ email: email, role: role }).unwrap();
      toast.success(res.message);
      console.log(res);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.data?.message) return toast.error(err.data.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return { handleResendOtp };
};

export default useResendPasswordHook;
