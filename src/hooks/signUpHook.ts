import { useState } from "react";
import { useSignUpMutation } from "../redux/api/apiSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../redux/slice/authSlice";
interface ErrorResponse {
    data: {
      errors?: Array<{ path: string; message: string }>;
      message?: string;
    };
    status: number;
  }
const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp , {isLoading}] = useSignUpMutation();

  // Validation Logic
  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await signUp({ name, email, password, confirmPassword }).unwrap();
        console.log(res);
        toast.success(res.message);
        dispatch(setUser(res.user));
        dispatch(setToken(res.accessToken));
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/verify-email");
      } catch (err) {
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

export default useSignUp;
