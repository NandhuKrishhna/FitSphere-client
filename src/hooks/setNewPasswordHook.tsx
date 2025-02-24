import toast from "react-hot-toast";
import { useResetNewPasswordMutation } from "../redux/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordData, setNewPasswordSchema } from "../types/Validations/registerAsDoctorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "./LoginHook";

const useSetNewPasswordHook = () => {
  const [resetNewPassword, { isLoading }] = useResetNewPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordData>({ resolver: zodResolver(setNewPasswordSchema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordData> = async (data: PasswordData) => {
    try {
      const userId = localStorage.getItem("ForgotPasswordUserId");
      const res = await resetNewPassword({ ...data, userId }).unwrap();
      toast.success(res.message);
      navigate("/login");
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.data.message) return toast.error(err.data.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isLoading,
    watch,
  };
};

export default useSetNewPasswordHook;
