import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterAsDoctorMutation} from "../../redux/api/doctorApi";
import { setDoctor } from "../../redux/slice/doctorSlice";
import { setToken } from "../../redux/slice/authSlice";
interface ErrorResponse {
    data: {
      errors?: Array<{ path: string; message: string }>;
      message?: string;
    };
    status: number;
  }
const useDoctorSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerAsDoctor , {isLoading}] = useRegisterAsDoctorMutation()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
        const res = await registerAsDoctor({ name, email, password, confirmPassword }).unwrap();
        console.log(res);
        toast.success(res.message);
        dispatch(setDoctor(res.user));
        dispatch(setToken(res.accessToken));
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      } catch (err) {
        console.log(err)
        const error = err as ErrorResponse;
        if (error.data?.errors) {
          const fieldErrors: Record<string, string> = {};
          error.data.errors.forEach((err: { path: string; message: string }) => {
            fieldErrors[err.path] = err.message;
          });
          toast.error(fieldErrors.name || fieldErrors.email || fieldErrors.password || fieldErrors.confirmPassword);
        } else if (error.status === 409 && error.data?.message) {
          toast.error(error.data.message); 
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
    }
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    isLoading
  };
};
 
export default useDoctorSignUp;
