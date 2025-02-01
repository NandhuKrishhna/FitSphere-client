import React, { useState } from "react";
import toast from "react-hot-toast";
import { useResetNewPasswordMutation } from "../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setOtpVerified } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";



const useSetNewPasswordHook = () => {

 const [password , setPassword] = useState('');
 const [confirmPassword , setConfirmPassword] = useState('');
 const [resetNewPassword , {isLoading}] = useResetNewPasswordMutation()
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const validateForm = () => {
    if(!password || !confirmPassword) return toast.error("Please fill in all fields");
    if(password !== confirmPassword) return toast.error("Passwords do not match");
    return true;
 }
  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    const success = validateForm();
    if(success === true){
      try {
         const res = await resetNewPassword({password}).unwrap();
         toast.success(res.message);
         dispatch(setOtpVerified(false));
         navigate("/login");
      } catch (error) {
        console.log(error)
        // implement error handling logic here later 90% chance will be success
      }
    }
  };
  return{
    handleSubmit,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading
  }
}

export default useSetNewPasswordHook
