import AuthLayout from "@/components/App/AuthLayout";
import useLoginHook from "@/hooks/LoginHook";
import useGoogleLoginHook from "@/hooks/useGoogleLogin";

export default function LoginPage() {
  const { register, isLoading, errors, handleSubmit } = useLoginHook();
  const {googleLogin} = useGoogleLoginHook()

  return (
    <AuthLayout
      title="Login to your account"
      subtitle="Fill in your details to get started"
      isSignUp={false}
      onSubmit={handleSubmit}
      register={register}
      errors={errors}
      isLoading={isLoading}
      footerQuestion="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkPath="/signup"
      submitButtonText="Login"
      forgotPasswordURL="/forgot-password"
      googleLoginOption={true}
      handleGoogleLogin={googleLogin}
    />
  );
}
