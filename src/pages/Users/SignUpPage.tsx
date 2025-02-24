import AuthLayout from "@/components/App/AuthLayout";
import useSignUp from "@/hooks/signUpHook";

const SignupForm: React.FC = () => {
  const { register, handleSubmit, isLoading, errors, watch } = useSignUp();

  return (
    <AuthLayout
      title="Create your  account"
      subtitle="Fill in your details to get started"
      isSignUp={true}
      onSubmit={handleSubmit}
      register={register}
      errors={errors}
      watch={watch}
      isLoading={isLoading}
      footerQuestion="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
      submitButtonText="Sign Up"
    />
  );
};

export default SignupForm;
