import useDoctorLoginHook from "../../hooks/DoctorHooks/doctorLoginHook";
import AuthLayout from "@/components/App/AuthLayout";

export default function DoctorLoginPage() {
  const { register, isLoading, errors, handleSubmit } = useDoctorLoginHook();

  return (
    <AuthLayout
      title="Login to your doctor account"
      subtitle="Fill in your details to login to your account"
      isSignUp={false}
      onSubmit={handleSubmit}
      register={register}
      errors={errors}
      isLoading={isLoading}
      footerQuestion="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkPath="/doctor/signup"
      submitButtonText="Login"
      forgotPasswordURL="/doctor/forgot-password"
    />
  );
}
