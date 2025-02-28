import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthForgotPasswordInputs } from "@/components/App/AuthLayout";
import { emailScheme } from "@/types/Validations/registerAsDoctorForm";
import { useForgotPasswordMutation } from "@/redux/api/doctorApi";
import { Roles } from "@/utils/Enums";
interface ErrorResponse {
  data: {
    errors?: Array<{ path: string; message: string }>;
    message?: string;
  };
  status: number;
}
const useDoctorForgotPasswordHook = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForgotPasswordInputs>({ resolver: zodResolver(emailScheme) });

  const onSubmit: SubmitHandler<AuthForgotPasswordInputs> = async (data: AuthForgotPasswordInputs) => {
    try {
      const role = Roles.DOCTOR;
      const res = await forgotPassword({ data, role }).unwrap();
      localStorage.setItem("ForgotPasswordEmail", res.email);
      localStorage.setItem("ForgotPasswordUserId", res.userId);
      console.log(res);
      toast.success(res.message);
      navigate("/doctor/verify-reset-otp");
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
    handleSubmit: handleSubmit(onSubmit),
    isLoading,
  };
};

export default useDoctorForgotPasswordHook;
