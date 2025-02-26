import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userRegisterSchema } from "../types/Validations/registerAsDoctorForm";
import { ErrorResponse } from "../types/userTypes";
import { useSignUpMutation } from "../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slice/Auth_Slice";
import { AuthFormInputs } from "@/components/App/AuthLayout";

const useSignUp = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormInputs>({ resolver: zodResolver(userRegisterSchema) });
  const onSubmit: SubmitHandler<AuthFormInputs> = async (data: AuthFormInputs) => {
    try {
      const res = await signUp(data).unwrap();
      localStorage.setItem("userId", res.response._id);
      toast.success(res.message || "Signup successful!");
      if (res.response) {
        dispatch(setCredentials({ ...res.response }));
      }
      navigate("/verify-email");
    } catch (err) {
      console.error("Signup Error:", err);

      const error = err as ErrorResponse;
      const errorMessage = error.data?.message || "An unexpected error occurred. Please try again.";

      toast.error(errorMessage);

      if (error.data?.errors) {
        error.data.errors.forEach((err) => {
          toast.error(err.message);
        });
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

export default useSignUp;
