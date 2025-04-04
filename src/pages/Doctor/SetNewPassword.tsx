
import AuthLayout from "@/components/App/AuthLayout";
import useSetNewPasswordDoctor from "@/hooks/DoctorHooks/useSetNewPassword";
import { AuthFormInputs } from "@/types/authentication.type";

import { UseFormRegister, UseFormWatch } from "react-hook-form";

const SetNewPasswordPage = () => {
  const { handleSubmit, errors, watch, register, isLoading } = useSetNewPasswordDoctor();

  return (
    <AuthLayout
      title="Enter New Password!"
      subtitle="Enter your new password"
      resetPassword={true}
      onSubmit={handleSubmit}
      register={register as UseFormRegister<AuthFormInputs>}
      errors={errors}
      watch={watch as UseFormWatch<AuthFormInputs>}
      isLoading={isLoading}
      footerQuestion="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/doctor/login"
      submitButtonText="Reset Password"
    />
  );
};

export default SetNewPasswordPage;
