import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAdminLoginMutation } from "../../redux/api/adminApi";
import { setCredentials } from "../../redux/slice/Auth_Slice";
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
const useAdminLoginHook = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [adminLogin , {isLoading}] = useAdminLoginMutation();
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "email") setEmail(value);
      if (name === "password") setPassword(value);
  
      try {
        const fieldSchema = z.object({ [name]: loginSchema.shape[name as keyof typeof loginSchema.shape] });
        fieldSchema.parse({ [name]: value });
        setErrors((prev) => ({ ...prev, [name]: "" }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
        }
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        loginSchema.parse({ email, password });
        setErrors({}); 
  
        const res = await adminLogin({ email, password }).unwrap();
        console.log(res)
        dispatch(setCredentials({...res.admin}))
        toast.success(res.message);
        setEmail("");
        setPassword("");
        navigate("/admin/users-management");
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path[0]) {
              newErrors[err.path[0].toString()] = err.message;
            }
          });
          setErrors(newErrors);
          return;
        }
        toast.error("An unexpected error occurred. Please try again.");
      }
    };
  
    return { email, password, errors, handleInputChange, handleSubmit, isLoading };
    
  };
  export default useAdminLoginHook