import AuthLayout from "@/components/App/AuthLayout";
import useDoctorSignUp from "@/hooks/DoctorHooks/doctorSignUpHook";

const DoctorSignUp = () => {
  const { register, errors, watch, handleSubmit, isLoading } = useDoctorSignUp();

  return (
    <AuthLayout
      title="Create your doctor account"
      subtitle="Fill in your details to get started"
      isSignUp={true}
      onSubmit={handleSubmit}
      register={register}
      errors={errors}
      watch={watch}
      isLoading={isLoading}
      footerQuestion="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/doctor/login"
    />
  );
};

export default DoctorSignUp;
