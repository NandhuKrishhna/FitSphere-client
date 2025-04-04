import AuthLayout from "@/components/App/AuthLayout";
import useDoctorForgotPasswordHook from "@/hooks/DoctorHooks/useForgotPassword";
import { AuthFormInputs } from "@/types/authentication.type";
import { UseFormRegister } from "react-hook-form";

const DoctorForgotPasswordPage = () => {
  const { handleSubmit, errors, register, isLoading } = useDoctorForgotPasswordHook();

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
      isSignUp={false}
      onSubmit={handleSubmit}
      register={register as UseFormRegister<AuthFormInputs>}
      errors={errors}
      isLoading={isLoading}
      footerQuestion="Don't have an account?"
      footerLinkText="Login"
      footerLinkPath="/doctor/login"
      submitButtonText="Reset Password"
      forgotPassword={true}
    />
  );
};

export default DoctorForgotPasswordPage;
