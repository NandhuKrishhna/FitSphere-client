import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormData, userRegisterSchema } from "../types/Validations/registerAsDoctorForm";
import { ErrorResponse } from "../types/userTypes";
import { useSignUpMutation } from "../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slice/Auth_Slice";

const useSignUp = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userRegisterSchema) });
  const onSubmit = async (data: FormData) => {
    try {
      const res = await signUp(data).unwrap();
      localStorage.setItem("userId", res.user._id);
      toast.success(res.message);
      dispatch(setCredentials({ ...res.response }));
      navigate("/verify-email");
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

export default useSignUp;
