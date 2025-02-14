import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../../types/Validations/registerAsDoctorForm";
import { FormData } from "../../types/Validations/registerAsDoctorForm";
import { useDoctorSignUpMutation } from "../../redux/api/doctorApi";
import { setDoctorCredentials } from "../../redux/slice/doctorSlice";
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

  const {register,handleSubmit, watch , formState: { errors },} = useForm<FormData>({resolver: zodResolver(userRegisterSchema),});
  const onSubmit = async (data: FormData) => {
    try {
      const res = await doctorSignUp(data).unwrap();
        console.log(res);
        toast.success(res.message);
        dispatch(setDoctorCredentials(res.user));
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
    watch
  };
};
 
export default useDoctorSignUp;
