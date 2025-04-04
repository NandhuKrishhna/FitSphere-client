import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../../types/Validations/registerAsDoctorForm";
import { useDoctorSignUpMutation } from "../../redux/api/doctorApi";
import { setCredentials } from "../../redux/slice/Auth_Slice";
import { AuthFormInputs } from "@/types/authentication.type";
interface ErrorResponse {
  data: {
    errors?: Array<{ path: string; message: string }>;
    message?: string;
  };
  status: number;
}
const useDoctorSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctorSignUp, { isLoading }] = useDoctorSignUpMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormInputs>({ resolver: zodResolver(userRegisterSchema) });
  const onSubmit: SubmitHandler<AuthFormInputs> = async (data: AuthFormInputs) => {
    try {
      const res = await doctorSignUp(data).unwrap();
      localStorage.setItem("userId", res.user._id);
      localStorage.setItem("doctorInfo", JSON.stringify(res.user));
      toast.success(res.message);
      dispatch(setCredentials({ ...res.user }));
      navigate("/doctor/verify/otp");
    } catch (err) {
      const error = err as ErrorResponse;
      if (error.data?.errors) {
        error.data.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else if (error.status === 409 && error.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    watch,
  };
};

export default useDoctorSignUp;
