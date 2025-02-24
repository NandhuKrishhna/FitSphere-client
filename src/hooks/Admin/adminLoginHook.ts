import { useDispatch } from "react-redux";
import { ErrorResponse, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setCredentials } from "../../redux/slice/Auth_Slice";
import { AuthFormInputs } from "@/components/App/AuthLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminLoginMutation } from "@/redux/api/adminApi";
import { loginSchema } from "@/types/Validations/registerAsDoctorForm";
const useAdminLoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useAdminLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({ resolver: zodResolver(loginSchema) });
  const onSubmit: SubmitHandler<AuthFormInputs> = async (data: AuthFormInputs) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);
      toast.success(res.message);
      dispatch(setCredentials({ ...res.response }));
      navigate("/doctors/all");
    } catch (err) {
      console.log(err);
      const error = err as ErrorResponse;
      if (error.data?.message) {
        toast.error(error.data.message);
        return;
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isLoading,
    errors,
  };
};

export default useAdminLoginHook;
