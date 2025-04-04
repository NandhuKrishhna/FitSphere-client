import AuthLayout from "@/components/App/AuthLayout";
import useForgotPasswordHook from "@/hooks/enterForgotPasswordHook";
import { AuthFormInputs } from "@/types/authentication.type";
import { UseFormRegister } from "react-hook-form";

const ForgotPasswordPage = () => {
  const { handleSubmit, errors, register, isLoading } = useForgotPasswordHook();

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
      footerLinkPath="/login"
      submitButtonText="Reset Password"
      forgotPassword={true}
    />
  );
};

export default ForgotPasswordPage;
