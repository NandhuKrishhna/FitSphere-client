import { useSetNewPasswordForDoctorMutation } from "@/redux/api/doctorApi";
import { PasswordData, setNewPasswordSchema } from "@/types/Validations/registerAsDoctorForm";
import { Roles } from "@/utils/Enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ErrorResponse, useNavigate } from "react-router-dom";

const useSetNewPasswordDoctor = () => {
  const [resetNewPassword, { isLoading }] = useSetNewPasswordForDoctorMutation();
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
      const role = Roles.DOCTOR;
      const res = await resetNewPassword({ ...data, userId, role }).unwrap();
      toast.success(res.message);
      navigate("/doctor/login");
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

export default useSetNewPasswordDoctor;
